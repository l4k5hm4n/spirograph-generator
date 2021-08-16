import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { SVG } from "@svgdotjs/svg.js";
import ReactDOM from "react-dom";
import DisplaySpirograph from "./DisplaySpirograph";
import AlterPage from "./AlterPage";
import Spirograph from "./Spirograph";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";
const predefinedTemplates = [
  {
    id: 0,
    predefinedTemplateNumber: 0,
    f: 0.6,
    m: 70,
    n: 50,
  },
  {
    id: 1,
    predefinedTemplateNumber: 1,
    f: 2,
    m: 100,
    n: 10,
  },
  {
    id: 2,
    predefinedTemplateNumber: 2,
    f: -0.9,
    m: 47,
    n: 26,
  },
  {
    id: 3,
    predefinedTemplateNumber: 3,
    f: -1.1,
    m: 64,
    n: 12,
  },
  {
    id: 4,
    predefinedTemplateNumber: 4,
    f: 0.4,
    m: 26,
    n: 16,
  },
  {
    id: 5,
    predefinedTemplateNumber: 5,
    f: 0.62,
    m: 64,
    n: 46,
  },
  {
    id: 6,
    predefinedTemplateNumber: 6,
    f: -1.1,
    m: 19,
    n: 13,
  },
  {
    id: 7,
    predefinedTemplateNumber: 7,
    f: 0.4,
    m: 54,
    n: 16,
  },
  {
    id: 8,
    predefinedTemplateNumber: 8,
    f: 0.62,
    m: 90,
    n: 34,
  },
  {
    id: 9,
    predefinedTemplateNumber: 9,
    f: -1.1,
    m: 19,
    n: 13,
  },
  {
    id: 10,
    predefinedTemplateNumber: 10,
    f: 0.4,
    m: 54,
    n: 16,
  },
  {
    id: 11,
    predefinedTemplateNumber: 11,
    f: 0.62,
    m: 90,
    n: 34,
  },
  {
    id: 12,
    predefinedTemplateNumber: 12,
    f: 0.62,
    m: 90,
    n: 34,
  },
  {
    id: 13,
    predefinedTemplateNumber: 13,
    f: 0.62,
    m: 90,
    n: 34,
  },
  {
    id: 14,
    predefinedTemplateNumber: 14,
    f: 0.62,
    m: 90,
    n: 34,
  },
];
function LandingPage() {
  console.log("Start of page");
  const linesRef = useRef();
  const [showAlterPage, setShowAlterPage] = useState(false);
  // const callShowAlterPage = ;

  const [alterFValue, setAlterFValue] = useState(predefinedTemplates[0].f);
  const [alterMValue, setAlterMValue] = useState(predefinedTemplates[0].m);
  const [alterNValue, setAlterNValue] = useState(predefinedTemplates[0].n);
  const [alterScaleValue, setAlterScaleValue] = useState(110);
  const [alterStrokeWidthValue, setAlterStrokeWidthValue] = useState(2);
  const [alterColorValue, setAlterColorValue] = useState("#ffc700");
  var svg;

  // const callChangeDisplay = useCallback(
  //   (argF, argM, argN, argScale, argStrokeWidth, argColor) => {
  //     console.log(
  //       "Inside Call Change display: ",
  //       argF,
  //       argM,
  //       argN,
  //       argScale,
  //       argStrokeWidth,
  //       argColor
  //     );
  //     var node,
  //       child,
  //       linesContainer = document.getElementById("linesContainer");
  //     var newDisplaySpirograph = (
  //       <DisplaySpirograph
  //         id="displaySpirograph"
  //         linesID="lines"
  //         f={argF}
  //         m={argM}
  //         n={argN}
  //         scale={argScale}
  //         strokeWidth={argStrokeWidth}
  //         color={argColor}
  //       />
  //     );
  //     node = document.createElement("div");
  //     child = document.getElementById("lines");
  //     linesContainer.replaceChild(node, child);
  //     node.setAttribute("id", "lines");
  //     linesContainer.addEventListener("click", () => {
  //       // e.stopPropagation();
  //       let count = 0;
  //       svg = document.getElementById("lines").firstChild.outerHTML.toString();
  //       parent.postMessage(
  //         { pluginMessage: { type: "create-spirograph", svg } },
  //         "*"
  //       );
  //       count++;
  //       console.log(count);
  //     });
  //     document.getElementById("hoverPen").addEventListener("click", () => {
  //       // e.stopPropagation();
  //       setShowAlterPage(true);
  //     });
  //     ReactDOM.render(newDisplaySpirograph, document.getElementById("lines"));
  //   },
  //   [
  //     alterFValue,
  //     alterMValue,
  //     alterNValue,
  //     alterScaleValue,
  //     alterStrokeWidthValue,
  //     alterColorValue,
  //   ]
  // );
  const callChangeDisplay = useCallback(
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
      var child = document.getElementById("lines");
      // child.fir;
      setAlterFValue(argF);
      setAlterMValue(argM);
      setAlterNValue(argN);
      setAlterScaleValue(argScale);
      setAlterStrokeWidthValue(argStrokeWidth);
      setAlterColorValue(argColor);
      // var linesContainer = document.getElementById("FUCKME");
      // var node = document.createElement("div");
      // linesContainer.replaceChild(node, child);
      // node.setAttribute("id", "lines");
    }
    // [
    //   alterFValue,
    //   alterMValue,
    //   alterNValue,
    //   alterScaleValue,
    //   alterStrokeWidthValue,
    //   alterColorValue,
    // ]
  );
  return (
    <div id="landingPage">
      <div className="displayContainer">
        <div
          id="linesContainer"
          onClick={(e) => {
            e.stopPropagation();
            svg = document
              .querySelector(".actualSpirograph")
              .firstChild.outerHTML.toString();
            parent.postMessage(
              { pluginMessage: { type: "create-spirograph", svg } },
              "*"
            );
            // console.log(count);
          }}
        >
          <div
            id="hoverPen"
            className="hoverBtn hoverBtnPrimary"
            onClick={(event) => {
              event.stopPropagation();
              setShowAlterPage(true);
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 10.4999V12.9999H2.5L9.87333 5.62659L7.37333 3.12659L0 10.4999ZM11.8067 3.69325C11.8685 3.63158 11.9175 3.55832 11.951 3.47767C11.9844 3.39702 12.0016 3.31057 12.0016 3.22325C12.0016 3.13594 11.9844 3.04949 11.951 2.96884C11.9175 2.88819 11.8685 2.81493 11.8067 2.75325L10.2467 1.19325C10.185 1.13145 10.1117 1.08242 10.0311 1.04897C9.95044 1.01551 9.86398 0.998291 9.77667 0.998291C9.68936 0.998291 9.6029 1.01551 9.52225 1.04897C9.4416 1.08242 9.36834 1.13145 9.30667 1.19325L8.08667 2.41325L10.5867 4.91325L11.8067 3.69325Z"
                fill="black"
              />
            </svg>
          </div>

          <div id="hoverInsert" className="hoverBtn hoverBtnInsert">
            <div>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.375 1.3125V3.3495L6.41025 3.348C6.64425 3.339 6.96675 3.336 7.1985 3.3825C7.4085 3.4245 7.60575 3.5175 7.752 3.5985C7.95675 3.7125 8.094 3.88725 8.172 4.08L8.271 4.071C8.505 4.053 8.8665 4.0425 9.1395 4.152C9.417 4.263 9.65625 4.51725 9.7995 4.689C9.85575 4.7565 9.90525 4.82025 9.94575 4.875H10.3823C10.5918 4.87501 10.7991 4.91893 10.9906 5.00393C11.1822 5.08893 11.3538 5.21313 11.4944 5.36851C11.635 5.5239 11.7415 5.70702 11.807 5.90608C11.8725 6.10514 11.8956 6.31573 11.8748 6.52425L11.6707 8.5605C11.6341 8.92728 11.5207 9.28223 11.3377 9.60225L10.2915 11.433C10.1931 11.6052 10.051 11.7483 9.87954 11.8479C9.70805 11.9475 9.5133 11.9999 9.315 12H4.5885C4.37946 12 4.17456 11.9417 3.99678 11.8318C3.819 11.7218 3.67537 11.5645 3.582 11.3775L2.67075 9.555L0.802501 6.44175C0.660691 6.20369 0.610632 5.92207 0.661717 5.64972C0.712803 5.37738 0.861521 5.13304 1.07996 4.96255C1.29841 4.79207 1.57155 4.70717 1.84815 4.72377C2.12475 4.74038 2.38578 4.85736 2.58225 5.05275L3.75 6.21975V1.3125C3.75 0.964403 3.88828 0.630564 4.13442 0.384422C4.38056 0.138281 4.7144 0 5.0625 0C5.4106 0 5.74444 0.138281 5.99058 0.384422C6.23672 0.630564 6.375 0.964403 6.375 1.3125Z"
                  fill="#FFC700"
                />
              </svg>
              <span>CLICK TO INSERT</span>
            </div>
          </div>
          <div id="lines">
            {/* <div id="lines" onClick={insertSpirograph}> */}
            <DisplaySpirograph
              id="displaySpirograph"
              linesID="lines"
              f={alterFValue}
              m={alterMValue}
              n={alterNValue}
              scale={alterScaleValue}
              strokeWidth={alterStrokeWidthValue}
              color={alterColorValue}
            />
          </div>
        </div>
        {console.log(
          "Alter Parameters in Main Page are: ",
          alterFValue,
          alterMValue,
          alterNValue,
          alterScaleValue,
          alterStrokeWidthValue,
          alterColorValue
        )}
        {showAlterPage ? (
          <AlterPage
            callChangeDisplay={callChangeDisplay}
            alterFValue={alterFValue}
            alterMValue={alterMValue}
            alterNValue={alterNValue}
            alterScaleValue={alterScaleValue}
            alterStrokeWidthValue={alterStrokeWidthValue}
            alterColorValue={alterColorValue}
          />
        ) : (
          <div>
            <h3 className="chooseTemplates">Choose From Existing Templates</h3>
            <div className="templatesContainer">
              <div className="templateTransition"></div>
              <div className="gridContainer">
                {predefinedTemplates.map((predefinedTemplate) => (
                  <div
                    key={predefinedTemplate.id}
                    className="templateDisplay"
                    onClick={(event) => {
                      console.log("calling from changing template");
                      event.stopPropagation();
                      setAlterFValue(predefinedTemplate.f);
                      setAlterMValue(predefinedTemplate.m);
                      setAlterNValue(predefinedTemplate.n);
                      setAlterScaleValue(110);
                      setAlterStrokeWidthValue(2);
                      setAlterColorValue("#ffc700");
                      callChangeDisplay(
                        predefinedTemplate.f,
                        predefinedTemplate.m,
                        predefinedTemplate.n,
                        110,
                        2,
                        "#ffc700"
                      );
                    }}
                  >
                    <Spirograph
                      templateId={predefinedTemplate.predefinedTemplateNumber}
                      f={predefinedTemplate.f}
                      m={predefinedTemplate.m}
                      n={predefinedTemplate.n}
                      scale="30"
                      strokeWidth="1"
                      color="#fff"
                    />
                    <div
                      className="hoverBtnSecondary hideClass"
                      onClick={(event) => {
                        event.stopPropagation();
                        svg = document
                          .getElementById("lines")
                          .firstChild.outerHTML.toString();
                        parent.postMessage(
                          { pluginMessage: { type: "create-spirograph", svg } },
                          "*"
                        );
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 12V10.4H2.728L12 1.128L10.872 0L1.6 9.272V4H0V12H8Z"
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
export default LandingPage;
