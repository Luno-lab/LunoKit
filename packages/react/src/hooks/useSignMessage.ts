import { ChainType, type Optional } from '@luno-kit/core/types';
import { Substrate } from '@luno-kit/core/utils';
import { useCallback } from 'react';
import { useLunoStore } from '../store';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

export interface SignMessageVariables {
  message: string;
}

export interface SignMessageData {
  signature: string;
  rawMessage: string;
  addressUsed: string;
}

export type UseSignMessageOptions = LunoMutationOptions<
  SignMessageData,
  Error,
  SignMessageVariables,
  unknown
>;

export interface UseSignMessageResult {
  signMessage: (variables: SignMessageVariables, options?: Optional<UseSignMessageOptions>) => void;
  signMessageAsync: (
    variables: SignMessageVariables,
    options?: Optional<UseSignMessageOptions>
  ) => Promise<SignMessageData>;
  data: SignMessageData | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  status: 'idle' | 'pending' | 'error' | 'success';
  reset: () => void;
  variables: SignMessageVariables | undefined;
}

export function useSignMessage(
  parameters?: { namespace?: Optional<ChainType>; mutation?: Optional<UseSignMessageOptions> }
): UseSignMessageResult {
  const { namespace, mutation: mutationOptions } = parameters ?? {};

  const activeNamespace = useLunoStore((state) => state.activeNamespace);

  const substrateConnector = useLunoStore((state) => state.substrate.connector);
  const substrateAccount = useLunoStore((state) => state.substrate.account);
  const substrateAllAccounts = useLunoStore((state) => state.substrate.allAccounts);

  const evmConnector = useLunoStore((state) => state.evm.connector);
  const evmAccount = useLunoStore((state) => state.evm.account);

  const targetNamespace = namespace || activeNamespace;

  const signSubstrate = async (message: string): Promise<SignMessageData> => {
    if (!substrateConnector) {
      throw new Error('[useSignMessage]: No Substrate connector found.');
    }
    if (!substrateAccount?.address) {
      throw new Error('[useSignMessage]: No Substrate account available.');
    }

    const validAccount = substrateAllAccounts?.find((acc) =>
      Substrate.isSameAddress(acc.address, substrateAccount.address)
    );

    if (!validAccount) {
      throw new Error(
        `[useSignMessage]: Address ${substrateAccount.address} is not managed by ${substrateConnector.id}.`
      );
    }

    const signature = await substrateConnector.signMessage(message, validAccount.address);

    if (!signature) {
      throw new Error('[useSignMessage]: Signature was not obtained.');
    }

    return {
      signature,
      rawMessage: message,
      addressUsed: validAccount.address,
    };
  };

  const signEvm = async (message: string): Promise<SignMessageData> => {
    if (!evmConnector) {
      throw new Error('[useSignMessage]: No EVM connector found.');
    }
    if (!evmAccount?.address) {
      throw new Error('[useSignMessage]: No EVM account available.');
    }

    const signature = await evmConnector.signMessage(message);

    if (!signature) {
      throw new Error('[useSignMessage]: Signature was not obtained.');
    }

    return {
      signature,
      rawMessage: message,
      addressUsed: evmAccount.address,
    };
  };

  const mutationFn = useCallback(
    async (variables: SignMessageVariables): Promise<SignMessageData> => {
      if (!variables.message) {
        throw new Error('[useSignMessage]: No message provided for signing.');
      }

      switch (targetNamespace) {
        case ChainType.SUBSTRATE:
          return signSubstrate(variables.message);
        case ChainType.EVM:
          return signEvm(variables.message);
        default:
          throw new Error(`[useSignMessage]: Unsupported namespace: ${targetNamespace}`);
      }
    },
    [
      targetNamespace,
      substrateConnector,
      substrateAccount,
      substrateAllAccounts,
      evmConnector,
      evmAccount,
    ]
  );

  const mutationResult = useLunoMutation<SignMessageData, Error, SignMessageVariables, unknown>(
    mutationFn,
    mutationOptions
  );

  return {
    signMessage: mutationResult.mutate,
    signMessageAsync: mutationResult.mutateAsync,
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
