import React, { useEffect } from "react";
import { SVG } from "@svgdotjs/svg.js";
import  "@svgdotjs/svg.filter.js";

const constants = {
  cx: 156,
  cy: 156,
  height: 312,
  width: 312,
};

function drawSpirograph(cx, cy, fValue, mValue, nValue, scale) {
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

export default React.forwardRef((props, ref) => { 
  let { f, m, n, scale, strokeWidth, color } = props;

  useEffect(() => {
    let draw = SVG().size(constants.width, constants.height);
    draw.path(drawSpirograph(constants.cx, constants.cy, f, m, n, scale))
    .fill("none")
    .stroke({ color: color, width: strokeWidth })

    ref.current.innerHTML = draw.svg();

    // draw.scale(1.2)
    // .filterWith(function(add) {
    //   var blur = add.offset(0, 0).gaussianBlur(8)
    //   add.blend(add.$source, blur)
    // })
    // // ref.current.nextSibling.innerHTML = draw.svg();

  });
  

  return (
  <React.Fragment>
      <div className="actualSpirograph" ref={ref}></div>
      {/* <div className="shadowSpirograph"></div> */}
  </React.Fragment>
  )
 });
