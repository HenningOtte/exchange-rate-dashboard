import { ExchangeContext } from "./ExchangeContext";
import { Children, useState } from "react";
import type { ExchangeState } from "../types/exchangeState";
import type { Favorite } from "../types/favorites";

const initialExchangeState: ExchangeState = {
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

const initialFavorites: Favorite[] = [
  {
    id: "1",
    name: "1. My Favorite",
    initialValue: "1000",
    targetValue: "1100",
    sourceCurrency: "USD",
    targetCurrency: "EUR",
    historicalDate: "01.04.2026",
  },
  {
    id: "2",
    name: "2. My Favorite",
    initialValue: "1000",
    targetValue: "1100",
    sourceCurrency: "USD",
    targetCurrency: "EUR",
    historicalDate: "01.04.2026",
  },
  {
    id: "3",
    name: "3. My Favorite",
    initialValue: "1000",
    targetValue: "1100",
    sourceCurrency: "USD",
    targetCurrency: "EUR",
    historicalDate: "01.04.2026",
  },
];

function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const [exchange, setExchangeState] = useState(initialExchangeState);
  const [favorites, setFavoritesState] = useState(initialFavorites);

  return (
    <ExchangeContext
      value={{
        exchange,
        setExchangeState,
        favorites,
        setFavoritesState,
      }}
    >
      {children}
    </ExchangeContext>
  );
}

export default ExchangeProvider;
