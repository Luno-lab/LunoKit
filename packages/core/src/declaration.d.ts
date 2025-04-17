// 声明@polkadot系列包的类型
declare module '@polkadot/extension-dapp' {
  export function web3Accounts(options?: any): Promise<any[]>;
  export function web3Enable(appName: string): Promise<any[]>;
  export function web3FromAddress(address: string): Promise<any>;
  export function web3FromSource(source: string): Promise<any>;
  export const isWeb3Injected: boolean;
}

declare module '@polkadot/extension-inject/types' {
  export interface InjectedWindow {
    injectedWeb3?: Record<string, any>;
  }

  export interface InjectedExtension {
    name: string;
    version: string;
    [key: string]: any;
  }

  export interface InjectedAccount {
    address: string;
    name?: string;
    type?: string;
    meta?: Record<string, any>;
  }
}

// 声明其他可能需要的模块
declare module '@polkadot/api' {
  export class ApiPromise {
    static create(options?: any): Promise<ApiPromise>;
    [key: string]: any;
  }
}

declare module '@walletconnect/sign-client' {
  export default class SignClient {
    static init(options: any): Promise<SignClient>;
    [key: string]: any;
  }
}

declare module '@walletconnect/types' {
  export interface SessionTypes {
    [key: string]: any;
  }
}

declare module '@walletconnect/utils' {
  export function getSdkError(code: string | number): Error;
} 