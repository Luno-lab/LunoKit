export type TxStatus = 'idle' | 'signing' | 'pending' | 'success' | 'failed';

export type DetailedTxStatus =
  | 'idle'
  // Substrate
  | 'broadcasting'
  | 'inBlock'
  | 'finalized'
  | 'invalid'
  | 'dropped'
  // EVM
  | 'submitted'
  | 'confirmed';
