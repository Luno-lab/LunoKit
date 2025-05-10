import type { FC, PropsWithChildren, useEffect } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import type { BlockHash } from '@polkadot/types/interfaces';
import type { Chain, Config, Account, Connector, Transport } from '@luno/core';
import { PERSIST_KEY } from './constants';
import { useLunoStore, LunoState } from './store';

const handleApiDisconnected = () => {
  if (currentApiInstance) { // 确保是对当前正在处理的实例操作
    console.warn(`[LunoProvider] API disconnected: ${currentApiInstance.runtimeChain?.toString()}`);
    _setApi(undefined);
    _setIsApiReady(false);
  }
};

// Early exit if API is already connected to the target chain and config matches.
// This prevents unnecessary reconnections if props change but API relevant config is the same.
if (currentApi && currentApi.isConnected && currentApi.genesisHash /* && 其他匹配检查 */) {
  const genesisHash = currentApi.genesisHash as BlockHash; // Type assertion for Cursor
  if (genesisHash.toHex() === currentChainId /* && 其他相关配置也匹配当前 configFromProps */) {
    console.log('[LunoProvider] API is already connected to the target chain and ready (or connecting). No action needed.');
    return;
  }
}

// --- 开始时的状态设置与检查 --- 