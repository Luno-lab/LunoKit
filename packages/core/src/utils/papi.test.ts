import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPapiSigner } from './papi';
import type { Signer } from '../types';

vi.mock('@polkadot-api/pjs-signer', () => {
  return {
    getPolkadotSignerFromPjs: vi.fn((address: string, signPayload: any, signRaw: any) => {
      return {
        address,
        signPayload,
        signRaw,
        publicKey: new Uint8Array([1, 2, 3]),
        sign: vi.fn().mockResolvedValue(new Uint8Array([4, 5, 6]))
      };
    })
  };
});

describe('createPapiSigner', () => {
  let mockSigner: Signer;
  const mockAddress = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

  beforeEach(() => {
    mockSigner = {
      signPayload: vi.fn().mockResolvedValue({ signature: '0xsignature' }),
      signRaw: vi.fn().mockResolvedValue({ signature: '0xrawsignature' })
    };

    vi.clearAllMocks();
  });

  it('should create a PAPI signer when valid address and signer are provided', async () => {
    const papiSigner = await createPapiSigner(mockAddress, mockSigner);

    expect(papiSigner).toBeDefined();
    expect(papiSigner?.publicKey).toBeInstanceOf(Uint8Array);

    const { getPolkadotSignerFromPjs } = await import('@polkadot-api/pjs-signer');
    expect(getPolkadotSignerFromPjs).toHaveBeenCalledWith(
      mockAddress,
      mockSigner.signPayload,
      mockSigner.signRaw
    );
  });
});
