export const PERSIST_KEY = {
  /**
   * Key used in Storage to persist the ID of the last successfully connected connector.
   * This allows auto-connecting to the same connector on page load.
   */
  LAST_CONNECTOR_ID: 'lastConnectorId',

  /**
   * Key used in Storage to persist the genesisHash of the last successfully connected chain.
   * This allows auto-connecting to the same chain on page load.
   */
  LAST_CHAIN_ID: 'lastChainId',

  // 你未来可能还会添加其他的持久化键，比如：
  // LAST_SELECTED_ACCOUNT_ADDRESS: 'luno.lastSelectedAccountAddress',
  // THEME_PREFERENCE: 'luno.themePreference',
} as const; //
