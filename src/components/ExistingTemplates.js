import React, { createRef, Suspense} from "react";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";

const Spirograph = React.lazy(() => import('./Spirograph'));

export default function ExistingTemplates(props){
      
  const arrLength = props.predefinedTemplates.length;
  const elRefs = React.useRef([]);

  if (elRefs.current.length !== arrLength) {
    // add or remove refs
    elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }

  return (
    <div>
    <h3 className="chooseTemplates">Choose From Existing Templates</h3>
    <div className="templatesContainer">
      <div className="templateTransition"></div>
      <div className="gridContainer">
        {props.predefinedTemplates.map((predefinedTemplate, i) => (
         
          <div
            key={predefinedTemplate.id}
            className="templateDisplay"
            onClick={() => {
              props.callChangeDisplay(
                predefinedTemplate.f,
                predefinedTemplate.m,
                predefinedTemplate.n,
                110,
                2,
                "#ffc700"
              );
            }}
          >
          <Suspense fallback={<div>Loading...</div>}>
            <Spirograph
              templateId={predefinedTemplate.predefinedTemplateNumber}
              f={predefinedTemplate.f}
              m={predefinedTemplate.m}
              n={predefinedTemplate.n}
              scale="30"
              strokeWidth="1"
              color="#ffc700"
              ref={elRefs.current[i]}
            />
          </Suspense>
            <div
              className="hoverBtnSecondary hideClass"
              onClick={(event) => {
                let svg = elRefs.current[i].current.innerHTML.toString();
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
          // </Suspense>
        ))}
      </div>
    </div>
  </div>
  )

}