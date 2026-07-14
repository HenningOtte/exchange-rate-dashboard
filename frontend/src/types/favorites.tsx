import type { ExchangeState } from "./exchangeState";

export type Favorite = {
  id: string;
  name: string;
  creationDate: string;
  state: ExchangeState;
};

export function generateFavorite(
  i: string,
  exchangeName: string,
  exchangeState: ExchangeState,
) {
  let favorite: Favorite = {
    id: i,
    name: exchangeName,
    creationDate: getDate(),

    state: exchangeState,
  };
  return favorite;
}

function getDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${date.getFullYear()}-${month}-${day}`;
}
