import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Config } from '@luno/core';
import { AccountStatus } from '@luno/core';

// 上下文类型
interface ContextValue {
  config: Config;
  account: AccountStatus;
  accounts: Array<{address: string; name?: string; meta?: any}>;
  connect: (params: { connector: string; chainId?: number }) => Promise<void>;
  disconnect: () => Promise<void>;
  switchChain: (chainId: number) => Promise<void>;
  selectAccount: (address: string) => Promise<void>;
  getAccounts: () => Promise<Array<{address: string; name?: string; meta?: any}>>;
}

// 创建上下文
const LunoContext = createContext<ContextValue | undefined>(undefined);

// Provider属性
interface PomaProviderProps {
  config: Config;
  children: React.ReactNode;
}

/**
 * Poma Provider组件
 *
 * @example
 * ```tsx
 * import { createConfig } from '@luno/core';
 * import { LunoProvider } from '@luno/react';
 *
 * const config = createConfig({
 *   // 配置项
 * });
 *
 * function App() {
 *   return (
 *     <LunoProvider config={config}>
 *       <YourApp />
 *     </LunoProvider>
 *   );
 * }
 * ```
 */
export function LunoProvider({ config, children }: PomaProviderProps) {
  // 账户状态
  const [account, setAccount] = useState<AccountStatus>({
    isConnected: false,
    isConnecting: false,
    isDisconnected: true,
  });

  // 所有可用账户
  const [accounts, setAccounts] = useState<Array<{address: string; name?: string; meta?: any}>>([]);

  // 初始化
  useEffect(() => {
    // 从存储中恢复连接状态
    const storedConnector = config.storage.getItem('luno:connector');
    if (storedConnector) {
      const connector = config.connectors.find(c => c.id === storedConnector);
      if (connector) {
        // 自动连接
        (async () => {
          try {
            setAccount(prev => ({ ...prev, isConnecting: true }));

            const chainId = Number(config.storage.getItem('luno:chainId') || '0');
            const result = await connector.connect({ chainId });

            // 获取所有可用账户
            const allAccounts = await connector.getAccounts() || [];
            setAccounts(allAccounts);

            setAccount({
              isConnected: true,
              isConnecting: false,
              isDisconnected: false,
              account: {
                address: result.account,
                chainId: result.chainId,
              },
              connector: connector.id,
            });
          } catch (error) {
            console.error('自动连接失败:', error);
            setAccount({
              isConnected: false,
              isConnecting: false,
              isDisconnected: true,
            });
          }
        })();
      }
    }
  }, [config]);

  // 连接函数
  const connect = async (params: { connector: string; chainId?: number }) => {
    const connector = config.connectors.find(c => c.id === params.connector);
    if (!connector) {
      throw new Error(`找不到连接器: ${params.connector}`);
    }

    try {
      setAccount(prev => ({ ...prev, isConnecting: true }));

      const result = await connector.connect({ chainId: params.chainId });

      // 获取所有可用账户
      const allAccounts = await connector.getAccounts() || [];
      setAccounts(allAccounts);

      // 保存连接状态
      config.storage.setItem('luno:connector', connector.id);
      config.storage.setItem('luno:chainId', String(result.chainId));

      setAccount({
        isConnected: true,
        isConnecting: false,
        isDisconnected: false,
        account: {
          address: result.account,
          chainId: result.chainId,
        },
        connector: connector.id,
      });
    } catch (error) {
      console.error('连接失败:', error);
      setAccount({
        isConnected: false,
        isConnecting: false,
        isDisconnected: true,
      });
      throw error;
    }
  };

  // 断开连接函数
  const disconnect = async () => {
    if (!account.connector) return;

    const connector = config.connectors.find(c => c.id === account.connector);
    if (connector) {
      await connector.disconnect();
    }

    // 清除存储
    config.storage.removeItem('luno:connector');
    config.storage.removeItem('luno:chainId');

    setAccount({
      isConnected: false,
      isConnecting: false,
      isDisconnected: true,
    });

    // 清空账户列表
    setAccounts([]);
  };

  // 切换链函数
  const switchChain = async (chainId: number) => {
    if (!account.connector) {
      throw new Error('未连接钱包');
    }

    const connector = config.connectors.find(c => c.id === account.connector);
    if (!connector) {
      throw new Error(`找不到连接器: ${account.connector}`);
    }

    await connector.switchChain(chainId);

    // 更新账户列表（可能地址格式会变）
    const allAccounts = await connector.getAccounts() || [];
    setAccounts(allAccounts);

    // 更新存储和状态
    config.storage.setItem('luno:chainId', String(chainId));

    // 根据当前选择的账户地址获取新的账户信息
    const currentAccount = await connector.getAccount();

    if (currentAccount) {
      setAccount(prev => ({
        ...prev,
        account: {
          address: currentAccount,
          chainId,
        },
      }));
    }
  };

  // 选择账户函数
  const selectAccount = async (address: string) => {
    if (!account.connector) {
      throw new Error('未连接钱包');
    }

    const connector = config.connectors.find(c => c.id === account.connector);
    if (!connector) {
      throw new Error(`找不到连接器: ${account.connector}`);
    }

    // 检查是否支持选择账户
    if (typeof (connector as any).selectAccount === 'function') {
      await (connector as any).selectAccount(address);

      // 更新当前账户
      const currentAccount = await connector.getAccount();
      if (currentAccount && account.account) {
        setAccount(prev => ({
          ...prev,
          account: {
            address: currentAccount,
            chainId: prev.account!.chainId,
          },
        }));
      }
    } else {
      throw new Error('当前连接器不支持选择账户');
    }
  };

  // 获取所有账户
  const getAccounts = async (): Promise<Array<{address: string; name?: string; meta?: any}>> => {
    if (!account.connector) {
      return [];
    }

    const connector = config.connectors.find(c => c.id === account.connector);
    if (!connector) {
      return [];
    }

    try {
      if (typeof connector.getAccounts === 'function') {
        return await connector.getAccounts() || [];
      }
      return [];
    } catch (error) {
      console.error('获取账户列表失败:', error);
      return [];
    }
  };

  return (
    <PomaContext.Provider
      value={{
        config,
        account,
        accounts,
        connect,
        disconnect,
        switchChain,
        selectAccount,
        getAccounts,
      }}
    >
      {children}
    </PomaContext.Provider>
  );
}

/**
 * 使用Poma上下文
 */
export function usePoma() {
  const context = useContext(PomaContext);
  if (!context) {
    throw new Error('usePoma必须在PomaProvider内部使用');
  }
  return context;
}
