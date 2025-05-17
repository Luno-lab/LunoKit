import { useLuno } from './useLuno';
import { useLunoMutation, type LunoMutationOptions } from './useLunoMutation';
import { useAccount } from './useAccount'
import { useAccounts } from './useAccounts'

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
  unknown // TContext
>;

export interface UseSignMessageResult {
  signMessage: (
    variables: SignMessageVariables,
    options?: UseSignMessageOptions
  ) => void;
  signMessageAsync: (
    variables: SignMessageVariables,
    options?: UseSignMessageOptions
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
  hookLevelConfig?: UseSignMessageOptions
): UseSignMessageResult {
  const { activeConnector } = useLuno();
  const { account, address } = useAccount()
  const { accounts } = useAccounts()

  const mutationFn = async (
    variables: SignMessageVariables
  ): Promise<SignMessageData> => {
    if (!activeConnector) {
      throw new Error('[useSignMessage]: No active connector found to sign the message.');
    }
    if (!account || !address || !account.meta?.source) {
      throw new Error('[useSignMessage]: No address provided for signing.');
    }

    if (!accounts.some(acc => acc.address === address)) {
      throw new Error(`[useSignMessage]: Address ${address} is not managed by ${activeConnector.id}.`);
    }

    if (!variables.message) {
      throw new Error('[useSignMessage]: No message provided for signing.');
    }

    const signatureString = await activeConnector.signMessage(
      variables.message,
      address
    );

    if (!signatureString) {
      throw new Error(
        '[useSignMessage]: Signature was not obtained. The user may have cancelled the request or the connector failed.'
      );
    }
    return {
      signature: signatureString,
      rawMessage: variables.message,
      addressUsed: address ,
    };
  };

  const mutationResult = useLunoMutation<
    SignMessageData,
    Error,
    SignMessageVariables,
    unknown
  >(mutationFn, hookLevelConfig);

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
