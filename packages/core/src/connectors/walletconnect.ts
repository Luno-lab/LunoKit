import { BaseConnector } from './base';
import type { IUniversalProvider, Metadata } from '@walletconnect/universal-provider';
import { SessionTypes, SignClientTypes } from '@walletconnect/types'
import type { Account, Chain, HexString, Signer, WalletConnectConnectorOptions } from '../types';
import { walletconnectWallet } from '../config/logos/generated';
import { SignerResult, SignerPayloadJSON, SignerPayloadRaw } from 'dedot/types'
import { ConnectorLinks } from '../types'
import {isSameAddress} from '../utils'

export class WalletConnectConnector extends BaseConnector {
  readonly id: string;
  readonly name: string;
  readonly icon: string;
  readonly links: ConnectorLinks;

  private provider?: IUniversalProvider;
  private projectId: string;
  private relayUrl: string;
  private metadata?: Metadata;
  private supportedChains: HexString[] = [];

  private session?: SessionTypes.Struct;
  private connectedChains?: Chain[] | HexString[];

  private unsubscribe: (() => void) | null = null;

  constructor(options: WalletConnectConnectorOptions) {
    super();
    this.id = options.id || 'walletconnect';
    this.name = options.name || 'WalletConnect';
    this.links = options.links || {};

    this.icon = options.icon || walletconnectWallet;

    this.projectId = options.projectId;
    this.relayUrl = options.relayUrl || 'wss://relay.walletconnect.com';
    this.metadata = options.metadata;
    this.supportedChains = options.supportedChains || [];
  }

  public isInstalled(): boolean {
    return false;
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  private convertChainIdToCaipId(chains: Chain[] | HexString[]): `polkadot:${string}`[] {
    return chains.map(chain => {
      const capid: HexString = (chain as Chain).genesisHash || chain
      return `polkadot:${capid.replace('0x', '').slice(0, 32)}` as `polkadot:${string}`
    });
  }

  public async connect(appName: string, chains?: Chain[]): Promise<Array<Account>> {
    if (!this.projectId) {
      throw new Error(`${this.name} requires a projectId. Please visit https://cloud.walletconnect.com to get one.`);
    }

    const effectiveChains = chains?.length ? chains : this.supportedChains.length ? this.supportedChains : undefined;

    if (!effectiveChains || effectiveChains.length === 0) {
      throw new Error(`${this.name} requires chains configuration.`);
    }

    this.connectedChains = effectiveChains;

    const { UniversalProvider } = await import("@walletconnect/universal-provider");

    try {
      this.provider = await UniversalProvider.init({
        projectId: this.projectId,
        relayUrl: this.relayUrl,
        metadata: this.metadata || {
          name: appName,
          description: 'LunoKit DApp',
          url: typeof window !== 'undefined' ? window.location.origin : '',
          icons: [this.icon],
        },
      });

      if (this.provider.session) {
        this.session = this.provider.session;
        const accounts = this.getAccountsFromSession(effectiveChains);
        this.accounts = accounts;

        await this.startSubscription();

        this.emit('connect', [...this.accounts]);
        return [...this.accounts];
      }

      if (!this.provider?.client) {
        throw new Error("Provider not initialized or not connected");
      }

      const { uri, approval } = await this.provider.client.connect({
        requiredNamespaces: {
          polkadot: {
            methods: ['polkadot_signMessage', 'polkadot_sendTransaction', 'polkadot_signTransaction', 'polkadot_requestAccounts'],
            chains: this.convertChainIdToCaipId(effectiveChains),
            events: ['accountsChanged', 'chainChanged', 'connect'],
          },
        },
        optionalNamespaces: {
          polkadot: {
            methods: ['polkadot_signMessage', 'polkadot_sendTransaction', 'polkadot_signTransaction', 'polkadot_requestAccounts'],
            chains: this.convertChainIdToCaipId(effectiveChains),
            events: ['accountsChanged', 'chainChanged', 'connect'],
          },
        },
      });

      this.emit('get_uri', uri);

      const session = await approval();
      this.session = session;
      this.provider.session = session;

      this.connectionUri = undefined;

      const accounts = this.getAccountsFromSession(effectiveChains);
      this.accounts = accounts;

      // 启动订阅
      await this.startSubscription();

      this.emit('connect', [...this.accounts]);
      return [...this.accounts];

    } catch (error) {
      this.connectionUri = undefined;
      throw error;
    }
  }

  private getAccountsFromSession(chains: Chain[] | HexString[]): Account[] {
    const targetChain = [(chains[0] as Chain).genesisHash || chains[0]] as HexString[] | Chain[]
      // ? (chains as Chain[]).filter(chain => chain.genesisHash.toLowerCase() === chainId.toLowerCase())
      // : (chains as string[]).filter(chain => chain.toLowerCase() === chainId.toLowerCase())
    const caipId = this.convertChainIdToCaipId(targetChain)[0];

    let rawAccounts = this.session?.namespaces.polkadot.accounts
      .flat()
      .filter((address: string) => address.includes(caipId))
      .map((address: string) => address.replace(`${caipId}:`, ""))

    if (rawAccounts && rawAccounts.length === 0) {
      console.error(`No accounts found for the specified chain, please connect to the correct chain`);

      const caipId = this.convertChainIdToCaipId(chains)[0];

      rawAccounts = this.session?.namespaces.polkadot.accounts
        .flat()
        .filter((address: string) => address.includes(caipId))
        .map((address: string) => address.replace(`${caipId}:`, ""))
    }

    const result = rawAccounts!
      .map((address: string) => ({
        address,
        name: `${this.name} Account`,
        meta: {
          source: this.id,
        },
        publicKey: undefined,
      }));

    this.emit('accountsChanged', [...result]);

    return result!
  }

  public async disconnect(): Promise<void> {
    if (this.provider) {
      // await Promise.race([
        await this.provider.disconnect()
        // new Promise((_, reject) =>
        //   setTimeout(() => reject(new Error('Disconnect timeout')), 5000)
        // )
      // ]);
    }
    await this.cleanup()
    this.emit('disconnect');
  }

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    if (!this.provider?.client || !this.session?.topic) {
      throw new Error("Provider not initialized or not connected");
    }

    try {
      const signer = await this.getSigner();
      if (!signer) {
        throw new Error("No signer provided");
      }

      const { signature } = await signer.signRaw!({ address, data: message, type: 'bytes'})
      return signature;
    } catch (error) {
      console.error('Sign message error:', error);
      throw error;
    }
  }

  public hasConnectionUri(): boolean {
    return true
  }

  public async getConnectionUri(): Promise<string> {
    if (this.connectionUri) {
      return this.connectionUri;
    }

    return new Promise<string>((resolve) => {
      this.once('get_uri', (uri: string) => {
        this.connectionUri = uri;
        resolve(uri);
      });
    });
  }


  public async getSigner(): Promise<Signer | undefined> {
    if (!this.provider?.client || !this.session) return undefined;

    return {
      signPayload: async (payload: SignerPayloadJSON): Promise<SignerResult> => {
        const chainCaipId = `polkadot:${payload.genesisHash.replace('0x', '').slice(0, 32)}`;
        const sessionAccounts = this.session!.namespaces.polkadot.accounts;

        const chainAccount = sessionAccounts.find(acc => {
          const address = acc.replace(`${chainCaipId}:`, "")

          return acc.includes(chainCaipId) && isSameAddress(payload.address, address)
        });

        if (!chainAccount) {
          throw new Error(`Chain ${payload.genesisHash} is not supported by the wallet.}`);
        }

        const chainAddress = chainAccount.replace(`${chainCaipId}:`, "")

        const updatedPayload = { ...payload, address: chainAddress }

        const result = await this.provider?.client?.request<{ signature: string }>({
          topic: this.session!.topic,
          chainId: `polkadot:${updatedPayload.genesisHash.replace('0x', '').slice(0, 32)}`,
          request: {
            method: 'polkadot_signTransaction',
            params: {
              address: chainAddress,
              transactionPayload: updatedPayload,
            },
          },
        });
        return result as SignerResult;
      },
      signRaw: async(payload: SignerPayloadRaw): Promise<SignerResult> => {
        const chainCaipId = this.convertChainIdToCaipId(this.connectedChains!)[0]

        const sessionAccounts = this.session!.namespaces.polkadot.accounts;

        const chainAccount = sessionAccounts.find(acc => {
          const address = acc.replace(`${chainCaipId}:`, "")

          return acc.includes(chainCaipId) && isSameAddress(payload.address, address)
        });

        if (!chainAccount) {
          throw new Error(`No accounts available for chain ${chainCaipId}`);
        }
        const chainAddress = chainAccount.replace(`${chainCaipId}:`, "");

        const updatedPayload = { ...payload, address: chainAddress };

        const result: SignerResult = await this.provider!.client!.request({
          topic: this.session!.topic,
          chainId: chainCaipId,
          request: {
            method: 'polkadot_signMessage',
            params: {
              address: chainAddress,
              message: updatedPayload.data,
              type: updatedPayload.type
            },
          },
        });

        return result
      }
    };
  }

  private async startSubscription(): Promise<void> {
    await this.cleanupSubscription();

    if (!this.provider?.client || !this.session) {
      throw new Error(`Connector ${this.id}: Cannot subscribe, provider or session not available.`);
    }

    try {
      const sessionDeleteHandler = async () => {
        console.log(`Connector ${this.id}: Session deleted, disconnecting...`);
        await this.cleanup()
        this.emit('disconnect');
      }
      this.provider.client.on('session_delete', sessionDeleteHandler);

      this.unsubscribe = () => {
        this.provider?.client?.off('session_delete', sessionDeleteHandler)
      }

    } catch (error) {
      this.unsubscribe = null;
    }
  }

  private async cleanupSubscription(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      console.log(`Connector ${this.id}: Unsubscribed from events.`);
    }
  }

  private async cleanup(): Promise<void> {
    await this.cleanupSubscription();
    this.accounts = [];
    this.signer = undefined;
    this.provider = undefined;
    this.session = undefined;
  }
}

export const walletConnectConnector = (options: WalletConnectConnectorOptions) =>
  new WalletConnectConnector(options);
