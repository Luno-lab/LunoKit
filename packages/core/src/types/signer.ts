import {SignerPayloadJSON, SignerResult} from '@polkadot/types/types'

export interface Signer {
  /**
   * 对原始数据进行签名 (通常是字节或 extrinsic payload)
   * @param raw 包含地址、数据和类型的信息
   * @returns 包含签名的结果
   */
  signRaw?: (raw: {
    address: string;
    data: string; // hex string
    type: 'bytes' | 'payload';
  }) => Promise<{ id: number; signature: string }>; // 返回对象包含 id 和 signature

  /**
   * 对 extrinsic payload 进行签名 (更新的 @polkadot/api 可能需要)
   * @param payload 需要签名的 JSON 格式 payload
   * @returns 包含签名的结果对象 (id 用于更新状态)
   */
  signPayload?: (payload: SignerPayloadJSON) => Promise<SignerResult>;

  // 可以根据需要添加更新账户列表的方法（如果钱包 Signer 对象提供）
  // update?: (id: number, status: Hash | SubmittableResult | null) => void;
}
