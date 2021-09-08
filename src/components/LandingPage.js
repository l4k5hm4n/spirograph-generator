import React, { useState, useRef, useCallback, createRef } from "react";
import DisplaySpirograph from "./DisplaySpirograph";
import AlterPage from "./AlterPage";
import Modal from "./Modal";
import Nav from "./Nav";
import ReactNotification, { store } from "react-notifications-component";
import InsertedSpirographNotif from "./InsertedSpirographNotif";
import SectionNav from "./SectionNav";
// import "../style/theme.css";
import ExistingTemplates from "./ExistingTemplates";
import "animate.css";
import predefinedTemplates from "../config/predefinedTemplates";
import { Link, useHistory, MemoryRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addUserTemplate } from "../store/userDetailsSlice";
import "../style/style.css";
import "../style/landingPage.css";
import "../style/templates.css";

function LandingPage(props) {
  let userDetails = useSelector((state) => state.userDetails);
  let dispatch = useDispatch();
  const history = useHistory();
  const modalSaveTemplateRef = createRef();
  const modalSaveButtonRef = createRef();
  const modalWarningRef = createRef();
  const modalSaveTemplateSuccessRef = createRef();
  const modalInputRef = useRef();
  const linesRef = useRef();
  const shadowLinesRef = useRef();
  const [templateName, setTemplateName] = useState("");
  const [alterFValue, setAlterFValue] = useState(0.6);
  const [alterMValue, setAlterMValue] = useState(70);
  const [alterNValue, setAlterNValue] = useState(50);
  const [alterScaleValue, setAlterScaleValue] = useState(110);
  const [alterStrokeWidthValue, setAlterStrokeWidthValue] = useState(2);
  const [alterColorValue, setAlterColorValue] = useState("#ffc700");
  let svg;

  const callChangeDisplay = useCallback(
    (argF, argM, argN, argScale, argStrokeWidth, argColor) => {
      setAlterFValue(argF);
      setAlterMValue(argM);
      setAlterNValue(argN);
      setAlterScaleValue(argScale);
      setAlterStrokeWidthValue(argStrokeWidth);
      setAlterColorValue(argColor);
    },
    []
  );

  const addTemplateListener = () => {
    dispatch(
      addUserTemplate({
        templateName: modalInputRef.current.value,
        fValue: alterFValue,
        mValue: alterMValue,
        nValue: alterNValue,
        scaleValue: alterScaleValue,
        strokeWidthValue: alterStrokeWidthValue,
        colorValue: alterColorValue,
      })
    );
  };

  const clickedSaveTemplatePrompt = () => {
    modalSaveTemplateRef.current.openModal();
  };

  return (
    <React.Fragment>
    { props.location.homeProps ? 
      props.location.homeProps.activeSection == "alter" ? 
        <SectionNav route="/" title="Edit Spirograph" hideCreate={true} hideProfile={false} />
      : <Nav />
      : <Nav />
    }
    <div id="landingPage">
      <div className="displayContainer">
        <div id="linesContainer">
          <Link
            to={{
              pathname: "/",
              homeProps: {
                activeSection: "alter",
              },
            }}
            className={`${
              props.location.homeProps
                ? props.location.homeProps.activeSection == "alter"
                  ? "disable"
                  : ""
                : ""
            }`}
          >
            <div id="hoverPen" className="hoverBtn hoverBtnPrimary">
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
          </Link>

          {userDetails.loggedIn && (
            <div
              onClick={() => {
                clickedSaveTemplatePrompt();
              }}
              className={`hoverBtn insertTemplate hoverBtnPrimary ${
                props.location.homeProps
                  ? props.location.homeProps.activeSection == "alter"
                    ? "enable"
                    : ""
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <path
                  d="M13 20.2001L8.79999 16.0001L7.39999 17.4001L13 23.0001L25 11.0001L23.6 9.6001L13 20.2001Z"
                  fill="black"
                />
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
            id="lines"
            onClick={(event) => {
              svg = linesRef.current.innerHTML.toString();
              store.addNotification({
                content: InsertedSpirographNotif,
                container: "bottom-center",
                animationIn: ["animate__animated animate__fadeInUp"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                  duration: 4000,
                  showIcon: true,
                  pauseOnHover: true,
                },
                width: 328,
              });
              parent.postMessage(
                { pluginMessage: { type: "create-spirograph", svg } },
                "*"
              );
            }}
          >
            <DisplaySpirograph
              id="displaySpirograph"
              linesID="lines"
              ref={linesRef}
              shadowRef={shadowLinesRef}
              f={alterFValue}
              m={alterMValue}
              n={alterNValue}
              scale={alterScaleValue}
              strokeWidth={alterStrokeWidthValue}
              color={alterColorValue}
            />
          </div>
        </div>

        <div
          className={`alterSection ${
            props.location.homeProps
              ? props.location.homeProps.activeSection == "alter"
                ? "active"
                : ""
              : ""
          }`}
        >
          <AlterPage
            visible={
              props.location.homeProps
                ? props.location.homeProps.activeSection == "alter"
                  ? true
                  : false
                : false
            }
            callChangeDisplay={callChangeDisplay}
            alterFValue={alterFValue}
            alterMValue={alterMValue}
            alterNValue={alterNValue}
            alterScaleValue={alterScaleValue}
            alterStrokeWidthValue={alterStrokeWidthValue}
            alterColorValue={alterColorValue}
          />
        </div>
        <div
          className={`ETSection ${
            props.location.homeProps
              ? props.location.homeProps.activeSection == "home"
                ? "active"
                : ""
              : "active"
          }`}
        >
          <ExistingTemplates
            callChangeDisplay={callChangeDisplay}
            predefinedTemplates={predefinedTemplates}
          />
        </div>
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
                  modalSaveButtonRef.current.style.background = "var(--white)";
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
          Your template "{templateName}" has been saved sucessfully
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
      <ReactNotification />
    </div>
    </React.Fragment>
  );
}

export default LandingPage;
