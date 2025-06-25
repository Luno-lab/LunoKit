import type { DispatchError } from 'dedot/codecs'
import type { DedotClient } from 'dedot'

export function getReadableDispatchError(api: DedotClient, dispatchError: DispatchError): string {
  let message: string = dispatchError.type;

  if (dispatchError.isModule) {
    try {
      const mod = dispatchError.asModule;

      const decoded = api.registry.findMetaError(mod as any);

      const { docs, name, section } = decoded;

      message = `${section}.${name}${docs.length ? ` - "${docs.join(' ')}"` : ''}`;
    } catch (e) {
      console.error("[useSendTransaction]: Error finding meta dispatch error:", e?.message || e);
      const modData = dispatchError.asModule;
      message = `[useSendTransaction]: Module Error (pallet: ${modData.index.toString()}, error: ${modData.error.toHuman()})`;
    }
  } else if (dispatchError.isToken) {
    message = `[useSendTransaction]: Token Error: ${dispatchError.asToken.type}`;
  }
  return message;
}
