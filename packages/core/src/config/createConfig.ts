import type {
  CreateConfigParameters,
  Config,
  Chain,
  Connector,
  Transport,
  RawStorage,
  LunoStorage,
} from '../types';
import {createStorage} from './createStorage'

const noopStorage: RawStorage = {
  getItem: async (_key: string) => null,
  setItem: async (_key: string, _value: string) => {},
  removeItem: async (_key: string) => {},
};

const defaultLunoStorage = createStorage({
  storage: typeof window !== 'undefined' && window.localStorage
    ? window.localStorage
    : noopStorage,
  keyPrefix: 'luno.', // Default key prefix for Luno
});


// 导出配置创建函数
export function createConfig(parameters: CreateConfigParameters): Config {
  const {
    appName = 'My Luno App',
    chains,
    connectors,
    transports,
    storage = defaultLunoStorage, // 使用导入的默认 storage
    autoConnect = true,       // 默认启用 autoConnect
    registry, // 默认值可能是 undefined，如果 ApiOptions 中它们是可选的
    types,
    typesBundle,
    rpc,
  } = parameters;

  if (!chains || chains.length === 0) {
    throw new Error('At least one chain must be provided in the `chains` array.');
  }
  if (!connectors || connectors.length === 0) {
    // 可以考虑允许没有 connector，但通常需要至少一个
    console.warn('No connectors provided. Wallet connection features will be unavailable.');
    // throw new Error('At least one connector must be provided in the `connectors` array.');
  }
  if (!transports || Object.keys(transports).length === 0) {
    throw new Error('Transports must be provided for chains.');
  }

  // 检查是否为 chains 数组中的每个链都提供了 transport
  for (const chain of chains) {
    if (!transports[chain.genesisHash]) {
      throw new Error(`Missing transport for chain "${chain.name}" (genesisHash: ${chain.genesisHash}). Please provide a transport using its genesisHash as the key in the 'transports' object.`);
    }
  }

  // --- 创建最终的 Config 对象 ---
  // 使用 Readonly 和副本确保配置的不可变性
  const config = {
    registry,
    types,
    typesBundle,
    rpc,

    appName,
    chains: Object.freeze([...chains]) as readonly Chain[],
    connectors: Object.freeze([...connectors]) as readonly Connector[],
    transports: Object.freeze({ ...transports }) as Readonly<Record<string, Transport>>,
    storage, // 确保最终是 Storage 或 null
    autoConnect,
  };

  // 在严格模式下，Object.freeze 只冻结对象的第一层
  // 对于深层不可变性，需要更复杂的处理或库，但对于配置对象通常足够

  console.log('Luno Core Config created:', config);

  return config;
}
