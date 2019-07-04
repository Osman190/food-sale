import React from "react";
import { NavLink } from "react-router-dom";

function SingleProduct(props) {
  console.log(props);
  return (
    <div>
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
