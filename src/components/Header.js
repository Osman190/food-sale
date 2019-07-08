import React from "react";

function Header(props) {
  console.log(props);
  return (
    <div className="text-center alert alert-secondary ml-auto col-2 p-0">
      <h6>{props.product.order}</h6>
      <b>Total Price: {props.product.totalPrice} €</b>
    </div>
  );
}
export default Header;
