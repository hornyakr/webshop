import React from "react";
import { Link, useParams } from "react-router-dom";

import Rating from "../components/Rating";
import data from "../data";

export default function ProductScreen() {
  const { id } = useParams();
  const product = data.products.find((x) => x._id == id);
  if (!product) {
    return <div>A termék nem elérhető.</div>;
  }

  return (
    <div>
      <Link to="/">
        <div className="d-flex align-items-center pb-3">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
          <div className="ps-2 textLarger">Vissza a Főoldalra</div>
        </div>
      </Link>
      <div className="row g-5">
        <div className="col-sm-6 col2">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="col-sm-3 col1">
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
        <div className="col-sm-3 col1">
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
                          <span className="error">Nem elérhető</span>
                        )}
                      </b>
                    </div>
                  </div>
                </li>
                <li>
                  <button className="button-primary button-block">
                    Kosárhoz adás
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
