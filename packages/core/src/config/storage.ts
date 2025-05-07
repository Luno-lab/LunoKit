// packages/core/src/storage.ts

import type { Storage } from '../types'; // 导入 Storage 接口

/**
 * 一个不做任何事情的存储实现，用于 SSR 或当 localStorage 不可用时。
 */
export const noopStorage: Storage = {
  getItem: (_key) => null,
  setItem: (_key, _value) => {},
  removeItem: (_key) => {},
};

/**
 * 创建一个基于浏览器 localStorage 的存储实例。
 * 如果 localStorage 不可用，则返回 noopStorage。
 * @returns Storage 实例
 */
export function createDefaultStorage(): Storage {
  let storage: globalThis.Storage | undefined;
  try {
    // 检查 localStorage 是否可用且功能正常
    storage = window.localStorage;
    const testKey = '__luno_storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    console.log('Using localStorage for persistent state.');
    return storage as Storage; // localStorage 本身就符合 Storage 接口
  } catch (error) {
    console.warn('localStorage is not available, using no-op storage. State will not be persisted.', error);
    return noopStorage;
  }
}

// 导出一个默认使用的 storage 实例
export const defaultStorage = createDefaultStorage();
