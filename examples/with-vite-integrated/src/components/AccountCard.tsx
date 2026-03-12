import { useAccount } from '@luno-kit/react';

export const AccountCard = () => {
  const { account, address } = useAccount();

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">👤</span>
        <h3>Account Management</h3>
      </div>
      <div className="card-content">
        {account ? (
          <div className="account-info">
            <div className="account-name">{account.name || 'Unnamed'}</div>
            <div className="account-address">{address}</div>
          </div>
        ) : (
          <span className="no-data">Connect wallet first</span>
        )}
      </div>
    </div>
  );
};
