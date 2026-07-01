import "../pages/Favorites.css";
import "./FavoriteRow.css";

type favoriteRow = {
  name: string;
  initialValue: string;
  targetValue: string;
  date: string;
  border: boolean;
};

function FavoriteRow({
  name,
  initialValue,
  targetValue,
  date,
  border,
}: favoriteRow) {
  return (
    <tr className="favoriteRow">
      <td className={border ? "border-bottom" : ""}>{name}</td>
      <td className={border ? "border-bottom" : ""}>{initialValue}</td>
      <td className={border ? "border-bottom" : ""}>{targetValue}</td>
      <td
        className={
          border ? "border-bottom favorites-last-td" : "favorites-last-td"
        }
      >
        {date}
        <button className="delete-btn"></button>
      </td>
    </tr>
  );
}

export default FavoriteRow;
