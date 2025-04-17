import { useMutation } from '@tanstack/react-query';
import { usePoma } from '../context/PomaProvider';

export interface UseDisconnectParams {
  /** 断开连接成功回调 */
  onSuccess?: () => void;
  /** 断开连接失败回调 */
  onError?: (error: Error) => void;
}

/**
 * 断开钱包连接的Hook
 * 
 * @example
 * ```tsx
 * import { useDisconnect } from '@poma/react';
 * 
 * function DisconnectButton() {
 *   const { disconnect, isLoading } = useDisconnect();
 *   
 *   return (
 *     <button onClick={() => disconnect()} disabled={isLoading}>
 *       {isLoading ? '断开中...' : '断开连接'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useDisconnect({ onSuccess, onError }: UseDisconnectParams = {}) {
  const { disconnect: disconnectFn } = usePoma();
  
  const { mutate: disconnect, isPending } = useMutation({
    mutationFn: async () => {
      await disconnectFn();
    },
    onSuccess,
    onError,
  });
  
  return {
    disconnect,
    isLoading: isPending,
  };
} 