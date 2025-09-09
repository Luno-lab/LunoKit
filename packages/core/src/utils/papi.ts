import type { Signer } from '../types';

export async function createPapiSigner(address: string, signer: Signer) {
  const { getPolkadotSignerFromPjs } = await import('@polkadot-api/pjs-signer');

  return getPolkadotSignerFromPjs(
    address,
    signer?.signPayload,
    signer?.signRaw
  );
}
