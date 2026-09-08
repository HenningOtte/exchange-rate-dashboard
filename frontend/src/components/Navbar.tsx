import { useState, useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const authContext = useContext(AuthContext);
  const toggleProfilMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
    authContext?.setLoggedIn(false);
    authContext?.setUser(() => {
      return {
        firstname: "",
        lastname: "",
        email: "",
      };
    });
    toggleProfilMenu();
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <img
          className="logo"
          src="./src/assets/icons/currio-logo.svg"
          alt="currio-logo"
        />
        <div className="navbar-actions">
          <Link
            onClick={() => {
              if (isMenuOpen) toggleProfilMenu();
            }}
            className="navbar-link"
            to={"/"}
          >
            Home
          </Link>
          <Link
            onClick={() => {
              if (isMenuOpen) toggleProfilMenu();
            }}
            className="navbar-link"
            to={"/favorites"}
          >
            Favorites
          </Link>
          <button
            onClick={() => {
              toggleProfilMenu();
            }}
          ></button>
        </div>
      </nav>
      <div className={isMenuOpen ? "profileMenu" : "dNone"}>
        <Link
          onClick={() => {
            toggleProfilMenu();
          }}
          className="profileMenu-link"
          to={"/profil"}
        >
          Profile
        </Link>
        <button
          onClick={() => {
            toggleProfilMenu();
            handleLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
