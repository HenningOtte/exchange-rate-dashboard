import ConverterCard from "../features/ConverterCard";
import DashboardCard from "../features/DashboardCard";
import { useState } from "react";
import type { ExchangeState } from "../types/exchangeState";
import { createContext } from "react";

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
    historicalDate: null,
    isHistorical: false,
  },
  dashboard: {
    dateFrom: null,
    dateTo: null,
  },
};

function Home() {
  const [exchangeState, setExchangeState] = useState(exchangeViewState);

  return (
    <ExchangeContext value={{ exchangeState, setExchangeState }}>
      <ConverterCard title="Converter"></ConverterCard>
      <DashboardCard title="Dashboard"></DashboardCard>
      <div className="start-clear-container">
        <button className="start-btn">START</button>
        <button className="clear-btn">CLEAR</button>
      </div>
    </ExchangeContext>
  );
}

export default Home;
