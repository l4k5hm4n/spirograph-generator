import React, { useState, useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
const constants = {
  cx: 45,
  cy: 45,
  height: 90,
  width: 90,
};
function drawSpirograph(
  cx,
  cy,
  fValue,
  mValue,
  nValue,
  scale
) {
  var dx, dy, theta;
  var str =
    "M" +
    (
      cx +
      (1 - nValue / mValue + fValue * (nValue / mValue)) * scale
    ).toString() +
    " " +
    cy.toString() +
    " ";
  for (theta = 0; theta <= Math.PI * 2; theta += 0.001) {
    dx =
      (1 - nValue / mValue) * Math.cos(nValue * theta) +
      fValue * (nValue / mValue) * Math.cos((mValue - nValue) * theta);
    dy =
      (1 - nValue / mValue) * Math.sin(nValue * theta) -
      fValue * (nValue / mValue) * Math.sin((mValue - nValue) * theta);
    str =
      str +
      "L" +
      (cx + dx * scale).toString() +
      " " +
      (cy + dy * scale).toString() +
      " ";
  }
  return str;

}
function Spirograph(props) {
  const { f, m, n, scale, strokeWidth, color } = props;
  const templateSpirographRef = useRef();
  var draw = SVG().size(constants.height, constants.width);
  const style = {
    height: constants.height,
    width: constants.width,
  };

  useEffect(() => {
    console.log("test")
    var temp = draw.path(
      drawSpirograph(constants.cx, constants.cy, f, m, n, scale)
    );
    temp.fill("none");
    temp.stroke({ color: color, width: strokeWidth });
    var svg = draw.svg();

    templateSpirographRef.current.innerHTML = svg;

  }, []);
  return <div className="templateSpirograph" ref={templateSpirographRef}></div>;
}

export default Spirograph;