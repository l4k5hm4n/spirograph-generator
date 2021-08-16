import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import "../style/style.css";

const InfoHover = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openInfoHover: () => open(),
      closeInfoHover: () => close(),
    };
  });
  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };
  if (display) {
    return ReactDOM.createPortal(
      <div className="infoHoverWrapper">
        <div className="infoHoverBackdrop"></div>
        <div className="infoHoverBox">{props.children}</div>
      </div>,
      document.getElementById("infoHoverRoot")
    );
  }

  return null;
});

export default InfoHover;
