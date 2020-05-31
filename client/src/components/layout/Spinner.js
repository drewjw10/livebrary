import React from "react";
import spinner from "./spinner.gif";

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{
        width: "50px",
        marginTop: "30px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
      alt='Loading...'
    />
  );
};

export default Spinner;
