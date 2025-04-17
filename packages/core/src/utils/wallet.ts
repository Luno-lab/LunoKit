import type { InjectedWindow, InjectedExtension } from '@polkadot/extension-inject/types';

/**
 * 获取浏览器中已安装的扩展钱包列表
 * 
 * @returns 已安装的扩展钱包ID列表
 * 
 * @example
 * ```ts
 * const wallets = getInstalledWallets();
 * console.log(wallets); // ['polkadot-js', 'subwallet-js', ...]
 * ```
 */
export function getInstalledWallets(): string[] {
  try {
    // 获取注入的钱包
    const injectedWindow = window as Window & InjectedWindow;
    const injectedWeb3 = injectedWindow.injectedWeb3 || {};
    const wallets = Object.keys(injectedWeb3)
      .filter(key => {
        const wallet = injectedWeb3[key];
        return wallet && (wallet.enable || wallet.connect);
      });
    
    return wallets;
  } catch (error) {
    console.error('获取已安装钱包列表失败:', error);
    return [];
  }
}

/**
 * 检查特定钱包是否已安装
 * 
 * @param walletId 钱包ID
 * @returns 是否已安装
 * 
 * @example
 * ```ts
 * const isPolkadotJsInstalled = isWalletInstalled('polkadot-js');
 * console.log(isPolkadotJsInstalled); // true or false
 * ```
 */
export function isWalletInstalled(walletId: string): boolean {
  const wallets = getInstalledWallets();
  return wallets.includes(walletId);
}

/**
 * 已知钱包的信息映射
 */
export const WALLET_INFO: Record<string, { name: string; icon?: string; website?: string }> = {
  'polkadot-js': {
    name: 'Polkadot.js',
    icon: 'https://polkadot.js.org/docs/img/favicon.ico',
    website: 'https://polkadot.js.org/extension/'
  },
  'subwallet-js': {
    name: 'SubWallet',
    icon: 'https://subwallet.app/favicon.ico',
    website: 'https://subwallet.app/'
  },
  'talisman': {
    name: 'Talisman',
    icon: 'https://talisman.xyz/favicon.ico',
    website: 'https://talisman.xyz/'
  },
  'fearless-wallet': {
    name: 'Fearless Wallet',
    icon: 'https://fearlesswallet.io/favicon.ico',
    website: 'https://fearlesswallet.io/'
  },
  'nova-wallet': {
    name: 'Nova Wallet',
    icon: 'https://novawallet.io/favicon.ico',
    website: 'https://novawallet.io/'
  }
};

/**
 * 获取钱包的详细信息
 * 
 * @param walletId 钱包ID
 * @returns 钱包信息，如果不存在则返回基本信息
 */
export function getWalletInfo(walletId: string) {
  return WALLET_INFO[walletId] || { name: walletId };
}

/**
 * 获取已安装钱包的详细信息列表
 * 
 * @returns 已安装钱包的详细信息
 */
export function getInstalledWalletsInfo() {
  const walletIds = getInstalledWallets();
  return walletIds.map(id => ({
    id,
    ...getWalletInfo(id)
  }));
} 