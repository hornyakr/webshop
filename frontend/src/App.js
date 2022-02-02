import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SignInScreen from "./screens/SignInScreen";
import { signOut } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ErrorScreen from "./screens/ErrorScreen";

function App() {
  const yearNow = new Date().getFullYear();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const dispatch = useDispatch();
  const singOutHandler = () => {
    dispatch(signOut());
  };
  return (
    <Router>
      <div>
        <header className="container-fluid p-1">
          <nav className="d-flex justify-content-between align-items-center">
            <div>
              <Link className="brand" to="/">
                Webshop
              </Link>
            </div>
            <div>
              <Link to="/cart">
                <button
                  type="button"
                  className="btn btn-primary position-relative"
                >
                  Kosár
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItems.length}
                      <span className="visually-hidden">termék</span>
                    </span>
                  )}
                </button>
              </Link>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name} <i className="fa fa-caret-down fa-sm"></i>
                  </Link>
                  <div className="dropdown-content">
                    <Link to="#signOut" onClick={singOutHandler}>
                      Kijelentkezés
                    </Link>
                  </div>
                </div>
              ) : (
                <Link to="/signIn">Bejelentkezés</Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container-fluid container-xxl my-3">
          <Routes>
            <Route
              path="/product/:productId"
              element={<ProductScreen />}
            ></Route>
            <Route path="/cart/:productId" element={<CartScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/signIn" element={<SignInScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="*" element={<ErrorScreen />}></Route>
          </Routes>
        </main>
        <footer className="d-flex justify-content-center position-fixed fixed-bottom">
          Hornyák Richárd &copy; 2022 - {yearNow} Minden jog fenntartva
        </footer>
      </div>
    </Router>
  );
}

export default App;
