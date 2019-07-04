import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import "./App.css";
import { data } from "./data/data.js";

class App extends React.Component {
  state = { data };
  render() {
    const products = [...this.state.data];
    console.log(products);
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={props => <Products {...props} products={products} />} />
          <Route
            exact
            path="/product/:product_id"
            render={props => <SingleProduct {...props} products={products} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
