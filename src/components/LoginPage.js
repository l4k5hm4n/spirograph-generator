import React, { useState, createRef, useEffect } from "react";
import { db } from "../config/firebase-config";
import { Link, MemoryRouter as Router } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails, updateUserDetails } from "../store/userDetailsSlice";
import Modal from "./Modal";
import ReactNotification, { store } from "react-notifications-component";
import LoggedOutSuccessNotif from "./LoggedOutSuccessNotif";
import LoginToViewTemplatesNotif from "./LoginToViewTemplatesNotif";
import "react-notifications-component/dist/theme.css";
import ExistingTemplates from "./ExistingTemplates";
import "animate.css";
import "../style/style.css";
import "../style/loginPage.css";
function LoginPage() {
  let userDetails = useSelector((state) => state.userDetails);
  let dispatch = useDispatch();

  const modalRef = createRef();

  const clickedLogin = async () => {
    let uniqueString = nanoid();
    let timeStamp = new Date().toLocaleString();
    let db__loginAttempt = db.collection("login_attempts");
    let db__users = db.collection("users");

    // Send Sign In request to firestore
    db__loginAttempt
      .doc(uniqueString)
      .set({
        time: timeStamp,
        authStatus: false,
        linkUsed: false,
        userInfo: "",
        linkExpired: false,
      })
      .then(() => {
        // Open Signin link to browser
        window.open(
          `https://spirous-figma-plugin.web.app/?ref=${uniqueString}`
        );
        let loginEventListener = db__loginAttempt
          .doc(uniqueString)
          .onSnapshot((doc) => {
            let tempData = doc.data();

            //Continue only if authStatus is true
            if (tempData.authStatus) {
              // Post User details to figma for local storage
              console.log(tempData.userInfo, "user info ");
              parent.postMessage(
                {
                  pluginMessage: {
                    type: "login",
                    userDetails: tempData.userInfo,
                  },
                },
                "*"
              );
              let tempUser = db__users.doc(tempData.userInfo.email);
              tempUser
                .get()
                .then((user) => {
                  // If User already exists, update profile details with latest data
                  if (user.exists) {
                    tempUser.update({
                      uid: tempData.userInfo.uid,
                      name: tempData.userInfo.name,
                      email: tempData.userInfo.email,
                      photo: tempData.userInfo.photo,
                      lastLogin: new Date().toLocaleString(),
                    });

                    parent.postMessage(
                      {
                        pluginMessage: {
                          type: "sync_myTemplates",
                          myTemplates: user.data().myTemplates,
                        },
                      },
                      "*"
                    );

                    dispatch(fetchUserDetails());
                  } else {
                    // create new user profile if email doesn't exist already
                    tempUser.set({
                      uid: tempData.userInfo.uid,
                      email: tempData.userInfo.email,
                      name: tempData.userInfo.name,
                      photo: tempData.userInfo.photo,
                      lastLogin: new Date().toLocaleString(),
                      myTemplates: [],
                    });

                    parent.postMessage(
                      {
                        pluginMessage: {
                          type: "sync_myTemplates",
                          myTemplates: [],
                        },
                      },
                      "*"
                    );

                    dispatch(fetchUserDetails());
                  }
                })
                .catch((error) => {
                  console.log("error while getting user fields", error);
                });
              loginEventListener();
            }
          });
      })
      .catch((error) => {
        console.error("Error writing to login_attempts: ", error);
      });
  };

  // Modal Functions
  const clickedLogoutPrompt = () => {
    modalRef.current.openModal();
  };
  const clickedLogout = () => {
    parent.postMessage({ pluginMessage: { type: "logout" } }, "*");
    dispatch(updateUserDetails({ status: "logout" }));
    document.getElementById("UserAvatar").classList.add("removeClass");
    document.getElementById("accountInfo").classList.add("removeClass");
  };

  return (
    <div id="loginPage">
      <div id="loginContainer">
        <div id="loginDisplay">
          <div id="loginAvatar">
            {!userDetails.loggedIn ? (
              <svg
                width="116"
                height="117"
                viewBox="0 0 116 117"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M116 0.484619H0V116.485H116V0.484619Z"
                  fill="#009989"
                />
                <path
                  d="M40.7861 152.09C78.5189 159.425 115.053 134.782 122.388 97.0495C129.722 59.3167 105.08 22.7825 67.3467 15.448C29.6139 8.11345 -6.92034 32.7561 -14.2549 70.4889C-21.5894 108.222 3.05331 144.756 40.7861 152.09Z"
                  fill="#EDB92E"
                />
                <path
                  d="M25.6115 71.0911C25.5556 74.2953 27.1991 77.3979 30.1805 79.7163C33.1619 82.0348 37.237 83.3792 41.5093 83.4537C45.7816 83.5283 49.9011 82.327 52.9616 80.114C56.0221 77.901 57.7729 74.8576 57.8288 71.6534"
                  fill="black"
                />
                <path
                  d="M30.7815 51.8449C30.8126 50.0656 29.756 48.6043 28.4215 48.581C27.087 48.5577 25.98 49.9812 25.9489 51.7605C25.9179 53.5399 26.9745 55.0012 28.309 55.0245C29.6435 55.0477 30.7505 53.6242 30.7815 51.8449Z"
                  fill="black"
                />
                <path
                  d="M56.5554 52.2949C56.5864 50.5155 55.5298 49.0542 54.1953 49.0309C52.8608 49.0077 51.7539 50.4312 51.7228 52.2105C51.6917 53.9898 52.7484 55.4511 54.0829 55.4744C55.4173 55.4977 56.5243 54.0742 56.5554 52.2949Z"
                  fill="black"
                />
              </svg>
            ) : (
              <img
                src={userDetails.photo ? userDetails.photo : ""}
                id="UserAvatar"
              />
            )}
          </div>
          <div id="googleAccountInfo">
            <div id="signInContainer">
              {!userDetails.loggedIn && (
                <button
                  onClick={() => {
                    clickedLogin();
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.1713 7.368H16.5V7.33342H9.00001V10.6667H13.7096C13.0225 12.6072 11.1763 14.0001 9.00001 14.0001C6.23876 14.0001 4.00001 11.7613 4.00001 9.00008C4.00001 6.23883 6.23876 4.00008 9.00001 4.00008C10.2746 4.00008 11.4342 4.48091 12.3171 5.26633L14.6742 2.90925C13.1858 1.52216 11.195 0.666748 9.00001 0.666748C4.39792 0.666748 0.666672 4.398 0.666672 9.00008C0.666672 13.6022 4.39792 17.3334 9.00001 17.3334C13.6021 17.3334 17.3333 13.6022 17.3333 9.00008C17.3333 8.44133 17.2758 7.89592 17.1713 7.368Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M1.6275 5.12133L4.36542 7.12925C5.10625 5.29508 6.90042 4.00008 9 4.00008C10.2746 4.00008 11.4342 4.48091 12.3171 5.26633L14.6742 2.90925C13.1858 1.52216 11.195 0.666748 9 0.666748C5.79917 0.666748 3.02334 2.47383 1.6275 5.12133Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M9 17.3334C11.1525 17.3334 13.1083 16.5096 14.5871 15.17L12.0079 12.9875C11.1431 13.6452 10.0864 14.0009 9 14C6.8325 14 4.99209 12.618 4.29875 10.6892L1.58125 12.783C2.96042 15.4817 5.76125 17.3334 9 17.3334Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M17.1713 7.36784H16.5V7.33325H9V10.6666H13.7096C13.3809 11.5901 12.7889 12.3971 12.0067 12.9878L12.0079 12.987L14.5871 15.1695C14.4046 15.3353 17.3333 13.1666 17.3333 8.99992C17.3333 8.44117 17.2758 7.89575 17.1713 7.36784Z"
                      fill="#1976D2"
                    />
                  </svg>

                  <span>Connect With Google</span>
                </button>
              )}
            </div>
            <div>
              {userDetails.loggedIn && (
                <div id="accountInfo">
                  {/* <div id="accountInfo" className="removeClass"> */}
                  <h4>{userDetails.name}</h4>
                  <h6>{userDetails.email}</h6>
                </div>
              )}
            </div>
          </div>
        </div>
        <div id="loginLinks">
          <div id="loginTabs">
            {userDetails.loggedIn ? (
              <React.Fragment>
                <Link
                  to={{
                    pathname: "/loginPage/myTemplates",
                    myTemplatesProps: {
                      activeSection: "myTemplates",
                    },
                  }}
                >
                  <div className="greyBgd loginTab">
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
                    <div className="loginTabTxt">
                      <div className="boldTxtWhite">My Templates</div>
                      <div className="lightTxtGrey">
                        Manage your saved templates
                      </div>
                    </div>
                  </div>
                </Link>
                <Link to="/loginPage/AboutUs" id="aboutUsLink">
                  <div className="greyBgd loginTab">
                    <div className="shapeBgd">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                          fill="#EDB92E"
                        />
                      </svg>
                    </div>
                    <div className="loginTabTxt">
                      <div className="boldTxtWhite">About Us</div>
                      <div className="lightTxtGrey">
                        Learn about our journey!
                      </div>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div
                  className="greyBgd loginTab"
                  onClick={() => {
                    store.addNotification({
                      content: LoginToViewTemplatesNotif,
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
                  }}
                >
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
                  <div className="loginTabTxt">
                    <div className="boldTxtWhite">My Templates</div>
                    <div className="lightTxtGrey">
                      Login to manage your saved templates
                    </div>
                  </div>
                </div>
                <Link to="/loginPage/AboutUs" id="aboutUsLink">
                  <div className="greyBgd loginTab">
                    <div className="shapeBgd">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 7H9V5H11V7ZM11 15H9V9H11V15ZM10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0Z"
                          fill="#EDB92E"
                        />
                      </svg>
                    </div>
                    <div className="loginTabTxt">
                      <div className="boldTxtWhite">About Us</div>
                      <div className="lightTxtGrey">
                        Learn about our journey!
                      </div>
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            )}
          </div>
          <div id="logoutContainer">
            {userDetails.loggedIn && (
              <button
                id="logout"
                onClick={() => {
                  clickedLogoutPrompt();
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 0H2C0.89 0 0 0.89 0 2V6H2V2H16V16H2V12H0V16C0 16.5304 0.210714 17.0391 0.585786 17.4142C0.960859 17.7893 1.46957 18 2 18H16C16.5304 18 17.0391 17.7893 17.4142 17.4142C17.7893 17.0391 18 16.5304 18 16V2C18 1.46957 17.7893 0.960859 17.4142 0.585786C17.0391 0.210714 16.5304 0 16 0ZM7.08 12.58L8.5 14L13.5 9L8.5 4L7.08 5.41L9.67 8H0V10H9.67L7.08 12.58Z"
                    fill="white"
                  />
                </svg>

                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <Modal ref={modalRef}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="16" fill="#EDB92E" />
          <path
            d="M12 9.33325H18C18.3536 9.33325 18.6928 9.47373 18.9428 9.72378C19.1929 9.97382 19.3334 10.313 19.3334 10.6666V11.9999H18V10.6666H12V21.3333H18V19.9999H19.3334V21.3333C19.3334 21.6869 19.1929 22.026 18.9428 22.2761C18.6928 22.5261 18.3536 22.6666 18 22.6666H12C11.6464 22.6666 11.3073 22.5261 11.0572 22.2761C10.8072 22.026 10.6667 21.6869 10.6667 21.3333V10.6666C10.6667 10.313 10.8072 9.97382 11.0572 9.72378C11.3073 9.47373 11.6464 9.33325 12 9.33325Z"
            fill="black"
          />
          <path
            d="M18.7267 18.3934L19.6667 19.3334L23 16.0001L19.6667 12.6667L18.7267 13.6067L20.4467 15.3334H14V16.6667H20.4467L18.7267 18.3934Z"
            fill="black"
          />
        </svg>

        <span className="modalText">
          Are you sure you want to logout your profile from this plugin?
        </span>
        <div className="btnPair">
          <button
            className="btnPrimary"
            onClick={() => {
              clickedLogout();
              modalRef.current.closeModal();
              store.addNotification({
                content: LoggedOutSuccessNotif,
                container: "bottom-center",
                // insert: "top",
                animationIn: ["animate__animated animate__fadeInUp"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                  duration: 2000,
                  showIcon: true,
                  pauseOnHover: true,
                },
                width: 328,
              });
            }}
          >
            Logout
          </button>
          <button
            className="btnSecondary"
            onClick={() => {
              modalRef.current.closeModal();
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <ReactNotification />
    </div>
  );
}

export default LoginPage;
