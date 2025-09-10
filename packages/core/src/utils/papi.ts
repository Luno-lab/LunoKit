import type { Signer, PapiSigner } from '../types';

async function createPapiSigner(address: string, signer: Signer): Promise<PapiSigner | undefined> {
  if (!address || !signer) return undefined;

  if (!signer.signRaw || !signer.signPayload) return undefined;

  const { getPolkadotSignerFromPjs } = await import('@polkadot-api/pjs-signer');

  return getPolkadotSignerFromPjs(
    address,
    signer.signPayload as any,
    signer.signRaw as any
  );
}

export { createPapiSigner, type PapiSigner };
