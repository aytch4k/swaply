import { API } from '../../config/constants';

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  retries = API.RETRY.MAX_ATTEMPTS
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      await delay(API.RETRY.DELAY);
      return withRetry(operation, retries - 1);
    }
    throw error;
  }
}