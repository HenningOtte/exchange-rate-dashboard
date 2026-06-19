import Navbar from "./components/Navbar";
import ConverterCard from "./features/ConverterCard";
import DashboardCard from "./features/DashboardCard";
import { useState } from "react";
import type { ExchangeContext } from "./types/exchangeState";
import { createContext } from "react";

function App() {
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
  const [exchangeState, setExchangeState] = useState(exchangeContext);

  return (
    <>
      <Navbar></Navbar>
      <main>
        <ConverterCard title="Converter"></ConverterCard>
        <DashboardCard title="Dashboard"></DashboardCard>
      </main>
    </>
  );
}

export default App;
