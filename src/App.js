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
  //func recevies the final product and set it in the state
  handleCart = finalProduct => {
    this.setState(state => {
      return (state.orders[finalProduct.product.product_id] = finalProduct);
    });
    this.getTotalPrice(finalProduct);
  };
  //func to get the total price from toppings and the price of the item
  getTotalPrice = product => {
    let toppingsTotal = 0;
    //get the toppings price if they are included
    if (product.toppings) {
      toppingsTotal = Object.values(product.toppings).reduce(
        (a, b) => a + parseFloat(b.price.trim()),
        0
      );
    }

    //get the total price
    const ordersTotal = Object.values(this.state.orders).reduce((a, b) => a + b.totalPrice, 0);
    console.log(this.state.orders[product.product.product_id]);
    console.log(product);
    this.setState({ totalPrice: ordersTotal + toppingsTotal });
    //set the order in the localStorage to display it later in Header component
    sessionStorage.setItem("order", JSON.stringify(product));
  };

  componentDidUpdate() {
    //set the whole state in the localStorage
    sessionStorage.setItem("product", JSON.stringify(this.state));
  }

  render() {
    //create routes for the two pages and fixed Header component
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
