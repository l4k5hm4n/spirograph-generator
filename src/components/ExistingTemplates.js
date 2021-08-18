import React, { createRef} from "react";
import Spirograph from "./Spirograph";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";

   export default function ExistingTemplates(props){
      
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

  const arrLength = predefinedTemplates.length;
  const elRefs = React.useRef([]);

  if (elRefs.current.length !== arrLength) {
    // add or remove refs
    elRefs.current = Array(arrLength).fill().map((_, i) => elRefs.current[i] || createRef());
  }

  // React.useEffect(() => {
  //   console.log("existing templates render")
  // }, [])

  return (
    <div>
    <h3 className="chooseTemplates">Choose From Existing Templates</h3>
    <div className="templatesContainer">
      <div className="templateTransition"></div>
      <div className="gridContainer">
        {predefinedTemplates.map((predefinedTemplate, i) => (
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
            <Spirograph
              templateId={predefinedTemplate.predefinedTemplateNumber}
              f={predefinedTemplate.f}
              m={predefinedTemplate.m}
              n={predefinedTemplate.n}
              scale="30"
              strokeWidth="1"
              color="#fff"
              ref={elRefs.current[i]}
            />
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
        ))}
      </div>
    </div>
  </div>
  )

}