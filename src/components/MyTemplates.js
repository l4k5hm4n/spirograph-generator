import React, { useState, useCallback, useEffect, useRef } from "react";
import DisplaySpirograph from "./DisplaySpirograph";
import AlterPage from "./AlterPage";
import Spirograph from "./Spirograph";
import { db } from "../config/firebase-config";
import "../style/myTemplates.css";
function MyTemplates(props) {

  const linesRef = useRef();
  const [userDefinedTemplates, setUserDefinedTemplates] = useState([]);
  const [userEmail, setuserEmail] = useState();
  const [showAlterMyTemplatesPage, setShowAlterMyTemplatePage] = useState(false);
  const [alterMyTemplateFValue, setAlterMyTemplateFValue] = useState('');
  const [alterMyTemplateMValue, setAlterMyTemplateMValue] = useState('');
  const [alterMyTemplateNValue, setAlterMyTemplateNValue] = useState('');
  const [alterMyTemplateScaleValue, setAlterMyTemplateScaleValue] = useState('');
  const [alterMyTemplateStrokeWidthValue, setAlterMyTemplateStrokeWidthValue] = useState('');
  const [alterMyTemplateColorValue, setAlterMyTemplateColorValue] = useState('');
  
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "checkUserLogin" } }, "*");
    window.addEventListener("message", async (event) => { 
    if (event.data.pluginMessage.type === "checkUserLogin") { 
      // setUserDefinedTemplates(event.data.pluginMessage.myTemplates)
      setuserEmail(event.data.pluginMessage.UserDetails.email)

      db.collection("users").doc(event.data.pluginMessage.UserDetails.email).get().then( (user) => {
        setUserDefinedTemplates(user.data().myTemplates)
       })

    }
    })
  }, []);

  let svg;

  const callChangeMyTemplateDisplay = useCallback(
    (argF, argM, argN, argScale, argStrokeWidth, argColor) => {
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

      { userDefinedTemplates.length > 0 ? (
      <div className="myTemplatesContainer">
        <div
          id="myTemplatesDisplayContainer"
        >
          <div
            id="myTemplatesHoverPen"
            className="myTemplatesHoverButton"
            onClick={(event) => {
              setShowAlterMyTemplatePage(true);
            }}
          >
          <svg
              width="18"
              height="14"
              viewBox="0 0 18 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0)">
                <path
                  d="M6.00002 11.2001L1.80002 7.0001L0.400024 8.4001L6.00002 14.0001L18 2.0001L16.6 0.600098L6.00002 11.2001Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="18" height="14" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div id="myTemplatesHoverInsert" className="myTemplatesHoverButton">
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
          <div id="myTemplateLinesContainer"
          onClick={(e) => {
            svg = linesRef.current.innerHTML.toString();
            parent.postMessage(
              { pluginMessage: { type: "create-spirograph", svg } },
              "*"
            );
          }}>
            <div id="myTemplateLines">
              <DisplaySpirograph
                id="myTemplatesDisplaySpirograph"
                linesID="myTemplateLines"
                ref={linesRef}
                f={alterMyTemplateFValue == '' ? userDefinedTemplates[0].fValue : alterMyTemplateFValue}
                m={alterMyTemplateMValue == '' ? userDefinedTemplates[0].mValue : alterMyTemplateMValue}
                n={alterMyTemplateNValue == '' ? userDefinedTemplates[0].nValue : alterMyTemplateNValue}
                scale={alterMyTemplateScaleValue == '' ? userDefinedTemplates[0].scaleValue : alterMyTemplateScaleValue}
                strokeWidth={alterMyTemplateStrokeWidthValue  == '' ? userDefinedTemplates[0].strokeWidthValue : alterMyTemplateStrokeWidthValue}
                color={alterMyTemplateColorValue == '' ? userDefinedTemplates[0].colorValue : alterMyTemplateColorValue}
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
                {userDefinedTemplates.map((userDefinedTemplate, index) => (
                  <div
                    key={index*Math.random()}
                    className="templateDisplay"
                    onClick={() => {
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
                      f={userDefinedTemplate.fValue}
                      m={userDefinedTemplate.mValue}
                      n={userDefinedTemplate.nValue}
                      scale="30"
                      strokeWidth={userDefinedTemplate.strokeWidthValue}
                      color={userDefinedTemplate.colorValue}
                      ref={React.createRef()}
                    />
                    <div
                      className="hoverBtnSecondary hideClass"
                      onClick={(event) => {
                        
                        let updatedTemplates = userDefinedTemplates.filter((item, i)  => {
                          return i !== index;
                        })

                        db.collection("users").doc(userEmail).update({
                          myTemplates : updatedTemplates
                        })

                        setUserDefinedTemplates(updatedTemplates)

                        parent.postMessage(
                          {
                            pluginMessage: {
                              type: "sync_myTemplates",
                              myTemplates: updatedTemplates,
                            },
                          },
                          "*"
                        );

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
      ) : ( " no templates " )}
    </div>
  );
}

export default MyTemplates;
