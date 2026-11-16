import FavoriteRow from "../features/favorite/FavoriteRow";
import { NewExchangeContext } from "../context/ExchangeContext";
import "./Favorites.css";
import { useContext } from "react";
import type { Favorite } from "../types/favorites";

function Favorites() {
  const newExchangeContext = useContext(NewExchangeContext);

  const sortFavoritesByName = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort((a: Favorite, b: Favorite) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    });
  };

  const sortFavoritesByValue = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    target: "initialValue" | "targetValue",
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort(
        (a: Favorite, b: Favorite) =>
          parseFloat(a.state.converter[target]) -
          parseFloat(b.state.converter[target]),
      );
    });
  };

  const sortFavoritesByDate = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort(
        (a, b) =>
          new Date(a.creationDate).getTime() -
          new Date(b.creationDate).getTime(),
      );
    });
  };

  return (
    <div className="favorites">
      <div className="favorites-card">
        <h3>Favorites</h3>
        <div className="test">
          <table className="favorites-table">
            <thead>
              <tr className="favorites-table-header">
                <th
                  onClick={(e) => {
                    sortFavoritesByName(e);
                  }}
                  className="border-bottom"
                >
                  Name
                </th>
                <th
                  onClick={(e) => {
                    sortFavoritesByValue(e, "initialValue");
                  }}
                  className="border-bottom"
                >
                  Initial value
                </th>
                <th
                  onClick={(e) => {
                    sortFavoritesByValue(e, "targetValue");
                  }}
                  className="border-bottom"
                >
                  Target Value
                </th>
                <th
                  onClick={(e) => {
                    sortFavoritesByDate(e);
                  }}
                  className="border-bottom"
                >
                  Date
                </th>
                <th className="border-bottom"></th>
              </tr>
            </thead>
            <tbody>
              {newExchangeContext != null &&
                newExchangeContext.favorites.map((exchange, i) => {
                  return (
                    <FavoriteRow
                      key={exchange.id}
                      favorite={exchange}
                      border={i < newExchangeContext.favorites.length - 1}
                    ></FavoriteRow>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Favorites;
