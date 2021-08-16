import React, { useState, useCallback } from "react";
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
  // const location = useLocation();
  // const { xyz } = location.state;
  // console.log(location);
  // console.log(location.state);
  // var userDefinedTemplates = useSelector((state) => state.userDefinedTemplates);
  console.log(props);
  const { userDefinedTemplates } = props;
  // var { userDefinedTemplates } = props;
  console.log(userDefinedTemplates);
  // const tempTemplates = useSelector((state) => state.userDefinedTemplates);
  // console.log(tempTemplates);
  const dispatch = useDispatch();
  console.log("Start of Template page");
  const callChooseScale = (userDefinedTemplateID) => {
    // if (userDefinedTemplates[userDefinedTemplateID].scaleValue > 30) {
    //   if (
    //     userDefinedTemplates[userDefinedTemplateID].nValue -
    //       userDefinedTemplates[userDefinedTemplateID].mValue >
    //     3
    //   ) {
    //     console.log("Scale is 15");
    //     return "15";
    //   } else {
    //     console.log("Scale is 30");
    //     return "30";
    //   }
    // } else {
    //   if (
    //     userDefinedTemplates[userDefinedTemplateID].nValue -
    //       userDefinedTemplates[userDefinedTemplateID].mValue >
    //     3
    //   ) {
    //     console.log("Scale is 15");
    //     return "15";
    //   } else {
    //     console.log(
    //       "Scale is ",
    //       userDefinedTemplates[userDefinedTemplateID].scaleValue
    //     );
    //     return userDefinedTemplates[
    //       userDefinedTemplateID
    //     ].scaleValue.toString();
    //   }
    // }
  };
  // console.log(props.location.userDefinedTemplatesProps);

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
      // var myTemplateNode,
      //   myTemplateChild,
      //   myTemplateLinesContainer = document.getElementById(
      //     "myTemplateLinesContainer"
      //   );
      // var newDisplaySpirograph = (
      //   <DisplaySpirograph
      //     id="myTemplatesDisplaySpirograph"
      //     linesID="myTemplateLines"
      //     f={argF}
      //     m={argM}
      //     n={argN}
      //     scale={argScale}
      //     strokeWidth={argStrokeWidth}
      //     color={argColor}
      //   />
      // );

      // myTemplateNode = document.createElement("div");
      // myTemplateChild = document.getElementById("myTemplateLines");
      // myTemplateLinesContainer.replaceChild(myTemplateNode, myTemplateChild);
      // myTemplateNode.setAttribute("id", "myTemplateLines");
      // ReactDOM.render(
      //   newDisplaySpirograph,
      //   document.getElementById("myTemplateLines")
      // );

      // node = document.createElement("div");
      // child = document.getElementById("myTemplateLines");
      // myTemplateLinesContainer.replaceChild(node, child);
      // node.setAttribute("id", "myTemplateLines");
      // ReactDOM.render(
      //   newDisplaySpirograph,
      //   document.getElementById("myTemplateLines")
      // );
      // myTemplateLinesContainer.addEventListener("click", (e) => {
      //   e.stopPropagation();
      //   svg = document
      //     .getElementById("myTemplateLines")
      //     .firstChild.outerHTML.toString();
      //   parent.postMessage(
      //     { pluginMessage: { type: "create-spirograph", svg } },
      //     "*"
      //   );
      //   console.log(svg);
      // });
      // document
      //   .getElementById("myTemplatesHoverPen")
      //   .addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     setShowAlterMyTemplatePage(true);
      //   });
    }
    // [
    //   alterMyTemplateFValue,
    //   alterMyTemplateMValue,
    //   alterMyTemplateNValue,
    //   alterMyTemplateScaleValue,
    //   alterMyTemplateStrokeWidthValue,
    //   alterMyTemplateColorValue,
    // ]
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
                        // parent.postMessage(
                        //   {
                        //     pluginMessage: {
                        //       type: "insert_template",
                        //     },
                        //   },
                        //   "*"
                        // );
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
                {/* {userDefinedTemplates.map((userDefinedTemplate) => (
                  <div
                    key={userDefinedTemplate.id}
                    className="templateDisplay"
                    onClick={() => {
                      console.log("calling from changing template");
                      setAlterMyTemplateFValue(userDefinedTemplate.f);
                      setAlterMyTemplateMValue(userDefinedTemplate.m);
                      setAlterMyTemplateNValue(userDefinedTemplate.n);
                      setAlterMyTemplateScaleValue(userDefinedTemplate.scale);
                      setAlterMyTemplateStrokeWidthValue(
                        userDefinedTemplate.strokeWidth
                      );
                      setAlterMyTemplateColorValue(userDefinedTemplate.color);
                      callChangeMyTemplateDisplay(
                        userDefinedTemplate.f,
                        userDefinedTemplate.m,
                        userDefinedTemplate.n,
                        userDefinedTemplate.scale,
                        userDefinedTemplate.stokeWidth,
                        userDefinedTemplate.color
                      );
                    }}
                  >
                    <Spirograph
                      templateId={userDefinedTemplate.userDefinedTemplateNumber}
                      f={userDefinedTemplate.f}
                      m={userDefinedTemplate.m}
                      n={userDefinedTemplate.n}
                      scale="40"
                      strokeWidth={userDefinedTemplate.strokeWidth}
                      color={userDefinedTemplate.color}
                    />
                    <div
                      className="hoverTemplateDisplay"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(remove_template());
                        parent.postMessage(
                          {
                            pluginMessage: {
                              type: "insert_template",
                            },
                          },
                          "*"
                        );
                      }}
                    >
                      delete
                    </div>
                  </div>
                ))} */}
                {/* <div
                  className="templateDisplay"
                  onClick={() => {
                    dispatch(insert_template());
                  }}
                >
                  +
                </div>*/}
                {/* <div className="templateDisplay">
                  Templates are: {myTemplates}
                </div> */}
                {/* <div
                  id="addUserDefinedTemplate"
                  onClick={() => {
                    setInsertTemplate(true);
                    callInsertTemplate;
                  }}
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M59.4286 36.5714H36.5714V59.4285C36.5714 61.9429 34.5142 64 32 64C29.4857 64 27.4285 61.9429 27.4285 59.4285V36.5714H4.57143C2.05714 36.5714 0 34.5143 0 32C0 29.4857 2.05714 27.4285 4.57143 27.4285H27.4285V4.57143C27.4285 2.05714 29.4857 0 32 0C34.5142 0 36.5714 2.05714 36.5714 4.57143V27.4285H59.4286C61.9428 27.4285 64 29.4857 64 32C64 34.5143 61.9428 36.5714 59.4286 36.5714Z"
                      fill="white"
                    />
                  </svg>
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// const mapStateToProps = (state) => {
//   console.log(state);
//   return {
//     userDefinedTemplates: state.userDefinedTemplates,
//   };
// };
// dispatch(remove_template(userDefinedTemplate.id));
// const mapDispatchToProps = (dispatch) => {
//   return {
//     remove_template: (id) => {
//       dispatch({ type: "REMOVE_TEMPLATE", id: id });
//     },
//   };
// };
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
