import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function CartScreen() {
  const { productId } = useParams();
  const { search } = useLocation();

  const qty = search ? Number(search.split("=")[1]) : 1;

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductId: {productId} Qty: {qty}
      </p>
    </div>
  );
}
