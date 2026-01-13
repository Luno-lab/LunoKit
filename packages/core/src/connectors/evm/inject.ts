import { EvmConnector, type EvmConnectorOptions } from './connector';

interface EIP6963ProviderDetail {
  info: {
    rdns: string;
    uuid: string;
    name: string;
    icon: string;
  };
}

interface EIP6963AnnounceProviderEvent extends CustomEvent {
  detail: EIP6963ProviderDetail;
}

export interface EvmInjectConnectorOptions extends EvmConnectorOptions {
  rdns?: string;
}

export class InjectConnector extends EvmConnector {
  readonly rdns?: string;

  constructor(options: EvmInjectConnectorOptions) {
    super(options);
    this.rdns = options.rdns;
  }

  public isInstalled(): boolean {
    return typeof window !== 'undefined';
  }

  public async isAvailable(): Promise<boolean> {
    if (typeof window === 'undefined') return false;
    if (!this.rdns) return !!window.ethereum;

    return new Promise<boolean>((resolve) => {
      let resolved = false;
      const handler = (event: EIP6963AnnounceProviderEvent) => {
        if (event.detail.info.rdns === this.rdns) {
          window.removeEventListener('eip6963:announceProvider', handler as EventListener);
          resolved = true;
          resolve(true);
        }
      };

      window.addEventListener('eip6963:announceProvider', handler as EventListener);

      window.dispatchEvent(new Event('eip6963:requestProvider'));

      setTimeout(() => {
        window.removeEventListener('eip6963:announceProvider', handler as EventListener);
        if (!resolved) {
          resolve(false);
        }
      }, 1000);
    });
  }
}
