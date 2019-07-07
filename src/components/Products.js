import React from "react";
import { NavLink } from "react-router-dom";

function Product(props) {
  console.log(props);
  return (
    <div className="container col-6">
      {props.products.map((product, i) => (
        <li className="list-item" key={i}>
          <div className="card" style={{ margin: "1em" }}>
            <img
              className="card-img-top"
              src={product.product_image}
              style={{ width: 80 }}
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{product.product}</h5>
            </div>
            <p className="card-text">{product.product_description}</p>
            <p className="">{product.price}</p>
          </div>
          <NavLink
            exact={true}
            activeClassName="active bg-white-trans btn btn-primary"
            className="p-3 d-block"
            to={`/product/${product.product_id}`}
          >
            View
          </NavLink>
        </li>
      ))}
    </div>
  );
}

export default Product;
