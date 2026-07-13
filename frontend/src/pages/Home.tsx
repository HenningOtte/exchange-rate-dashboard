import ConverterCard from "../features/converter/ConverterCard";
import DashboardCard from "../features/converter/DashboardCard";
import { useState } from "react";
import type { ExchangeState } from "../types/exchangeState";
import { clearExchangeState } from "../types/exchangeState";
import { createContext } from "react";
import { calculateHistoricalExchange } from "../services/exchangeService";
import { calculateLatestRates } from "../services/exchangeService";
import { createExchangeState } from "../types/exchangeState";

type ExchangeContextValue = {
  exchangeState: ExchangeState;
  setExchangeState: React.Dispatch<React.SetStateAction<ExchangeState>>;
};

export const ExchangeContext = createContext<ExchangeContextValue | null>(null);

const exchangeViewState: ExchangeState = {
  converter: {
    initialValue: "",
    targetValue: "",
    sourceCurrency: "USD",
    targetCurrency: "EUR",
    historicalDate: "",
    isHistorical: false,
  },
  dashboard: {
    dateFrom: "",
    dateTo: "",
  },
};

function Home() {
  const [exchangeState, setExchangeState] = useState(exchangeViewState);

  const updateTargetValue = (convertedValue: string) => {
    setExchangeState((state) => {
      let newState = createExchangeState(state);
      newState.converter.targetValue = convertedValue;
      return newState;
    });
  };

  const updateConvertedValue = async () => {
    const { sourceCurrency, targetCurrency, initialValue, historicalDate } =
      exchangeState.converter;

    if (
      exchangeState.converter.isHistorical &&
      exchangeState.converter.historicalDate.length > 0
    ) {
      let convertedValue = await calculateHistoricalExchange(
        sourceCurrency,
        targetCurrency,
        initialValue,
        historicalDate,
      );
      if (convertedValue != null) updateTargetValue(convertedValue);
    } else {
      let convertedValue = await calculateLatestRates(
        sourceCurrency,
        targetCurrency,
        initialValue,
      );

      if (convertedValue != null) updateTargetValue(convertedValue);
    }
  };

  return (
    <div className="home">
      <ExchangeContext value={{ exchangeState, setExchangeState }}>
        <ConverterCard title="Converter"></ConverterCard>
        <DashboardCard title="Dashboard"></DashboardCard>
        <div className="start-clear-container">
          <button
            onClick={() => {
              updateConvertedValue();
            }}
            className="start-btn"
          >
            START
          </button>
          <button
            onClick={() => {
              setExchangeState((exchange) => {
                return clearExchangeState(exchange);
              });
            }}
            className="clear-btn"
          >
            CLEAR
          </button>
        </div>
      </ExchangeContext>
    </div>
  );
}

export default Home;
