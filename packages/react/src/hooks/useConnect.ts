import { useMutation } from '@tanstack/react-query';
import { usePoma } from '../context/PomaProvider';

export interface UseConnectParams {
  /** 连接成功回调 */
  onSuccess?: (data: { address: string; chainId: number }) => void;
  /** 连接失败回调 */
  onError?: (error: Error) => void;
}

/**
 * 连接到钱包的Hook
 * 
 * @example
 * ```tsx
 * import { useConnect } from '@poma/react';
 * 
 * function ConnectButton() {
 *   const { connect, connectors, isConnecting } = useConnect();
 *   
 *   return (
 *     <button 
 *       onClick={() => connect({ connector: connectors[0].id })}
 *       disabled={isConnecting}
 *     >
 *       {isConnecting ? '连接中...' : '连接钱包'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useConnect({ onSuccess, onError }: UseConnectParams = {}) {
  const { connect: connectFn, account, config } = usePoma();
  
  const { mutate: connect, isPending } = useMutation({
    mutationFn: async (params: { connector: string; chainId?: number }) => {
      await connectFn(params);
      
      // 获取连接后的账户信息
      return {
        address: account.account?.address || '',
        chainId: account.account?.chainId || 0,
      };
    },
    onSuccess,
    onError,
  });
  
  return {
    connect,
    connectors: config.connectors.map((connector) => ({
      id: connector.id,
      name: connector.name,
      icon: connector.icon,
    })),
    isConnecting: isPending || account.isConnecting,
  };
} 