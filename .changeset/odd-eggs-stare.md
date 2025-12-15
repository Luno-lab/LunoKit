---
"@luno-kit/react": patch
"@luno-kit/core": patch
"@luno-kit/ui": patch
---

Fix bugs & Add new connectors

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
