import { useEffect, useState } from 'react';
import { createClient } from 'polkadot-api';
import { getWsProvider } from 'polkadot-api/ws-provider/web';
import { dot, ksm, MultiAddress, paseo, wnd } from "@polkadot-api/descriptors"
import { useAccount, usePapiSigner } from '@luno-kit/react'

export interface Chain {
  name: string;
  id: string;
  genesisHash: string;
  endpoint: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  descriptors: any;
}

export const CHAINS: Record<string, Chain> = {
  polkadot: {
    name: 'Polkadot',
    id: 'polkadot',
    genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
    endpoint: 'wss://polkadot-rpc.dwellir.com',
    nativeCurrency: {
      name: 'DOT',
      symbol: 'DOT',
      decimals: 10
    },
    descriptors: dot,
  },
  kusama: {
    name: 'Kusama',
    id: 'kusama',
    genesisHash: '0xb0a8d493285c2df73290dfb7e61f870f17b41801197a149ca93654499ea3dafe',
    endpoint: 'wss://kusama-rpc.dwellir.com',
    nativeCurrency: {
      name: 'KSM',
      symbol: 'KSM',
      decimals: 12
    },
    descriptors: ksm
  },
  paseo: {
    name: 'Paseo',
    id: 'paseo',
    genesisHash: '0x77afd6190f1554ad45fd0d31aee62aacc33c6db0ea801129acb813f913e0764f',
    endpoint: 'wss://paseo.rpc.amforc.com',
    nativeCurrency: { name: 'Paseo', symbol: 'PAS', decimals: 10 },
    descriptors: paseo,
  },
  westend: {
    name: 'Westend',
    id: 'westend',
    genesisHash: '0xe143f23803ac50e8f6f8e62695d1ce9e4e1d68aa36c1cd2cfd15340213f3423e',
    endpoint: 'wss://westend-rpc.polkadot.io',
    nativeCurrency: { name: 'Westend', symbol: 'WND', decimals: 12 },
    descriptors: wnd,
  },
};

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

  useEffect(() => {
    initializeClient(CHAINS.paseo);
  }, []);

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

  useEffect(() => {
    if (address && state.isReady && state.currentChain) {
      fetchBalance(address, state.client, state.currentChain);
    }
  }, [address, state.client, state.isReady, state.currentChain]);

  const sendTransaction = async (to: string, amount: string) => {
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
    console.log('tx', {
      dest: MultiAddress.Id(to),
      value: amountInPlanck
    })

    return new Promise((resolve, reject) => {
      const subscription = tx.signSubmitAndWatch(papiSigner).subscribe({
        next: (event) => {
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
        error: (error) => {
          subscription.unsubscribe();
          reject(error);
        }
      });
    });
  };

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
