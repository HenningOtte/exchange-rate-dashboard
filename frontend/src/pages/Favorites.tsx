import FavoriteRow from "../features/favorite/FavoriteRow";
import { NewExchangeContext } from "../context/ExchangeContext";
import "./Favorites.css";
import { useContext, useEffect } from "react";
import { loadLocalStorage } from "../services/localStorage";
import { AuthContext } from "../context/AuthProvider";
import { fetchAllFavorites } from "../api/favoritesApi";

function Favorites() {
  const newExchangeContext = useContext(NewExchangeContext);
  const authContext = useContext(AuthContext);

  async function loadFavorites() {
    if (authContext?.isLoggedIn) {
      newExchangeContext?.setFavoritesState(await fetchAllFavorites());
    } else {
      newExchangeContext?.setFavoritesState(loadLocalStorage());
    }
  }

  useEffect(() => {
    loadFavorites();
  }, [authContext?.isLoggedIn]);

  return (
    <div
      className="favorites">
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
