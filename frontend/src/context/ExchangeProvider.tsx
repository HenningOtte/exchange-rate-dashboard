import { NewExchangeContext } from "./ExchangeContext";
import { useState } from "react";
import type { ExchangeState } from "../types/exchangeState";
import { loadLocalStorage } from "../services/localStorage";

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

function ExchangeProvider({ children }: { children: React.ReactNode }) {
  const [activeFavoriteId, setActiveFavoriteId] = useState<string | null>(null);
  const [exchange, setExchangeState] = useState(initialExchangeState);
  const [favorites, setFavoritesState] = useState(loadLocalStorage());

  return (
    <NewExchangeContext
      value={{
        activeFavoriteId,
        setActiveFavoriteId,
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
