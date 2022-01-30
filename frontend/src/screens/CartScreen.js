import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export default function CartScreen(props) {
  const { id } = useParams();
  const { search } = useLocation();
  const { searchParams } = useSearchParams();

  const qty = search ? Number(search.split("=")[1]) : 1;

  return (
    <div>
      <h1>Cart Screen</h1>
      <p>
        ADD TO CART : ProductId: {id} Qty: {qty}
      </p>
    </div>
  );
}
