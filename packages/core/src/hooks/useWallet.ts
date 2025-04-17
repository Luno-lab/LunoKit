import { useState, useCallback } from 'react';
import type { Connector, PolkadotAccount, Chain } from '../types';
import { useAccounts } from './useAccounts';

interface UseWalletOptions {
  /** 连接器实例 */
  connector: Connector;
  /** 支持的链列表 */
  chains: Chain[];
  /** 默认SS58格式 */
  defaultSS58Format?: number;
  /** 默认链ID */
  defaultChainId?: number;
}

/**
 * 完整的钱包Hook，管理波卡账户、链和SS58格式
 * 
 * @param options Hook配置选项
 * @returns 钱包相关状态和方法
 * 
 * @example
 * ```tsx
 * function WalletComponent() {
 *   const {
 *     accounts,
 *     currentAccount,
 *     connect,
 *     disconnect,
 *     isConnecting,
 *     error,
 *     currentChain,
 *     setCurrentChain,
 *     currentSS58Format,
 *     setSS58Format,
 *     chains
 *   } = useWallet({
 *     connector: polkadotjs({ appName: 'My App' }),
 *     chains: supportedChains,
 *     defaultSS58Format: 0, // Polkadot
 *     defaultChainId: 0
 *   });
 * 
 *   return (
 *     <div>
 *       {!accounts.length ? (
 *         <button onClick={connect} disabled={isConnecting}>
 *           {isConnecting ? '连接中...' : '连接钱包'}
 *         </button>
 *       ) : (
 *         <div>
 *           <p>当前账户: {currentAccount?.name || currentAccount?.address}</p>
 *           <p>当前链: {currentChain?.name}</p>
 *           
 *           <select 
 *             value={currentSS58Format} 
 *             onChange={(e) => setSS58Format(Number(e.target.value))}
 *           >
 *             <option value="0">Polkadot (0)</option>
 *             <option value="2">Kusama (2)</option>
 *             <option value="42">通用 Substrate (42)</option>
 *           </select>
 *           
 *           <select 
 *             value={currentChain?.id} 
 *             onChange={(e) => {
 *               const chain = chains.find(c => c.id === Number(e.target.value));
 *               if (chain) setCurrentChain(chain);
 *             }}
 *           >
 *             {chains.map(chain => (
 *               <option key={chain.id} value={chain.id}>
 *                 {chain.name}
 *               </option>
 *             ))}
 *           </select>
 *           
 *           <button onClick={disconnect}>断开连接</button>
 *         </div>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useWallet({
  connector,
  chains,
  defaultSS58Format = 42,
  defaultChainId
}: UseWalletOptions) {
  // 使用账户Hook
  const accountsHook = useAccounts({ connector, defaultSS58Format });
  
  // 默认选择第一个链，或者指定的默认链
  const defaultChain = defaultChainId !== undefined
    ? chains.find(chain => chain.id === defaultChainId) || chains[0]
    : chains[0];
  
  // 当前选择的链
  const [currentChain, setCurrentChain] = useState<Chain | undefined>(defaultChain);
  // 当前选择的账户
  const [currentAccount, setCurrentAccount] = useState<PolkadotAccount | undefined>();
  
  // 连接钱包
  const connect = useCallback(async () => {
    await accountsHook.connect();
    // 连接成功后，设置当前账户为第一个账户
    if (accountsHook.accounts.length > 0) {
      setCurrentAccount(accountsHook.accounts[0]);
    }
  }, [accountsHook]);
  
  // 断开连接
  const disconnect = useCallback(() => {
    accountsHook.disconnect();
    setCurrentAccount(undefined);
  }, [accountsHook]);
  
  // 切换链
  const switchChain = useCallback((chain: Chain) => {
    setCurrentChain(chain);
    // 如果链关联了特定的SS58格式，可以在这里自动切换
    // 例如：Polkadot = 0, Kusama = 2
    const chainFormats: Record<string, number> = {
      'polkadot': 0,
      'kusama': 2,
      'westend': 42
    };
    
    if (chain.network && chainFormats[chain.network.toLowerCase()]) {
      accountsHook.setSS58Format(chainFormats[chain.network.toLowerCase()]);
    }
  }, [accountsHook]);
  
  return {
    // 账户相关
    ...accountsHook,
    currentAccount,
    setCurrentAccount,
    
    // 链相关
    chains,
    currentChain,
    setCurrentChain: switchChain,
    
    // 自定义连接/断开方法
    connect,
    disconnect
  };
} 