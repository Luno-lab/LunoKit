import { useState, useCallback } from 'react';
import type { Connector, PolkadotAccount } from '../types';

interface UseAccountsOptions {
  /** 连接器实例 */
  connector: Connector;
  /** 默认SS58格式 */
  defaultSS58Format?: number;
}

/**
 * 管理波卡账户和SS58格式的Hook
 * 
 * @param options Hook配置选项
 * @returns 账户相关状态和方法
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { accounts, connect, disconnect, isConnecting, error, formatAccounts } = useAccounts({
 *     connector: polkadotjs({ appName: 'My App' })
 *   });
 * 
 *   // 更改SS58格式
 *   const handleChangeFormat = (newFormat) => {
 *     setAccounts(formatAccounts(accounts, newFormat));
 *   };
 * 
 *   return (
 *     <div>
 *       {!accounts.length ? (
 *         <button onClick={connect} disabled={isConnecting}>
 *           {isConnecting ? '连接中...' : '连接钱包'}
 *         </button>
 *       ) : (
 *         <button onClick={disconnect}>断开连接</button>
 *       )}
 *       
 *       {error && <div className="error">{error.message}</div>}
 *       
 *       <select onChange={(e) => handleChangeFormat(Number(e.target.value))}>
 *         <option value="0">Polkadot (0)</option>
 *         <option value="2">Kusama (2)</option>
 *         <option value="42">通用 Substrate (42)</option>
 *       </select>
 *       
 *       <ul>
 *         {accounts.map(account => (
 *           <li key={account.publicKey || account.address}>
 *             {account.name}: {account.address}
 *           </li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * ```
 */
export function useAccounts({ connector, defaultSS58Format = 42 }: UseAccountsOptions) {
  const [accounts, setAccounts] = useState<Array<PolkadotAccount>>([]);
  const [currentSS58Format, setCurrentSS58Format] = useState<number>(defaultSS58Format);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * 连接到钱包并获取账户
   */
  const connect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const newAccounts = await connector.connect();
      
      // 根据当前格式转换账户
      if (currentSS58Format !== 42) { // Polkadot.js默认格式为42
        setAccounts(connector.formatAccounts(newAccounts, currentSS58Format));
      } else {
        setAccounts(newAccounts);
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsConnecting(false);
    }
  }, [connector, currentSS58Format]);

  /**
   * 断开连接
   */
  const disconnect = useCallback(() => {
    setAccounts([]);
  }, []);

  /**
   * 格式化账户并更新状态
   */
  const formatAndUpdateAccounts = useCallback((newFormat: number) => {
    if (accounts.length === 0) return;
    
    setCurrentSS58Format(newFormat);
    setAccounts(connector.formatAccounts(accounts, newFormat));
  }, [accounts, connector]);

  return {
    /** 当前账户列表 */
    accounts,
    /** 手动设置账户列表 */
    setAccounts,
    /** 连接钱包 */
    connect,
    /** 断开连接 */
    disconnect,
    /** 当前SS58格式 */
    currentSS58Format,
    /** 设置新的SS58格式并更新账户 */
    setSS58Format: formatAndUpdateAccounts,
    /** 连接中状态 */
    isConnecting,
    /** 错误信息 */
    error,
    /** 原始格式化方法，用于手动格式化 */
    formatAccounts: connector.formatAccounts.bind(connector)
  };
} 