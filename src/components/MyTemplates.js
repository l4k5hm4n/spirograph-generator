import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  createRef,
} from "react";
import DisplaySpirograph from "./DisplaySpirograph";
import AlterPage from "./AlterPage";
import Spirograph from "./Spirograph";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserTemplate,
  editUserTemplate,
} from "../store/userDetailsSlice";
import "../style/myTemplates.css";
function MyTemplates(props) {
  let userDetails = useSelector((state) => state.userDetails);
  let dispatch = useDispatch();

  const linesRef = useRef();
  const [showAlterMyTemplatesPage, setShowAlterMyTemplatePage] =
    useState(false);
  const [alterMyTemplateFValue, setAlterMyTemplateFValue] = useState("");
  const [alterMyTemplateMValue, setAlterMyTemplateMValue] = useState("");
  const [alterMyTemplateNValue, setAlterMyTemplateNValue] = useState("");
  const [alterMyTemplateScaleValue, setAlterMyTemplateScaleValue] =
    useState("");
  const [alterMyTemplateStrokeWidthValue, setAlterMyTemplateStrokeWidthValue] =
    useState("");
  const [alterMyTemplateColorValue, setAlterMyTemplateColorValue] =
    useState("");

  const modalDeleteRef = createRef();
  const modalDeleteSuccessRef = createRef();

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
  const clickedDeletePrompt = () => {
    modalDeleteRef.current.openModal();
  };
  const showDeletedSuccessPrompt = () => {
    modalDeleteSuccessRef.current.openModal();
  };
  return (
    <div id="MyTemplates">
      {userDetails.myTemplates && userDetails.myTemplates.length > 0 ? (
        <div className="myTemplatesContainer">
          <div id="myTemplatesDisplayContainer">
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
            <div
              id="myTemplateLinesContainer"
              onClick={(e) => {
                svg = linesRef.current.innerHTML.toString();
                parent.postMessage(
                  { pluginMessage: { type: "create-spirograph", svg } },
                  "*"
                );
              }}
            >
              <div id="myTemplateLines">
                <DisplaySpirograph
                  id="myTemplatesDisplaySpirograph"
                  linesID="myTemplateLines"
                  ref={linesRef}
                  f={
                    alterMyTemplateFValue == ""
                      ? userDetails.myTemplates[0].fValue
                      : alterMyTemplateFValue
                  }
                  m={
                    alterMyTemplateMValue == ""
                      ? userDetails.myTemplates[0].mValue
                      : alterMyTemplateMValue
                  }
                  n={
                    alterMyTemplateNValue == ""
                      ? userDetails.myTemplates[0].nValue
                      : alterMyTemplateNValue
                  }
                  scale={
                    alterMyTemplateScaleValue == ""
                      ? userDetails.myTemplates[0].scaleValue
                      : alterMyTemplateScaleValue
                  }
                  strokeWidth={
                    alterMyTemplateStrokeWidthValue == ""
                      ? userDetails.myTemplates[0].strokeWidthValue
                      : alterMyTemplateStrokeWidthValue
                  }
                  color={
                    alterMyTemplateColorValue == ""
                      ? userDetails.myTemplates[0].colorValue
                      : alterMyTemplateColorValue
                  }
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
                  {userDetails.myTemplates.map((userTemplate, index) => (
                    <div
                      key={userTemplate.id}
                      className="templateDisplay"
                      onClick={() => {
                        callChangeMyTemplateDisplay(
                          userTemplate.fValue,
                          userTemplate.mValue,
                          userTemplate.nValue,
                          userTemplate.scaleValue,
                          userTemplate.strokeWidthValue,
                          userTemplate.colorValue
                        );
                      }}
                    >
                      <Spirograph
                        f={userTemplate.fValue}
                        m={userTemplate.mValue}
                        n={userTemplate.nValue}
                        scale="30"
                        strokeWidth={userTemplate.strokeWidthValue}
                        color={userTemplate.colorValue}
                        ref={React.createRef()}
                      />
                      <div
                        className="hoverBtnSecondary hideClass"
                        onClick={
                          () => clickedDeletePrompt()
                          // dispatch(deleteUserTemplate(userTemplate.id))
                        }
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
      ) : (
        " no templates "
      )}
      <Modal ref={modalDeleteRef}>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 0.333496C7.80004 0.333496 0.333374 7.80016 0.333374 17.0002C0.333374 26.2002 7.80004 33.6668 17 33.6668C26.2 33.6668 33.6667 26.2002 33.6667 17.0002C33.6667 7.80016 26.2 0.333496 17 0.333496ZM18.6667 25.3335H15.3334V22.0002H18.6667V25.3335ZM18.6667 18.6668H15.3334V8.66683H18.6667V18.6668Z"
            fill="#FFC700"
          />
        </svg>

        <span className="modalText">
          Are you sure you want to delete this template?
        </span>
        <div className="btnPair">
          <button
            className="btnPrimary"
            onClick={() => {
              dispatch(deleteUserTemplate(userTemplate.id));
              modalDeleteRef.current.closeModal();
              showDeletedSuccessPrompt();
            }}
          >
            Yes, Delete
          </button>
          <button
            className="btnSecondary"
            onClick={() => {
              modalDeleteRef.current.closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal ref={modalDeleteSuccessRef}>
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 0.333496C7.80004 0.333496 0.333374 7.80016 0.333374 17.0002C0.333374 26.2002 7.80004 33.6668 17 33.6668C26.2 33.6668 33.6667 26.2002 33.6667 17.0002C33.6667 7.80016 26.2 0.333496 17 0.333496ZM13.6667 25.3335L5.33337 17.0002L7.68337 14.6502L13.6667 20.6168L26.3167 7.96683L28.6667 10.3335L13.6667 25.3335Z"
            fill="#05CB19"
          />
        </svg>

        <span className="modalText">
          Template has been deleted successfully!
        </span>

        <button
          className="btnPrimary"
          onClick={() => {
            modalDeleteSuccessRef.current.closeModal();
          }}
        >
          Okay
        </button>
      </Modal>
    </div>
  );
}

export default MyTemplates;
