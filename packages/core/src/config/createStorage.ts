import type { LunoStorage, RawStorage } from '../types';

// Defines the parameters for the createStorage function.
export interface CreateStorageParameters {
  storage: RawStorage;
  keyPrefix?: Optional<string>; // Optional key prefix, e.g., "luno."
}

/**
 * Creates a LunoStorage object that wraps a raw storage mechanism (like localStorage)
 * to provide a consistent async API with key prefixing and error handling.
 *
 * @param storage The raw storage mechanism (e.g., window.localStorage).
 * @param keyPrefix An optional prefix for all storage keys to avoid collisions.
 * @returns A LunoStorage object.
 */
export function createStorage({
  storage,
  keyPrefix = 'luno.', // Default key prefix
}: CreateStorageParameters): LunoStorage {
  const getKey = (suffix: string): string => `${keyPrefix}${suffix}`;

  return {
    async getItem(keySuffix: string): Promise<string | null> {
      try {
        const fullKey = getKey(keySuffix);
        // Await to handle both sync and async RawStorage getItem methods consistently
        const value = await storage.getItem(fullKey);
        // Normalize undefined or null to null
        return value == null ? null : String(value);
      } catch (error) {
        console.error(
          `[LunoStorage] Error getting item "${keySuffix}" (full key: "${getKey(keySuffix)}"):`,
          error
        );
        return null; // Return null on error to indicate failure
      }
    },

    async setItem(keySuffix: string, value: string): Promise<void> {
      try {
        const fullKey = getKey(keySuffix);
        // Await to handle both sync and async RawStorage setItem methods consistently
        await storage.setItem(fullKey, value);
      } catch (error) {
        console.error(
          `[LunoStorage] Error setting item "${keySuffix}" (full key: "${getKey(keySuffix)}"):`,
          error
        );
        // Errors during setItem are logged but don't typically need to be propagated further in the same way getItem might.
      }
    },

    async removeItem(keySuffix: string): Promise<void> {
      try {
        const fullKey = getKey(keySuffix);
        // Await to handle both sync and async RawStorage removeItem methods consistently
        await storage.removeItem(fullKey);
      } catch (error) {
        console.error(
          `[LunoStorage] Error removing item "${keySuffix}" (full key: "${getKey(keySuffix)}"):`,
          error
        );
      }
    },
  };
}
