import FavoriteRow from "../features/favorite/FavoriteRow";
import { NewExchangeContext } from "../context/ExchangeContext";
import "./Favorites.css";
import { useContext } from "react";
import { loadLocalStorage } from "../services/localStorage";

function Favorites() {
  const context = useContext(NewExchangeContext);

  return (
    <div
      className="favorites"
      onLoad={() => {
        context?.setFavoritesState(loadLocalStorage());
      }}
    >
      <div className="favorites-card">
        <h3>Favorites</h3>
        <div className="test">
          <table className="favorites-table">
            <thead>
              <tr className="favorites-table-header">
                <th className="border-bottom">Name</th>
                <th className="border-bottom">Initial value</th>
                <th className="border-bottom">Target Value</th>
                <th className="border-bottom">Date</th>
                <th className="border-bottom"></th>
              </tr>
            </thead>
            <tbody>
              {context != null &&
                context.favorites.map((exchange, i) => {
                  return (
                    <FavoriteRow
                      key={exchange.id}
                      favorite={exchange}
                      border={i < context.favorites.length - 1}
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
