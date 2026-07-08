import FavoriteRow from "../features/favorite/FavoriteRow";
import { NewExchangeContext } from "../context/ExchangeContext.ts"
import "./Favorites.css";
import { useContext } from "react";

function Favorites() {
  const { favorites } = useContext(NewExchangeContext);

  return (
    <div className="favorites">
      <div className="favorites-card">
        <h3>Favorites</h3>
        <table className="favorites-table">
          <thead>
            <tr className="favorites-table-header">
              <th className="border-bottom">Name</th>
              <th className="border-bottom">Initial value</th>
              <th className="border-bottom">Target Value</th>
              <th className="border-bottom">Date</th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((exchange, i) => {
              return (
                <FavoriteRow
                  key={exchange.id}
                  favorite={exchange}
                  border={i < favorites.length - 1}
                ></FavoriteRow>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Favorites;
