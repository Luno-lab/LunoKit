import { InjectConnector, InjectConnectorOptions } from './inject';
import { mimirWallet } from '../config/logos/generated'

export class MimirConnector extends InjectConnector {
  private mimirReady: boolean = false;

  constructor(options: InjectConnectorOptions) {
    super({ ...options });

    this.mimirInject()
  }

  public isInstalled(): boolean {
    return this.mimirReady
  }

  private async mimirInject() {
    try {
      const inIframe = typeof window !== 'undefined' && window !== window.parent;
      if (!inIframe) return

      const { isMimirReady, MIMIR_REGEXP, inject } = await import('@mimirdev/apps-inject');

      const origin = await isMimirReady();

      if (origin && MIMIR_REGEXP.test(origin)) {
        inject();
        this.mimirReady = true
      }
    } catch (e: any) {
      console.error('Failed to inject Mimir:', e);
    }
  }

  public async connect(appName: string) {
    if (!this.mimirReady) {
      const { MIMIR_REGEXP } = await import('@mimirdev/apps-inject');

      if (!window.origin || !MIMIR_REGEXP.test(window.origin)) {
        window.open(`https://app.mimir.global/explorer/${encodeURIComponent(window.origin)}`)
        return
      }
    }

    return super.connect(appName);
  }
}

export function mimirConnector(): MimirConnector {
  return new MimirConnector({
    id: 'mimir',
    name: 'Mimir',
    icon: mimirWallet,
    links: {
      browserExtension: 'https://mimir.global',
    },
  });
}
