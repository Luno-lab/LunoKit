import type { PolkadotGenericApp } from '@zondax/ledger-substrate';
import { ExtraSignedExtension, LegacyClient } from 'dedot';
import { Extrinsic } from 'dedot/codecs';
import { MerkleizedMetadata } from 'dedot/merkleized-metadata';
import type { SignerPayloadJSON, SignerPayloadRaw, SignerResult } from 'dedot/types';
import { hexToU8a, stringToHex, u8aToHex } from 'dedot/utils';
import { wsProvider } from '../config';
import { ledgerWallet } from '../config/logos/generated';
import type { Account, Chain, ConnectorLinks, HexString, Signer } from '../types';
import { BaseConnector } from './base';

export interface LedgerConnectorOptions {
  chains: Chain[];
}

function getBip44Path(accountIndex: number, coinType = 354): string {
  return `m/44'/${coinType}'/${accountIndex}'/${0}'/${0}'`;
}

export class LedgerConnector extends BaseConnector {
  readonly id: string = 'ledger';
  readonly name: string = 'Ledger';
  readonly icon = ledgerWallet;
  readonly links: ConnectorLinks = {};
  readonly chains: Chain[];

  private app: PolkadotGenericApp | null = null;
  private transport: any | null = null;
  private accountIndex = 0;

  constructor(options: LedgerConnectorOptions) {
    super();
    this.chains = options.chains;
  }

  public isInstalled(): boolean {
    return false;
  }

  public async isAvailable(): Promise<boolean> {
    if (typeof navigator !== 'undefined' && (navigator as any).usb) {
      return true;
    }
    return false;
  }

  private async ensureTransportOpen(): Promise<void> {
    if (!this.transport) {
      throw new Error('Transport not initialized');
    }
    if (!this.transport.device?.opened) {
      await this.transport.open();
    }
  }

  private async ensureTransportClosed(): Promise<void> {
    if (this.transport?.device?.opened) {
      await this.transport.close();
    }
  }

  public async connect(
    _appName: string,
    _chains?: Optional<Chain[]>,
    _targetChainId?: Optional<string>
  ): Promise<Account[] | undefined> {
    if (!(await this.isAvailable())) {
      throw new Error('WebUSB is not supported in this browser.');
    }

    try {
      const { Buffer } = await import('buffer');
      globalThis.Buffer = Buffer;

      const { default: TransportWebUSB } = await import('@ledgerhq/hw-transport-webusb');

      try {
        this.transport = await TransportWebUSB.create();
      } catch (error: any) {
        if (error.name === 'SecurityError' || error.message?.includes('user gesture')) {
          throw new Error(
            'Ledger connection requires user interaction. Please click the connect button to connect your Ledger device.'
          );
        }
        this.transport = await TransportWebUSB.request();
      }

      const { PolkadotGenericApp } = await import('@zondax/ledger-substrate');
      const app = new PolkadotGenericApp(this.transport);
      this.app = app;

      await this.ensureTransportOpen();
      const bip44Path = getBip44Path(this.accountIndex);

      const addressResult = await app.getAddressEd25519(bip44Path, 0, false);

      if (!addressResult || !addressResult.address) {
        throw new Error('Failed to retrieve address from Ledger.');
      }

      const publicKeyHex: Optional<HexString> = (addressResult.pubKey as string)
        ? `0x${addressResult.pubKey}`
        : undefined;

      this.accounts = [
        {
          address: addressResult.address,
          publicKey: publicKeyHex,
          name: 'Ledger Wallet',
          type: 'sr25519',
          meta: {
            source: 'ledger',
            accountIndex: 0,
            bip44Path,
          },
        },
      ];

      this.signer = await this.getSigner();

      this.emit('connect', [...this.accounts]);
      return [...this.accounts];
    } catch (error: any) {
      console.error(`Connector ${this.id}: Connection failed:`, error);
      await this.cleanup();
      throw error;
    }
  }

  public async disconnect(): Promise<void> {
    await this.cleanup();
    this.emit('disconnect');
  }

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    const signer = await this.getSigner();

    if (!signer) {
      throw new Error('No signer provided');
    }

    const dataHex = stringToHex(message);
    const result = await signer.signRaw!({ address, data: dataHex, type: 'bytes' });
    return result.signature;
  }

  public async getSigner(): Promise<Signer> {
    return {
      signRaw: async (raw: SignerPayloadRaw): Promise<SignerResult> => {
        // todo
        throw new Error('Ledger not supported signRaw!');
      },
      signPayload: async (payload: SignerPayloadJSON): Promise<SignerResult> => {
        if (!this.app) {
          throw new Error('Ledger not connected');
        }

        const chain = this.chains.find((c) => c.genesisHash === payload.genesisHash);

        if (!chain) {
          throw new Error('Chain not found in your configuration chains');
        }

        await this.ensureTransportOpen();

        const bip44Path = getBip44Path(this.accountIndex);

        const provider = wsProvider(chain.rpcUrls.webSocket);
        const client = new LegacyClient(provider);

        await client.connect();

        const metadataHex = await provider.send('state_getMetadata', []);
        const chainInfo = {
          tokenSymbol: chain.nativeCurrency?.symbol || 'DOT',
          decimals: chain.nativeCurrency?.decimals || 10,
        };

        const merkleizer = new MerkleizedMetadata(metadataHex, chainInfo);

        const extra = new ExtraSignedExtension(client, {
          signerAddress: payload.address,
          payloadOptions: {
            metadataHash: u8aToHex(merkleizer.digest()),
          },
        });
        await extra.init();
        const txRawPayload = extra.toRawPayload(payload.method as HexString).data as HexString;

        const proof = merkleizer.proofForExtrinsicPayload(txRawPayload);

        const payloadBuffer = Buffer.from(hexToU8a(txRawPayload));
        const metadataBuffer = Buffer.from(proof);

        const { signature } = await this.app.signWithMetadataEd25519(
          bip44Path,
          payloadBuffer,
          metadataBuffer
        );

        const { signatureTypeId, callTypeId } = client.registry.metadata!.extrinsic;
        const $Signature = client.registry.findCodec(signatureTypeId);
        const $Call = client.registry.findCodec(callTypeId);

        const decodedSignature = $Signature.tryDecode(u8aToHex(signature));
        const decodedCall = $Call.tryDecode(payload.method);

        const extrinsic = new Extrinsic(client.registry, decodedCall);

        extrinsic.attachSignature({
          address: payload.address,
          signature: decodedSignature,
          extra: extra.data,
        });

        return {
          id: 0,
          signature: u8aToHex(signature),
          signedTransaction: extrinsic.toHex(),
        };
      },
    };
  }

  private async cleanup(): Promise<void> {
    if (this.transport) {
      try {
        await this.ensureTransportClosed();
      } catch (e) {
        console.warn('Error closing transport:', e);
      }
    }
    this.transport = null;
    this.app = null;
    this.accounts = [];
    this.signer = undefined;
  }
}

export const ledgerConnector = (options: LedgerConnectorOptions) => new LedgerConnector(options);
