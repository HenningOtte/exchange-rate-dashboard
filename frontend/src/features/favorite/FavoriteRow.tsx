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
      <td className={border ? "border-bottom" : ""}>{favorite.initialValue}</td>
      <td className={border ? "border-bottom" : ""}>{favorite.targetValue}</td>
      <td
        className={
          border ? "border-bottom favorites-last-td" : "favorites-last-td"
        }
      >
        {favorite.date}
        <button className="delete-btn"></button>
      </td>
    </tr>
  );
}

export default FavoriteRow;
