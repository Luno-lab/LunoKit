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

export const SendTransactionCard = () => {
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

  const isSubstrate = chainType === 'substrate';

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

    try {
      const decimals = currentChain.nativeCurrency.decimals || 12;
      const amount = BigInt(parseFloat(transferForm.amount) * 10 ** decimals);

      if (isSubstrate) {
        if (!client || !isApiReady) {
          showNotification('API error', 'Polkadot API is not yet ready.');
          return;
        }

        const api = client as SubstrateClient;
        await estimate({ extrinsic: api.tx.balances.transferKeepAlive(transferForm.to, amount) });

        const result = await sendTransactionAsync({
          extrinsic: api.tx.balances.transferKeepAlive(transferForm.to, amount),
        });

        if (result.status === 'success') {
          showNotification('Transfer successful', `TxHash: ${result.hash.slice(0, 10)}...`);
          setTransferForm({ to: '', amount: '' });
        } else {
          showNotification('Transfer failed', result.errorMessage);
        }
      } else {
        const result = await sendTransactionAsync({
          to: transferForm.to as `0x${string}`,
          value: amount,
        });

        if (result.status === 'success') {
          showNotification('Transfer successful', `TxHash: ${result.hash.slice(0, 10)}...`);
          setTransferForm({ to: '', amount: '' });
        } else {
          showNotification('Transfer failed', result.errorMessage);
        }
      }
    } catch (error) {
      showNotification(
        'Transfer failed',
        error instanceof Error ? error.message : 'An error occurred during the transfer process.',
      );
    }
  };

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">💸</span>
        <h3>Send Transaction{isSubstrate ? ' (finalized)' : ''}</h3>
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
              {isSubstrate && (
                <div className="form-group">
                  <label className="form-label">
                    Estimate Gas: {paymentInfo?.partialFeeFormatted || 0}{' '}
                    {currentChain?.nativeCurrency.symbol}
                  </label>
                </div>
              )}
              <button
                className="transfer-btn"
                onClick={handleSendTransaction}
                disabled={
                  !transferForm.to ||
                  !transferForm.amount ||
                  (isSubstrate && !isApiReady) ||
                  isSendingTransaction ||
                  (isSubstrate && isEstimating)
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
