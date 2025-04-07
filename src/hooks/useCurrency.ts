import { useCallback } from 'react';
import { useSettings } from './useSettings';
import { currencyConverter } from '../services/currencyConverter';
import { SUPPORTED_CURRENCIES } from '../config/currencies';

export function useCurrency() {
  const { currency } = useSettings();
  const currentCurrency = SUPPORTED_CURRENCIES.find(c => c.code === currency);

  const formatPrice = useCallback(async (priceUSD: number) => {
    if (!currentCurrency) return `$${priceUSD.toFixed(2)}`;

    try {
      const convertedPrice = await currencyConverter.convertAmount(
        priceUSD,
        'USD',
        currentCurrency.code
      );

      return `${currentCurrency.symbol}${convertedPrice.toFixed(2)}`;
    } catch (error) {
      console.error('Currency conversion failed:', error);
      return `$${priceUSD.toFixed(2)}`;
    }
  }, [currentCurrency]);

  return {
    formatPrice,
    currentCurrency
  };
}