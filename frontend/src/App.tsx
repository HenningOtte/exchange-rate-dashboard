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

function App() {
  const [exchangeState, setExchangeState] = useState(exchangeViewState);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <ExchangeContext value={{ exchangeState, setExchangeState }}>
          <ConverterCard title="Converter"></ConverterCard>
          <DashboardCard title="Dashboard"></DashboardCard>
        </ExchangeContext>
      </main>
    </>
  );
}

export default App;
