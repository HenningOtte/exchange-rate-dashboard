import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";
import ExchangeProvider from "./context/ExchangeProvider";
import NavbarMobile from "./components/NavbarMobile";
import AuthProvider from "./context/AuthProvider";
import ValidationProvider from "./context/ValidationProvider";
import NotificationProvider from "./context/NotificationProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <ExchangeProvider>
          <AuthProvider>
            <NotificationProvider>
              <NavbarMobile></NavbarMobile>
              <Navbar></Navbar>
              <main>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ValidationProvider>
                        <Home />
                      </ValidationProvider>
                    }
                  />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/profil" element={<Profile />} />
                </Routes>
              </main>
            </NotificationProvider>
          </AuthProvider>
        </ExchangeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
