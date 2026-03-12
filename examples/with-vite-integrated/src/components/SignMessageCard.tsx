import { ConnectionStatus, useChain, useSignMessage, useStatus } from '@luno-kit/react';
import { useEffect } from 'react';
import { showNotification } from '../utils';

export const SignMessageCard = () => {
  const status = useStatus();
  const { chainType } = useChain();
  const { signMessageAsync, data: signMessageData, reset } = useSignMessage();

  useEffect(() => {
    reset();
  }, [chainType]);

  const handleSignMessage = async () => {
    try {
      const { signature } = await signMessageAsync({
        message: 'Hello, welcome to use luno kit. Have a nice day!',
      });
      showNotification('Signature successful', signature);
    } catch (error) {
      showNotification(
        'Signature failed',
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  };

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">✍️</span>
        <h3>Sign Message</h3>
      </div>
      <div className="card-content">
        {status === ConnectionStatus.Connected ? (
          <div className="sign-section">
            <button className="sign-btn" onClick={handleSignMessage}>
              Sign Test Message
            </button>
            {signMessageData && (
              <div className="sign-result">
                <div className="result-item">
                  <span className="label">Signature:</span>
                  <span className="value">
                    {signMessageData.signature.slice(0, 20)}...
                  </span>
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
