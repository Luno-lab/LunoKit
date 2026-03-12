import { useChain, useClient } from '@luno-kit/react';

export const ApiStatusCard = () => {
  const { chain: currentChain } = useChain();
  const { isReady: isApiReady, error: apiError } = useClient();

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">🔌</span>
        <h3>API Status</h3>
      </div>
      <div className="card-content">
        <div className="api-status">
          <div className="status-item">
            <span className="label">API Ready:</span>
            <span className={`status ${isApiReady ? 'connected' : 'disconnected'}`}>
              {isApiReady ? '✅ Ready' : '⏳ Loading...'}
            </span>
          </div>
          <div className="status-item">
            <span className="label">Network:</span>
            <span className="value">{currentChain?.name || 'None'}</span>
          </div>
          {apiError && (
            <div className="status-item">
              <span className="label">Error:</span>
              <span className="error">{apiError.message || 'Unknown error'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
