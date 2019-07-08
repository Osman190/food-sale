import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { data } from "../data/data";

const imgStyle = {
  width: "100%",
  padding: "10px"
};

function SingleProduct(props) {
  //use react state hooks
  const [activeTopping, setActiveTopping] = useState(false);
  const [checkedToppings, toggleCheckedTopping] = useState({});
  const [itemQuantity, addItemQuantity] = useState(0);
  //filter the data from "API" to target the single product which in view button clicked
  const singleProduct = data.filter(
    product => props.match.params.product_id === product.product_id
  )[0];
  return (
    <div className="container" style={{ position: "relative" }}>
      <div className="row">
        <div className="col">
          <div className="card">
            <img
              className="card-img-top"
              style={imgStyle}
              src={singleProduct.product_image}
              alt=""
            />
            <div className="card-body">
              <h5 className="card-title">{singleProduct.product}</h5>
              <p className="card-text">minimum order: 1</p>
              <p className="card-text">{singleProduct.product_description}</p>
              <p className="card-text">price per person: {singleProduct.price} €</p>

              <div className="" style={{ listStyleType: "none" }}>
                Toppings:{" "}
                {singleProduct.toppings.map((item, i) => (
                  <li key={i}>
                    <h3 className="card-text" onClick={() => setActiveTopping(i)}>
                      {item.name}
                    </h3>
                    <ul
                      className="card-text"
                      //add inline style for active toppings late should be dropdown button
                      style={{ display: activeTopping === i ? `block` : `none` }}
                    >
                      {item.options.map((toppingOptions, index) => (
                        <li key={index} style={{ listStyleType: "none" }}>
                          <input
                            type="checkbox"
                            //add disabled to the rest of toppings when the checked are more the quantity_maximum
                            disabled={
                              Object.keys(checkedToppings).length >= item.quantity_maximum &&
                              checkedToppings[index] === undefined
                                ? true
                                : false
                            }
                            onClick={e => {
                              //clone the state
                              const checkedOnes = {
                                ...checkedToppings,
                                [index]: toppingOptions
                              };
                              //delete the toppings items from object to make undefined when checked == false
                              if (!e.target.checked) delete checkedOnes[index];
                              toggleCheckedTopping(checkedOnes); // re assign the toppings object
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
                  style={{ position: "absolute", bottom: "1%", left: "20%" }}
                  onClick={() => addItemQuantity(itemQuantity > 1 ? itemQuantity - 1 : 0)}
                >
                  -
                </button>
                <div>
                  <span>Orders per person: {itemQuantity}</span>
                </div>
                <button
                  className="btn btn-success"
                  style={{ position: "absolute", bottom: "1%", left: "25%" }}
                  onClick={() => addItemQuantity(itemQuantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              className="btn btn-primary "
              style={{ position: "absolute", bottom: "1%", right: "1%" }}
              onClick={e => {
                props.handleCart({
                  product: singleProduct,
                  quantity: itemQuantity,
                  toppings: checkedToppings,
                  totalPrice: itemQuantity * singleProduct.price
                });
              }}
            >
              Add to Bucket
            </button>
            <NavLink
              exact={true}
              activeClassName="active bg-white-trans"
              style={{ position: "absolute", top: "1%", left: "1%" }}
              className="btn btn-primary"
              to="/"
            >
              Back to Products
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
