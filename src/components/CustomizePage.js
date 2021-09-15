import React, { useCallback, useState, useRef, createRef } from "react";
import DisplaySpirograph from "./DisplaySpirograph";
import SectionNav from "./SectionNav";
import { useHistory, MemoryRouter as Router } from "react-router-dom";
import Modal from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import { addUserTemplate } from "../store/userDetailsSlice";
import AlterPage from "./AlterPage";
import "../style/style.css";
import "../style/customizePage.css";

function CustomizePage(props) {
  let userDetails = useSelector((state) => state.userDetails);
  const history = useHistory();
  const modalSaveTemplateRef = createRef();
  const modalSaveButtonRef = createRef();
  const modalWarningRef = createRef();
  const modalSaveTemplateSuccessRef = createRef();
  const modalInputRef = useRef();
  const dispatch = useDispatch();
  const linesRef = useRef();
  const [templateName, setTemplateName] = useState("");
  const [customizeFValue, setCustomizeFValue] = useState(0.6);
  const [customizeMValue, setCustomizeMValue] = useState(70);
  const [customizeNValue, setCustomizeNValue] = useState(50);
  const [customizeScaleValue, setCustomizeScaleValue] = useState(100);
  const [customizeStrokeWidthValue, setCustomizeStrokeWidthValue] = useState(2);
  const [customizeColorValue, setCustomizeColorValue] = useState("#ffc700");

  let svg;

  const addTemplateListener = () => {
    dispatch(
      addUserTemplate({
        templateName: modalInputRef.current.value,
        fValue: customizeFValue,
        mValue: customizeMValue,
        nValue: customizeNValue,
        scaleValue: customizeScaleValue,
        strokeWidthValue: customizeStrokeWidthValue,
        colorValue: customizeColorValue,
      })
    );
  };

  const getRandomColor = () => {
    let letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const randomizeParams = () => {
    setCustomizeFValue(
      (Math.floor(Math.random() * 12 + 8) / 10) *
        (Math.floor(Math.random() * 2) ? 1 : -1)
    );
    setCustomizeMValue(Math.floor(Math.random() * 70 + 30));
    setCustomizeNValue(Math.floor(Math.random() * 29 + 1));
    setCustomizeScaleValue(Math.max(Math.floor(Math.random() * 12 + 12) * 5), 100);
    setCustomizeStrokeWidthValue(Math.floor(Math.random() * 19 + 1) / 10);
    setCustomizeColorValue(getRandomColor);
  };

  const callChangeDisplay = useCallback(
    (argF, argM, argN, argScale, argStrokeWidth, argColor) => {
      setCustomizeFValue(argF);
      setCustomizeMValue(argM);
      setCustomizeNValue(argN);
      setCustomizeScaleValue(argScale);
      setCustomizeStrokeWidthValue(argStrokeWidth);
      setCustomizeColorValue( argColor == "" ? "#ffc700" : argColor );
    }
  );
  const clickedSaveTemplatePrompt = () => {
    modalSaveTemplateRef.current.openModal();
  };
  return (
    <React.Fragment>
      <SectionNav
        route="/"
        title="Create your Spirograph"
        hideCreate={true}
        hideProfile={true}
      />
      <div id="CustomizePage">
        <div
          id="randomizeBtn"
          onClick={(e) => {
            e.stopPropagation();
            randomizeParams();
          }}
        >
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.75 0.25L15.6875 3.625L11.75 7L15.6875 10.375L11.75 13.75V11.5H9.695L7.58 9.385L9.17 7.795L10.625 9.25H11.75V4.75H10.625L3.875 11.5H0.5V9.25H2.945L9.695 2.5H11.75V0.25ZM0.5 2.5H3.875L5.99 4.615L4.4 6.205L2.945 4.75H0.5V2.5Z"
              fill="#FFC700"
            />
          </svg>
        </div>
        <div className="customizeContainer">
          <div id="customizeDisplayContainer">
            {userDetails.loggedIn && (
              <div
                id="customizeHoverCheck"
                className="hoverBtn hoverBtnPrimary"
                onClick={() => {
                  // addTemplateListener();
                  clickedSaveTemplatePrompt();
                }}
              >
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
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
            )}
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
            <div
              id="customizeLinesContainer"
              onClick={(e) => {
                svg = linesRef.current.innerHTML.toString();
                parent.postMessage(
                  { pluginMessage: { type: "create-spirograph", svg } },
                  "*"
                );
              }}
            >
              <div id="customizeLines">
                <DisplaySpirograph
                  id="displaySpirograph"
                  linesID="customizeLines"
                  f={customizeFValue}
                  m={customizeMValue}
                  n={customizeNValue}
                  scale={customizeScaleValue}
                  strokeWidth={customizeStrokeWidthValue}
                  color={customizeColorValue}
                  ref={linesRef}
                />
              </div>
            </div>
          </div>

          <AlterPage
            callChangeDisplay={callChangeDisplay}
            alterFValue={customizeFValue}
            alterMValue={customizeMValue}
            alterNValue={customizeNValue}
            alterScaleValue={customizeScaleValue}
            alterStrokeWidthValue={customizeStrokeWidthValue}
            alterColorValue={customizeColorValue}
          />
        </div>
        <Modal ref={modalSaveTemplateRef}>
          <div className="modalHeading">✅ Save the template</div>
          <div className="modalInputContainer">
            <div className="modalSubtxt">Template Name</div>
            <input
              ref={modalInputRef}
              type="text"
              className="modalInput"
              placeholder="Fireball 🔥"
              maxLength="31"
              onChange={(e) => {
                {
                  if (e.target.value.length === 0 || e.target.value === null) {
                    modalSaveButtonRef.current.style.pointerEvents = "none";
                    modalSaveButtonRef.current.style.background = "#676767";
                    modalSaveButtonRef.current.style.color = "#B1B1B1";
                  } else if (e.target.value.length > 30) {
                    modalSaveButtonRef.current.style.pointerEvents = "none";
                    modalSaveButtonRef.current.style.background = "#676767";
                    modalInputRef.current.style.border = "1px solid red";
                    modalWarningRef.current.innerHTML =
                      "Please enter a template name within 30 characters";
                  } else {
                    modalSaveButtonRef.current.style.pointerEvents = "all";
                    modalSaveButtonRef.current.style.background =
                      "var(--white)";
                    modalSaveButtonRef.current.style.color = "#000";
                    modalInputRef.current.style.border = "none";
                    modalWarningRef.current.innerHTML = "";
                  }
                }
              }}
            ></input>
            <div className="modalWarning" ref={modalWarningRef}></div>
          </div>

          <div className="btnPair">
            <button
              ref={modalSaveButtonRef}
              className="btnPrimary  btnDisabled"
              onClick={() => {
                addTemplateListener();
                modalSaveTemplateRef.current.closeModal();
                modalSaveTemplateSuccessRef.current.openModal();
                setTemplateName(modalInputRef.current.value);
              }}
            >
              Save
            </button>
            <button
              className="btnSecondary"
              onClick={() => {
                modalSaveTemplateRef.current.closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
        <Modal ref={modalSaveTemplateSuccessRef}>
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.0002 0.333252C7.80016 0.333252 0.333496 7.79992 0.333496 16.9999C0.333496 26.1999 7.80016 33.6666 17.0002 33.6666C26.2002 33.6666 33.6668 26.1999 33.6668 16.9999C33.6668 7.79992 26.2002 0.333252 17.0002 0.333252ZM13.6668 25.3333L5.3335 16.9999L7.6835 14.6499L13.6668 20.6166L26.3168 7.96659L28.6668 10.3333L13.6668 25.3333Z"
              fill="#05CB19"
            />
          </svg>

          <span className="modalText">
            Your template "{templateName}" has been saved successfully
          </span>
          <button
            className="btnPrimary"
            onClick={() => {
              modalSaveTemplateSuccessRef.current.closeModal();
              history.push("/loginPage/myTemplates");
            }}
          >
            Okay
          </button>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default CustomizePage;
