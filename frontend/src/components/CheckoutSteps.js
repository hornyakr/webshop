import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Bejelentkezés</div>
      <div className={props.step2 ? "active" : ""}>Szállítás</div>
      <div className={props.step3 ? "active" : ""}>Fizetés</div>
      <div className={props.step4 ? "active" : ""}>Véglegesítés</div>
    </div>
  );
}
