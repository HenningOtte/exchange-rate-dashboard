export type ExchangeState = {
  converter: {
    initialValue: string;
    targetValue: string;
    sourceCurrency: "USD" | "EUR" | "GBP";
    targetCurrency: "USD" | "EUR" | "GBP";
    historicalDate: string;
    isHistorical: boolean;
  };
  dashboard: {
    dateFrom: string;
    dateTo: string;
  };
};

export function createExchangeState(i: ExchangeState) {
  return {
    converter: {
      initialValue: i.converter.initialValue,
      targetValue: i.converter.targetValue,
      sourceCurrency: i.converter.sourceCurrency,
      targetCurrency: i.converter.targetCurrency,
      historicalDate: i.converter.historicalDate,
      isHistorical: i.converter.isHistorical,
    },
    dashboard: {
      dateFrom: i.dashboard.dateFrom,
      dateTo: i.dashboard.dateTo,
    },
  };
}

export function clearExchangeState(i: ExchangeState) {
  const exchangeViewState: ExchangeState = createExchangeState(i);

  exchangeViewState.converter.initialValue = "0";
  exchangeViewState.converter.targetValue = "0";
  exchangeViewState.converter.sourceCurrency = "USD";
  exchangeViewState.converter.targetCurrency = "EUR";
  exchangeViewState.converter.historicalDate = "";
  exchangeViewState.converter.isHistorical = false;

  exchangeViewState.dashboard.dateFrom = "";
  exchangeViewState.dashboard.dateTo = "";

  return exchangeViewState;
}
