import { useAccount, useBalance, useChain } from '@luno-kit/react';

export const BalanceCard = () => {
  const { address } = useAccount();
  const { chain: currentChain } = useChain();
  const { data: balance } = useBalance({ address });

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">💰</span>
        <h3>Balance</h3>
      </div>
      <div className="card-content">
        {address ? (
          <div className="balance-info">
            <div className="balance-amount">{balance?.formatted ?? 0}</div>
            <div className="balance-symbol">{currentChain?.nativeCurrency.symbol}</div>
          </div>
        ) : (
          <span className="no-data">Connect wallet first</span>
        )}
      </div>
    </div>
  );
};
