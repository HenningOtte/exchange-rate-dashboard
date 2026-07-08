import type { ExchangeState } from "../types/exchangeState";
import type { Favorite } from "../types/favorites";
import { createContext } from "react";

type ExchangeContextValue = {
  exchange: ExchangeState;
  setExchangeState: React.Dispatch<React.SetStateAction<ExchangeState>>;

  favorites: Favorite[];
  setFavoritesState: React.Dispatch<React.SetStateAction<Favorite[]>>;
};

export const NewExchangeContext = createContext<ExchangeContextValue | null>(null);
