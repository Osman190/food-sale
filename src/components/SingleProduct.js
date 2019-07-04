import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { data } from "../data/data";

function SingleProduct(props) {
  const [activeTopping, setActiveTopping] = useState(false);
  const [checkedToppings, toggleCheckedTopping] = useState({});
  const sp = data.filter(product => props.match.params.product_id === product.product_id)[0];
  console.log(checkedToppings);
  return (
    <div>
      <h5 className="card-title">{sp.product}</h5>
      <p>minimum order: 1</p>
      <p className="">{sp.price}</p>
      <p className="card-text">{sp.product_description}</p>

      <img className="card-img-top" src={sp.product_image} style={{ width: 80 }} alt="" />
      <p>
        Toppings:{" "}
        {sp.toppings.map((item, i) => (
          <li>
            <h3 onClick={() => setActiveTopping(i)}>{item.name}</h3>
            <ul style={{ display: activeTopping === i ? `block` : `none` }}>
              {item.options.map((bloc, index) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    disabled={checkedToppings.length > bloc.quantity_maximum && "disabled"}
                    onClick={() =>
                      toggleCheckedTopping({ ...checkedToppings, [index]: !checkedToppings[index] })
                    }
                  />
                  {bloc.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </p>

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
