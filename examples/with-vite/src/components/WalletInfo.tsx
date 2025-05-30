import {
  ConnectionStatus,
  useAccount,
  useAccounts, useApi,
  useBalance, useBlockNumber,
  useChain,
  useChains,
  useConnect,
  useDisconnect, useGenesisHash, useRuntimeVersion, useSendTransaction, useSignMessage, useSs58Format,
  useStatus, useSwitchChain
} from '@luno-kit/react'
import React from 'react'

export function WalletInfo() {
  const status = useStatus();
  const { account, address } = useAccount();
  const { accounts, selectAccount } = useAccounts();
  const { connect, connectors: availableConnectors, activeConnector, isPending: isConnecting } = useConnect();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { chain: currentChain } = useChain();
  const chains = useChains()
  const { data: balance } = useBalance({address})
  const { switchChain } = useSwitchChain()
  const { data: runtimeVersion} = useRuntimeVersion()
  const { data: ss58Format } = useSs58Format()
  const { data: blockNumber } = useBlockNumber()
  const { data: genesisHash} = useGenesisHash()
  const { signMessage, data: signMessageData } = useSignMessage()
  const { api, isApiReady } = useApi()

  const { sendTransactionAsync, data: transactionData } = useSendTransaction()

  const handleConnect = (connectorId: string) => {
    connect(connectorId);
  };

  return (
    <div>
      <h2>Wallet Status</h2>
      <p>Status: {status}</p>
      {activeConnector && <p>Connected with: {activeConnector.name} (ID: {activeConnector.id})</p>}
      {chains && chains.length > 0 && (
        <div>
          <h3>Switch Chains:</h3>
          {chains.map(chain => (
            <li key={chain.genesisHash}>
              {chain.name}
              {chain.genesisHash !== currentChain.genesisHash && (
                <button onClick={() => switchChain(chain.genesisHash)} style={{marginLeft: '10px'}}>
                  Select
                </button>
              )}
              {chain.genesisHash === currentChain.genesisHash && (
                <div style={{ display: 'flex' }}>
                  <strong style={{marginLeft: '10px'}}>(Selected)</strong>
                  (runtime: {runtimeVersion?.specVersion.toHuman()})
                  (ss58Format: {ss58Format || 44})
                  (currentBlockNumber: {blockNumber})
                  (genesisHash: {genesisHash})
                </div>
              )}
            </li>
          ))}
        </div>
      )}
      {currentChain && <p>Current Chain: {currentChain.name} (ID: {currentChain.genesisHash}, SS58: {currentChain.ss58Format})</p>}

      {status === ConnectionStatus.Disconnected && (
        <div>
          <h3>Connect Wallet:</h3>
          {availableConnectors.map(connector => (
            <button
              key={connector.id}
              onClick={() => handleConnect(connector.id)}
              disabled={isConnecting}
            >
              {isConnecting ? `Connecting to ${connector.name}...` : `Connect ${connector.name}`}
            </button>
          ))}
        </div>
      )}

      {status === ConnectionStatus.Connected && (
        <div>
          <h3>Account Info:</h3>
          {account ? (
            <>
              <p>Selected Account Name: {account.name || 'N/A'}</p>
              <p>Selected Account Address: {address}</p>
              <p>Selected Account PublicKey: {account.publicKey}</p>
            </>
          ) : (
            <p>No account selected.</p>
          )}

          <h4>Available Accounts (on {activeConnector?.name}):</h4>
          {accounts.length > 0 ? (
            <ul>
              {accounts.map(acc => (
                <li key={acc.address}>
                  {acc.name || 'Unnamed Account'} - {acc.address}
                  {account?.publicKey !== acc.publicKey && (
                    <button onClick={() => selectAccount(acc.publicKey)} style={{marginLeft: '10px'}}>
                      Select
                    </button>
                  )}
                  {account?.publicKey === acc.publicKey && (
                    <span>
                      <strong style={{marginLeft: '10px'}}>(Selected)</strong>
                      <strong style={{marginLeft: '10px'}}>Balance: {balance?.formattedTotal || 0} {currentChain?.nativeCurrency.symbol}</strong>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No accounts found for the current connector.</p>
          )}

          <button onClick={() => disconnect()} disabled={isDisconnecting}>
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>


          <div>
            <h3>Sign Message</h3>
            <button onClick={() => {
              signMessage({
                message: 'Hello, welcome to use luno kit. Have a nice day!',
              })
            }}>SignMessage
            </button>
            {signMessageData && (
              <div>
                <div><strong>signature:</strong> {signMessageData?.signature}</div>
                <div><strong>rawMessage:</strong> {signMessageData?.rawMessage}</div>
                <div><strong>addressUsed:</strong> {signMessageData?.addressUsed}</div>
              </div>
            )}
          </div>

          {isApiReady && api && (
            <div>
              <h3>Send Transaction</h3>
              <button onClick={async () => {
                console.log('api', api?.tx.balances)
                const transaction = await sendTransactionAsync({
                  extrinsic: api.tx.balances.transferKeepAlive('5RpQfZBVNfYDjs1RgxxEm2Wg26DZeeJqb73vj1ABLGm4LMbS', 10000000)
                })

                console.log('transaction', transaction)
              }}>Transfer
              </button>
              {transactionData && (
                <div>
                  <div><strong>status:</strong> {transactionData.status}</div>
                  {/*<div><strong>rawStatus:</strong> {transactionData.rawStatus}</div>*/}
                  <div><strong>transactionHash:</strong> {transactionData.transactionHash}</div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
