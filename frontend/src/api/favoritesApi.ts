import type { Favorite, FavoriteResponse } from "../types/favorites";
import { generateFavorite } from "../types/favorites";
import { getCurrentDate } from "../utils/date";

const favoritesEndpoint = "http://localhost:3000/favorites";

export async function fetchAllFavorites() {
  try {
    const response = await fetch(favoritesEndpoint);
    const favoritesApi: FavoriteResponse[] = await response.json();
    const favorites: Favorite[] = favoritesApi.map((fav) => {
      const { id, name, creationDate, state } = fav;
      return generateFavorite(id, name, state, creationDate);
    });
    return favorites;
  } catch (error) {
    return [];
  }
}

export async function fetchSingleFavorite(id: String) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl);
    const favoriteApi: FavoriteResponse = await response.json();
    const { id, name, creationDate, state } = favoriteApi;
    const favorite: Favorite = generateFavorite(id, name, state, creationDate);
    console.log(favorite);
  } catch (error) {
    console.error(error);
  }
}

export async function postSingleFavorite(
  name: string,
  initialValue: string,
  targetValue: string,
  sourceCurrency: "USD" | "EUR" | "GBP",
  targetCurrency: "USD" | "EUR" | "GBP",
  historicalDate: string,
  isHistorical: boolean,
  dateFrom: string,
  dateTo: string,
) {
  const apiUrl = favoritesEndpoint;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        creationDate: getCurrentDate(),
        state: {
          converter: {
            initialValue: initialValue,
            targetValue: targetValue,
            sourceCurrency: sourceCurrency,
            targetCurrency: targetCurrency,
            historicalDate: historicalDate,
            isHistorical: isHistorical,
          },
          dashboard: {
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        },
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function putSingleFavorite(
  name: string,
  initialValue: string,
  targetValue: string,
  sourceCurrency: "USD" | "EUR" | "GBP",
  targetCurrency: "USD" | "EUR" | "GBP",
  historicalDate: string,
  isHistorical: boolean,
  dateFrom: string,
  dateTo: string,
  id: string,
) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        creationDate: getCurrentDate(),
        state: {
          converter: {
            initialValue: initialValue,
            targetValue: targetValue,
            sourceCurrency: sourceCurrency,
            targetCurrency: targetCurrency,
            historicalDate: historicalDate,
            isHistorical: isHistorical,
          },
          dashboard: {
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        },
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFavorite(id: string) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl, { method: "DELETE" });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
