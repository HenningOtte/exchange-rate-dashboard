const historicalRatesEndpoint = "http://localhost:3000/historicalRates";

export type HistoricalRate = {
  date: string;
  rates: {
    EUR: number;
    GBP: number;
  };
};

export async function getHistoricalRate() {
  try {
    const response = await fetch(historicalRatesEndpoint);
    const data: HistoricalRate[] = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
