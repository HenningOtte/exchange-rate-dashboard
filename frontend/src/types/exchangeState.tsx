export type ExchangeState = {
  converter: {
    initialValue: number;
    targetValue: number;
    historicalDate: string | null;
    isHistorical: boolean;
  };
  dashboard: {
    dateFrom: string | null;
    dateTo: string | null;
  };
};

export function createExchangeState(i: ExchangeState) {
  return {
    converter: {
      initialValue: i.converter.initialValue,
      targetValue: i.converter.targetValue,
      historicalDate: i.converter.historicalDate,
      isHistorical: i.converter.isHistorical,
    },
    dashboard: {
      dateFrom: i.dashboard.dateFrom,
      dateTo: i.dashboard.dateTo,
    },
  };
}
