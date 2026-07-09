import "./Navbar.css";
import "./NavbarMobile.css";

function NavbarMobile() {
  return (
    <div className="navbar-mobile">
      <img
        className="logo"
        src="./src/assets/icons/currio-logo.svg"
        alt="currio-logo"
      />
      <button className="mobile-btn-menu">
        <div className="bm-divider"></div>
        <div className="bm-divider"></div>
        <div className="bm-divider"></div>
      </button>
    </div>
  );
}

export default NavbarMobile;
