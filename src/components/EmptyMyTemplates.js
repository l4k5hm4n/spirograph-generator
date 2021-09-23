import React from "react";
import { useHistory, MemoryRouter as Router } from "react-router-dom";
import emptyTemplate from "../assets/emptyTemplate.svg";
import "../style/style.css";
import "../style/myTemplates.css";

function EmptyMyTemplates() {
  let history = useHistory();
  return (
    <div id="emptyMyTemplatesContainer">
      <div id="emptySVGcontainer">
        <img src={emptyTemplate} alt="emptyTemplate" />
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