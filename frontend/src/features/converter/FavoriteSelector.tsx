import "./FavoriteSelector.css";

function FavoriteSelector() {
  return (
    <div className="currency-input-container">
      <p className="currency-label">Favorites</p>
      <input className="favorites-input" type="text" placeholder="Favorites" />
      <button className="favorites-button">
        <div className="favorites-selector-arrow"></div>
      </button>
    </div>
  );
}

export default FavoriteSelector;
