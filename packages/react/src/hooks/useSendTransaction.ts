import { ChainType, type HexString, type Optional } from '@luno-kit/core/types';
import type { DispatchError } from 'dedot/codecs';
import type {
  ISubmittableExtrinsic,
  ISubmittableResult,
} from 'dedot/types';
import { useCallback, useState } from 'react';
import { sendTransaction as sendEvmTransaction } from 'wagmi/actions';
import type { TransactionReceipt as ViemTransactionReceipt } from 'viem';
import { useLunoStore } from '../store';
import type { DetailedTxStatus, TxStatus } from '../types';
import { getReadableDispatchError } from '../utils';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';
import { useClient } from './useClient';

export interface SubstrateSendTransactionVariables {
  extrinsic: ISubmittableExtrinsic;
  waitFor?: 'inBlock' | 'finalized';
}

export interface EvmSendTransactionVariables {
  to: HexString;
  value?: bigint;
  data?: HexString;
}

export type SendTransactionVariables =
  | SubstrateSendTransactionVariables
  | EvmSendTransactionVariables;

export interface TransactionResult {
  hash: HexString;
  status: 'success' | 'failed';
  errorMessage?: string;
  raw?: ISubmittableResult | ViemTransactionReceipt;
}

export type UseSendTransactionOptions = LunoMutationOptions<
  TransactionResult,
  Error,
  SendTransactionVariables,
  unknown
>;

export interface UseSendTransactionResult {
  sendTransaction: (
    variables: SendTransactionVariables,
    options?: Optional<UseSendTransactionOptions>
  ) => void;
  sendTransactionAsync: (
    variables: SendTransactionVariables,
    options?: Optional<UseSendTransactionOptions>
  ) => Promise<TransactionResult>;
  data: TransactionResult | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  status: 'idle' | 'pending' | 'error' | 'success';
  reset: () => void;
  variables: SendTransactionVariables | undefined;
  txStatus: TxStatus;
  detailedStatus: DetailedTxStatus;
}

export function useSendTransaction(
  parameters: { mutation?: Optional<UseSendTransactionOptions> } = {}
): UseSendTransactionResult {
  const { mutation: mutationOptions } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const substrateAccount = useLunoStore((state) => state.substrate.account);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);

  const wagmiConfig = useLunoStore((state) => state.config?.evm?.wagmiConfig);
  const evmChainId = useLunoStore((state) => state.evm.chainId);
  const { client: evmClient } = useClient({ namespace: 'evm' });

  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [detailedTxStatus, setDetailedTxStatus] = useState<DetailedTxStatus>('idle');

  const sendSubstrate = async (
    variables: SubstrateSendTransactionVariables
  ): Promise<TransactionResult> => {
    const waitFor = variables.waitFor ?? 'finalized';

    if (!substrateApi || !isApiReady) {
      throw new Error('[useSendTransaction]: Polkadot API is not ready.');
    }
    if (!substrateConnector) {
      throw new Error('[useSendTransaction]: No active Substrate connector found.');
    }
    if (!substrateAccount?.address || !substrateAccount?.meta?.source) {
      throw new Error('[useSendTransaction]: No active Substrate account found.');
    }
    if (!variables.extrinsic) {
      throw new Error('[useSendTransaction]: No extrinsic provided.');
    }

    const signer = await substrateConnector.getSigner();
    if (!signer) {
      throw new Error('[useSendTransaction]: Could not retrieve signer.');
    }

    setTxStatus('signing');

    return new Promise<TransactionResult>((resolve, reject) => {
      let unsubscribe: (() => void) | undefined;

      variables.extrinsic
        .signAndSend(
          substrateAccount.address,
          { signer },
          ({
            status,
            dispatchError,
            events,
            dispatchInfo,
            txHash,
            ...rest
          }: ISubmittableResult) => {
            const resolveAndUnsubscribe = (result: TransactionResult) => {
              if (unsubscribe) unsubscribe();
              resolve(result);
            };

            const rejectAndUnsubscribe = (error: Error) => {
              if (unsubscribe) unsubscribe();
              reject(error);
            };

            const createResult = (
              blockHash: HexString,
              error: DispatchError | undefined
            ): TransactionResult => {
              const hasError = Boolean(error);
              return {
                hash: txHash,
                status: hasError ? 'failed' : 'success',
                errorMessage: error
                  ? getReadableDispatchError(substrateApi, error)
                  : undefined,
                raw: { status, dispatchError, events, dispatchInfo, txHash, ...rest },
              };
            };

            switch (status.type) {
              case 'Broadcasting':
                setTxStatus('pending');
                setDetailedTxStatus('broadcasting');
                break;
              case 'BestChainBlockIncluded':
                setDetailedTxStatus('inBlock');
                if (waitFor === 'inBlock') {
                  setTxStatus(dispatchError ? 'failed' : 'success');
                  resolveAndUnsubscribe(
                    createResult(status.value?.blockHash, dispatchError)
                  );
                }
                break;
              case 'Finalized':
                setDetailedTxStatus('finalized');
                if (waitFor === 'finalized') {
                  setTxStatus(dispatchError ? 'failed' : 'success');
                  resolveAndUnsubscribe(
                    createResult(status.value?.blockHash, dispatchError)
                  );
                }
                break;
              case 'Invalid':
                setTxStatus('failed');
                setDetailedTxStatus('invalid');
                rejectAndUnsubscribe(new Error(`Transaction invalid: ${txHash}`));
                break;
              case 'Drop':
                setTxStatus('failed');
                setDetailedTxStatus('dropped');
                rejectAndUnsubscribe(new Error(`Transaction dropped: ${txHash}`));
                break;
            }
          }
        )
        .then((unsub: () => void) => {
          unsubscribe = unsub;
        })
        .catch((error) => {
          setTxStatus('failed');
          reject(error);
        });
    });
  };

  const sendEvm = async (
    variables: EvmSendTransactionVariables
  ): Promise<TransactionResult> => {
    if (!wagmiConfig) {
      throw new Error('[useSendTransaction]: EVM config not available.');
    }
    if (!evmClient) {
      throw new Error('[useSendTransaction]: EVM public client not available.');
    }

    setTxStatus('signing');

    const hash: HexString = await sendEvmTransaction(wagmiConfig, {
      chainId: evmChainId,
      to: variables.to,
      value: variables.value,
      data: variables.data as HexString | undefined,
    });

    setTxStatus('pending');
    setDetailedTxStatus('submitted');

    const receipt: ViemTransactionReceipt = await evmClient.waitForTransactionReceipt({ hash });

    const resultStatus = receipt.status === 'success' ? 'success' : 'failed';
    setTxStatus(resultStatus);
    setDetailedTxStatus('confirmed');

    return {
      hash,
      status: resultStatus,
      raw: receipt,
    };
  };

  const mutationFn = useCallback(
    async (variables: SendTransactionVariables): Promise<TransactionResult> => {
      setTxStatus('idle');
      setDetailedTxStatus('idle');

      switch (activeNamespace) {
        case ChainType.SUBSTRATE: {
          if (!('extrinsic' in variables)) {
            throw new Error(
              '[useSendTransaction]: Expected Substrate variables (extrinsic) for current namespace.'
            );
          }
          return sendSubstrate(variables as SubstrateSendTransactionVariables);
        }
        case ChainType.EVM: {
          if ('extrinsic' in variables) {
            throw new Error(
              '[useSendTransaction]: Expected EVM variables (to, value, data) for current namespace.'
            );
          }
          return sendEvm(variables as EvmSendTransactionVariables);
        }
        default:
          throw new Error(`[useSendTransaction]: Unsupported namespace: ${activeNamespace}`);
      }
    },
    [
      activeNamespace,
      substrateConnector,
      substrateAccount,
      substrateApi,
      isApiReady,
      wagmiConfig,
      evmChainId,
      evmClient,
    ]
  );

  const mutationResult = useLunoMutation<
    TransactionResult,
    Error,
    SendTransactionVariables,
    unknown
  >(mutationFn, mutationOptions);

  const reset = useCallback(() => {
    mutationResult.reset();
    setTxStatus('idle');
    setDetailedTxStatus('idle');
  }, [mutationResult.reset]);

  return {
    sendTransaction: mutationResult.mutate,
    sendTransactionAsync: mutationResult.mutateAsync,
    data: mutationResult.data,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset,
    status: mutationResult.status,
    variables: mutationResult.variables,
    txStatus,
    detailedStatus: detailedTxStatus,
  };
}
