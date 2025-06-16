import { WsProvider, HttpProvider } from '@polkadot/api';
import type { Transport } from '../types';

/**
 * create a WebSocket Transport (WsProvider) instance.
 * @param url - WebSocket RPC URL or URL array (for fallback).
 * @param autoConnectMs - auto reconnect interval (milliseconds), 0 or false means disabled. Default is 1000ms.
 * @returns WsProvider instance.
 */
export function wsProvider(
  url: string | string[],
  autoConnectMs: number | false = 1000
): WsProvider {
  // @polkadot/api WsProvider constructor third parameter is autoConnectMs
  return new WsProvider(url, autoConnectMs ? autoConnectMs : false);
}

/**
 * create a HTTP Transport (HttpProvider) instance. (if you need to support HTTP)
 * @param url - HTTP RPC URL.
 * @returns HttpProvider instance.
 */
export function httpProvider(url: string): HttpProvider {
  return new HttpProvider(url);
}

export type { Transport };
