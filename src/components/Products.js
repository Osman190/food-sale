import React from "react";
import { NavLink } from "react-router-dom";

function Product(props) {
  return (
    <div className="card-group">
      <div className="container col-6 ">
        {props.products.map((product, i) => (
          <li className="list-item card" key={i}>
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
        ))}
      </div>
    </div>
  );
}

export default Product;
