import type { HexString } from '@luno-kit/core/types';
import type { DispatchError, DispatchInfo } from 'dedot/codecs';
import type {
  IEventRecord as EventRecord,
  ISubmittableExtrinsic,
  ISubmittableResult,
} from 'dedot/types';
import { useCallback, useState } from 'react';
import type { TxStatus, Optional } from '../types';
import { getReadableDispatchError } from '../utils';
import { useAccount } from './useAccount';
import { useLuno } from './useLuno';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

export type DetailedTxStatus =
  | 'idle'
  | 'broadcasting'
  | 'inBlock'
  | 'finalized'
  | 'invalid'
  | 'dropped';

export interface TransactionReceipt {
  transactionHash: HexString;
  blockHash: HexString;
  blockNumber?: number;
  readonly events: EventRecord[];
  status: 'failed' | 'success';
  dispatchError?: DispatchError;
  errorMessage?: string;
  dispatchInfo?: DispatchInfo;
  rawReceipt: ISubmittableResult;
}

export interface SendTransactionVariables {
  extrinsic: ISubmittableExtrinsic;
}

export interface UseSendTransactionConfig {
  waitFor?: Optional<'inBlock' | 'finalized'>;
}

export type UseSendTransactionOptions = LunoMutationOptions<
  TransactionReceipt,
  Error,
  SendTransactionVariables,
  unknown
> & UseSendTransactionConfig;

export interface UseSendTransactionResult {
  sendTransaction: (
    variables: SendTransactionVariables,
    options?: Optional<UseSendTransactionOptions>
  ) => void;
  sendTransactionAsync: (
    variables: SendTransactionVariables,
    options?: Optional<UseSendTransactionOptions>
  ) => Promise<TransactionReceipt>;
  data: TransactionReceipt | undefined;
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
  hookLevelConfig?: Optional<UseSendTransactionOptions>
): UseSendTransactionResult {
  const { activeConnector, currentApi, isApiReady } = useLuno();
  const { account } = useAccount();

  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [detailedTxStatus, setDetailedTxStatus] = useState<DetailedTxStatus>('idle');
  const [txError, setTxError] = useState<Error | null>(null);

  const waitFor = hookLevelConfig?.waitFor ?? 'finalized';

  const sendTransactionFn = useCallback(
    async (variables: SendTransactionVariables): Promise<TransactionReceipt> => {
      setTxStatus('idle');
      setDetailedTxStatus('idle');
      if (!currentApi || !isApiReady) {
        throw new Error('[useSendTransaction]: Polkadot API is not ready.');
      }
      if (!activeConnector) {
        throw new Error('[useSendTransaction]: No active connector found.');
      }
      if (!account || !account.address || !account.meta?.source) {
        throw new Error(
          '[useSendTransaction]: No active account, address, or account metadata (source) found.'
        );
      }
      if (!variables.extrinsic) {
        throw new Error('[useSendTransaction]: No extrinsic provided to send.');
      }

      const signer = await activeConnector.getSigner();
      if (!signer) {
        throw new Error('[useSendTransaction]: Could not retrieve signer from the injector.');
      }

      setTxStatus('signing');

      return new Promise<TransactionReceipt>((resolve, reject) => {
        let unsubscribe: (() => void) | undefined;

        variables.extrinsic
          .signAndSend(
            account.address,
            { signer },
            ({ status, dispatchError, events, dispatchInfo, txHash, ...rest }: ISubmittableResult) => {
              const resolveAndUnsubscribe = (receipt: TransactionReceipt) => {
                if (unsubscribe) unsubscribe();
                resolve(receipt);
              };

              const rejectAndUnsubscribe = (error: Error) => {
                if (unsubscribe) unsubscribe();
                setTxError(error);
                reject(error);
              };

              const createReceipt = (
                blockHash: HexString,
                blockNumber: number | undefined,
                error: DispatchError | undefined,
              ): TransactionReceipt => {
                const hasError = Boolean(error);
                return {
                  transactionHash: txHash,
                  blockHash: blockHash,
                  blockNumber,
                  events,
                  status: hasError ? 'failed' : 'success',
                  dispatchError: error || undefined,
                  errorMessage: error
                    ? getReadableDispatchError(currentApi, error)
                    : undefined,
                  dispatchInfo,
                  rawReceipt: { status, dispatchError, events, dispatchInfo, txHash, ...rest }
                };
              };

              switch (status.type) {
                case 'Broadcasting':
                  setTxStatus('pending');
                  setDetailedTxStatus('broadcasting');
                  break;
                case 'BestChainBlockIncluded':
                  setTxStatus('pending');
                  setDetailedTxStatus('inBlock');
                  if (waitFor === 'inBlock') {
                    setTxStatus(dispatchError ? 'failed' : 'success');
                    resolveAndUnsubscribe(
                      createReceipt(status.value?.blockHash, status.value?.blockNumber, dispatchError)
                    );
                  }
                  break;
                case 'Finalized':
                  setDetailedTxStatus('finalized');
                  if (waitFor === 'finalized') {
                    setTxStatus(dispatchError ? 'failed' : 'success');
                    resolveAndUnsubscribe(
                      createReceipt(status.value?.blockHash, status.value?.blockNumber, dispatchError)
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
            console.error(
              '[useSendTransaction]: Error in signAndSend promise:',
              error?.message || error
            );
            setTxError(error as Error);
            reject(error);
          });
      });
    },
    [currentApi, isApiReady, activeConnector, account, setTxStatus, setDetailedTxStatus, waitFor]
  );

  const mutationResult = useLunoMutation<
    TransactionReceipt,
    Error,
    SendTransactionVariables,
    unknown
  >(sendTransactionFn, hookLevelConfig);

  return {
    sendTransaction: mutationResult.mutate,
    sendTransactionAsync: mutationResult.mutateAsync,
    data: mutationResult.data,
    error: txError || mutationResult.error,
    isError: Boolean(txError) || mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    status: mutationResult.status,
    variables: mutationResult.variables,
    txStatus: txStatus,
    detailedStatus: detailedTxStatus,
  };
}
