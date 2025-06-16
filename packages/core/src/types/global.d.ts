import type { InjectedWindow } from '@polkadot/extension-inject/types';

declare global {
  interface Window extends InjectedWindow {
  }
}
