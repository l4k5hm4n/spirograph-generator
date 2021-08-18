import React from "react";
import Spirograph from "./Spirograph";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";

export default function ExistingTemplateSVG(props){

  return (
<React.Fragment>

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
                svg = linesRef.innerHTML.toString();
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


            </React.Fragment>
  )

}