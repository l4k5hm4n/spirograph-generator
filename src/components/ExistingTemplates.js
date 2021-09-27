import React, { createRef, Suspense } from "react";
import importIcon from "../assets/ImportIcon.svg";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";

const Spirograph = React.lazy(() => import("./Spirograph"));

export default function ExistingTemplates(props) {
  const [currentTemplateID, setcurrentTemplateID] = React.useState(0);

  let refs = [];
  return (
    <div>
      <h3 className="chooseTemplates">Choose From Existing Templates</h3>
      <div className="templatesContainer">
        <div className="templateTransition"></div>
        <div className="gridContainer">
          {props.predefinedTemplates.map((predefinedTemplate, i) => {
            const newRef = createRef();
            refs.push(newRef);
            return (
              <div
                key={predefinedTemplate.id}
                className={`templateDisplay ${
                  currentTemplateID == predefinedTemplate.id ? "active" : ""
                }`}
                onClick={() => {
                  setcurrentTemplateID(predefinedTemplate.id);
                  props.callChangeDisplay(
                    predefinedTemplate.f,
                    predefinedTemplate.m,
                    predefinedTemplate.n,
                    100,
                    2,
                    ""
                  );
                }}
              >
                <Suspense fallback={<div></div>}>
                  <Spirograph
                    templateId={predefinedTemplate.predefinedTemplateNumber}
                    f={predefinedTemplate.f}
                    m={predefinedTemplate.m}
                    n={predefinedTemplate.n}
                    scale="30"
                    strokeWidth="1"
                    color="white"
                    ref={newRef}
                  />
                </Suspense>
                <div
                  className="hoverBtnSecondary hideClass"
                  onClick={(event) => {
                    let svg = refs[i].current.innerHTML.toString();
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
            );
          })}
        </div>
        <div className="templateTransitionBottom"></div>
      </div>
    </div>
  );
}
