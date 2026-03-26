import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SubstrateAccount, SubstrateConnectOptions, SubstrateSigner } from '../../../types';
import { SubstrateConnector } from './connector';

class TestSubstrateConnector extends SubstrateConnector {
  readonly id = 'test-substrate';
  readonly name = 'Test Substrate';
  readonly icon = 'test-substrate-icon.svg';

  async isAvailable(): Promise<boolean> {
    return true;
  }

  isInstalled(): boolean {
    return true;
  }

  async connect(options: SubstrateConnectOptions): Promise<SubstrateAccount[]> {
    const accounts: SubstrateAccount[] = [
      {
        address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
        name: `${options.appName} Account`,
        chainType: 'substrate',
        source: this.id,
      },
    ];
    this.accounts = accounts;
    this.signer = { signPayload: vi.fn(), signRaw: vi.fn() } as unknown as SubstrateSigner;
    this.emit('connect', [...accounts]);
    return accounts;
  }

  async disconnect(): Promise<void> {
    this.accounts = [];
    this.signer = undefined;
    this.emit('disconnect');
  }

  async signMessage(message: string, address: string): Promise<string | undefined> {
    return `signed:${message}:${address}`;
  }
}

describe('SubstrateConnector', () => {
  let connector: TestSubstrateConnector;

  beforeEach(() => {
    connector = new TestSubstrateConnector();
  });

  it('should accept SubstrateConnectOptions in connect', async () => {
    const accounts = await connector.connect({ appName: 'my-dapp' });

    expect(accounts).toHaveLength(1);
    expect(accounts[0].chainType).toBe('substrate');
    expect(accounts[0].name).toBe('my-dapp Account');
  });

  it('should return SubstrateAccount with correct shape', async () => {
    const accounts = await connector.connect({ appName: 'test' });
    const account = accounts[0];

    expect(account).toHaveProperty('address');
    expect(account).toHaveProperty('chainType', 'substrate');
    expect(account).toHaveProperty('source', 'test-substrate');
  });

  it('should return SubstrateSigner from getSigner', async () => {
    await connector.connect({ appName: 'test' });
    const signer = await connector.getSigner();

    expect(signer).toBeDefined();
    expect(signer).toHaveProperty('signPayload');
    expect(signer).toHaveProperty('signRaw');
  });

  it('should clear state on disconnect', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    await connector.connect({ appName: 'test' });
    await connector.disconnect();

    expect(await connector.getAccounts()).toEqual([]);
    expect(await connector.getSigner()).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('should emit connect and disconnect events', async () => {
    const connectSpy = vi.fn();
    const disconnectSpy = vi.fn();
    connector.on('connect', connectSpy);
    connector.on('disconnect', disconnectSpy);

    await connector.connect({ appName: 'test' });
    expect(connectSpy).toHaveBeenCalledWith([
      expect.objectContaining({ chainType: 'substrate' }),
    ]);

    await connector.disconnect();
    expect(disconnectSpy).toHaveBeenCalled();
  });
});
