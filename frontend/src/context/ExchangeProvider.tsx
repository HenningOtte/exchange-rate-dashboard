import { NewExchangeContext } from "./ExchangeContext";
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
    name: "My Currency",
    creationDate: "2026-04-10",
    state: {
      converter: {
        initialValue: "1000",
        targetValue: "1200",
        sourceCurrency: "USD",
        targetCurrency: "EUR",
        historicalDate: "",
        isHistorical: false,
      },
      dashboard: {
        dateFrom: "",
        dateTo: "",
      },
    },
  },
];

function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const [exchange, setExchangeState] = useState(initialExchangeState);
  const [favorites, setFavoritesState] = useState(initialFavorites);

  return (
    <NewExchangeContext
      value={{
        exchange,
        setExchangeState,
        favorites,
        setFavoritesState,
      }}
    >
      {children}
    </NewExchangeContext>
  );
}

export default ExchangeProvider;
