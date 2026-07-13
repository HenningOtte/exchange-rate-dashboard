import ConverterCard from "../features/converter/ConverterCard";
import DashboardCard from "../features/converter/DashboardCard";
import { useState } from "react";
import type { ExchangeState } from "../types/exchangeState";
import { clearExchangeState } from "../types/exchangeState";
import { createContext } from "react";
import { fetchLatestRates } from "../api/exchangeApi";
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

  const calcValue = async () => {
    const { sourceCurrency, targetCurrency, initialValue } =
      exchangeState.converter;
    const currencyRates = await fetchLatestRates([
      sourceCurrency,
      targetCurrency,
    ]);

    if (currencyRates && currencyRates[targetCurrency]) {
      const convert = Number(initialValue) * currencyRates[targetCurrency];
      setExchangeState((state) => {
        let newState = createExchangeState(state);
        state.converter.targetValue = convert.toFixed(2);
        return newState;
      });
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
              calcValue();
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
