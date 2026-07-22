import "../../pages/Favorites.css";
import "./FavoriteRow.css";
import type { Favorite } from "../../types/favorites";
import { loadLocalStorage, removeFavorite } from "../../services/localStorage";
import { useContext } from "react";
import { NewExchangeContext } from "../../context/ExchangeContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { deleteFavorite, fetchAllFavorites } from "../../api/favoritesApi";

type Row = {
  favorite: Favorite;
  border: boolean;
};

function FavoriteRow({ favorite, border }: Row) {
  const context = useContext(NewExchangeContext);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (authContext?.isLoggedIn) {
      await deleteFavorite(favorite.id);
      context?.setFavoritesState(await fetchAllFavorites());
    } else {
      removeFavorite(favorite.id);
      context?.setFavoritesState(loadLocalStorage());
    }
  };

  function openFavorite() {
    if (context == null) return;

    const selectedFavorite = context.favorites.find(
      (fav) => fav.id === favorite.id,
    );

    if (selectedFavorite) {
      context.setActiveFavoriteId(selectedFavorite.id);
      context.setExchangeState(selectedFavorite.state);
      navigate("/");
    }
  }

  return (
    <tr
      className="favoriteRow"
      onClick={() => {
        openFavorite();
      }}
    >
      <td className={border ? "border-bottom" : ""}>{favorite.name}</td>
      <td className={border ? "border-bottom" : ""}>
        {favorite.state.converter.initialValue}{" "}
        {favorite.state.converter.sourceCurrency}
      </td>
      <td className={border ? "border-bottom" : ""}>
        {favorite.state.converter.targetValue}{" "}
        {favorite.state.converter.targetCurrency}
      </td>
      <td className={border ? "border-bottom" : ""}>{favorite.creationDate}</td>
      <td className={border ? "border-bottom" : ""}>
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            handleDelete(e);
          }}
          className="delete-btn"
        ></button>
      </td>
    </tr>
  );
}

export default FavoriteRow;
