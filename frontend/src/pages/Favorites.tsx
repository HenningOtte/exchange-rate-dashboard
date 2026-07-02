import FavoriteRow from "../features/favorite/FavoriteRow";
import "./Favorites.css";

const favoriteExchanges = [
  {
    name: "Currency",
    initialValue: "1000 USD",
    targetValue: "1100 EUR",
    date: "10.04.2026",
  },
  {
    name: "Currency",
    initialValue: "1000 USD",
    targetValue: "1100 EUR",
    date: "10.04.2026",
  },
  {
    name: "Currency",
    initialValue: "1000 USD",
    targetValue: "1100 EUR",
    date: "10.04.2026",
  },
  {
    name: "Currency",
    initialValue: "1000 USD",
    targetValue: "1100 EUR",
    date: "10.04.2026",
  },
];

function Favorites() {
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
            {favoriteExchanges.map((exchange, i) => {
              console.log(i);

              return (
                <FavoriteRow
                  key={i}
                  name={exchange.name}
                  initialValue={exchange.initialValue}
                  targetValue={exchange.targetValue}
                  date={exchange.date}
                  border={i < favoriteExchanges.length - 1}
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
