import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { data } from "../data/data";

function SingleProduct(props) {
  const [activeTopping, setActiveTopping] = useState(false);
  const [checkedToppings, toggleCheckedTopping] = useState({});
  const [itemQuantity, addItemQuantity] = useState(0);
  const singleProduct = data.filter(
    product => props.match.params.product_id === product.product_id
  )[0];
  return (
    <div className="container col-6 card">
      <img className="card-img-top" src={singleProduct.product_image} alt="" />
      <h5 className="card-title">{singleProduct.product}</h5>
      <p className="card-text">minimum order: 1</p>
      <p className="card-text">{singleProduct.product_description}</p>
      <p className="card-text">price per person: {singleProduct.price} €</p>

      <div className="container">
        Toppings:{" "}
        {singleProduct.toppings.map((item, i) => (
          <li key={i}>
            <h3 onClick={() => setActiveTopping(i)}>{item.name}</h3>
            <ul style={{ display: activeTopping === i ? `block` : `none` }}>
              {item.options.map((toppingOptions, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    disabled={
                      Object.keys(checkedToppings).length >= item.quantity_maximum &&
                      checkedToppings[index] === undefined
                        ? true
                        : false
                    }
                    onClick={e => {
                      const checkedOnes = {
                        ...checkedToppings,
                        [index]: toppingOptions
                      };
                      if (!e.target.checked) delete checkedOnes[index];
                      toggleCheckedTopping(checkedOnes);
                    }}
                  />
                  {toppingOptions.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
        <button
          className="btn btn-light"
          onClick={() => addItemQuantity(itemQuantity > 1 ? itemQuantity - 1 : 0)}
        >
          -
        </button>
        <button className="btn btn-success" onClick={() => addItemQuantity(itemQuantity + 1)}>
          +
        </button>
        <button
          className="btn btn-primary"
          onClick={e => {
            props.handleCart({
              product: singleProduct,
              quantity: itemQuantity,
              toppings: checkedToppings,
              totalPrice: itemQuantity * singleProduct.price
            });
          }}
        >
          add to Bucket
        </button>
        <div>
          <span>Orders per person: {itemQuantity}</span>
        </div>
      </div>

      <NavLink
        exact={true}
        activeClassName="active bg-white-trans"
        className="btn btn-primary"
        to="/"
      >
        Back to Products
      </NavLink>
    </div>
  );
}

export default SingleProduct;
