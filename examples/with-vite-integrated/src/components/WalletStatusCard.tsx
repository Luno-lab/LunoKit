import { ConnectionStatus, useChain, useDisconnect, useStatus } from '@luno-kit/react';

export const WalletStatusCard = () => {
  const status = useStatus();
  const { chainType } = useChain();
  const { disconnect } = useDisconnect();

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">💳</span>
        <h3>Wallet Connection</h3>
      </div>
      <div className="card-content">
        <div className="status-item">
          <span className="label">Status:</span>
          <span className={`status ${status.toLowerCase()}`}>
            {status === ConnectionStatus.Connected ? '✅ Connected' : '❌ Disconnected'}
          </span>
        </div>
        <div className="status-item">
          <span className="label">Namespace:</span>
          <span className="value">{chainType || 'None'}</span>
        </div>
        {status === ConnectionStatus.Connected && (
          <button className="disconnect-btn" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
};
