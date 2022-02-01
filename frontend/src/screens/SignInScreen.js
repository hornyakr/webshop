import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SignInScreen() {
  const { email, setEmail } = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="container">
      <div className="card">
        <form className="container card-body" onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email cím
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email cím megadása"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Jelszó
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Jelszó megadása"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="check" />
            <label className="form-check-label" htmlFor="check">
              Bejelentkezve maradok
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Bejelentkezés
          </button>
          <div>
            <label />
            <div>
              Új felhasználó? <Link to="register">Felhasználó létrehozása</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
