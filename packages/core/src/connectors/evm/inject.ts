import { EvmConnector, type EvmConnectorOptions } from './connector';
import { isProviderInstalled } from './eip6963';

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
    if (typeof window === 'undefined') return false;
    if (this.rdns) return isProviderInstalled(this.rdns);
    return !!window.ethereum;
  }

  public async isAvailable(): Promise<boolean> {
    return this.isInstalled();
  }
}
