import { describe } from 'vitest';
import { onekeyWallet } from '../config/logos/generated';
import { onekeyConnector } from './onekey';
import { createConnectorTestSuite } from './test-helper';

describe(
  'onekeyConnector',
  createConnectorTestSuite({
    getConnector: () => onekeyConnector(),
    expected: {
      id: 'OneKey',
      name: 'OneKey',
      icon: onekeyWallet,
    },
  })
);
