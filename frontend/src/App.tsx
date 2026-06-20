import Navbar from "./components/Navbar";
import ConverterCard from "./features/ConverterCard";
import DashboardCard from "./features/DashboardCard";
import { useState } from "react";
import type { ExchangeState } from "./types/exchangeState";
import { createContext } from "react";

type ExchangeContextValue = {
  exchangeState: ExchangeState;
  setExchangeState: React.Dispatch<React.SetStateAction<ExchangeState>>;
};

export const ExchangeContext = createContext<ExchangeContextValue | null>(null);

const exchangeViewState: ExchangeState = {
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

function App() {
  const [exchangeState, setExchangeState] = useState(exchangeViewState);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <h1>{exchangeState.converter.initialValue}</h1>
        <ExchangeContext value={{ exchangeState, setExchangeState }}>
          <ConverterCard title="Converter"></ConverterCard>
        </ExchangeContext>
        <DashboardCard title="Dashboard"></DashboardCard>
      </main>
    </>
  );
}

export default App;
