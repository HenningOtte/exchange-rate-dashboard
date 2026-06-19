export type ExchangeContext = {
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
