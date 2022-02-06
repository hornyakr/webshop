import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";

export default function PlaceOrderScreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  useEffect(() => {
    if (!userInfo) {
      navigate("/payment");
    }
  }, [navigate, userInfo]);

  const toPrice = (num) => Number(num);
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 50000 ? toPrice(0) : toPrice(2000);
  cart.taxPrice = toPrice(0.27 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    //asd
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row g-3">
        <div className="col-sm-9">
          <ul>
            <li className="m-0">
              <div className="card">
                <div className="card-body">
                  <h2>Szállítás</h2>
                  <p>
                    <strong className="me-3">Név:</strong>
                    {shippingAddress.fullName}
                    <br />
                    <strong className="me-3">Cím:</strong>
                    {shippingAddress.country}, {shippingAddress.city},{" "}
                    {shippingAddress.postalCode} {shippingAddress.address}
                    <br />
                  </p>
                </div>
              </div>
            </li>
            <li className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h2>Fizetés</h2>
                  <p>
                    <strong className="me-3">Típus:</strong>
                    {paymentMethod}
                  </p>
                </div>
              </div>
            </li>
            <li className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h2>Termékek</h2>
                  <ul>
                    {cartItems.map((item) => (
                      <li key={item.product}>
                        <div className="d-flex flex-wrap">
                          <div className="col-sm-2">
                            <img
                              className="w-100"
                              src={item.image}
                              alt={item.name}
                            />
                          </div>
                          <div className="row justify-content-between align-items-center w-75 ms-sm-4">
                            <div className="col offset-sm">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </div>
                            <div className="col offset-sm text-end">
                              {item.qty} * {item.price} Huf ={" "}
                              {item.qty * item.price} Huf
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-sm-3">
          <div className="card sticky-top">
            <div className="card-body">
              <h2>Összesítés</h2>
              <ul className="placeOrderSummary">
                <li className="d-flex justify-content-between">
                  <div>Netto Ár:</div>
                  <div>{cart.itemsPrice - cart.itemsPrice * 0.27} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>Brutto Ár:</div>
                  <div>{cart.itemsPrice} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>Szállítási Díj:</div>
                  <div>{cart.shippingPrice} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>
                    <strong>Összesen: </strong>
                  </div>
                  <div>
                    <strong>{cart.totalPrice} Huf</strong>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="button-primary button-block"
                  >
                    Véglegesítés
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
