import React, { useState, useEffect } from 'react';
import { ConnectButton, useLunoTheme } from '@luno-kit/ui';
import {
  useAccount,
  useAccounts,
  useDisconnect,
  useStatus,
  ConnectionStatus,
  usePapiSigner
} from '@luno-kit/react';
import { usePapiClient } from './hooks/usePapiClient';
import './App.css';
import { toHex } from 'polkadot-api/utils';

const App: React.FC = () => {
  const status = useStatus();
  const { account, address } = useAccount();
  const { accounts, selectAccount } = useAccounts();
  const { disconnect } = useDisconnect();
  const { themeMode, setThemeChoice } = useLunoTheme();
  const { data: papiSigner } = usePapiSigner();

  const {
    isReady,
    error,
    currentChain,
    availableChains,
    balance,
    switchChain,
    sendTransaction,
    loadingBalance,
  } = usePapiClient();

  const [signMessageData, setSignMessageData] = useState<{ signature: string } | null>(null);
  const [sendTransactionData, setTransactionData] = useState<any>(null);
  const [isSendingTransaction, setIsSendingTransaction] = useState(false);
  const [detailedStatus, setDetailedStatus] = useState('');
  const [transferForm, setTransferForm] = useState({
    to: '',
    amount: ''
  });

  const showNotification = (title: string, message?: string) => {
    if (window.Notification?.permission === 'granted') {
      new window.Notification(title, { body: message });
    } else {
      alert(`${title}: ${message || ''}`);
    }
  };

  const handleSignMessage = async () => {
    if (!papiSigner) {
      showNotification('Signer not available', 'Please connect your wallet first');
      return;
    }

    try {
      const message = 'Hello, welcome to use luno kit. Have a nice day!';
      const messageBytes = new TextEncoder().encode(message);

      const signature = await papiSigner.signBytes(messageBytes);

      setSignMessageData({ signature: toHex(signature) });
      showNotification('Signature successful', toHex(signature));
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
      showNotification('Chain not available', 'Please select available chain');
      return;
    }

    if (!isReady) {
      showNotification('API error', 'PAPI is not yet ready.');
      return;
    }

    try {
      setIsSendingTransaction(true);
      setDetailedStatus('Preparing transaction...');

      setDetailedStatus('Creating transaction...');
      const result = await sendTransaction(transferForm.to, transferForm.amount);

      setDetailedStatus('Transaction submitted!');
      setTransactionData(result);

      if (result.status === 'success') {
        showNotification('Transfer successful', `TxHash: ${result.transactionHash.slice(0, 10)}...`);
        setTransferForm({ to: '', amount: '' });
      } else {
        showNotification('Transfer failed', result.errorMessage!);
      }
    } catch (error) {
      setDetailedStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      showNotification('Transfer failed', error instanceof Error ? error.message : 'An error occurred during the transfer process.');
    } finally {
      setIsSendingTransaction(false);
    }
  };

  useEffect(() => {
    if (window.Notification?.permission === 'default') {
      window.Notification?.requestPermission();
    }
  }, []);

  return (
    <div className="demo-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-icon">
            <img src="/favicon-96x96.png" alt=""/>
          </div>
          <h1>Luno Wallet Kit with PAPI</h1>
          <p className="hero-subtitle">
            Using Polkadot-API (PAPI) with LunoKit for React applications
          </p>
          <div className="hero-connect">
            <ConnectButton/>
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
                  <div className="button-group">
                    <button className="theme-btn" onClick={() => setThemeChoice('light')}>Light Theme</button>
                    <button className="theme-btn" onClick={() => setThemeChoice('dark')}>Dark Theme</button>
                    <button className="theme-btn" onClick={() => setThemeChoice('auto')}>Auto Mode</button>
                  </div>
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

            {/* PAPI Status Card */}
            <div className="feature-card">
              <div className="card-header">
                <span className="card-icon">🔌</span>
                <h3>PAPI Status</h3>
              </div>
              <div className="card-content">
                <div className="api-status">
                  <div className="status-item">
                    <span className="label">PAPI Ready:</span>
                    <span className={`status ${isReady ? 'connected' : 'disconnected'}`}>
                      {isReady ? '✅ Ready' : '⏳ Loading...'}
                    </span>
                  </div>
                  <div className="status-item">
                    <span className="label">Network:</span>
                    <span className="value">{currentChain?.name || 'None'}</span>
                  </div>
                  {error && (
                    <div className="status-item">
                      <span className="label">Error:</span>
                      <span className="error">{error.message || 'Unknown error'}</span>
                    </div>
                  )}
                </div>
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
                      <span className="chain-indicator"></span>
                    </div>
                    {availableChains && availableChains.length > 1 && (
                      <div className="chain-list">
                        {availableChains
                          .filter(c => c.id !== currentChain.id)
                          .map(chain => (
                            <button
                              key={chain.id}
                              className="chain-switch-btn"
                              onClick={() => switchChain(chain.id)}
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
                      {(loadingBalance || !isReady) ? 'loading...' : balance?.formattedTotal}
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
                        {accounts
                          .filter(acc => acc.publicKey !== account.publicKey)
                          .map(acc => (
                            <button
                              key={acc.publicKey as string}
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
                <h3>Sign Message (PAPI)</h3>
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
                <h3>Send Transaction (PAPI)</h3>
              </div>
              <div className="card-content">
                {status === ConnectionStatus.Connected && isReady ? (
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
                        disabled={!transferForm.to || !transferForm.amount || !isReady || isSendingTransaction}
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
                          <span className="label">Status:</span>
                          <span className="value">{detailedStatus}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="no-data">Connect wallet and wait for PAPI to initialize</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default App;
