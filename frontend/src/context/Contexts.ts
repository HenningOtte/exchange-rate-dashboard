import { createContext } from "react";
import type { ExchangeContext } from "../types/exchangeState";

let exchangeContext: ExchangeContext = {
  converter: {
    initialValue: 0,
    targetValue: 0,
    historicalDate: null,
    isHistorical: false,
  },
  dashboard: {
    dateFrom: null,
    dateTo: null,
  },
};

