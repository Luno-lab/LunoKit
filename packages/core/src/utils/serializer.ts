/**
 * 序列化对象为JSON字符串
 */
export function serialize<T>(value: T): string {
  return JSON.stringify(value, (_, value) => {
    if (typeof value === 'bigint') {
      return { type: 'bigint', value: value.toString() };
    }
    return value;
  });
}

/**
 * 从JSON字符串反序列化对象
 */
export function deserialize<T>(value: string): T {
  return JSON.parse(value, (_, value) => {
    if (value && typeof value === 'object' && value.type === 'bigint') {
      return BigInt(value.value);
    }
    return value;
  });
}

/**
 * 创建持久化状态存储
 */
export function createStorage({
  key,
  deserialize: customDeserialize = deserialize,
  serialize: customSerialize = serialize,
  storage = globalThis.localStorage,
}: {
  key: string;
  deserialize?: <T>(value: string) => T;
  serialize?: <T>(value: T) => string;
  storage?: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
    removeItem: (key: string) => void;
  };
} = { key: 'poma-storage' }) {
  return {
    getItem<T>(key: string, defaultValue?: T): T | undefined {
      const value = storage?.getItem(`${key}:${key}`);
      if (!value) return defaultValue;
      try {
        return customDeserialize(value);
      } catch (error) {
        console.error('Error deserializing stored value:', error);
        return defaultValue;
      }
    },
    setItem<T>(key: string, value: T): void {
      if (!storage) return;
      try {
        storage.setItem(`${key}:${key}`, customSerialize(value));
      } catch (error) {
        console.error('Error serializing value:', error);
      }
    },
    removeItem(key: string): void {
      storage?.removeItem(`${key}:${key}`);
    },
  };
} 