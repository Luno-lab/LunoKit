import React, { useState } from 'react';
import { ConnectButton, useLunoTheme } from '@luno-kit/ui';
import {
  useAccount,
  useAccounts,
  useDisconnect,
  useStatus,
  useChain,
  ConnectionStatus,
  useBalance,
  useChains,
  useSwitchChain,
  useSignMessage,
  useSendTransaction,
  useApi,
} from '@luno-kit/react';
import './App.css';
import { StagewiseToolbar } from '@stagewise/toolbar-react';
import ReactPlugin from '@stagewise-plugins/react';

const App: React.FC = () => {
  const status = useStatus();
  const { account, address } = useAccount();
  const { accounts, selectAccount } = useAccounts();
  const { disconnect } = useDisconnect();
  const { chain: currentChain } = useChain();
  const chains = useChains();
  const { data: balance } = useBalance({ address });
  const { switchChainAsync } = useSwitchChain();
  const { signMessageAsync, data: signMessageData } = useSignMessage();
  const { sendTransactionAsync, data: sendTransactionData, isPending: isSendingTransaction, detailedStatus } = useSendTransaction();
  const { api, isApiReady, apiError } = useApi();

  const { themeMode, setThemeMode, isAutoMode } = useLunoTheme();

  const [transferForm, setTransferForm] = useState({
    to: '',
    amount: ''
  });

  const showNotification = (title: string, message?: string) => {
    if (Notification.permission === 'granted') {
      console.log('message', message)
      new Notification(title, { body: message });
    } else {
      alert(`${title}: ${message || ''}`);
    }
  };

  const handleSignMessage = async () => {
    try {
      const { signature } = await signMessageAsync({
        message: 'Hello, welcome to use luno kit. Have a nice day!',
      });
      showNotification('Signature successful', signature);
    } catch (error) {
      showNotification('Signature failed', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleSendTransaction = async () => {
    if (!transferForm.to || !transferForm.amount) {
      showNotification('Not available args', 'Please provide complete transfer details.');
      return;
    }

    if (!currentChain) {
      showNotification('Chain not available', 'Please select available chain')
      return;
    }

    if (!api || !isApiReady) {
      showNotification('API error', 'Polkadot API is not yet ready.');
      return;
    }

    try {
      const decimals = currentChain.nativeCurrency.decimals || 12;
      const amountInPlanck = BigInt(parseFloat(transferForm.amount) * Math.pow(10, decimals));
      const result = await sendTransactionAsync({
        extrinsic: api.tx.balances.transferKeepAlive(transferForm.to, amountInPlanck)
      });

      if (result.status === 'success') {
        showNotification('Transfer successful', `TxHash: ${result.transactionHash.slice(0, 10)}...`);
        setTransferForm({ to: '', amount: '' });
      } else {
        showNotification('Transfer failed', result.errorMessage);
      }
    } catch (error) {
      showNotification('Transfer failed', error instanceof Error ? error.message : 'An error occurred during the transfer process.');
    }
  };

  React.useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  return (
    <>
      {/* Render only in the development environment StagewiseToolbar */}
      <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
      <div className="demo-page">

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-icon">
              <img src="/favicon-96x96.png" alt=""/>
            </div>
            <h1>Luno Wallet Kit</h1>
            <p className="hero-subtitle">
              The modern Polkadot wallet connection library for React applications
            </p>
            <div className="hero-connect">
              <ConnectButton />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="container">
            <h2>Live Demo</h2>
            <div className="features-grid">

              {/* Theme Control Card */}
              <div className="feature-card">
                <div className="card-header">
                  <span className="card-icon">🎨</span>
                  <h3>Theme Control</h3>
                </div>
                <div className="card-content">
                  <div className="theme-section">
                    <div className="status-item">
                      <span className="label">Current Theme:</span>
                      <span className="value">{themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}</span>
                    </div>
                    <button
                      className="chain-switch-btn"
                      onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                    >
                      Switch to {themeMode === 'dark' ? 'Light' : 'Dark'} Theme
                    </button>
                  </div>
                </div>
              </div>

              {/* Wallet Status Card */}
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
                  {status === ConnectionStatus.Connected && (
                    <button className="disconnect-btn" onClick={() => disconnect()}>
                      Disconnect
                    </button>
                  )}
                </div>
              </div>

              {/* Chains Card */}
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
                      {chains && chains.length > 1 && (
                        <div className="chain-list">
                          {chains.filter(c => c.genesisHash !== currentChain.genesisHash).map(chain => (
                            <button
                              key={chain.genesisHash}
                              className="chain-switch-btn"
                              onClick={async () => await switchChainAsync({ chainId: chain.genesisHash })}
                            >
                              Switch to {chain.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-data">Connect wallet first</span>
                  )}
                </div>
              </div>

              {/* Balance Card */}
              <div className="feature-card">
                <div className="card-header">
                  <span className="card-icon">💰</span>
                  <h3>Balance</h3>
                </div>
                <div className="card-content">
                  {address ? (
                    <div className="balance-info">
                      <div className="balance-amount">
                        {balance?.formattedTotal ?? 0}
                      </div>
                      <div className="balance-symbol">
                        {currentChain?.nativeCurrency.symbol}
                      </div>
                    </div>
                  ) : (
                    <span className="no-data">Connect wallet first</span>
                  )}
                </div>
              </div>

              {/* Account Card */}
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
                      {accounts.length > 1 && (
                        <div className="account-list">
                          {accounts.filter(acc => acc.publicKey !== account.publicKey).map(acc => (
                            <button
                              key={acc.publicKey}
                              className="account-switch-btn"
                              onClick={() => selectAccount(acc.publicKey)}
                            >
                              Switch to {acc.name || 'Unnamed'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-data">Connect wallet first</span>
                  )}
                </div>
              </div>

              {/* Sign Message Card */}
              <div className="feature-card">
                <div className="card-header">
                  <span className="card-icon">✍️</span>
                  <h3>Sign Message</h3>
                </div>
                <div className="card-content">
                  {status === ConnectionStatus.Connected ? (
                    <div className="sign-section">
                      <button
                        className="sign-btn"
                        onClick={handleSignMessage}
                      >
                        Sign Test Message
                      </button>
                      {signMessageData && (
                        <div className="sign-result">
                          <div className="result-item">
                            <span className="label">Signature:</span>
                            <span className="value">{signMessageData.signature.slice(0, 20)}...</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-data">Connect wallet first</span>
                  )}
                </div>
              </div>

              {/* Send Transaction Card */}
              <div className="feature-card">
                <div className="card-header">
                  <span className="card-icon">💸</span>
                  <h3>Send Transaction</h3>
                </div>
                <div className="card-content">
                  {status === ConnectionStatus.Connected ? (
                    <div className="transaction-section">
                      <div className="transfer-form">
                        <div className="form-group">
                          <label className="form-label">To Address:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="..."
                            value={transferForm.to}
                            onChange={(e) => setTransferForm(prev => ({ ...prev, to: e.target.value }))}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Amount ({currentChain?.nativeCurrency.symbol}):</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="1.0"
                            value={transferForm.amount}
                            onChange={(e) => setTransferForm(prev => ({ ...prev, amount: e.target.value }))}
                          />
                        </div>
                        <button
                          className="transfer-btn"
                          onClick={handleSendTransaction}
                          disabled={!transferForm.to || !transferForm.amount || !isApiReady || isSendingTransaction}
                        >
                          {isSendingTransaction ? 'Sending...' : 'Send Transaction'}
                        </button>
                      </div>
                      {sendTransactionData && (
                        <div className="transaction-result">
                          <div className="result-item">
                            <span className="label">Status:</span>
                            <span className="value">{sendTransactionData.status}</span>
                          </div>
                          <div className="result-item">
                            <span className="label">Hash:</span>
                            <span className="value">{sendTransactionData.transactionHash.slice(0, 20)}...</span>
                          </div>
                        </div>
                      )}
                      {detailedStatus && (
                        <div className="transaction-result">
                          <div className="result-item">
                            <span className="label">DetailedStatus:</span>
                            <span className="value">{detailedStatus}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span className="no-data">Connect wallet first</span>
                  )}
                </div>
              </div>

              {/* API Status Card */}
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
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="code-examples">
          <div className="container">
            <h2>Quick Start</h2>
            <div className="code-grid">
              <div className="code-card">
                <h3>Installation</h3>
                <pre><code>{`pnpm add @luno-kit/ui @luno-kit/react @tanstack/react-query`}</code></pre>
              </div>
              <div className="code-card">
                <h3>Basic Usage</h3>
                <pre><code>{`import { LunoKitProvider, ConnectButton } from '@luno-kit/ui';
import '@luno-kit/ui/dist/styles.css';

<LunoKitProvider config={config}>
  <ConnectButton />
</LunoKitProvider>`}</code></pre>
              </div>
            </div>
          </div>
        </section>

        {/* Hooks API Reference Section */}
        <section className="hooks-reference">
          <div className="container">
            <h2>Available Hooks</h2>
            <p className="section-subtitle">
              All React hooks provided by @luno-kit/react
            </p>

            <div className="hooks-grid">

              {/* Connection */}
              <div className="hooks-group">
                <h3>🔌 Connection</h3>
                <div className="hooks-list">
                  <div className="hook-item">
                    <code>useStatus()</code>
                    <span>Get wallet connection status</span>
                  </div>
                  <div className="hook-item">
                    <code>useDisconnect()</code>
                    <span>Disconnect wallet</span>
                  </div>
                </div>
              </div>

              {/* Account */}
              <div className="hooks-group">
                <h3>👤 Account</h3>
                <div className="hooks-list">
                  <div className="hook-item">
                    <code>useAccount()</code>
                    <span>Get current account</span>
                  </div>
                  <div className="hook-item">
                    <code>useAccounts()</code>
                    <span>Get all accounts</span>
                  </div>
                  <div className="hook-item">
                    <code>useBalance()</code>
                    <span>Get account balance</span>
                  </div>
                </div>
              </div>

              {/* Chain */}
              <div className="hooks-group">
                <h3>🔗 Chain</h3>
                <div className="hooks-list">
                  <div className="hook-item">
                    <code>useChain()</code>
                    <span>Get current chain</span>
                  </div>
                  <div className="hook-item">
                    <code>useChains()</code>
                    <span>Get all chains</span>
                  </div>
                  <div className="hook-item">
                    <code>useSwitchChain()</code>
                    <span>Switch chains</span>
                  </div>
                  <div className="hook-item">
                    <code>useApi()</code>
                    <span>Get API instance</span>
                  </div>
                </div>
              </div>

              {/* Transaction */}
              <div className="hooks-group">
                <h3>💸 Transaction</h3>
                <div className="hooks-list">
                  <div className="hook-item">
                    <code>useSignMessage()</code>
                    <span>Sign messages</span>
                  </div>
                  <div className="hook-item">
                    <code>useSendTransaction()</code>
                    <span>Send transactions</span>
                  </div>
                </div>
              </div>

              {/* UI */}
              <div className="hooks-group">
                <h3>🎨 UI</h3>
                <div className="hooks-list">
                  <div className="hook-item">
                    <code>useLunoTheme()</code>
                    <span>Control theme</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default App;
