import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ledgerWallet } from '../config/logos/generated';
import type { Chain } from '../types';
import { ledgerConnector } from './ledger';

const TEST_ADDRESS = '1FRMM8PEiWXYax7rpS6X4XZX1aAAxSWx1CrKTyrVYhV24fg';
const TEST_PUBLIC_KEY = new Uint8Array([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
  28, 29, 30, 31, 32,
]);
const TEST_PUBLIC_KEY_HEX = 'a711da72565f9cc37e65d2b8bb97a939f8d95730e39648f764e210a8fef22bf3';
const TEST_CHAIN: Chain = {
  genesisHash: '0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3',
  name: 'Polkadot',
  nativeCurrency: { name: 'Polkadot', symbol: 'DOT', decimals: 10 },
  rpcUrls: {
    webSocket: ['wss://rpc.polkadot.io'],
  },
  ss58Format: 0,
  blockExplorers: { default: { name: 'Subscan', url: 'https://polkadot.subscan.io' } },
  chainIconUrl: 'polkadot-icon',
  testnet: false,
};

vi.mock('@ledgerhq/hw-transport-webusb', () => ({
  default: {
    create: vi.fn(),
    request: vi.fn(),
  },
}));

vi.mock('@zondax/ledger-substrate', () => ({
  PolkadotGenericApp: vi.fn(),
}));

vi.mock('../config', () => ({
  wsProvider: vi.fn(),
}));

vi.mock('dedot', () => ({
  LegacyClient: vi.fn(),
  ExtraSignedExtension: vi.fn(),
}));

vi.mock('dedot/merkleized-metadata', () => ({
  MerkleizedMetadata: vi.fn(),
}));

vi.mock('dedot/codecs', () => ({
  Extrinsic: vi.fn(),
}));

const mockTransport = {
  device: {
    opened: false,
  },
  open: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
};

const mockApp = {
  getAddressEd25519: vi.fn().mockResolvedValue({
    address: TEST_ADDRESS,
    pubKey: TEST_PUBLIC_KEY_HEX,
  }),
  signWithMetadataEd25519: vi.fn().mockResolvedValue({
    signature: new Uint8Array([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64,
    ]),
  }),
};

const mockProvider = {
  send: vi.fn().mockResolvedValue('0xmetadata'),
  connect: vi.fn().mockResolvedValue(undefined),
};

const mockClient = {
  connect: vi.fn().mockResolvedValue(undefined),
  registry: {
    metadata: {
      extrinsic: {
        signatureTypeId: 1,
        callTypeId: 2,
      },
    },
    findCodec: vi.fn().mockReturnValue({
      tryDecode: vi.fn((hex: string) => hex),
    }),
  },
};

const mockExtraSignedExtension = {
  init: vi.fn().mockResolvedValue(undefined),
  toRawPayload: vi.fn().mockReturnValue({ data: '0x1234' }),
  data: {},
};

const mockMerkleizer = {
  digest: vi.fn().mockReturnValue(new Uint8Array([1, 2, 3, 4])),
  proofForExtrinsicPayload: vi.fn().mockReturnValue(new Uint8Array([5, 6, 7, 8])),
};

const mockExtrinsic = {
  attachSignature: vi.fn(),
  toHex: vi.fn().mockReturnValue('0xsignedTx'),
};

describe('LedgerConnector', () => {
  let connector: ReturnType<typeof ledgerConnector>;
  let originalNavigator: any;

  beforeEach(async () => {
    originalNavigator = globalThis.navigator;

    Object.defineProperty(globalThis, 'navigator', {
      value: {
        usb: {
          requestDevice: vi.fn(),
        },
      },
      writable: true,
      configurable: true,
    });

    globalThis.Buffer = Buffer;

    // Setup mocks
    const { default: TransportWebUSB } = await import('@ledgerhq/hw-transport-webusb');
    const { PolkadotGenericApp } = await import('@zondax/ledger-substrate');
    const { wsProvider } = await import('../config');
    const dedotModule = await import('dedot');
    const merkleizedModule = await import('dedot/merkleized-metadata');
    const codecsModule = await import('dedot/codecs');

    const transport = TransportWebUSB as any;
    vi.mocked(transport.create).mockResolvedValue(mockTransport);
    vi.mocked(transport.request).mockResolvedValue(mockTransport);
    vi.mocked(PolkadotGenericApp).mockImplementation(() => mockApp);
    vi.mocked(wsProvider).mockReturnValue(mockProvider);
    vi.mocked((dedotModule as any).LegacyClient).mockImplementation(() => mockClient);
    vi.mocked((dedotModule as any).ExtraSignedExtension).mockImplementation(
      () => mockExtraSignedExtension
    );
    vi.mocked((merkleizedModule as any).MerkleizedMetadata).mockImplementation(
      () => mockMerkleizer
    );
    vi.mocked((codecsModule as any).Extrinsic).mockImplementation(() => mockExtrinsic);

    // Reset mock app to default state
    mockApp.getAddressEd25519.mockResolvedValue({
      address: TEST_ADDRESS,
      pubKey: TEST_PUBLIC_KEY_HEX,
    });

    connector = ledgerConnector({ chains: [TEST_CHAIN] });
    vi.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'navigator', {
      value: originalNavigator,
      writable: true,
      configurable: true,
    });
    vi.clearAllMocks();
  });

  describe('basic properties', () => {
    it('should have correct connector metadata', () => {
      expect(connector.id).toBe('ledger');
      expect(connector.name).toBe('Ledger');
      expect(connector.icon).toBe(ledgerWallet);
    });
  });

  describe('installation detection', () => {
    it('should always be installed', () => {
      expect(connector.isInstalled()).toBe(false);
    });
  });

  describe('availability check', () => {
    it('should be available when WebUSB is supported', async () => {
      expect(await connector.isAvailable()).toBe(true);
    });

    it('should not be available when WebUSB is not supported', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });

      expect(await connector.isAvailable()).toBe(false);
    });

    it('should not be available in non-browser environment', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: undefined,
        writable: true,
        configurable: true,
      });

      expect(await connector.isAvailable()).toBe(false);
    });
  });

  describe('connection flow', () => {
    it('should connect successfully with valid setup', async () => {
      const accounts = await connector.connect('test-app');

      expect(accounts).toHaveLength(1);
      expect(accounts![0].address).toBe(TEST_ADDRESS);
      expect(accounts![0].name).toBe('Ledger Wallet');
      expect(accounts![0].type).toBe('sr25519');
      expect(accounts![0].meta?.source).toBe('ledger');
      expect(accounts![0].meta?.accountIndex).toBe(0);
    });

    it('should throw error when WebUSB is not available', async () => {
      Object.defineProperty(globalThis, 'navigator', {
        value: {},
        writable: true,
        configurable: true,
      });

      await expect(connector.connect('test-app', [TEST_CHAIN])).rejects.toThrow(
        'WebUSB is not supported in this browser.'
      );
    });

    it('should handle SecurityError during transport creation and fallback to request', async () => {
      const { default: TransportWebUSB } = await import('@ledgerhq/hw-transport-webusb');
      const transport = TransportWebUSB as any;
      vi.mocked(transport.create).mockRejectedValueOnce({
        name: 'OtherError',
        message: 'Some other error',
      });
      vi.mocked(transport.request).mockResolvedValueOnce(mockTransport);

      const accounts = await connector.connect('test-app', [TEST_CHAIN]);

      expect(accounts).toHaveLength(1);
      expect(transport.request).toHaveBeenCalled();
    });

    it('should throw user-friendly error for SecurityError', async () => {
      const { default: TransportWebUSB } = await import('@ledgerhq/hw-transport-webusb');
      const transport = TransportWebUSB as any;
      vi.mocked(transport.create).mockRejectedValueOnce({
        name: 'SecurityError',
        message: 'User gesture required',
      });
      vi.mocked(transport.request).mockRejectedValueOnce({
        name: 'SecurityError',
        message: 'User gesture required',
      });

      await expect(connector.connect('test-app', [TEST_CHAIN])).rejects.toThrow(
        'Ledger connection requires user interaction. Please click the connect button to connect your Ledger device.'
      );
    });

    it('should throw error when address retrieval fails', async () => {
      mockApp.getAddressEd25519.mockResolvedValueOnce({
        address: null,
        pubKey: null,
      });

      await expect(connector.connect('test-app', [TEST_CHAIN])).rejects.toThrow(
        'Failed to retrieve address from Ledger.'
      );
    });

    it('should emit connect event', async () => {
      const connectSpy = vi.fn();
      connector.on('connect', connectSpy);

      await connector.connect('test-app', [TEST_CHAIN]);

      expect(connectSpy).toHaveBeenCalledWith([
        expect.objectContaining({
          address: TEST_ADDRESS,
        }),
      ]);
    });

    it('should cleanup on connection failure', async () => {
      const { default: TransportWebUSB } = await import('@ledgerhq/hw-transport-webusb');
      const transport = TransportWebUSB as any;
      vi.mocked(transport.create).mockRejectedValueOnce({
        name: 'SecurityError',
        message: 'User gesture required',
      });
      vi.mocked(transport.request).mockRejectedValueOnce({
        name: 'SecurityError',
        message: 'User gesture required',
      });

      await expect(connector.connect('test-app', [TEST_CHAIN])).rejects.toThrow(
        'Ledger connection requires user interaction'
      );

      const accounts = await connector.getAccounts();
      expect(accounts).toEqual([]);
    });

    it('should handle public key as array', async () => {
      mockApp.getAddressEd25519.mockResolvedValueOnce({
        address: TEST_ADDRESS,
        pubKey: Array.from(TEST_PUBLIC_KEY),
      });

      const accounts = await connector.connect('test-app', [TEST_CHAIN]);

      expect(accounts![0].publicKey).toBeDefined();
    });

    it('should handle public key as Uint8Array', async () => {
      mockApp.getAddressEd25519.mockResolvedValueOnce({
        address: TEST_ADDRESS,
        pubKey: TEST_PUBLIC_KEY,
      });

      const accounts = await connector.connect('test-app', [TEST_CHAIN]);

      expect(accounts![0].publicKey).toBeDefined();
    });
  });

  describe('disconnection', () => {
    beforeEach(async () => {
      mockTransport.device.opened = true;
      await connector.connect('test-app', [TEST_CHAIN]);
    });

    it('should cleanup all resources on disconnect', async () => {
      await connector.disconnect();

      const accounts = await connector.getAccounts();
      expect(accounts).toEqual([]);
      expect(mockTransport.close).toHaveBeenCalled();
    });

    it('should emit disconnect event', async () => {
      const disconnectSpy = vi.fn();
      connector.on('disconnect', disconnectSpy);

      await connector.disconnect();

      expect(disconnectSpy).toHaveBeenCalled();
    });

    it('should handle transport close errors gracefully', async () => {
      mockTransport.close.mockRejectedValueOnce(new Error('Close failed'));

      await connector.disconnect();

      const accounts = await connector.getAccounts();
      expect(accounts).toEqual([]);
    });
  });

  describe('message signing', () => {
    beforeEach(async () => {
      await connector.connect('test-app', [TEST_CHAIN]);
    });

    it('should throw for signRaw (not supported)', async () => {
      await expect(connector.signMessage('hello world', TEST_ADDRESS)).rejects.toThrow(
        'Ledger not supported signRaw!'
      );
    });
  });

  describe('transaction signing', () => {
    const mockPayload = {
      address: TEST_ADDRESS,
      genesisHash: TEST_CHAIN.genesisHash,
      method: '0x1234',
      nonce: '0x00',
      specVersion: '0x1234',
      transactionVersion: '0x01',
      blockHash: '0xabc',
      blockNumber: '0x123',
      era: '0x00',
      tip: '0x00',
      signedExtensions: [],
      version: 4,
    };

    beforeEach(async () => {
      await connector.connect('test-app', [TEST_CHAIN]);
    });

    it('should throw error when app not connected', async () => {
      await connector.disconnect();
      const signer = await connector.getSigner();
      expect(signer).toBeDefined();

      await expect(signer.signPayload!(mockPayload)).rejects.toThrow('Ledger not connected');
    });

    it('should throw error when chain not found', async () => {
      const signer = await connector.getSigner();
      expect(signer).toBeDefined();

      await expect(
        signer.signPayload!({
          ...mockPayload,
          genesisHash: '0xunknown' as `0x${string}`,
        })
      ).rejects.toThrow('Chain not found in your configuration chains');
    });

    it('should close transport after signing', async () => {
      const signer = await connector.getSigner();
      expect(signer).toBeDefined();

      mockTransport.device.opened = true;
      await signer.signPayload!(mockPayload);
    });
  });

  describe('account management', () => {
    it('should return empty accounts initially', async () => {
      const accounts = await connector.getAccounts();
      expect(accounts).toEqual([]);
    });

    it('should return accounts after connection', async () => {
      await connector.connect('test-app', [TEST_CHAIN]);

      const accounts = await connector.getAccounts();
      expect(accounts).toHaveLength(1);
      expect(accounts[0].address).toBe(TEST_ADDRESS);
    });
  });
});
