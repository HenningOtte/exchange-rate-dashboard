import "../../pages/Favorites.css";
import "./FavoriteRow.css";
import type { Favorite } from "../../types/favorites";
import { loadLocalStorage, removeFavorite } from "../../services/localStorage";
import { useContext } from "react";
import { NewExchangeContext } from "../../context/ExchangeContext";

type Row = {
  favorite: Favorite;
  border: boolean;
};

function FavoriteRow({ favorite, border }: Row) {
  const context = useContext(NewExchangeContext);

  return (
    <tr className="favoriteRow">
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
          onClick={() => {
            removeFavorite(favorite.id);
            context?.setFavoritesState(loadLocalStorage());
          }}
          className="delete-btn"
        ></button>
      </td>
    </tr>
  );
}

export default FavoriteRow;
