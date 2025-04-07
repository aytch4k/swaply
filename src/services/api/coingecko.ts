import { API } from '../../config/constants';
import type { Token } from '../../types';
import type { TokenPrice } from '../types';

export async function fetchTokenPricesFromAPI(addresses: string[]): Promise<Record<string, TokenPrice>> {
  const url = new URL(`${API.COINGECKO.BASE_URL}/simple/token_price/ethereum`);
  url.searchParams.set('contract_addresses', addresses.join(','));
  url.searchParams.set('vs_currencies', 'usd');
  url.searchParams.set('include_24h_vol', 'true');
  url.searchParams.set('include_24hr_change', 'true');
  url.searchParams.set('x_cg_demo_api_key', API.COINGECKO.API_KEY);

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
  // Transform the response into our expected format
  return Object.entries(data).reduce((acc, [address, priceData]: [string, any]) => {
    acc[address.toLowerCase()] = {
      current_price: priceData.usd || 0,
      price_change_percentage_24h: priceData.usd_24h_change || 0,
      total_volume: priceData.usd_24h_vol || 0
    };
    return acc;
  }, {} as Record<string, TokenPrice>);
}

export async function fetchFallbackPrice(token: Token): Promise<TokenPrice | null> {
  const url = new URL(`${API.COINGECKO.BASE_URL}/coins/ethereum/contract/${token.address}`);
  url.searchParams.set('x_cg_demo_api_key', API.COINGECKO.API_KEY);

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    return {
      current_price: data.market_data?.current_price?.usd || 0,
      price_change_percentage_24h: data.market_data?.price_change_percentage_24h || 0,
      total_volume: data.market_data?.total_volume?.usd || 0
    };
  } catch (error) {
    console.warn(`Failed to fetch fallback price for ${token.symbol}:`, error);
    return null;
  }
}