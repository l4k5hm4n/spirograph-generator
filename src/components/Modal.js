import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "../style/style.css";
import "../style/modal.css";

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });
  const open = () => {
    console.log("Clicking open Modal");
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className="modalWrapper">
        <div className="modalBackdrop" onClick={close}></div>
        <div className="modalBox">{props.children}</div>
      </div>,
      document.getElementById("modalRoot")
    );
  }

  return null;
});

export default Modal;
