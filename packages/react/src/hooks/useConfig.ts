import { usePoma } from '../context/PomaProvider';

/**
 * 获取Poma配置
 * 
 * @example
 * ```tsx
 * import { useConfig } from '@poma/react';
 * 
 * function ChainSelector() {
 *   const { chains } = useConfig();
 *   
 *   return (
 *     <select>
 *       {chains.map((chain) => (
 *         <option key={chain.id} value={chain.id}>
 *           {chain.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useConfig() {
  const { config } = usePoma();
  return config;
} 