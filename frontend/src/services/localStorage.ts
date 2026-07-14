import type { Favorite } from "../types/favorites";
import { generateFavorite } from "../types/favorites";
import type { ExchangeState } from "../types/exchangeState";

export function saveToLocal(
  exchangeState: ExchangeState,
  exchangeName: string,
) {
  let favorites: Favorite[] = loadLocalStorage();

  if (favorites.length == 0) {
    favorites[0] = generateFavorite(
      crypto.randomUUID(),
      exchangeName,
      exchangeState,
    );
  } else {
    favorites[favorites.length] = generateFavorite(
      crypto.randomUUID(),
      exchangeName,
      exchangeState,
    );
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

export function loadLocalStorage() {
  let favorites: Favorite[] = [];
  let local = localStorage.getItem("favorites");

  if (local?.length == 0 || local == null) {
    return favorites;
  } else {
    favorites = JSON.parse(local);
    return favorites;
  }
}

export function removeFavorite(id: string) {
  let favorites = loadLocalStorage();
  let newfavorites: Favorite[] = favorites.filter((favorite) => {
    return favorite.id != id;
  });
  localStorage.setItem("favorites", JSON.stringify(newfavorites));
}
