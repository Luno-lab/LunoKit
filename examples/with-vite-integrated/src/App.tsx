import { useChain } from '@luno-kit/react';
import { ConnectButton } from '@luno-kit/ui';
import type React from 'react';
import { useEffect } from 'react';
import './App.css';
import { AccountCard } from './components/AccountCard';
import { ApiStatusCard } from './components/ApiStatusCard';
import { BalanceCard } from './components/BalanceCard';
import { ChainManagementCard } from './components/ChainManagementCard';
import { SendTransactionCard } from './components/SendTransactionCard';
import { SendTransactionInBlockCard } from './components/SendTransactionInBlockCard';
import { SignMessageCard } from './components/SignMessageCard';
import { ThemeControlCard } from './components/ThemeControlCard';
import { WalletStatusCard } from './components/WalletStatusCard';

const App: React.FC = () => {
  const { chainType } = useChain();
  const isSubstrate = chainType === 'substrate';

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
            <img src="/favicon-96x96.png" alt="" />
          </div>
          <h1>Luno Wallet Kit</h1>
          <p className="hero-subtitle">
            The modern wallet connection library for Substrate & EVM — built for React
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
            <ThemeControlCard />
            <WalletStatusCard />
            <ChainManagementCard />
            <BalanceCard />
            <AccountCard />
            <SignMessageCard />
            <SendTransactionCard />
            {isSubstrate && <SendTransactionInBlockCard />}
            {isSubstrate && <ApiStatusCard />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
