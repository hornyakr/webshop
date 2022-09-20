import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signIn } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function SignInScreen() {
  const { search } = useLocation();
  const redirect = search ? search.split("=")[1] : "";

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo, loading, error } = userSignIn;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(`/${redirect}`);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="ps-2">Bejelentkezés</h2>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <form className="container" onSubmit={submitHandler}>
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
                Új felhasználó?{" "}
                <Link to={`/register?redirect=${redirect}`}>
                  Felhasználó létrehozása
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
