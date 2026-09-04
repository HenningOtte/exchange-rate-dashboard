import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ExchangeProvider from "./context/ExchangeProvider";
import NavbarMobile from "./components/NavbarMobile";
import AuthProvider from "./context/AuthProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <NavbarMobile></NavbarMobile>
          <Navbar></Navbar>
          <main>
            <ExchangeProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profil" element={<Profile />} />
              </Routes>
            </ExchangeProvider>
          </main>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
