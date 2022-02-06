import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen() {
  const { productId } = useParams();
  const { search } = useLocation();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const navigate = useNavigate();

  const qty = search ? Number(search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkOutHandler = () => {
    navigate(`/signIn?redirect=shipping`);
  };

  return (
    <div>
      <div className="row g-3">
        <div className="col-sm-9">
          <h1>Bevásárló lista</h1>
          {cartItems.length === 0 ? (
            <MessageBox>
              A kosár üres. <Link to="/">Keress Terméket!</Link>
            </MessageBox>
          ) : (
            <ul>
              {cartItems.map((item) => (
                <li key={item.product}>
                  <div className="d-flex flex-wrap">
                    <div className="col-sm-2">
                      <img className="w-100" src={item.image} alt={item.name} />
                    </div>
                    <div className="row justify-content-between align-items-center w-75 ms-sm-4">
                      <div className="col offset-sm">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="col offset-sm">
                        <select
                          className="form-select cartFormSelect"
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col offset-sm">{item.price} Huf</div>
                      <div className="col offset-sm">
                        <button
                          className="btn btn-danger btn-sm"
                          type="button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          Törlés
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-sm-3">
          <div className="card sticky-top">
            <div className="card-body">
              <ul>
                <li>
                  <h3>
                    Összesen{" "}
                    <strong>{cartItems.reduce((a, c) => a + c.qty, 0)}</strong>
                    db termék:{" "}
                    <strong>
                      {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </strong>{" "}
                    Huf
                  </h3>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={checkOutHandler}
                    className="button-primary button-block"
                    disabled={cartItems.length === 0}
                  >
                    Vásárlás
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
