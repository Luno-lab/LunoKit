/**
 * 链配置接口
 * 为波卡生态系统定制的链信息
 */
export interface Chain {
  /**
   * 链的创世哈希 (Genesis Hash)。
   * 这是区分不同链的最可靠标识符。
   * e.g., '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3' for Polkadot
   */
  genesisHash: string;

  /**
   * 用户友好的链名称 (e.g., 'Polkadot', 'Kusama', 'Astar')
   */
  name: string;

  /**
   * 链的原生代币信息
   */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };

  /**
   * 连接节点的 RPC URL 配置
   */
  rpcUrls: {
    /** 推荐使用的 WebSocket RPC 端点 (可以提供多个作为备选) */
    webSocket?: readonly string[];
    /** 可选的 HTTP RPC 端点 (可以提供多个作为备选) */
    http?: readonly string[];
  };

  /**
   * 该链使用的 SS58 地址格式前缀。
   */
  ss58Format: number;

  /**
   * 区块浏览器配置 (可选)
   */
  blockExplorers?: {
    // 可以定义一个默认的，或允许用户添加多个
    default?: { name: string; url: string };
    [key: string]: { name: string; url: string } | undefined; // 允许其他浏览器
  };

  /**
   * 是否为测试网 (可选)
   */
  testnet?: boolean;

  /** 其他链特定的元数据 (可选) */
  meta?: Record<string, any>;
}
