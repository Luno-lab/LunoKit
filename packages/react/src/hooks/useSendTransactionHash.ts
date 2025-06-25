import type { ISubmittableExtrinsic } from 'dedot/types';
import { useLuno } from './useLuno';
import { type LunoMutationOptions, useLunoMutation} from './useLunoMutation';
import type { HexString } from 'dedot/utils';
import { useCallback, useState } from 'react';
import { TxStatus } from '../types';

export interface SendTransactionHashVariables {
  extrinsic: ISubmittableExtrinsic;
}

export type UseSendTransactionHashOptions = LunoMutationOptions<
  HexString,
  Error,
  SendTransactionHashVariables,
  unknown
>;

export interface UseSendTransactionHashResult {
  sendTransaction: (
    variables: SendTransactionHashVariables,
    options?: UseSendTransactionHashOptions
  ) => void;
  sendTransactionAsync: (
    variables: SendTransactionHashVariables,
    options?: UseSendTransactionHashOptions
  ) => Promise<HexString>;
  data: HexString | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  status: 'idle' | 'pending' | 'error' | 'success';
  reset: () => void;
  variables: SendTransactionHashVariables | undefined;
  txStatus: TxStatus;
}

export function useSendTransactionHash (
  hookLevelConfig?: UseSendTransactionHashOptions,
): UseSendTransactionHashResult {
  const { account, activeConnector, currentApi, isApiReady } = useLuno();

  const [txStatus, setTxStatus] = useState<TxStatus>('idle');

  const sendTransactionFn = useCallback(async (variables: SendTransactionHashVariables): Promise<HexString> => {
    if (!currentApi || !isApiReady) {
      throw new Error('[useSendTransactionHash]: Polkadot API is not ready.');
    }
    if (!activeConnector) {
      throw new Error('[useSendTransactionHash]: No active connector found.');
    }
    if (!account || !account.address || !account.meta?.source) {
      throw new Error(
        '[useSendTransactionHash]: No active account, address, or account metadata (source) found.'
      );
    }
    if (!variables.extrinsic) {
      throw new Error('[useSendTransactionHash]: No extrinsic provided to send.');
    }

    const signer = await activeConnector.getSigner()
    if (!signer) {
      throw new Error('[useSendTransactionHash]: Could not retrieve signer from the injector.');
    }

    try {
      setTxStatus('signing');
      const txHash = await variables.extrinsic
        .signAndSend(account.address, { signer: signer }).catch(e => { throw e });
      return txHash
    } catch (error) {
      setTxStatus('failed');
      throw error;
    }
  }, [currentApi, isApiReady, activeConnector, account, setTxStatus]);

  const mutationResult = useLunoMutation<
    HexString,
    Error,
    SendTransactionHashVariables,
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
  };
}
