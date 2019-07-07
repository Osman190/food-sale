import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import { data } from "./data/data.js";

class App extends React.Component {
  state = { products: data, orders: {}, totalPrice: 0 };

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
    console.log(ordersTotal);
    this.setState({ totalPrice: ordersTotal + toppingsTotal });
  };
  render() {
    return (
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
                totalPrice={this.state.totalPrice}
              />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
