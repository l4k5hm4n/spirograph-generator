import React, { useState, useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
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
function DisplaySpirograph(props) {
  var { linesID, f, m, n, scale, strokeWidth, color } = props;
  // var group = draw.group();
  const actualSpirographRef = useRef();
  var draw = SVG().size(constants.width, constants.height);
  console.log(linesID);
  useEffect(() => {
    console.log("DisplaySpirograph mounted");
    // draw.path("");
    // draw.putIn(`#${linesID}`);

    return () => {};
  }, []);

  useEffect(() => {
    console.log(linesID);

    // var draw = SVG(`#${linesID}`);
    // console.log(`#${linesID}`, typeof `#${linesID}`);
    // console.log(`"${linesID}"`);

    // draw.addTo("#insideLines");
    // draw.addTo(`#${linesID}`);
    // console.log(draw);
    // draw.putIn(`#${linesID}`);
    // if (group.children()) {
    //   group.clear();
    // }
    var temp = draw.path(
      drawSpirograph(constants.cx, constants.cy, f, m, n, scale)
    );
    temp.fill("none");
    temp.stroke({ color: color, width: strokeWidth });
    var svg = draw.svg();

    actualSpirographRef.current.innerHTML = svg;
    // `#${linesID}`.clear();

    // draw.putIn(`#${linesID}`);
    // temp.replace(draw.path());
    {
      // function drawSpirograph(
      //   path,
      //   cx,
      //   cy,
      //   fValue,
      //   mValue,
      //   nValue,
      //   scale,
      //   stokeWidthValue,
      //   colorValue
      // ) {
      //   var dx, dy, theta;
      //   var str =
      //     "M" +
      //     (
      //       cx +
      //       (1 - nValue / mValue + fValue * (nValue / mValue)) * scale
      //     ).toString() +
      //     " " +
      //     cy.toString() +
      //     " ";
      //   for (theta = 0; theta <= Math.PI * 2; theta += 0.001) {
      //     dx =
      //       (1 - nValue / mValue) * Math.cos(nValue * theta) +
      //       fValue * (nValue / mValue) * Math.cos((mValue - nValue) * theta);
      //     dy =
      //       (1 - nValue / mValue) * Math.sin(nValue * theta) -
      //       fValue * (nValue / mValue) * Math.sin((mValue - nValue) * theta);
      //     str =
      //       str +
      //       "L" +
      //       (cx + dx * scale).toString() +
      //       " " +
      //       (cy + dy * scale).toString() +
      //       " ";
      //   }
      //   path = draw.path(str);
      //   path.fill("none");
      //   path.stroke({ color: colorValue, width: stokeWidthValue });
      // }
      // drawSpirograph(
      //   path,
      //   constants.cx,
      //   constants.cy,
      //   f,
      //   m,
      //   n,
      //   scale,
      //   strokeWidth,
      //   color
      // );
    }

    return () => {
      console.log("Display Spirograph Unmounted");
    };
    // }, [f, m, n, scale, strokeWidth, color]);
  });

  return <div className="actualSpirograph" ref={actualSpirographRef}></div>;
}

export default DisplaySpirograph;

// // canvas to draw svg
// var draw = SVG().addTo('#lines').size(312,312); //WILL NEED TO ADD A DIV TO DRAW ON
// var path = draw.path('M0 0');
// var linesContainer = document.getElementById('linesContainer'), child, node;
// drawSpirograph(path, 150, 150, 0.46, 66, 36, 100, 1, '0,0,0');

// function drawSpirograph(path, cx, cy, fValue, mValue, nValue, scale, stokeWidthValue ,colorValue){
//   var dx, dy, theta;
//   node = document.createElement("div");
//   child = document.getElementById('lines');
//   linesContainer.replaceChild(node, child);
//   node.setAttribute('id', 'lines');
//   draw = SVG().addTo('#lines').size(312,312);

//   // var circle = draw.circle(5).fill('#f06').move(cx, cy)
//   var str = 'M' + (cx+((1 - (nValue/mValue))+ fValue*((nValue/mValue)))*100).toString() + ' ' + (cy).toString() + ' ';
//   // var str = 'M0 0';

//   for(theta = 0; theta <= Math.PI*2; theta += 0.001){
//     dx = ((1 - (nValue/mValue))*Math.cos((nValue*theta))) + fValue*((nValue/mValue))*Math.cos(((mValue-nValue)*theta));
//     dy = ((1 - (nValue/mValue))*Math.sin((nValue*theta))) - fValue*((nValue/mValue))*Math.sin(((mValue-nValue)*theta));
//     str = str + 'L' + (cx+(dx*scale)).toString() + ' ' + (cy+(dy*scale)).toString() + ' ';

//   }
//   path = draw.path(str);
//   path.fill('none');
//   path.stroke({ color: colorValue, width: strokeWidthValue});
// }
