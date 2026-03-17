import { describe } from 'vitest';
import { onekeySubstrateWallet } from '../../../config/logos/generated';
import { createConnectorTestSuite } from '../../test-helper';
import { onekeyConnector } from './onekey';

describe(
  'onekeyConnector',
  createConnectorTestSuite({
    getConnector: () => onekeyConnector(),
    expected: {
      id: 'OneKey',
      name: 'OneKey',
      icon: onekeySubstrateWallet,
    },
  })
);
