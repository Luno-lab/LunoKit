import {
  type CreateConnectorFn,
  connect,
  disconnect,
  getChainId,
  getConnection,
  getConnectorClient,
  type SendTransactionParameters,
  sendTransaction,
  signMessage,
  type Config as WagmiConfig,
  type Connector as WagmiConnector,
  watchConnection,
} from '@wagmi/core';
import {
  ChainType,
  type ConnectorLinks,
  type EvmAccount,
  type EvmConnectOptions,
  type EvmSigner,
  type HexString,
} from '../../types';
import { BaseConnector } from '../base';

export interface EvmConnectorOptions {
  id: string;
  name: string;
  icon: string;
  links: ConnectorLinks;
  wagmiFactory: CreateConnectorFn;
}

export abstract class EvmConnector extends BaseConnector<EvmSigner, EvmConnectOptions, EvmAccount> {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly links: ConnectorLinks;

  public readonly wagmiFactory: CreateConnectorFn;

  protected wagmiConnector: WagmiConnector | undefined;
  protected wagmiConfig: WagmiConfig | undefined;

  private unwatch: (() => void) | undefined;

  constructor(options: EvmConnectorOptions) {
    super();
    this.id = options.id;
    this.name = options.name;
    this.icon = options.icon;
    this.links = options.links;
    this.wagmiFactory = options.wagmiFactory;
  }

  public setWagmiConfig(config: WagmiConfig) {
    if (this.wagmiConfig) return;

    this.wagmiConfig = config;
  }

  public setWagmiConnector(connector: WagmiConnector) {
    this.wagmiConnector = connector;
  }

  public abstract isAvailable(): Promise<boolean>;

  public abstract isInstalled(): boolean;

  public async getSigner(): Promise<EvmSigner | undefined> {
    if (!this.wagmiConfig) {
      console.warn(
        `Connector ${this.id}: Signer not available. Connection might be incomplete or failed.`
      );
      return undefined;
    }
    const { address } = getConnection(this.wagmiConfig);
    const chainId = getChainId(this.wagmiConfig);

    const signer = await getConnectorClient(this.wagmiConfig, {
      connector: this.wagmiConnector,
      account: address,
      chainId,
    });
    console.log('signersigner', signer);

    return signer as unknown as EvmSigner;
  }

  async connect(options?: EvmConnectOptions): Promise<EvmAccount[] | undefined> {
    if (!this.wagmiConfig || !this.wagmiConnector) {
      throw new Error(`Connector ${this.name} not initialized. Wagmi config is missing.`);
    }

    try {
      const result = await connect(this.wagmiConfig, {
        connector: this.wagmiConnector,
        chainId: options?.chainId,
      });

      console.log('result', result);
      const accounts: EvmAccount[] = result.accounts.map((address) => ({
        address,
        name: this.name,
        chainType: ChainType.EVM,
        source: this.id,
      }));

      this.accounts = accounts;

      this.emit('connect', accounts);

      this.startWatching();

      return accounts;
    } catch (error) {
      console.error(`Failed to connect to ${this.name}:`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.wagmiConfig || !this.wagmiConnector) return;

    try {
      await disconnect(this.wagmiConfig, {
        connector: this.wagmiConnector,
      });
    } catch (e) {
    } finally {
      this.accounts = [];
      this.stopWatching();
      this.emit('disconnect');
    }
  }

  async signMessage(message: string): Promise<string | undefined> {
    if (!this.wagmiConfig) throw new Error('Not initialized');
    const { address } = getConnection(this.wagmiConfig);

    return signMessage(this.wagmiConfig, {
      account: address,
      message,
      connector: this.wagmiConnector,
    });
  }

  private startWatching() {
    if (this.unwatch || !this.wagmiConfig) return;

    this.unwatch = watchConnection(this.wagmiConfig, {
      onChange: (data) => {
        console.log('datadatadatadatadatadata', data);
        if (data.connector?.uid === this.wagmiConnector?.uid) {
          const newAccounts: EvmAccount[] =
            data.addresses?.map((addr) => ({
              address: addr as HexString,
              name: this.name,
              source: this.id,
              chainType: ChainType.EVM,
            })) || [];

          if (JSON.stringify(this.accounts) !== JSON.stringify(newAccounts)) {
            this.accounts = newAccounts;
            this.emit('accountsChanged', newAccounts);
          }

          if (data.status === 'disconnected') {
            this.emit('disconnect');
            this.accounts = [];
          }
        }
      },
    });
  }

  private stopWatching() {
    if (this.unwatch) {
      this.unwatch();
      this.unwatch = undefined;
    }
  }

  // async sendTransaction(transaction: SendTransactionParameters): Promise<`0x${string}`> {
  //   if (!this.wagmiConfig) throw new Error('Not initialized');
  //
  //   const { address } = getConnection(this.wagmiConfig);
  //   const chainId = getChainId(this.wagmiConfig);
  //
  //   if (!address) throw new Error('No active account found');
  //
  //   const hash = await sendTransaction(this.wagmiConfig, {
  //     ...transaction,
  //     account: address,
  //     chainId: chainId,
  //     connector: this.wagmiConnector,
  //   });
  //
  //   return hash;
  // }
}
