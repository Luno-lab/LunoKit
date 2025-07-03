import type { ISubmittableExtrinsic, ISubmittableResult } from 'dedot/types';
import { IEventRecord as EventRecord } from 'dedot/types'
import { useLuno } from './useLuno';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';
import { DispatchError, DispatchInfo } from 'dedot/codecs';
import { getReadableDispatchError } from '../utils';
import type { HexString } from 'dedot/utils';
import { useCallback, useState } from 'react';
import { TxStatus } from '../types';

export type DetailedTxStatus = 'idle' | 'broadcasting' | 'inBlock' | 'finalized' | 'invalid' | 'dropped';

export interface TransactionReceipt {
  transactionHash: HexString;
  blockHash: HexString;
  blockNumber?: number;
  readonly events: EventRecord[];
  status: 'failed' | 'success';
  dispatchError?: DispatchError;
  errorMessage?: string;
  dispatchInfo?: DispatchInfo;
}

export interface SendTransactionVariables {
  extrinsic: ISubmittableExtrinsic;
}

export type UseSendTransactionOptions = LunoMutationOptions<
  TransactionReceipt,
  Error,
  SendTransactionVariables,
  unknown
>;

export interface UseSendTransactionResult {
  sendTransaction: (
    variables: SendTransactionVariables,
    options?: UseSendTransactionOptions
  ) => void;
  sendTransactionAsync: (
    variables: SendTransactionVariables,
    options?: UseSendTransactionOptions
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

export function useSendTransaction (
  hookLevelConfig?: UseSendTransactionOptions,
): UseSendTransactionResult {
  const { account, activeConnector, currentApi, isApiReady } = useLuno();

  const [txStatus, setTxStatus] = useState<TxStatus>('idle');
  const [detailedTxStatus, setDetailedTxStatus] = useState<DetailedTxStatus>('idle');

  const sendTransactionFn = useCallback(async (variables: SendTransactionVariables): Promise<TransactionReceipt> => {
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

    const signer = await activeConnector.getSigner()
    if (!signer) {
      throw new Error('[useSendTransaction]: Could not retrieve signer from the injector.');
    }

    setTxStatus('signing');
    setDetailedTxStatus('idle')

    return new Promise<TransactionReceipt>((resolve, reject) => {
      let unsubscribe: (() => void) | undefined;

      variables.extrinsic
        .signAndSend(
          account.address, { signer },
          ({ status, dispatchError, events, dispatchInfo, txHash, txIndex }: ISubmittableResult) => {
            const resolveAndUnsubscribe = (receipt: TransactionReceipt) => {
              if (unsubscribe) unsubscribe();
              resolve(receipt);
            };

            const rejectAndUnsubscribe = (error: Error) => {
              if (unsubscribe) unsubscribe();
              reject(error);
            };

            switch (status.type) {
              case 'Broadcasting':
                setDetailedTxStatus('broadcasting');
                break;
              case 'BestChainBlockIncluded':
                setDetailedTxStatus('inBlock');
                break;
              case 'Finalized':
                setTxStatus('success');
                setDetailedTxStatus('finalized');
                if (dispatchError) {
                  resolveAndUnsubscribe({
                    transactionHash: txHash,
                    blockHash: status.value?.blockHash,
                    blockNumber: status.value?.blockNumber,
                    events,
                    status: 'failed',
                    dispatchError,
                    errorMessage: getReadableDispatchError(currentApi, dispatchError),
                    dispatchInfo,
                  });
                } else {
                  resolveAndUnsubscribe({
                    transactionHash: txHash,
                    blockHash: status.value?.blockHash,
                    blockNumber: status.value?.blockNumber,
                    events,
                    status: 'success',
                    dispatchError: undefined,
                    errorMessage: undefined,
                    dispatchInfo,
                  });
                }
                break;
              case 'Invalid':
                setTxStatus('failed')
                setDetailedTxStatus('invalid')
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
        .catch((error: any) => {
          setTxStatus('failed');
          console.error('[useSendTransaction]: Error in signAndSend promise:', error?.message || error);
          reject(error);
        });
    });
  }, [currentApi, isApiReady, activeConnector, account, setTxStatus, setDetailedTxStatus]);

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
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
    status: mutationResult.status,
    variables: mutationResult.variables,
    txStatus: txStatus,
    detailedStatus: detailedTxStatus
  };
}
