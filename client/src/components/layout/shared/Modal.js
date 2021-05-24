import React from "react";
import ReactDOM from "react-dom";

import Backdrop from "./Backdrop";
import "./Modal.css";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className={`modal__wrapper ${!props.show ? "off" : ""}`}>
      {props.show && <Backdrop onClick={props.onClick} />}
      {props.children}
    </div>,
    document.querySelector("#modal-root")
  );
};

export default Modal;
