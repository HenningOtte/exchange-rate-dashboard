import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <img
        className="logo"
        src="./src/assets/icons/currio-logo.svg"
        alt="currio-logo"
      />
      <nav className="navbar-actions">
        <Link className="navbar-link" to={"/"}>
          Home
        </Link>
        <Link className="navbar-link" to={"/favorites"}>
          Favorites
        </Link>
        <Link to={"/profil"}>
          <img
            className="navbar-avatar"
            src="./src/assets/icons/profile-pic.svg"
            alt="profil-pic"
          />
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;
