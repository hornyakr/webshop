import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";

function App() {
  const yearNow = new Date().getFullYear();

  return (
    <BrowserRouter>
      <div>
        <header className="container-fluid p-1">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <a className="brand" href="/">
                Webshop
              </a>
            </div>
            <div>
              <a href="/cart">Kosár</a>
              <a href="/signIn">Bejelentkezés</a>
            </div>
          </div>
        </header>
        <main className="container-fluid container-xxl my-3">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact></Route>
            <Route
              path="/product/:productId"
              element={<ProductScreen />}
            ></Route>
            <Route path="/cart/:productId" element={<CartScreen />}></Route>
          </Routes>
        </main>
        <footer className="d-flex justify-content-center position-fixed fixed-bottom">
          Hornyák Richárd &copy; 2022 - {yearNow} Minden jog fenntartva
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
