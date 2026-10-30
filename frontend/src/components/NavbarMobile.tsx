import { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { postLogout } from "../api/authApi";
import "./Navbar.css";
import "./NavbarMobile.css";
import type { LogoutResponse } from "../api/authApi";

function NavbarMobile() {
  const authContext = useContext(AuthContext);
  let location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      const response: LogoutResponse = await postLogout();
      console.log(response);

      if (response.success) {
        authContext?.setLoggedIn(false);
        authContext?.setUser(() => {
          return {
            firstname: "",
            lastname: "",
            email: "",
          };
        });
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
          <button
            onClick={() => {
              handleLogout();
            }}
          >
            {authContext?.isLoggedIn ? "Logout" : "Login"}
          </button>
        </nav>
      </div>
    </div>
  );
}

export default NavbarMobile;
