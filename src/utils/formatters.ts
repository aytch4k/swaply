export function formatTokenPrice(price: number, decimalPlaces: number): string {
  if (price >= 0.01) {
    return price.toFixed(2);
  }
  return price.toFixed(decimalPlaces);
}