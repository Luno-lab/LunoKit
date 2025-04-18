// 交易相关类型

import {SubmittableResultResult} from '@polkadot/api/types'
import type {SubmittableExtrinsic } from '@polkadot/api/types'

/**
 * 交易参数
 */
export interface TransactionParameters {
  tx?: {
    section: string;
    method: string;
    args: any[];
  };

  /** 3. 直接提供已编码的调用数据 */
  extrinsic?: SubmittableExtrinsic<'promise'>;
}

/**
 * 交易响应
 */
export interface TransactionReceipt extends SubmittableResultResult<'promise'>{}
