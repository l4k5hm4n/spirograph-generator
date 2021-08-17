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

  let userDefinedTemplates;
  useEffect(() => {
  parent.postMessage({ pluginMessage: { type: "checkUserLogin" } }, "*");
  window.addEventListener("message", (event) => { 
  if (event.data.pluginMessage.type === "checkUserLogin") { 
    userDefinedTemplates = event.data.pluginMessage.myTemplates;
  }
  })
}, []);
  console.log(userDefinedTemplates, 'temp')

  const [showAlterMyTemplatesPage, setShowAlterMyTemplatePage] =
    useState(false);
  const [insertTemplate, setInsertTemplate] = useState(false);
  const [alterMyTemplateFValue, setAlterMyTemplateFValue] = useState(
    userDefinedTemplates[0].fValue
  );
  const [alterMyTemplateMValue, setAlterMyTemplateMValue] = useState(
    userDefinedTemplates[0].mValue
  );
  const [alterMyTemplateNValue, setAlterMyTemplateNValue] = useState(
    userDefinedTemplates[0].nValue
  );
  const [alterMyTemplateScaleValue, setAlterMyTemplateScaleValue] = useState(
    userDefinedTemplates[0].scaleValue
  );
  const [alterMyTemplateStrokeWidthValue, setAlterMyTemplateStrokeWidthValue] =
    useState(userDefinedTemplates[0].strokeWidthValue);
  const [alterMyTemplateColorValue, setAlterMyTemplateColorValue] = useState(
    userDefinedTemplates[0].colorValue
  );

  // let db__users = db.collection("users");
  var svg;

  // const callInsertTemplate = useCallback(() => {
  //   setShowAlterMyTemplatePage(true);

  // });

  const callChangeMyTemplateDisplay = useCallback(
    (argF, argM, argN, argScale, argStrokeWidth, argColor) => {
      console.log(
        "Inside Call Change display: ",
        argF,
        argM,
        argN,
        argScale,
        argStrokeWidth,
        argColor
      );
      setAlterMyTemplateFValue(argF);
      setAlterMyTemplateMValue(argM);
      setAlterMyTemplateNValue(argN);
      setAlterMyTemplateScaleValue(argScale);
      setAlterMyTemplateStrokeWidthValue(argStrokeWidth);
      setAlterMyTemplateColorValue(argColor);

    }

  );

  return (
    <div id="MyTemplates">
      <div className="myTemplatesContainer">
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
                // f={userDefinedTemplates[0].f}
                // m={userDefinedTemplates[0].m}
                // n={userDefinedTemplates[0].n}
                // scale={userDefinedTemplates[0].scale}
                // strokeWidth={userDefinedTemplates[0].strokeWidth}
                // color={userDefinedTemplates[0].color}
              />
            </div>
          </div>
        </div>

        {showAlterMyTemplatesPage ? (
          <AlterPage
            callChangeDisplay={callChangeMyTemplateDisplay}
            alterFValue={alterMyTemplateFValue}
            alterMValue={alterMyTemplateMValue}
            alterNValue={alterMyTemplateNValue}
            alterScaleValue={alterMyTemplateScaleValue}
            alterStrokeWidthValue={alterMyTemplateStrokeWidthValue}
            alterColorValue={alterMyTemplateColorValue}
          />
        ) : (
          <div>
            <h3>Manage your templates</h3>
            <div className="templatesContainer">
              <div className="gridContainer">
                {userDefinedTemplates.map((userDefinedTemplate) => (
                  // {props.userDefinedTemplates.map((userDefinedTemplate) => (
                  <div
                    // key={userDefinedTemplate.id}
                    className="templateDisplay"
                    onClick={() => {
                      console.log("calling from changing template");
                      setAlterMyTemplateFValue(userDefinedTemplate.fValue);
                      setAlterMyTemplateMValue(userDefinedTemplate.mValue);
                      setAlterMyTemplateNValue(userDefinedTemplate.nValue);
                      setAlterMyTemplateScaleValue(
                        userDefinedTemplate.scaleValue
                      );
                      setAlterMyTemplateStrokeWidthValue(
                        userDefinedTemplate.strokeWidthValue
                      );
                      setAlterMyTemplateColorValue(
                        userDefinedTemplate.colorValue
                      );
                      callChangeMyTemplateDisplay(
                        userDefinedTemplate.fValue,
                        userDefinedTemplate.mValue,
                        userDefinedTemplate.nValue,
                        userDefinedTemplate.scaleValue,
                        userDefinedTemplate.strokeWidthValue,
                        userDefinedTemplate.colorValue
                      );
                    }}
                  >
                    <Spirograph
                      templateId={userDefinedTemplate.id}
                      f={userDefinedTemplate.fValue}
                      m={userDefinedTemplate.mValue}
                      n={userDefinedTemplate.nValue}
                      scale="30"
                      // scale={callChooseScale(userDefinedTemplate.id)}
                      strokeWidth={userDefinedTemplate.strokeWidthValue}
                      color={userDefinedTemplate.colorValue}
                    />
                    <div
                      className="hoverBtnSecondary hideClass"
                      onClick={(event) => {
                        event.stopPropagation();
                        console.log("Clicked Delete");
                        // dispatch(remove_template(userDefinedTemplate.id));
                        props.remove_template(userDefinedTemplate.id);
                      }}
                    >
                      <svg
                        width="10"
                        height="12"
                        viewBox="0 0 10 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.999995 10.6667C0.999995 11.4 1.59999 12 2.33333 12H7.66666C8.39999 12 8.99999 11.4 8.99999 10.6667V2.66667H0.999995V10.6667ZM9.66666 0.666667H7.33333L6.66666 0H3.33333L2.66666 0.666667H0.333328V2H9.66666V0.666667Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userDefinedTemplates: state.userDefinedTemplates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove_template: (id) => {
      dispatch({ type: "REMOVE_TEMPLATE", id: id });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MyTemplates);
// export default MyTemplates;
// export default connect(mapStateToProps, mapDispatchToProps)(MyTemplates);
