import type { DispatchError } from 'dedot/codecs'
import type { DedotClient } from 'dedot'

export function getReadableDispatchError(api: DedotClient, dispatchError: DispatchError): string {
  if (dispatchError.type === 'Module') {
    try {
      const errorMeta = api.registry.findErrorMeta(dispatchError);
      if (errorMeta) {
        const { docs, name, pallet, fields, fieldCodecs } = errorMeta;
        return `[useSendTransaction]: ${pallet}.${name} error,  ${docs.join(' ')}`;
      }

      return `[useSendTransaction]: Module Error (index: ${dispatchError.value.index}, error: ${dispatchError.value.error})`;
    } catch (e) {
      const { value: { error, index } } = dispatchError;

      return `[useSendTransaction]: Module Error (index: ${index}, error: ${error}) - Failed to decode: ${e instanceof Error ? e.message : 'Unknown error'}`;
    }
  } else if (dispatchError.type === 'Token') {
    return `[useSendTransaction]: Token Error: ${dispatchError.value}`;
  }

  if ('value' in dispatchError) {
    return `[useSendTransaction]: ${dispatchError.type} Error: ${dispatchError.value}`;
  }

  return `[useSendTransaction]: Error: ${dispatchError.type}`;
}
