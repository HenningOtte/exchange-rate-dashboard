import type {
  Favorite,
  FavoriteResponse,
  ErrorResponse,
  FavoriteError,
} from "../types/favorites";
import { generateFavorite } from "../types/favorites";
import { getCurrentDate } from "../utils/date";

const favoritesEndpoint = "http://localhost:3000/favorites";

export async function fetchAllFavorites(token: string) {
  try {
    const response = await fetch(favoritesEndpoint, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse: ErrorResponse = await response.json();
      const favoriteError: FavoriteError = {
        status: response.status,
        message: errorResponse.message,
      };
      return favoriteError;
    }

    const favoritesApi: FavoriteResponse[] = await response.json();
    const favorites: Favorite[] = favoritesApi.map((fav) => {
      const { id, name, creationDate, state } = fav;
      return generateFavorite(id, name, state, creationDate);
    });
    return favorites;
  } catch (error) {
    const favoriteError: FavoriteError = {
      status: 504,
      message: "Server not responding; try again later.",
    };
    return favoriteError;
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
  token: string,
) {
  const apiUrl = favoritesEndpoint;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
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
  token: string,
) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
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

export async function deleteFavorite(id: string, token: string) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
