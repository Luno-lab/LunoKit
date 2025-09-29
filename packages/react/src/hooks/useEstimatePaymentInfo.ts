import { useCallback, useState } from 'react';
import type { ISubmittableExtrinsic, TxPaymentInfo } from 'dedot/types';
import { useLuno } from './useLuno';
import { formatBalance } from '@luno-kit/core/utils';

interface PaymentInfo extends TxPaymentInfo {
  partialFeeFormatted: string;
}

export function useEstimatePaymentInfo() {
  const { account, currentChain } = useLuno();
  const [data, setData] = useState<PaymentInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const estimate = useCallback(
    async (
      extrinsic: ISubmittableExtrinsic,
      senderAddress?: string
    ): Promise<PaymentInfo | undefined> => {
      const sender = senderAddress || account?.address;
      if (!extrinsic || !sender || !currentChain) return;

      setIsLoading(true);
      setError(null);

      try {
        const result = await extrinsic.paymentInfo(sender);

        const decimals = currentChain.nativeCurrency.decimals;

        const paymentInfo = {
          ...result,
          partialFeeFormatted: formatBalance(result.partialFee, decimals),
        };

        setData(paymentInfo);
        return paymentInfo;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to estimate payment info');
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [account?.address, currentChain]
  );

  return {
    data,
    isLoading,
    error,
    estimate,
  };
}
