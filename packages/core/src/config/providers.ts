import { WsProvider } from 'dedot';
import type { Transport } from '../types';

/**
 * create a WebSocket Transport (WsProvider) instance.
 * @param url - WebSocket RPC URL or URL array (for fallback).
 * @returns WsProvider instance.
 */
export function wsProvider(url: Transport): WsProvider {
  return new WsProvider(url as string[]);
}

export type { Transport };
