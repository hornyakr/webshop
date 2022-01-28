import Rract from "react";
import Product from "./components/Product";
import data from "./data";

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            Webshop
          </a>
        </div>
        <div>
          <a href="/cart">Kosár</a>
          <a href="/signIn">Bejelentkezés</a>
        </div>
      </header>
      <main>
        <div className="row center">
          {data.products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </main>
      <footer className="row center">Minden jog fenntartva</footer>
    </div>
  );
}

export default App;
