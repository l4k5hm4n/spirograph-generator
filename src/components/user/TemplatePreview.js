import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { insert_template } from "../actions/insert_template";
import { remove_template } from "../actions/remove_template";
import { connect } from "react-redux";
import DisplaySpirograph from "./DisplaySpirograph";
import Spirograph from "./Spirograph";
import AlterPage from "./AlterPage";
import { db } from "../config/firebase-config";
import "../style/myTemplates.css";

function MyTemplates(props) {

<div
id="myTemplatesDisplayContainer"
onClick={(e) => {
  e.stopPropagation();
  svg = document
    .getElementById("actualSpirograph")
    .firstChild.outerHTML.toString();
  parent.postMessage(
    { pluginMessage: { type: "create-spirograph", svg } },
    "*"
  );
  console.log(svg);
}}
>
<div
  id="myTemplatesHoverPen"
  className="myTemplatesHoverButton"
  onClick={(event) => {
    event.stopPropagation();
    setShowAlterMyTemplatePage(true);
  }}
>
  Hover
</div>

<div id="myTemplatesHoverInsert" className="myTemplatesHoverButton">
  Click to Insert
</div>
<div id="myTemplateLinesContainer">
  <div id="myTemplateLines">
    {/* <div id="lines" onClick={insertSpirograph}> */}
    <DisplaySpirograph
      id="myTemplatesDisplaySpirograph"
      linesID="myTemplateLines"
      f={alterMyTemplateFValue}
      m={alterMyTemplateMValue}
      n={alterMyTemplateNValue}
      scale={alterMyTemplateScaleValue}
      strokeWidth={alterMyTemplateStrokeWidthValue}
      color={alterMyTemplateColorValue}
    />
  </div>
</div>
</div>

}

export default TemplatePreview;