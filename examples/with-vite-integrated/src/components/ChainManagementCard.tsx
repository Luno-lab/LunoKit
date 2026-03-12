import { useChain } from '@luno-kit/react';

export const ChainManagementCard = () => {
  const { chain: currentChain } = useChain();

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">🔗</span>
        <h3>Chain Management</h3>
      </div>
      <div className="card-content">
        {currentChain ? (
          <div className="chain-info">
            <div className="current-chain">
              <span className="chain-name">{currentChain.name}</span>
              <span className="chain-indicator">⚪</span>
            </div>
          </div>
        ) : (
          <span className="no-data">Connect wallet first</span>
        )}
      </div>
    </div>
  );
};
