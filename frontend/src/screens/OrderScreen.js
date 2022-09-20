import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder } from "../redux/actions/orderActions";

export default function OrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  console.log(order);
  const { id } = useParams();
  useEffect(() => {
    if (order) {
      const addPaypalScript = async () => {
        const { data } = await Axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://paypal.com/js?client-id=${data}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };
      if (!order._id) {
        dispatch(detailsOrder(id));
      } else {
        if (!order.isPaid) {
          if (!window.paypal) {
            addPaypalScript();
          } else {
            setSdkReady(true);
          }
        }
      }
    }
  }, [dispatch, id, order, sdkReady]);
  useEffect(() => {
    dispatch(detailsOrder(id));
  }, [dispatch, id]);

  const successPaymentHandler = () => {
    //todo
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Rendelés: {order._id}</h1>
      <div className="row g-3">
        <div className="col-sm-9">
          <ul>
            <li className="m-0">
              <div className="card">
                <div className="card-body">
                  <h2>Szállítás</h2>
                  <p>
                    <strong className="me-3">Név:</strong>
                    {order.shippingAddress.fullName}
                    <br />
                    <strong className="me-3">Cím:</strong>
                    {order.shippingAddress.country},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}{" "}
                    {order.shippingAddress.address}
                  </p>
                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Kiszállítva: {order.deliveredAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Nincs kiszállítva</MessageBox>
                  )}
                </div>
              </div>
            </li>
            <li className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h2>Fizetés</h2>
                  <p>
                    <strong className="me-3">Típus:</strong>
                    {order.paymentMethod}
                  </p>

                  {order.isDelivered ? (
                    <MessageBox variant="success">
                      Fizetve: {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Nincs kifizetve</MessageBox>
                  )}
                </div>
              </div>
            </li>
            <li className="mt-3">
              <div className="card">
                <div className="card-body">
                  <h2>Termékek</h2>
                  <ul>
                    {order.orderItems.map((item) => (
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
                  <div>{order.itemsPrice - order.itemsPrice * 0.27} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>Brutto Ár:</div>
                  <div>{order.itemsPrice} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>Szállítási Díj:</div>
                  <div>{order.shippingPrice} Huf</div>
                </li>
                <li className="d-flex justify-content-between">
                  <div>
                    <strong>Összesen: </strong>
                  </div>
                  <div>
                    <strong>{order.totalPrice} Huf</strong>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <LoadingBox></LoadingBox>
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    )}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
