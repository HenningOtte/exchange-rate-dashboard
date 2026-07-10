export type Currencies = "USD" | "EUR" | "GBP";

export interface CurrencyRates {
  USD: number;
  EUR: number;
  GBP: number;
}

export async function fetchLatestRates(currencies: Currencies[]) {
  const [initial, target] = currencies;
  let currencyRates = await getSingleRate(initial, target);
  return currencyRates.data;
}

async function getSingleRate(
  baseCurrency: Currencies,
  quoteCurrency: Currencies,
) {
  const apiUrl: string = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RnwtzVgYRA9qlpegCia189guOBgXN2Xqz4cdlAtv&currencies=${baseCurrency},${quoteCurrency}`;

  type Response = {
    data: Partial<CurrencyRates>;
  };

  try {
    const promise = await fetch(apiUrl);
    const response: Response = await promise.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}
