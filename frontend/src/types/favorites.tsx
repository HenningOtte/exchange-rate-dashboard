import type { ExchangeState } from "./exchangeState";

export type Favorite = {
  id: string;
  name: string;
  creationDate: string;
  state: ExchangeState;
};
