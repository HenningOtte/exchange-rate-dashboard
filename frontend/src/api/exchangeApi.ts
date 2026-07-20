export type Currencies = "USD" | "EUR" | "GBP";
// ("https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RnwtzVgYRA9qlpegCia189guOBgXN2Xqz4cdlAtv&currencies=GBP&base_currency=EUR");

export interface CurrencyRates {
  USD: number;
  EUR: number;
  GBP: number;
}

export async function fetchLatestRates(currencies: Currencies[]) {
  const [initial, target] = currencies;
  let currencyRates = await getSingleRate(initial, target);
  if (currencyRates && currencyRates.data[target]) return currencyRates.data;
}

async function getSingleRate(
  baseCurrency: Currencies,
  quoteCurrency: Currencies,
) {
  type Response = {
    data: Partial<CurrencyRates>;
  };
  const apiUrl: string = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_RnwtzVgYRA9qlpegCia189guOBgXN2Xqz4cdlAtv&currencies=${quoteCurrency}&base_currency=${baseCurrency}`;

  try {
    const promise = await fetch(apiUrl);
    const response: Response = await promise.json();
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchHistoricalRates(
  currencies: Currencies[],
  date: string,
) {
  type Response = {
    data: Record<string, Record<string, number>>;
  };

  const [initial, target] = currencies;
  const apiUrl = `https://api.freecurrencyapi.com/v1/historical?apikey=fca_live_RnwtzVgYRA9qlpegCia189guOBgXN2Xqz4cdlAtv&date=${date}&base_currency=${initial}&currencies=${target}`;

  try {
    const promise = await fetch(apiUrl);
    const response: Response = await promise.json();
    console.log(response);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}
