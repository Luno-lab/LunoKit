export const PERSIST_KEY = {
  SUBSTRATE_LAST_CONNECTOR_ID: 'substrate.lastConnectorId',
  SUBSTRATE_LAST_CHAIN_ID: 'substrate.lastChainId',
  SUBSTRATE_LAST_SELECTED_ACCOUNT: 'substrate.lastSelectedAccountInfo',
  SUBSTRATE_RECENT_SELECTED_ACCOUNT: 'substrate.recentSelectedAccountInfo',
  SUBSTRATE_RECENT_CONNECTOR_ID: 'substrate.recentConnectorId',

  EVM_LAST_CONNECTOR_ID: 'evm.lastConnectorId',
  EVM_RECENT_CONNECTOR_ID: 'evm.recentConnectorId',

  LAST_ACTIVE_NAMESPACE: 'lastActiveNamespace',
} as const;
