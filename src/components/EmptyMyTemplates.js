import React from "react";
import { useHistory, MemoryRouter as Router } from "react-router-dom";
import "../style/style.css";
import "../style/myTemplates.css";

function EmptyMyTemplates() {
  let history = useHistory();
  return (
    <div id="emptyMyTemplatesContainer">
      <div id="emptySVGcontainer">
        <svg
          width="72"
          height="86"
          viewBox="0 0 72 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.2"
            d="M6.39582 28.9023L1.56148 28.8153"
            stroke="white"
            strokeWidth="1.48773"
            strokeLinecap="round"
          />
          <path
            opacity="0.2"
            d="M65.425 30.438L61.5613 27.531"
            stroke="white"
            strokeWidth="1.48773"
            strokeLinecap="round"
          />
          <rect
            x="9"
            y="18.5557"
            width="43.713"
            height="52.4556"
            rx="3.27847"
            transform="rotate(-13.9737 9 18.5557)"
            fill="#767263"
          />
          <path
            opacity="0.3"
            fill="#FFC700"
          />
          <rect
            x="1.5"
            y="39.5"
            width="69"
            height="45"
            rx="4.5"
            fill="#252525"
            stroke="#FFC700"
            strokeWidth="3"
          />
          <circle
            opacity="0.2"
            cx="24.2316"
            cy="3.2316"
            r="2.2316"
            stroke="white"
            strokeWidth="1.48773"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div id="emptyMyTemplatesTxt">
        <h1>No Saved Templates</h1>
        <h3>You have not saved any templates on your account</h3>
      </div>
      <button 
      onClick={() => history.push("/customizePage")} className="btnSecondary">+ Create Now</button>
    </div>
  );
}

export default EmptyMyTemplates;