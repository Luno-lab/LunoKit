import type {Signer as InjectedSigner, SubmittableExtrinsic} from '@polkadot/api/types';
import type { ISubmittableResult } from '@polkadot/types/types';
import { useLuno } from './useLuno';
import {
  useLunoMutation,
  type LunoMutationOptions,
} from './useLunoMutation';
import { DispatchError, EventRecord, DispatchInfo } from '@polkadot/types/interfaces'
import { getReadableDispatchError } from '../utils'
import type { HexString } from '@polkadot/util/types'

export interface TransactionReceipt {
  transactionHash: HexString;
  blockHash: HexString;
  blockNumber?: number;
  readonly events: EventRecord[];
  status: 'Success' | 'Failed';
  dispatchError?: DispatchError;
  errorMessage?: string;
  dispatchInfo?: DispatchInfo;
}

export interface SendTransactionVariables {
  extrinsic: SubmittableExtrinsic<'promise'>;
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
}

export function useSendTransaction(
  hookLevelConfig?: UseSendTransactionOptions
): UseSendTransactionResult {
  const { account, activeConnector, currentApi, isApiReady } = useLuno();

  const sendTransactionFn = async (
    variables: SendTransactionVariables
  ): Promise<TransactionReceipt> => {
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

    return new Promise<TransactionReceipt>((resolve, reject) => {
      let unsubscribe: () => void;

      variables.extrinsic
        .signAndSend(
          account.address,
          { signer: signer as InjectedSigner },
          ({ status, dispatchError, events, dispatchInfo, txHash}: ISubmittableResult) => {
            console.log(`Current transaction status: ${status.type}`);

            const resolveAndUnsubscribe = (receipt: TransactionReceipt) => {
              if (unsubscribe) unsubscribe();
              resolve(receipt);
            };

            const rejectAndUnsubscribe = (error: any) => {
              if (unsubscribe) unsubscribe();
              reject(error);
            };

            if (status.isInvalid || status.isDropped || status.isUsurped) {
              rejectAndUnsubscribe(new Error(`[useSendTransaction]: Transaction ${status.type}: ${txHash.toHex()}`));
              return;
            }

            if (status.isInBlock || status.isFinalized) {
              if (dispatchError) {
                resolveAndUnsubscribe({
                  transactionHash: txHash.toHex(),
                  blockHash: status.asInBlock.toHex(),
                  events,
                  status: 'Failed',
                  dispatchError,
                  errorMessage: getReadableDispatchError(currentApi, dispatchError),
                  dispatchInfo,
                });
              } else {
                // const successEvent = events.find(({ event }) => currentApi.events.system.ExtrinsicSuccess.is(event));

                resolveAndUnsubscribe({
                  transactionHash: txHash.toHex(),
                  blockHash: status.asInBlock.toHex(),
                  events,
                  status: 'Success',
                  dispatchError: undefined,
                  errorMessage: undefined,
                  dispatchInfo,
                });

              }
            }
          }
        )
        .then((unsub: () => void) => {
          unsubscribe = unsub;
        })
        .catch((error: any) => {
          console.error('[useSendTransaction]: Error in signAndSend promise:', error);
          reject(error);
        });
    });
  };

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
  };
}
