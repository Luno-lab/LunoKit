// packages/react/src/hooks/useSs58Format.ts
import { useMemo } from 'react';
import { useLuno } from './useLuno';
import { isNumber } from '@polkadot/util'; // 导入 isNumber 工具

// 定义一个默认值，或者从配置/常量导入
const DEFAULT_SS58_FORMAT = 42; // Default Substrate format

export interface UseSs58FormatResult {
  data?: number;
  isLoading: boolean;
}

export const useSs58Format = (): UseSs58FormatResult => {
  const { currentApi, isApiReady } = useLuno();

  return useMemo(() => {
    if (currentApi && isApiReady) {
      let ss58: number | undefined = undefined;
      try {
        const format = currentApi.registry.chainSS58;
        // 使用 isNumber 检查并提供默认值，更健壮
        ss58 = isNumber(format) ? format : DEFAULT_SS58_FORMAT;
      } catch (e) {
        console.error("[useSs58Format] Error fetching chainSS58:", e);
        ss58 = DEFAULT_SS58_FORMAT; // 出错时也使用默认值
      }
      // API 就绪且计算完成，isLoading 为 false
      return { data: ss58, isLoading: false };
    } else {
      // API 未就绪，isLoading 为 true
      return { data: undefined, isLoading: true };
    }
  }, [currentApi, isApiReady]); // 依赖 API 实例和就绪状态
};
