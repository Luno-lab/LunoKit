import { useState, useEffect, useMemo } from 'react';
import { getInstalledWalletsInfo } from '../utils/wallet';
import { type Connector } from '../types';
import { polkadotjs, subwallet, talisman, injected } from '../connectors';
import { walletConnect } from '../connectors';

interface WalletInfo {
  id: string;
  name: string;
  icon?: string;
  installed: boolean;
  connector: Connector;
}

interface UseWalletListOptions {
  /** 
   * 项目ID（用于 WalletConnect）
   * 如果不提供，则不会包含 WalletConnect
   */
  projectId?: string;
  /** 
   * 应用名称
   * 连接钱包时显示的应用名称
   */
  appName?: string;
  /** 
   * 是否仅显示已安装的钱包
   * 默认为 false，显示所有支持的钱包
   */
  onlyInstalled?: boolean;
}

/**
 * 获取可用钱包列表
 * 
 * @param options 选项
 * @returns 钱包列表和相关方法
 * 
 * @example
 * ```tsx
 * function WalletSelector() {
 *   const { wallets, isLoading, error } = useWalletList({
 *     projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
 *     appName: 'My App'
 *   });
 * 
 *   if (isLoading) return <div>加载中...</div>;
 *   if (error) return <div>加载钱包列表失败: {error.message}</div>;
 * 
 *   return (
 *     <div>
 *       <h2>选择钱包</h2>
 *       <div className="wallet-list">
 *         {wallets.map(wallet => (
 *           <button 
 *             key={wallet.id}
 *             onClick={() => {
 *               // 使用wallet.connector连接
 *             }}
 *           >
 *             {wallet.icon && <img src={wallet.icon} alt={wallet.name} />}
 *             <span>{wallet.name}</span>
 *             {!wallet.installed && <span>(未安装)</span>}
 *           </button>
 *         ))}
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */
export function useWalletList({ 
  projectId,
  appName = 'POMA App',
  onlyInstalled = false 
}: UseWalletListOptions = {}) {
  const [installedWallets, setInstalledWallets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 获取已安装的钱包
  useEffect(() => {
    try {
      const walletInfo = getInstalledWalletsInfo();
      setInstalledWallets(walletInfo.map(w => w.id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('获取钱包列表失败'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 构建所有支持的钱包列表
  const supportedWallets: WalletInfo[] = useMemo(() => {
    const wallets: WalletInfo[] = [
      {
        id: 'polkadot-js',
        name: 'Polkadot.js',
        icon: 'https://polkadot.js.org/docs/img/favicon.ico',
        installed: installedWallets.includes('polkadot-js'),
        connector: polkadotjs({ appName })
      },
      {
        id: 'subwallet-js',
        name: 'SubWallet',
        icon: 'https://subwallet.app/favicon.ico',
        installed: installedWallets.includes('subwallet-js'),
        connector: subwallet({ appName })
      },
      {
        id: 'talisman',
        name: 'Talisman',
        icon: 'https://talisman.xyz/favicon.ico',
        installed: installedWallets.includes('talisman'),
        connector: talisman({ appName })
      },
      {
        id: 'injected',
        name: '其他扩展钱包',
        installed: installedWallets.length > 0,
        connector: injected({ appName })
      }
    ];

    // 如果提供了projectId，则添加WalletConnect
    if (projectId) {
      wallets.push({
        id: 'walletconnect',
        name: 'WalletConnect',
        icon: 'https://walletconnect.com/favicon.ico',
        installed: true, // WalletConnect总是"已安装"，因为它是网站集成的
        connector: walletConnect({ 
          projectId,
          metadata: {
            name: appName,
            description: `${appName} - Polkadot dApp`,
            url: typeof window !== 'undefined' ? window.location.href : '',
            icons: ['https://polkadot.network/assets/img/logo-polkadot.svg']
          }
        })
      });
    }

    return wallets;
  }, [installedWallets, appName, projectId]);

  // 过滤出用户可见的钱包列表
  const wallets = useMemo(() => {
    if (onlyInstalled) {
      return supportedWallets.filter(wallet => wallet.installed);
    }
    return supportedWallets;
  }, [supportedWallets, onlyInstalled]);

  return {
    /** 所有支持的钱包列表 */
    wallets,
    /** 所有已安装的钱包ID */
    installedWallets,
    /** 是否正在加载钱包列表 */
    isLoading,
    /** 加载钱包列表时的错误 */
    error
  };
} 