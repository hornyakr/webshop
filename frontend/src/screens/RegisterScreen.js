import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function RegisterScreen() {
  const { search } = useLocation();
  const navigate = useNavigate();
  const redirect = search ? search.split("=")[1] : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { registerInfo, loading, error } = userRegister;
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfirmPassword, setComfirmPassword] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== comfirmPassword) {
      alert("A jelszó nem egyezik!");
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (registerInfo && userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, registerInfo, userInfo]);
  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="ps-2">Felhasználó létrehozása</h2>
          {loading && <LoadingBox></LoadingBox>}
          {error && <MessageBox variant="danger">{error}</MessageBox>}
          <form className="container" onSubmit={submitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Név
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Név megadása"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="mb-3">
              <label htmlFor="comfirmPassword" className="form-label">
                Jelszó megerősítése
              </label>
              <input
                type="password"
                className="form-control"
                id="comfirmPassword"
                placeholder="Jelszó megadása"
                required
                onChange={(e) => setComfirmPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="check"
                required
              />
              <label className="form-check-label" htmlFor="check">
                Elfogadom a felhasználói feltételeket
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Regisztrálok
            </button>
            <div>
              <label />
              <div>
                Már regisztrált nálunk?{" "}
                <Link to={`/signIn?redirect=${redirect}`}>Bejelentkezés</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
