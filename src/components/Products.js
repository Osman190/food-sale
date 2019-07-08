import React from "react";
import { NavLink } from "react-router-dom";
//react style object
const Style = {
  width: "20rem",
  padding: "10px"
};

//func component render the products from the API
function Product(props) {
  return (
    <div className="container">
      <div className="row">
        {props.products.map((product, i) => (
          <div className="col" key={i}>
            <li className="card ml-3" style={Style}>
              <img className="card-img-top" src={product.product_image} alt="" />
              <div className="card-body">
                <h5 className="card-title">{product.product}</h5>
                <p className="card-text">{product.product_description}</p>
                <p className="card-text">Price per person: {product.price} €</p>
                <NavLink
                  exact={true}
                  className="btn btn-primary"
                  to={`/product/${product.product_id}`}
                >
                  View
                </NavLink>
              </div>
            </li>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
