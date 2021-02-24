import React from "react";
import ReactDOM from "react-dom";

import "./Modal.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={`modal__wrapper ${props.wrapperClass}`}>
      {props.children}
    </div>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
