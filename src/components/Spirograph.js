import React, { useState, useEffect, useRef } from "react";
import { SVG } from "@svgdotjs/svg.js";
const constants = {
  cx: 45,
  cy: 45,
  height: 90,
  width: 90,
};
function drawSpirograph(
  // path,
  cx,
  cy,
  fValue,
  mValue,
  nValue,
  scale
  // stokeWidthValue,
  // colorValue
) {
  var dx, dy, theta;
  // if (output == "lines") {
  //   var node = document.createElement("div");
  //   child = document.getElementById("linesContainer").childNodes[0];
  //   linesContainer.replaceChild(node, child);
  //   node.setAttribute("id", "lines");
  //   draw = SVG().addTo("#lines").size(height, width);
  // }
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
  // path = draw.path(str);
  // path.fill("none");
  // path.stroke({ color: colorValue, width: stokeWidthValue });
}
function Spirograph(props) {
  const { templateId, f, m, n, scale, strokeWidth, color } = props;

  // console.log(
  //   toDisplay,
  //   userdefinedTemplateNumber,
  //   predefinedTemplateNumber,
  //   f,
  //   m,
  //   n,
  //   cx,
  //   cy,
  //   scale,
  //   strokeWidth,
  //   color,
  //   height,
  //   width
  // );
  // var hasTemplateNumber;
  // var linesContainer, node, child;
  // predefinedTemplateNumber || userdefinedTemplateNumber
  //   ? (hasTemplateNumber = true)
  //   : (hasTemplateNumber = false);
  // var output;
  // if (toDisplay) {
  //   output = "lines";
  // } else {
  //   output = `lines${predefinedTemplateNumber}`;
  // }
  const templateSpirographRef = useRef();
  var draw = SVG().size(constants.height, constants.width);
  const style = {
    // backgroundColor: "black",
    height: constants.height,
    width: constants.width,
  };
  useEffect(() => {
    console.log("mounted");
    return () => {};
  }, []);
  useEffect(() => {
    // hasTemplateNumber;
    // ? predefinedTemplateNumber
    //   ? draw.addTo(`#lines${predefinedTemplateNumber}`)
    //   : draw.addTo(`#lines${userdefinedTemplateNumber}`)
    // : (linesContainer = document.getElementById("linesContainer"));
    // draw.addTo(`#lines${templateId}`);
    var temp = draw.path(
      drawSpirograph(constants.cx, constants.cy, f, m, n, scale)
    );
    temp.fill("none");
    temp.stroke({ color: color, width: strokeWidth });
    var svg = draw.svg();

    templateSpirographRef.current.innerHTML = svg;
    // var linesContainer = document.getElementById("linesContainer"),
    //   child,
    //   node;
    return () => {
      console.log("Display Spirograph Unmounted");
    };
  });
  return <div className="templateSpirograph" ref={templateSpirographRef}></div>;
}

export default Spirograph;

// // canvas to draw svg
// var draw = SVG().addTo('#lines').size(300,300); //WILL NEED TO ADD A DIV TO DRAW ON
// var path = draw.path('M0 0');
// var linesContainer = document.getElementById('linesContainer'), child, node;
// drawSpirograph(path, 150, 150, 0.46, 66, 36, 100, 1, '0,0,0');

// function drawSpirograph(path, cx, cy, fValue, mValue, nValue, scale, stokeWidthValue ,colorValue){
//   var dx, dy, theta;
//   node = document.createElement("div");
//   child = document.getElementById('lines');
//   linesContainer.replaceChild(node, child);
//   node.setAttribute('id', 'lines');
//   draw = SVG().addTo('#lines').size(300,300);

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
