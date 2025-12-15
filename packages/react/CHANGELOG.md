# @luno-kit/react

## 0.0.11

### Patch Changes

- ef72b4f: Fix the import of tailwindcss and remove the import of the base classes.
- 3b8a36f: Fix bugs & Add new connectors

  - Add "appInfo" to LunoKitProvider
  - Add new connectors: OneKey and Ledger
  - Remove the QueryClientProvider from LunoKitProvider
  - The "useSendTransaction" function now includes a "waitFor" parameter, allowing for the customization of whether the transaction is completed at the "inBlock" or "finalized" stage.
  - Fix the issue of tailwind base classes overriding each other
  - Set default values for cacheMetadata
  - To be compatible with exactOptionalPropertyTypes, add the Optional type
  - Add the rawReceipt to the return value of useSendTransaction
  - Remove console.log
  - Add the generic type for useApi

- Updated dependencies [ef72b4f]
- Updated dependencies [3b8a36f]
  - @luno-kit/core@0.0.11

## 0.0.11-beta.0

### Patch Changes

- ef72b4f: Fix the import of tailwindcss and remove the import of the base classes.
- Updated dependencies [ef72b4f]
  - @luno-kit/core@0.0.11-beta.0

## 0.0.10

### Patch Changes

- 3a62c64: Fix accounts changed & disconnect event
- Updated dependencies [3a62c64]
  - @luno-kit/core@0.0.10

## 0.0.9

### Patch Changes

- 59eec8b: Fix the issue of CSS isolation, resolve the problem of account reset after reconnection, and add AssetList

  - Fix the issue of CSS isolation
  - Resolve the problem of account reset after reconnection
  - Add AssetList

- 1ac1bce: Fix the issue of CSS isolation, resolve the problem of account reset after reconnection, and add AssetList

  - Fix the issue of CSS isolation
  - Resolve the problem of account reset after reconnection
  - Add AssetList

- Updated dependencies [59eec8b]
- Updated dependencies [1ac1bce]
  - @luno-kit/core@0.0.9

## 0.0.9-beta.0

### Patch Changes

- 59eec8b: Fix the issue of CSS isolation, resolve the problem of account reset after reconnection, and add AssetList

  - Fix the issue of CSS isolation
  - Resolve the problem of account reset after reconnection
  - Add AssetList

- Updated dependencies [59eec8b]
  - @luno-kit/core@0.0.9-beta.0

## 0.0.8

### Patch Changes

- 4990253: Add new hooks & Add support for Papi

  - Allow users to not configure chains & Add support for Papi
  - Add 2 hooks:
    - usePapiSigner: Obtain the signer object used for papi
    - useEstimatePaymentInfo: Obtain data such as transaction gas amount

- Updated dependencies [4990253]
  - @luno-kit/core@0.0.8

## 0.0.7

### Patch Changes

- c8b36b7: Modify the user interface, fix the bugs, and add the available chains config.

  - fix bug of auto connect
  - update ui
  - add moe available chains
  - modify the export method of the package

- Updated dependencies [c8b36b7]
  - @luno-kit/core@0.0.7

## 0.0.6

### Patch Changes

- f2aef3f: Fix types & add README
- Updated dependencies [f2aef3f]
  - @luno-kit/core@0.0.6

## 0.0.5

### Patch Changes

- 05ee287: Fix the UI issues
- Updated dependencies [05ee287]
  - @luno-kit/core@0.0.5

## 0.0.4

### Patch Changes

- 8a4d2b9: Fix the dependencies error and optimizing the UI
- Updated dependencies [8a4d2b9]
  - @luno-kit/core@0.0.4

## 0.0.3

### Patch Changes

- 9696760: update repository
- Updated dependencies [9696760]
  - @luno-kit/core@0.0.3

## 0.0.2

### Patch Changes

- d7417de: update repository
- Updated dependencies [d7417de]
  - @luno-kit/core@0.0.2

## 0.0.1

### Patch Changes

- Initial release

  First release featuring:

  @luno-kit/core: Wallet connectors and utilities
  @luno-kit/react: React hooks and state management
  @luno-kit/ui: Pre-built wallet connection components

- Updated dependencies
  - @luno-kit/core@0.0.1

## 0.0.1-beta.0

### Patch Changes

- 21f7f53: Initial beta release

  First beta release featuring:

  - @luno-kit/core: Wallet connectors and utilities
  - @luno-kit/react: React hooks and state management
  - @luno-kit/ui: Pre-built wallet connection components

- Updated dependencies [21f7f53]
  - @luno-kit/core@0.0.1-beta.0
