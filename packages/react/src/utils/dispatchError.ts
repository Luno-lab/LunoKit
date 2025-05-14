import {DispatchError} from '@polkadot/types/interfaces'
import {ApiPromise} from '@polkadot/api'

export function getReadableDispatchError(api: ApiPromise, dispatchError: DispatchError): string {
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
      message = `[useSendTransaction]: Module Error (pallet: ${modData.index.toString()}, error: ${modData.error.toHuman()})`; // .toHuman() can be more informative
    }
  } else if (dispatchError.isToken) {
    message = `[useSendTransaction]: Token Error: ${dispatchError.asToken.type}`;
  }
  return message;
}
