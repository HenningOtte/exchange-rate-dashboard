import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { postLogout } from "../api/authApi";
import "./Navbar.css";
import "./NavbarMobile.css";
import type { LogoutResponse } from "../api/authApi";
import { NewExchangeContext } from "../context/ExchangeContext";
import { loadLocalStorage } from "../services/localStorage";

function NavbarMobile() {
  const authContext = useContext(AuthContext);
  const exchangeContext = useContext(NewExchangeContext);
  let location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const response: LogoutResponse = await postLogout();

      if (response.success) {
        authContext?.setLoggedIn(false);
        authContext?.setUser({
          firstname: "",
          lastname: "",
          email: "",
        });
        exchangeContext?.setFavoritesState(loadLocalStorage());
      }
      setMenuOpen(!menuOpen);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div>
      <div className="navbar-mobile">
        <img
          className="logo"
          src="./src/assets/icons/currio-logo.svg"
          alt="currio-logo"
        />
        <button
          onClick={() => {
            toggleMenu();
          }}
          className="mobile-btn-menu"
        >
          <div
            className={menuOpen ? "bm-divider firstDivider" : "bm-divider"}
          ></div>
          <div className={menuOpen ? "dnone" : "bm-divider"}></div>
          <div
            className={menuOpen ? "bm-divider lastDivider" : "bm-divider"}
          ></div>
        </button>
      </div>
      <div className={menuOpen ? "m-menu " : "m-menu hide-menu"}>
        <nav className="m-navbar-actions">
          <Link className="m-navbar-link" to={"/"}>
            Home
          </Link>
          <Link className="m-navbar-link" to={"/favorites"}>
            Favorites
          </Link>
          <Link className="m-navbar-link" to={"/profil"}>
            Profil
          </Link>
          <Link
            className="m-navbar-link"
            onClick={() => {
              if (authContext?.isLoggedIn) handleLogout();
            }}
            to={"/profil"}
          >
            {authContext?.isLoggedIn ? "Logout" : "Login"}
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default NavbarMobile;
