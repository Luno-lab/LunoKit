import { Substrate } from '@luno-kit/core/utils';
import type { ISubmittableExtrinsic, TxPaymentInfo } from 'dedot/types';
import { useCallback } from 'react';
import { useLunoStore } from '../store';
import type { Optional } from '../types';
import { type LunoMutationOptions, useLunoMutation } from './useLunoMutation';

interface PaymentInfo extends TxPaymentInfo {
  partialFeeFormatted: string;
}

export interface EstimatePaymentInfoVariables {
  extrinsic: ISubmittableExtrinsic;
  senderAddress?: Optional<string>;
}

export type UseExtrinsicPaymentInfoOptions = LunoMutationOptions<
  PaymentInfo,
  Error,
  EstimatePaymentInfoVariables,
  unknown
>;

export interface UseExtrinsicPaymentInfoResult {
  estimate: (variables: EstimatePaymentInfoVariables, options?: Optional<UseExtrinsicPaymentInfoOptions>) => void;
  estimateAsync: (variables: EstimatePaymentInfoVariables, options?: Optional<UseExtrinsicPaymentInfoOptions>) => Promise<PaymentInfo>;
  data: PaymentInfo | undefined;
  error: Error | null;
  isError: boolean;
  isIdle: boolean;
  isPending: boolean;
  isSuccess: boolean;
  reset: () => void;
}

export function useExtrinsicPaymentInfo(
  parameters: { mutation?: Optional<UseExtrinsicPaymentInfoOptions> } = {}
): UseExtrinsicPaymentInfoResult {
  const { mutation: mutationOptions } = parameters;
  const account = useLunoStore((state) => state.substrate.account);
  const currentChain = useLunoStore((state) => state.substrate.chain);

  const estimateFn = useCallback(
    async (variables: EstimatePaymentInfoVariables): Promise<PaymentInfo> => {
      const { extrinsic, senderAddress } = variables;
      const sender = senderAddress || account?.address;

      if (!extrinsic) {
        throw new Error('[useExtrinsicPaymentInfo]: No extrinsic provided.');
      }
      if (!sender) {
        throw new Error('[useExtrinsicPaymentInfo]: No sender address available.');
      }
      if (!currentChain) {
        throw new Error('[useExtrinsicPaymentInfo]: No chain available.');
      }

      const result = await extrinsic.paymentInfo(sender);
      const decimals = currentChain.nativeCurrency.decimals;

      return {
        ...result,
        partialFeeFormatted: Substrate.formatBalance(result.partialFee, decimals),
      };
    },
    [account?.address, currentChain]
  );

  const mutationResult = useLunoMutation<PaymentInfo, Error, EstimatePaymentInfoVariables, unknown>(
    estimateFn,
    mutationOptions
  );

  return {
    estimate: mutationResult.mutate,
    estimateAsync: mutationResult.mutateAsync,
    data: mutationResult.data,
    error: mutationResult.error,
    isError: mutationResult.isError,
    isIdle: mutationResult.isIdle,
    isPending: mutationResult.isPending,
    isSuccess: mutationResult.isSuccess,
    reset: mutationResult.reset,
  };
}
