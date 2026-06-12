import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <img
        className="logo"
        src="./src/assets/icons/currio-logo.svg"
        alt="currio-logo"
      />
      <div className="navbar-actions">
        <button className="navbar-button">Home</button>
        <button className="navbar-button">Favorites</button>
        <img
          className="navbar-avatar"
          src="./src/assets/icons/profile-pic.svg"
          alt="profil-pic"
        />
      </div>
    </div>
  );
}

export default Navbar;
