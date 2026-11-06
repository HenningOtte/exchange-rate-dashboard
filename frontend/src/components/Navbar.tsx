import { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { postLogout } from "../api/authApi";
import type { LogoutResponse } from "../api/authApi";
import { NewExchangeContext } from "../context/ExchangeContext";
import { loadLocalStorage } from "../services/localStorage";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => ({
  backgroundColor: isActive ? "#82adeb" : "",
});

function Navbar() {
  const authContext = useContext(AuthContext);
  const newExchangeContext = useContext(NewExchangeContext);

  const toggleProfilMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

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
        newExchangeContext?.setFavoritesState(loadLocalStorage());
      }
      toggleProfilMenu();
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        e.target instanceof Node &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <img
          className="logo"
          src="./src/assets/icons/currio-logo.svg"
          alt="currio-logo"
        />
        <div className="navbar-actions">
          <NavLink
            onClick={() => {
              if (isMenuOpen) toggleProfilMenu();
            }}
            className="navbar-link"
            to={"/"}
            style={navLinkStyles}
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              if (isMenuOpen) toggleProfilMenu();
            }}
            className="navbar-link"
            to={"/favorites"}
            style={navLinkStyles}
          >
            Favorites
          </NavLink>
          <button
            onClick={() => {
              toggleProfilMenu();
            }}
          ></button>
        </div>
      </nav>
      <div
        ref={dropdownRef}
        className={
          isMenuOpen ? "profileMenu" : "profileMenu profileMenu-closed"
        }
      >
        <NavLink
          onClick={() => {
            toggleProfilMenu();
          }}
          className="profileMenu-link"
          to={"/profil"}
        >
          Profile
        </NavLink>
        <NavLink
          onClick={() => {
            if (authContext?.isLoggedIn) handleLogout();
          }}
          to={"/profil"}
          className="profileMenu-link"
        >
          {authContext?.isLoggedIn ? "Logout" : "Login"}
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
