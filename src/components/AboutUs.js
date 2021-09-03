import React from "react";
import "../style/style.css";
import "../style/aboutUs.css";

function AboutUs() {
  return (
    <div id="AboutUsPage">
      <div id="aboutUsContainer">
        <div id="aboutUsDetails" className="greyBgd">
          <div className="shapeBgd">
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 11.5V19.5H0V11.5H8ZM9 0L14.5 9H3.5L9 0ZM14.5 11C17 11 19 13 19 15.5C19 18 17 20 14.5 20C12 20 10 18 10 15.5C10 13 12 11 14.5 11Z"
                fill="#EDB92E"
              />
            </svg>
          </div>
          <div className="boldTxtWhite">What do we do?</div>
          <div className="lightTxtGrey">
            We are a bunch of designers, writers, and developers working to make
            the user experience more seamless, delightful, and fun while
            impacting the community
          </div>
        </div>
        <div id="pluginDetails" className="greyBgd">
          <div className="shapeBgd">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V9H11V15ZM11 7H9V5H11V7Z"
                fill="#EDB92E"
              />
            </svg>
          </div>
          <div className="boldTxtWhite">Plugin Details</div>
          <div className="listDiv">
            <span className="lightTxtGrey">Version Number</span>
            <span className="lightTxtWhite">1.0</span>
          </div>
          <div className="listDiv">
            <span className="lightTxtGrey">Need Help</span>
            <span className="lightTxtYellow">spirous@support.in</span>
          </div>
          <div className="listDiv">
            <span className="lightTxtGrey">Developed by </span>
            <span className="lightTxtWhite">Zeta UX</span>
          </div>
          <div className="listDiv">
            <span className="lightTxtGrey">Last Updated on</span>
            <span className="lightTxtWhite">Auguest 16, 2021</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
