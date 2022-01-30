import React from "react";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="col-sm-6 col-md-3 col-xxl-2">
      <div className="card h-100">
        <a href={`/product/${product._id}`}>
          <img className="card-img" src={product.image} alt={product.name} />
        </a>
        <div className="card-body">
          <a href={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </a>
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
