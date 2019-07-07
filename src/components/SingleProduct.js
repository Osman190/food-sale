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
  console.log(itemQuantity);
  return (
    <div>
      <h5 className="card-title">{singleProduct.product}</h5>
      <p>minimum order: 1</p>
      <p className="">{singleProduct.price}</p>
      <p className="card-text">{singleProduct.product_description}</p>

      <img
        className="card-img-top"
        src={singleProduct.product_image}
        style={{ width: 80 }}
        alt=""
      />
      <div>
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
        <button onClick={() => addItemQuantity(itemQuantity > 1 ? itemQuantity - 1 : 0)}>-</button>
        <button onClick={() => addItemQuantity(itemQuantity + 1)}>+</button>
        <button
          onClick={() =>
            props.handleCart({
              product: singleProduct,
              quantity: itemQuantity,
              toppings: checkedToppings,
              totalPrice: itemQuantity * singleProduct.price
            })
          }
        >
          add to Bucket
        </button>
        <div className="text-center alert alert-secondary ml-auto col-2 p-0">
          <b>Total: {props.totalPrice}$</b>
        </div>
      </div>

      <NavLink
        exact={true}
        activeClassName="active bg-white-trans"
        className="text-white p-3 d-block"
        to="/"
      >
        Back to Products
      </NavLink>
    </div>
  );
}

export default SingleProduct;
