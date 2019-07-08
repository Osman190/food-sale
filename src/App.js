import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import Header from "./components/Header";
import SingleProduct from "./components/SingleProduct";
import { data } from "./data/data.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    const oldStorage = sessionStorage.getItem("product");

    console.log(JSON.parse(oldStorage));
    if (oldStorage) {
      this.state = JSON.parse(oldStorage);
    } else {
      this.state = {
        products: data,
        orders: {},
        totalPrice: 0
      };
    }
  }
  handleCart = finalProduct => {
    this.setState(state => {
      state.orders[finalProduct.product.product_id] = finalProduct;
      return state;
    });
    this.getTotalPrice(finalProduct);
  };

  getTotalPrice = product => {
    let toppingsTotal = 0;
    if (product.toppings) {
      toppingsTotal = Object.values(product.toppings).reduce(
        (a, b) => a + parseFloat(b.price.trim()),
        0
      );
    }
    const ordersTotal = Object.values(this.state.orders).reduce((a, b) => a + b.totalPrice, 0);

    this.setState({ totalPrice: ordersTotal + toppingsTotal });
    sessionStorage.setItem("order", JSON.stringify(product));
  };

  componentDidUpdate() {
    sessionStorage.setItem("product", JSON.stringify(this.state));
  }

  render() {
    return (
      <React.Fragment>
        <Header product={this.state} />
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => <Products {...props} products={this.state.products} />}
            />
            <Route
              exact
              path="/product/:product_id"
              render={props => (
                <SingleProduct
                  {...props}
                  products={this.state.products}
                  orders={this.state.orders}
                  handleCart={this.handleCart}
                />
              )}
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
