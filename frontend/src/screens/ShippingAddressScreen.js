import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(
    shippingAddress ? shippingAddress.fullName : ""
  );
  const [address, setAddress] = useState(
    shippingAddress ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress ? shippingAddress.postalCode : ""
  );
  const [country, setCountry] = useState(
    shippingAddress ? shippingAddress.country : ""
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/signIn");
    }
  }, [navigate, userInfo]);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    navigate("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2 className="ps-2">Szállítási Adatok</h2>
            <form className="container" onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">
                  Teljes Név
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  value={fullName}
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Cím
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  Város
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="postalCode" className="form-label">
                  Irányítószám
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="postalCode"
                  value={postalCode}
                  required
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="country" className="form-label">
                  Ország
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="country"
                  value={country}
                  required
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
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
