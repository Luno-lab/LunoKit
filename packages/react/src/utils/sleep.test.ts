import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { sleep } from './sleep';

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should resolve after specified milliseconds', async () => {
    const sleepPromise = sleep(1000);

    vi.advanceTimersByTime(1000);

    await sleepPromise;
    await expect(sleepPromise).resolves.toBeUndefined();
  });

  it('should use default 1000ms when no argument provided', async () => {
    const sleepPromise = sleep();

    vi.advanceTimersByTime(1000);

    await sleepPromise;
    await expect(sleepPromise).resolves.toBeUndefined();
  });

  it('should resolve immediately for 0ms', async () => {
    const sleepPromise = sleep(0);

    vi.advanceTimersToNextTimer();

    await sleepPromise;
    await expect(sleepPromise).resolves.toBeUndefined();
  });
});
