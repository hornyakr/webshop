import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Rating from "../components/Rating";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsProduct } from "../actions/productActions";

export default function ProductScreen() {
  const dispatch = useDispatch();

  const { productId } = useParams();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => navigate(`/cart/${productId}?qty=${qty}`);

  return (
    <div className="container-fluid">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">
            <div className="d-flex align-items-center pb-3">
              <div>
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </div>
              <div className="ps-3 textLarger">Vissza a Főoldalra</div>
            </div>
          </Link>
          <div className="row g-5">
            <div className="col-sm-6">
              <img className="w-100" src={product.image} alt={product.name} />
            </div>
            <div className="col-sm-3">
              <div className="sticky-top">
                <ul>
                  <li className="mt-0">
                    <h1 className="pt-1">{product.name}</h1>
                  </li>
                  <li>
                    <Rating
                      rating={product.rating}
                      numReviews={product.numReviews}
                    ></Rating>
                  </li>
                  <li className="d-flex flex-wrap justify-content-between">
                    Összeg{" "}
                    <span>
                      <b>{product.price}</b> Huf
                    </span>
                  </li>
                  <li className="d-flex flex-wrap justify-content-between">
                    Leírás
                    <span>{product.description}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="card sticky-top">
                <div className="card-body">
                  <ul>
                    <li>
                      <div className="d-flex flex-wrap justify-content-between">
                        Összeg
                        <span>
                          <b>{product.price}</b> Huf
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex flex-wrap justify-content-between">
                        Állapot
                        <div>
                          <b>
                            {product.countInStock > 0 ? (
                              <span className="success">Elérhető</span>
                            ) : (
                              <span className="danger">Nem elérhető</span>
                            )}
                          </b>
                        </div>
                      </div>
                    </li>
                    {product.countInStock > 0 && (
                      <>
                        <li>
                          <div className="d-flex flex-wrap justify-content-between align-items-end">
                            <div>Mennyiség</div>
                            <div>
                              <select
                                className="form-select"
                                value={qty}
                                onChange={(e) => setQty(e.target.value)}
                              >
                                {[...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </li>
                        <li>
                          <button
                            onClick={addToCartHandler}
                            className="button-primary button-block"
                          >
                            Kosárhoz adás
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
