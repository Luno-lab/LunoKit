/**
 * 链配置接口
 * 为波卡生态系统定制的链信息
 */
export interface Chain {
  /** 链的唯一ID，通常是平行链ID，主网为0 */
  id: number;
  
  /** 链名称 */
  name: string;
  
  /** 链标识符/网络名称 */
  network: string;
  
  /** 链的默认SS58格式 */
  ss58Format: number;
  
  /** 链的原生代币 */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  
  /** RPC 端点 */
  rpcUrls: {
    default: string;  // 主要WebSocket端点
    http?: string;    // 可选HTTP端点
    alternative?: string[];  // 备用端点
  };
  
  /** 区块浏览器 */
  blockExplorers?: {
    default: {
      name: string;  // 通常是 "Subscan"
      url: string;   // 如 "https://polkadot.subscan.io"
    };
    [key: string]: {
      name: string;
      url: string;
    };
  };
  
  /** 测试网标识 */
  testnet?: boolean;
  
  /** 链特定的配置参数 */
  meta?: Record<string, any>;
}

/**
 * 预定义的链配置
 */
export const chains = {
  /**
   * Polkadot主网
   */
  polkadot: {
    id: 0,
    name: 'Polkadot',
    network: 'polkadot',
    ss58Format: 0,
    nativeCurrency: {
      name: 'Polkadot',
      symbol: 'DOT',
      decimals: 10,
    },
    rpcUrls: {
      default: 'wss://rpc.polkadot.io',
      http: 'https://rpc.polkadot.io',
      alternative: [
        'wss://polkadot.api.onfinality.io/public-ws',
        'wss://polkadot-rpc.dwellir.com'
      ]
    },
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://polkadot.subscan.io',
      },
      polkascan: {
        name: 'Polkascan',
        url: 'https://polkascan.io/polkadot',
      },
    },
  },
  
  /**
   * Kusama主网
   */
  kusama: {
    id: 0,
    name: 'Kusama',
    network: 'kusama',
    ss58Format: 2,
    nativeCurrency: {
      name: 'Kusama',
      symbol: 'KSM',
      decimals: 12,
    },
    rpcUrls: {
      default: 'wss://kusama-rpc.polkadot.io',
      http: 'https://kusama-rpc.polkadot.io',
      alternative: [
        'wss://kusama.api.onfinality.io/public-ws',
        'wss://kusama-rpc.dwellir.com'
      ]
    },
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://kusama.subscan.io',
      },
    },
  },
  
  /**
   * Westend测试网
   */
  westend: {
    id: 0,
    name: 'Westend',
    network: 'westend',
    ss58Format: 42,
    nativeCurrency: {
      name: 'Westend',
      symbol: 'WND',
      decimals: 12,
    },
    rpcUrls: {
      default: 'wss://westend-rpc.polkadot.io',
      http: 'https://westend-rpc.polkadot.io',
    },
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://westend.subscan.io',
      },
    },
    testnet: true,
  },
  
  /**
   * Rococo测试网
   */
  rococo: {
    id: 0,
    name: 'Rococo',
    network: 'rococo',
    ss58Format: 42,
    nativeCurrency: {
      name: 'Rococo',
      symbol: 'ROC',
      decimals: 12,
    },
    rpcUrls: {
      default: 'wss://rococo-rpc.polkadot.io',
      http: 'https://rococo-rpc.polkadot.io',
    },
    blockExplorers: {
      default: {
        name: 'Subscan',
        url: 'https://rococo.subscan.io',
      },
    },
    testnet: true,
  }
} as const satisfies Record<string, Chain>;

/**
 * 按名称获取预定义链
 * @param name 链名称
 * @returns 链配置
 */
export function getChain(name: keyof typeof chains): Chain {
  return chains[name];
}
