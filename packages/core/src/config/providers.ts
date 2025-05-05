import { WsProvider, HttpProvider } from '@polkadot/api'; // 导入 Provider 类
import type { Transport } from '../types'; // 导入 Transport 类型别名

/**
 * 创建 WebSocket Transport (WsProvider) 实例。
 * @param url - WebSocket RPC URL 或 URL 数组 (用于 fallback)。
 * @param autoConnectMs - 自动重连间隔 (毫秒)，0 或 false 表示禁用。默认为 1000ms。
 * @returns WsProvider 实例。
 */
export function wsProvider(
  url: string | string[],
  autoConnectMs: number | false = 1000 // 默认 1 秒重连
): WsProvider {
  // @polkadot/api 的 WsProvider 构造函数第三个参数是 autoConnectMs
  return new WsProvider(url, autoConnectMs ? autoConnectMs : false);
}

/**
 * 创建 HTTP Transport (HttpProvider) 实例。 (如果需要支持 HTTP)
 * @param url - HTTP RPC URL。
 * @returns HttpProvider 实例。
 */
export function httpProvider(url: string): HttpProvider {
  return new HttpProvider(url);
}

// 导出函数
export type { Transport }; // 也可在此导出类型别名
