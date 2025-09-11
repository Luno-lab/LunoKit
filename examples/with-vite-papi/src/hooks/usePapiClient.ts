import { useEffect, useState } from 'react';
import { createClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider/web';
import { MultiAddress } from "@polkadot-api/descriptors"
import { useAccount, usePapiSigner } from '@luno-kit/react'
import { type Chain, CHAINS } from '../constants'


export interface PapiClientState {
  client: any;
  isReady: boolean;
  error: Error | null;
  currentChain: Chain | null;
}

export function usePapiClient() {
  const { data: papiSigner } = usePapiSigner()
  const { address } = useAccount()
  const [state, setState] = useState<PapiClientState>({
    client: null,
    isReady: false,
    error: null,
    currentChain: null
  });

  const [balance, setBalance] = useState({ total: '0', formattedTotal: '0' });
  const [loadingBalance, setLoadingBalance] = useState(false)

  const initializeClient = async (chain: Chain) => {
    try {
      if (state.client) {
        state.client.destroy()
      }
      setState(prev => ({ ...prev, isReady: false, currentChain: chain }));


      const client = createClient(getWsProvider(chain.endpoint, (_status) => {
        switch (_status.type) {
          case 0:
            console.info('⚫️ Connecting to ==> ', chain.name);
            break;
          case 1:
            console.info('🟢 Provider connected ==> ', chain.name);

            setState(prev => ({
              ...prev,
              isReady: true,
              error: null,
            }));

            break;
          case 2:
            console.info('🔴 Provider error ==> ', chain.name);
            break;
          case 3:
            console.info('🟠 Provider closed ==> ', chain.name);
            break;
        }
      }))

      setState(prev => ({ ...prev, client }));
    } catch (error) {
      console.error('Failed to initialize PAPI client:', error);
      setState(prev => ({
        ...prev,
        isReady: false,
        error: error instanceof Error ? error : new Error('Unknown error')
      }));
    }
  };

  const switchChain = async (chainId: string) => {
    if (!chainId) return;


    const chain = CHAINS[chainId];
    if (!chain) {
      throw new Error(`Unknown chain: ${chainId}`);
    }

    await initializeClient(chain);
  };

  const fetchBalance = async (address: string, client: any, chain: Chain) => {

    setLoadingBalance(true)
    if (!address || !client) return;

    try {
      const accountInfo = await client.getTypedApi(chain.descriptors).query.System.Account.getValue(address);

      const decimals = chain.nativeCurrency.decimals;
      const total = BigInt(accountInfo.data.free) - BigInt(accountInfo.data.frozen || 0);
      const formattedTotal = (Number(total) / Math.pow(10, decimals)).toFixed(4);

      setBalance({
        total: total.toString(),
        formattedTotal
      });
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    } finally {
      setLoadingBalance(false)
    }
  };

  const sendTransaction = async (to: string, amount: string): Promise<{ transactionHash: string; status: string; errorMessage: string | null}> => {
    const { currentChain, client, isReady } = state

    if (!isReady || !currentChain) {
      throw new Error('Client not ready');
    }

    const decimals = currentChain.nativeCurrency.decimals;
    const amountInPlanck = BigInt(parseFloat(amount) * Math.pow(10, decimals));

    const tx = client.getTypedApi(currentChain.descriptors).tx.Balances.transfer_keep_alive({
      dest: MultiAddress.Id(to),
      value: amountInPlanck
    });

    return new Promise((resolve, reject) => {
      const subscription = tx.signSubmitAndWatch(papiSigner).subscribe({
        next: (event: any) => {
          console.log("Tx event: ", event.type);
          if (event.type === "txBestBlocksState") {
            subscription.unsubscribe();
            resolve({
              status: 'success',
              transactionHash: event.txHash,
              errorMessage: null
            });
          }
        },
        error: (error: any) => {
          subscription.unsubscribe();
          reject(error);
        }
      });
    });
  };

  useEffect(() => {
    initializeClient(CHAINS.polkadot);
  }, []);

  useEffect(() => {
    if (address && state.isReady && state.currentChain) {
      fetchBalance(address, state.client, state.currentChain);
    }
  }, [address, state.client, state.isReady, state.currentChain]);

  return {
    ...state,
    balance,
    availableChains: Object.values(CHAINS),
    switchChain,
    loadingBalance,
    refreshBalance: () => {
      if (address && state.client && state.currentChain) {
        fetchBalance(address, state.client, state.currentChain);
      }
    },
    sendTransaction
  };
}
