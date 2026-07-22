import type { ExchangeState } from "./exchangeState";
import { getCurrentDate } from "../utils/date";

export type Favorite = {
  id: string;
  name: string;
  creationDate: string;
  state: ExchangeState;
};

export type FavoriteResponse = {
  id: string;
  name: string;
  creationDate: string;
  state: ExchangeState;
  __v: number;
  _id: string;
}

export function generateFavorite(
  i: string,
  exchangeName: string,
  exchangeState: ExchangeState,
  creationDate: string = getCurrentDate(),
) {
  let favorite: Favorite = {
    id: i,
    name: exchangeName,
    creationDate: creationDate,

    state: exchangeState,
  };
  return favorite;
}
