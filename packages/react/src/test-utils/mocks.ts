import { createConfig } from '@luno-kit/core'
import { kusama, polkadot } from '@luno-kit/core/chains'
import { BaseConnector } from '@luno-kit/core/connectors';
import type { Account, Signer, Chain } from '@luno-kit/core/types';
import { vi } from 'vitest';

const DEFAULT_MOCK_ACCOUNTS: Account[] = [
  {
    address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    publicKey: '0xd43593c715fdd31c61141abd04a99fd6822c8558854ccde39a5684e7a56da27d',
    name: 'Alice (Mock)',
    meta: { source: 'mock-connector' }
  },
  {
    address: '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
    publicKey: '0x8eaf04151687736326c9fea17e25fc5287613693c912909cb226aa4794f26a48',
    name: 'Bob (Mock)',
    meta: { source: 'mock-connector' }
  }
];

export class MockConnector extends BaseConnector {
  public readonly id = 'mock-connector';
  public readonly name = 'Mock Connector';
  public readonly icon = 'mock-icon.svg';

  private accountsToServe: Account[] = [...DEFAULT_MOCK_ACCOUNTS];

  constructor() {
    super();
  }

  public isInstalled(): boolean {
    return true;
  }

  public async isAvailable(): Promise<boolean> {
    return true;
  }

  public async connect(appName: string): Promise<Account[]> {
    console.log(`MockConnector: connect called with appName: ${appName}`);

    if (this.signer) {
      return this.accounts;
    }

    this.accounts = [...this.accountsToServe];
    this.signer = this.createMockSigner();
    this.emit('connect', this.accounts);
    return this.accounts;
  }

  public async disconnect(): Promise<void> {
    this.accounts = [];
    this.signer = undefined;
    this.emit('disconnect');
  }

  public async signMessage(message: string, address: string): Promise<string | undefined> {
    return `signed_by_mock_${message}`;
  }

  private createMockSigner(): Signer {
    return {
      signRaw: async ({ address, data }: { address: string; data: string }) => ({
        signature: `0x-mock-sig-for-${address}-${data}`,
        id: 1,
      }),
      signPayload: async (payload: any) => ({
        signature: `0x-mock-sig-for-payload-${payload.address}`,
        id: 1,
      }),
    };
  }

  public setMockAccounts(newAccounts: Account[]): void {
    this.accountsToServe = [...newAccounts];

    if (this.signer) {
      this.accounts = [...newAccounts];
      this.emit('accountsChanged', this.accounts);
    }
  }
}

export const mockConfig = createConfig({
  chains: [polkadot, kusama],
  connectors: [new MockConnector()]
});


export function createMockApi(options: { chain: Chain }) {
  return {
    status: 'connected' as const,
    chainSpec: {
      chainName: () => options.chain?.name || 'Mock Chain',
      genesisHash: vi.fn().mockResolvedValue(options.chain?.genesisHash),
    },
    runtimeVersion: {
      specName: options.chain?.name || 'Mock Chain',
    },

    query: {
      system: {
        account: vi.fn().mockImplementation((address, callback) => {
          setTimeout(() => callback({
            data: {
              free: '1000000000000',
              reserved: '0',
              miscFrozen: '0',
              feeFrozen: '0',
            }
          }), 0);
          return Promise.resolve(() => Promise.resolve());
        }),
        events: vi.fn().mockImplementation((callback) => {
          setTimeout(() => callback([]), 0);
          return Promise.resolve(() => Promise.resolve());
        }),
        number: vi.fn().mockImplementation((callback) => {
          setTimeout(() => callback(1000), 0);
          return Promise.resolve(() => Promise.resolve());
        }),
      },
      balances: {
        locks: vi.fn().mockImplementation((address, callback) => {
          setTimeout(() => callback([]), 0);
          return Promise.resolve(() => Promise.resolve());
        }),
      },
    },

    consts: {
      system: {
        ss58Prefix: options.chain?.ss58Format ?? 42,
      }
    },
    queryMulti: vi.fn().mockImplementation((queries, callback) => {
      setTimeout(() => callback([
        {
          data: {
            free: '1000000000000',
            reserved: '0',
            frozen: '0'
          }
        },
        [
          {
            id: 'vesting',
            amount: '1000000000',
            reasons: 'misc'
          }
        ]
      ]), 0);
      return Promise.resolve(() => Promise.resolve());
    }),
    getRuntimeVersion: vi.fn().mockResolvedValue({
      specName: options.chain?.name || 'mock-chain',
      specVersion: 1,
      transactionVersion: 1,
      implName: 'mock-client',
      implVersion: 1,
      authoringVersion: 1,
      stateVersion: 1,
    }),

    on: vi.fn(),
    off: vi.fn(),
    connect: vi.fn().mockResolvedValue(undefined),
    disconnect: vi.fn().mockResolvedValue(undefined),
    rpc: {
      chain_getBlockHash: vi.fn().mockResolvedValue(options.chain.genesisHash),
    },
  };
}

export const mockClient = {
  polkadot: createMockApi({ chain: polkadot }),
  kusama: createMockApi({ chain: kusama }),
};
