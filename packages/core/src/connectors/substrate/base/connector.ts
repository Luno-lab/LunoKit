import type { SubstrateAccount, SubstrateConnectOptions, SubstrateSigner } from '../../../types';
import { BaseConnector } from '../../base';

export abstract class SubstrateConnector extends BaseConnector<
  SubstrateSigner,
  SubstrateConnectOptions,
  SubstrateAccount
> {
  abstract connect(options: SubstrateConnectOptions): Promise<SubstrateAccount[] | undefined>;
}
