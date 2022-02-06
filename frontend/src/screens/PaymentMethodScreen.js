import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen() {
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  useEffect(() => {
    if (!userInfo) {
      navigate("/shipping");
    }
  }, [navigate, userInfo]);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="ps-2">Fizetés kiválasztása</h2>
            <form onSubmit={submitHandler}>
              <fieldset className="py-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="PayPal"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    PayPal
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="stripe"
                    value="Stripe"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="stripe">
                    Stripe
                  </label>
                </div>
              </fieldset>
              <button type="submit" className="btn btn-primary">
                Tovább
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
