// In packages/core/src/types/global.d.ts (or a similar .d.ts file)
import type { InjectedWindow } from '@polkadot/extension-inject/types';

declare global {
  interface Window extends InjectedWindow {
    // 如果 InjectedWindow 已经包含了 injectedWeb3 的完整定义，
    // 那么上面的 extends InjectedWindow 可能就足够了。

    // 如果 InjectedWindow 没有完全覆盖，或者你想更明确地定义，可以这样做：
    // injectedWeb3?: Record<string, {
    //   enable: (originName: string) => Promise<Injected>;
    //   version?: string;
    //   // connect?: (originName: string) => Promise<InjectedExtension>; // 新的连接方式也可能有
    //   // 根据实际注入的结构添加其他属性和方法
    // }>;
  }
}
