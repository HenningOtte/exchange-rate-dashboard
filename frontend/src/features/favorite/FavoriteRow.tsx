import "../../pages/Favorites.css";
import "./FavoriteRow.css";
import type { Favorite } from "../../types/favorites";

type Row = {
  favorite: Favorite;
  border: boolean;
}

function FavoriteRow({
  favorite,
  border
}: Row) {
  return (
    <tr className="favoriteRow">
      <td className={border ? "border-bottom" : ""}>{favorite.id}. {favorite.name}</td>
      <td className={border ? "border-bottom" : ""}>{favorite.state.converter.initialValue} {favorite.state.converter.sourceCurrency}</td>
      <td className={border ? "border-bottom" : ""}>{favorite.state.converter.targetValue} {favorite.state.converter.targetCurrency}</td>
      <td
        className={
          border ? "border-bottom" : ""
        }
      >
        {favorite.creationDate}
      </td>
      <td className={border ? "border-bottom" : ""}>
        <button className="delete-btn"></button>
      </td>
    </tr>
  );
}

export default FavoriteRow;
