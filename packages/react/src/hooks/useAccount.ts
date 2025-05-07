import { useQuery } from '@tanstack/react-query';
import { usePoma } from '../context/LunoProvider';
import { formatAccounts, getPublicKey } from '@luno/core/utils/address';
import type { PolkadotAccount } from '@luno/core/types';

// 预设的SS58格式
export const SS58_FORMATS = {
  POLKADOT: 0,
  KUSAMA: 2,
  WESTEND: 5,
  SUBSTRATE: 42,
};

// 链ID到SS58格式的映射
const DEFAULT_CHAIN_SS58_FORMATS: Record<number, number> = {
  0: SS58_FORMATS.POLKADOT,   // Polkadot
  2: SS58_FORMATS.KUSAMA,     // Kusama
  5: SS58_FORMATS.WESTEND,    // Westend
};

export interface UseAccountParams {
  /** 链ID */
  chainId?: number;
  /** SS58格式，如果提供则地址会转换为该格式 */
  ss58Format?: number;
}

/**
 * 使用账户hook，支持根据链ID或SS58格式获取格式化的账户地址
 *
 * @example
 * ```tsx
 * // 获取Polkadot格式的账户 (ss58Format = 0)
 * const { account, accounts } = useAccount({ ss58Format: 0 });
 *
 * // 获取Kusama格式的账户 (ss58Format = 2)
 * const { account, accounts } = useAccount({ ss58Format: 2 });
 *
 * // 根据链ID自动选择格式
 * const { account, accounts } = useAccount({ chainId: 0 }); // Polkadot格式
 * ```
 */
export function useAccount(params?: UseAccountParams) {
  const { account, getAccounts } = usePoma();
  const chainId = params?.chainId;
  const specifiedSS58Format = params?.ss58Format;

  // 根据链ID或指定的格式确定SS58格式
  const ss58Format = specifiedSS58Format ??
    (chainId !== undefined ? DEFAULT_CHAIN_SS58_FORMATS[chainId] || SS58_FORMATS.SUBSTRATE : undefined);

  // 获取多个账户
  const accountsQuery = useQuery({
    queryKey: ['accounts', account.connector, ss58Format],
    queryFn: async () => {
      try {
        // 获取原始账户
        const accounts = await getAccounts();

        // 如果指定了SS58格式，转换所有地址
        if (ss58Format !== undefined && accounts.length > 0) {
          return formatAccounts(accounts, ss58Format);
        }

        return accounts;
      } catch (error) {
        console.error('获取账户列表失败:', error);
        return [];
      }
    },
    enabled: !!account.connector && account.isConnected,
  });

  // 格式化当前账户地址
  let formattedAccount = account.account;
  if (formattedAccount && ss58Format !== undefined && formattedAccount.ss58Format !== ss58Format) {
    try {
      const accounts = formatAccounts([formattedAccount], ss58Format);
      formattedAccount = accounts[0];
    } catch (error) {
      console.error('转换地址格式失败:', error);
    }
  }

  return {
    account: formattedAccount,
    accounts: accountsQuery.data || [],
    isLoading: accountsQuery.isLoading,
    isError: accountsQuery.isError,
    error: accountsQuery.error,
    isConnected: account.isConnected,
    isConnecting: account.isConnecting,
    isDisconnected: account.isDisconnected,

    // 公开常量和辅助函数
    SS58_FORMATS,

    // 用于切换SS58格式的辅助方法
    formatAccounts: (accounts: PolkadotAccount[], format: number) => {
      return formatAccounts(accounts, format);
    },

    // 检查两个地址是否相同（不考虑SS58格式）
    isSameAccount: (address1: string, address2: string) => {
      try {
        const publicKey1 = getPublicKey(address1);
        const publicKey2 = getPublicKey(address2);
        return Array.from(publicKey1).toString() === Array.from(publicKey2).toString();
      } catch (error) {
        return false;
      }
    }
  };
}
