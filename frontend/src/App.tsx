import Navbar from "./components/Navbar";
import type { ExchangeState } from "./types/exchangeState";
import React, { createContext } from "react";
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
        <NavbarMobile></NavbarMobile>
        <Navbar></Navbar>
        <main>
          <AuthProvider>
            <ExchangeProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/profil" element={<Profile />} />
              </Routes>
            </ExchangeProvider>
          </AuthProvider>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
