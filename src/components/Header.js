import React from "react";

function Header(props) {
  //Header fixed component shows the last product the user want to order
  return (
    <div
      className="text-center alert alert-secondary col-2"
      style={{ position: "absolute", top: "5%", right: "5%" }}
    >
      {/* <h6>{props}</h6> */}
      <b>Total Price: {props.product.totalPrice} €</b>
    </div>
  );
}
export default Header;
