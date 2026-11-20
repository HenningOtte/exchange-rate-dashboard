import FavoriteRow from "../features/favorite/FavoriteRow";
import { NewExchangeContext } from "../context/ExchangeContext";
import "./Favorites.css";
import { useContext, useState } from "react";
import type { Favorite } from "../types/favorites";

function Favorites() {
  const newExchangeContext = useContext(NewExchangeContext);

  const [sortOrder, setSortOrder] = useState({
    name: "asc",
    initialValue: "asc",
    targetValue: "asc",
    creationDate: "desc",
  });

  const sortFavoritesByName = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort((a: Favorite, b: Favorite) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (sortOrder.name == "asc") {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
        } else {
          if (nameA < nameB) return +1;
          if (nameA > nameB) return -1;
        }
        return 0;
      });
    });

    setSortOrder((order) => {
      return {
        name: order.name == "asc" ? "desc" : "asc",
        initialValue: order.initialValue,
        targetValue: order.targetValue,
        creationDate: order.creationDate,
      };
    });
  };

  const sortFavoritesByValue = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
    target: "initialValue" | "targetValue",
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort((a, b) => {
        const valueA = parseFloat(a.state.converter[target]);
        const valueB = parseFloat(b.state.converter[target]);

        return sortOrder[target] === "asc" ? valueA - valueB : valueB - valueA;
      });
    });

    setSortOrder((order) => ({
      ...order,
      [target]: order[target] === "asc" ? "desc" : "asc",
    }));
  };

  const sortFavoritesByDate = (
    e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>,
  ) => {
    e.stopPropagation();

    newExchangeContext?.setFavoritesState((fav) => {
      return [...fav].sort((a, b) => {
        const dateA = new Date(a.creationDate).getTime();
        const dateB = new Date(b.creationDate).getTime();

        return sortOrder.creationDate === "asc" ? dateA - dateB : dateB - dateA;
      });
    });

    setSortOrder((order) => ({
      ...order,
      creationDate: order.creationDate === "asc" ? "desc" : "asc",
    }));
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
