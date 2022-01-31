import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="col-sm-6 col-md-3 col-xxl-2">
      <div className="card h-100">
        <Link to={`/product/${product._id}`}>
          <img className="w-100" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">
            <b className="textLarger">{product.price}</b> Huf
          </div>
        </div>
      </div>
    </div>
  );
}
