import {
  ConnectionStatus,
  useChain,
  useClient,
  useExtrinsicPaymentInfo,
  useSendTransaction,
  useStatus,
  type SubstrateClient,
} from '@luno-kit/react';
import { useEffect, useState } from 'react';
import { showNotification } from '../utils';

export const SendTransactionInBlockCard = () => {
  const status = useStatus();
  const { chain: currentChain, chainType } = useChain();
  const { client, isReady: isApiReady } = useClient();
  const {
    sendTransactionAsync,
    data: sendTransactionData,
    isPending: isSendingTransaction,
    detailedStatus,
    reset,
  } = useSendTransaction();
  const { data: paymentInfo, estimate, isPending: isEstimating } = useExtrinsicPaymentInfo();

  const [transferForm, setTransferForm] = useState({ to: '', amount: '' });

  useEffect(() => {
    reset();
    setTransferForm({ to: '', amount: '' });
  }, [chainType]);

  const handleSendTransaction = async () => {
    if (!transferForm.to || !transferForm.amount) {
      showNotification('Not available args', 'Please provide complete transfer details.');
      return;
    }

    if (!currentChain) {
      showNotification('Chain not available', 'Please select available chain');
      return;
    }

    if (!client || !isApiReady) {
      showNotification('API error', 'Polkadot API is not yet ready.');
      return;
    }

    try {
      const api = client as SubstrateClient;
      const decimals = currentChain.nativeCurrency.decimals || 12;
      const amountInPlanck = BigInt(parseFloat(transferForm.amount) * 10 ** decimals);

      await estimate({
        extrinsic: api.tx.balances.transferKeepAlive(transferForm.to, amountInPlanck),
      });

      const result = await sendTransactionAsync({
        extrinsic: api.tx.balances.transferKeepAlive(transferForm.to, amountInPlanck),
        waitFor: 'inBlock',
      });

      if (result.status === 'success') {
        showNotification('Transfer (inBlock) successful', `TxHash: ${result.hash.slice(0, 10)}...`);
        setTransferForm({ to: '', amount: '' });
      } else {
        showNotification('Transfer (inBlock) failed', result.errorMessage);
      }
    } catch (error) {
      showNotification(
        'Transfer (inBlock) failed',
        error instanceof Error ? error.message : 'An error occurred during the transfer process.',
      );
    }
  };

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">⛓️</span>
        <h3>Send Transaction (wait for inBlock)</h3>
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
                  onChange={(e) => setTransferForm((prev) => ({ ...prev, to: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Amount ({currentChain?.nativeCurrency.symbol}):
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="1.0"
                  value={transferForm.amount}
                  onChange={(e) => setTransferForm((prev) => ({ ...prev, amount: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Estimate Gas: {paymentInfo?.partialFeeFormatted || 0}{' '}
                  {currentChain?.nativeCurrency.symbol}
                </label>
              </div>
              <button
                className="transfer-btn"
                onClick={handleSendTransaction}
                disabled={
                  !transferForm.to || !transferForm.amount || !isApiReady || isSendingTransaction || isEstimating
                }
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
                  <span className="value">{sendTransactionData.hash.slice(0, 20)}...</span>
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
  );
};
