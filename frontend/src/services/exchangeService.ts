import { fetchHistoricalRates } from "../api/exchangeApi";
import { fetchLatestRates } from "../api/exchangeApi";
import type { Currencies } from "../api/exchangeApi";

export async function calculateHistoricalExchange(
  sourceCurrency: Currencies,
  targetCurrency: Currencies,
  initialValue: string,
  historicalDate: string,
) {
  const currencyRates = await fetchHistoricalRates(
    [sourceCurrency, targetCurrency],
    historicalDate,
  );

  if (currencyRates && currencyRates[historicalDate]) {
    let convertedValue = (
      Number(initialValue) * currencyRates[historicalDate][targetCurrency]
    ).toFixed(2);

    return convertedValue;
  }
}

export async function calculateLatestRates(
  sourceCurrency: Currencies,
  targetCurrency: Currencies,
  initialValue: string,
) {
  const currencyRates = await fetchLatestRates([
    sourceCurrency,
    targetCurrency,
  ]);

  if (currencyRates && currencyRates[targetCurrency]) {
    let convertedValue = (
      Number(initialValue) * currencyRates[targetCurrency]
    ).toFixed(2);

    return convertedValue;
  }
}
