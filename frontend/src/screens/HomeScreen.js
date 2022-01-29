import React from "react";
import data from "../data";
import Product from "../components/Product";

export default function HomeScreen() {
  return (
    <div className="row g-3">
      {data.products.map((product) => (
        <Product key={product._id} product={product}></Product>
      ))}
    </div>
  );
}
