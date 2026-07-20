import type { Favorite } from "../types/favorites";

const favoritesEndpoint = "http://localhost:3000/favorites";

export async function fetchAllFavorites() {
  const apiUrl = favoritesEndpoint;

  try {
    const response = await fetch(apiUrl);
    const favorites: Favorite[] = await response.json();
    console.log(favorites);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchSingleFavorite(id: String) {
  const apiUrl = `${favoritesEndpoint}/${id}`;

  try {
    const response = await fetch(apiUrl);
    const favorites: Favorite[] = await response.json();
    console.log(favorites);
  } catch (error) {
    console.error(error);
  }
}
