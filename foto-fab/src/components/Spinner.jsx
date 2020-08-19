import React from "react";
import "./styles/Spinner.scss";
function Spinner() {
  return (
    <div className="center">
      {" "}
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
