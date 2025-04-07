import { API } from '../config/constants';
import type { Currency } from '../config/currencies';

interface ExchangeRates {
  [key: string]: number;
}

class CurrencyConverter {
  private rates: ExchangeRates = {};
  private lastUpdate: number = 0;
  private readonly UPDATE_INTERVAL = 60 * 60 * 1000; // 1 hour

  async getExchangeRate(from: string, to: string): Promise<number> {
    await this.updateRatesIfNeeded();
    
    if (from === to) return 1;
    if (from === 'USD') return this.rates[to] || 1;
    if (to === 'USD') return 1 / (this.rates[from] || 1);
    
    // Convert through USD
    const fromRate = this.rates[from] || 1;
    const toRate = this.rates[to] || 1;
    return toRate / fromRate;
  }

  async convertAmount(amount: number, from: string, to: string): Promise<number> {
    const rate = await this.getExchangeRate(from, to);
    return amount * rate;
  }

  private async updateRatesIfNeeded(): Promise<void> {
    const now = Date.now();
    if (now - this.lastUpdate < this.UPDATE_INTERVAL) return;

    try {
      const url = new URL(`${API.COINGECKO.BASE_URL}/simple/price`);
      url.searchParams.set('ids', 'tether');
      url.searchParams.set('vs_currencies', 'usd,eur,gbp,jpy,cny,aed');
      url.searchParams.set('x_cg_demo_api_key', API.COINGECKO.API_KEY);

      const response = await fetch(url.toString());
      const data = await response.json();
      
      this.rates = {
        USD: 1,
        EUR: 1 / data.tether.eur,
        GBP: 1 / data.tether.gbp,
        JPY: 1 / data.tether.jpy,
        CNY: 1 / data.tether.cny,
        AED: 1 / data.tether.aed,
      };
      
      this.lastUpdate = now;
    } catch (error) {
      console.error('Failed to update exchange rates:', error);
    }
  }
}

export const currencyConverter = new CurrencyConverter();