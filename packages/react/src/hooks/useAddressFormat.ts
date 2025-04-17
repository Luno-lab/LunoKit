import { useMemo } from 'react';
import { convertAddress, isValidAddress } from '@poma/core/utils';
import { useConfig } from './useConfig';

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

interface UseAddressFormatOptions {
  // 链ID
  chainId?: number;
  // 自定义的SS58格式
  ss58Format?: number;
  // 自定义的链ID到SS58格式的映射
  chainToSS58Map?: Record<number, number>;
}

/**
 * 使用地址格式化hook
 * 
 * 根据链ID或指定的SS58格式转换地址
 */
export function useAddressFormat(options: UseAddressFormatOptions = {}) {
  const { chains } = useConfig();
  
  // 合并默认映射和自定义映射
  const chainToSS58Map = useMemo(() => {
    return { ...DEFAULT_CHAIN_SS58_FORMATS, ...options.chainToSS58Map };
  }, [options.chainToSS58Map]);
  
  // 获取SS58格式
  const ss58Format = useMemo(() => {
    // 如果直接指定了SS58格式，优先使用
    if (options.ss58Format !== undefined) {
      return options.ss58Format;
    }
    
    // 否则根据链ID获取
    if (options.chainId !== undefined) {
      return chainToSS58Map[options.chainId] ?? SS58_FORMATS.SUBSTRATE;
    }
    
    // 默认使用Substrate格式
    return SS58_FORMATS.SUBSTRATE;
  }, [options.ss58Format, options.chainId, chainToSS58Map]);
  
  // 格式化地址函数
  const formatAddress = useMemo(() => {
    return (address: string): string => {
      if (!isValidAddress(address)) {
        return address;
      }
      
      try {
        return convertAddress(address, ss58Format);
      } catch (error) {
        console.error('地址格式转换失败:', error);
        return address;
      }
    };
  }, [ss58Format]);
  
  // 获取链的SS58格式
  const getChainSS58Format = useMemo(() => {
    return (chainId: number): number => {
      return chainToSS58Map[chainId] ?? SS58_FORMATS.SUBSTRATE;
    };
  }, [chainToSS58Map]);
  
  return {
    formatAddress,
    getChainSS58Format,
    ss58Format,
    SS58_FORMATS,
  };
} 