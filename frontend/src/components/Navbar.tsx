import { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

function Navbar() {
  const authContext = useContext(AuthContext);
  const toggleProfilMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

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
      <div ref={dropdownRef} className={isMenuOpen ? "profileMenu" : "dNone"}>
        <Link
          onClick={() => {
            toggleProfilMenu();
          }}
          className="profileMenu-link"
          to={"/profil"}
        >
          Profile
        </Link>
        <Link
          onClick={() => {
            handleLogout();
          }}
          to={"/profil"}
          className="profileMenu-link"
        >
          {authContext?.isLoggedIn ? "Logout" : "Login"}
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
