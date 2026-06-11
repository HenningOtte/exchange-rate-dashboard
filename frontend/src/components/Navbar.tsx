import "./Navbar.css";

type NavbarProps = {
  title: string;
};

function Navbar() {
  return (
    <div className="navbar br8">
      <img className="logo" src="./src/assets/icons/currio-logo.svg" alt="currio-logo" />
    </div>
  );
}

export default Navbar;
