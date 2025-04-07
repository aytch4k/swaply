export const API = {
  COINGECKO: {
    BASE_URL: 'https://api.coingecko.com/api/v3',
    FALLBACK_URL: 'https://tokens.coingecko.com/uniswap/all.json',
    API_KEY: import.meta.env.VITE_COINGECKO_API_KEY,
  },
  CACHE: {
    DURATION: 30 * 1000, // 30 seconds
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY: 1000, // 1 second
    CHUNK_DELAY: 300, // 300ms between chunks
  },
  LIMITS: {
    CHUNK_SIZE: 25,
  },
};