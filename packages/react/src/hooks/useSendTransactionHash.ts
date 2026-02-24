import { ChainType, type HexString, type Optional } from '@luno-kit/core/types';
import type { ISubmittableExtrinsic } from 'dedot/types';
import { useCallback } from 'react';
import { useSendTransaction as useWagmiSendTransaction } from 'wagmi';
import { useLunoStore } from '../store';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

export interface SubstrateSendTransactionHashVariables {
  extrinsic: ISubmittableExtrinsic;
}

export interface EvmSendTransactionHashVariables {
  to: HexString;
  value?: bigint;
  data?: HexString;
}

export type SendTransactionHashVariables =
  | SubstrateSendTransactionHashVariables
  | EvmSendTransactionHashVariables;

export type UseSendTransactionHashOptions = LunoMutationOptions<
  HexString,
  Error,
  SendTransactionHashVariables,
  unknown
>;

export interface UseSendTransactionHashResult {
  sendTransaction: (
    variables: SendTransactionHashVariables,
    options?: Optional<UseSendTransactionHashOptions>
  ) => void;
  sendTransactionAsync: (
    variables: SendTransactionHashVariables,
    options?: Optional<UseSendTransactionHashOptions>
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
}

export function useSendTransactionHash(
  parameters: { mutation?: Optional<UseSendTransactionHashOptions> } = {}
): UseSendTransactionHashResult {
  const { mutation: mutationOptions } = parameters;

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const substrateAccount = useLunoStore((state) => state.substrate.account);
  const substrateApi = useLunoStore((state) => state.substrate.currentApi);
  const isApiReady = useLunoStore((state) => state.substrate.isApiReady);

  const wagmiSendTx = useWagmiSendTransaction();

  const sendSubstrate = async (
    variables: SubstrateSendTransactionHashVariables
  ): Promise<HexString> => {
    if (!substrateApi || !isApiReady) {
      throw new Error('[useSendTransactionHash]: Polkadot API is not ready.');
    }
    if (!substrateConnector) {
      throw new Error('[useSendTransactionHash]: No active Substrate connector found.');
    }
    if (!substrateAccount?.address || !substrateAccount?.meta?.source) {
      throw new Error('[useSendTransactionHash]: No active Substrate account found.');
    }
    if (!variables.extrinsic) {
      throw new Error('[useSendTransactionHash]: No extrinsic provided.');
    }

    const signer = await substrateConnector.getSigner();
    if (!signer) {
      throw new Error('[useSendTransactionHash]: Could not retrieve signer.');
    }

    const txHash = await variables.extrinsic.signAndSend(
      substrateAccount.address,
      { signer }
    );

    return txHash as HexString;
  };

  const sendEvm = async (
    variables: EvmSendTransactionHashVariables
  ): Promise<HexString> => {
    const hash: HexString = await wagmiSendTx.mutateAsync({
      to: variables.to,
      value: variables.value,
      data: variables.data as HexString | undefined,
    });

    return hash;
  };

  const mutationFn = useCallback(
    async (variables: SendTransactionHashVariables): Promise<HexString> => {
      switch (activeNamespace) {
        case ChainType.SUBSTRATE: {
          if (!('extrinsic' in variables)) {
            throw new Error(
              '[useSendTransactionHash]: Expected Substrate variables (extrinsic) for current namespace.'
            );
          }
          return sendSubstrate(variables as SubstrateSendTransactionHashVariables);
        }
        case ChainType.EVM: {
          if ('extrinsic' in variables) {
            throw new Error(
              '[useSendTransactionHash]: Expected EVM variables (to, value, data) for current namespace.'
            );
          }
          return sendEvm(variables as EvmSendTransactionHashVariables);
        }
        default:
          throw new Error(`[useSendTransactionHash]: Unsupported namespace: ${activeNamespace}`);
      }
    },
    [
      activeNamespace,
      substrateConnector,
      substrateAccount,
      substrateApi,
      isApiReady,
      wagmiSendTx.mutateAsync,
    ]
  );

  const mutationResult = useLunoMutation<
    HexString,
    Error,
    SendTransactionHashVariables,
    unknown
  >(mutationFn, mutationOptions);

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
