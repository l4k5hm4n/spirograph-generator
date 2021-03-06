import React, { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { useHistory, MemoryRouter as Router } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../store/userDetailsSlice";
import onboarding4Img from "../assets/onboarding4.svg";
import "../style/app.css";
import "../style/onboarding.css";

export default function Onboarding(props) {
  const [currentScreen, setCurrentScreen] = useState(1);
  let dispatch = useDispatch();
  let history = useHistory();
  let userDetails = useSelector((state) => state.userDetails);

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

                    dispatch(fetchUserDetails()).then((response) => {
                      history.push("/");
                    });
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

                    dispatch(fetchUserDetails()).then((response) => {
                      history.replace("/loginPage");
                    });
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

  let onboardingImage2 = React.createElement(
    'img',
    { src: 'https://firebasestorage.googleapis.com/v0/b/spirous-figma-plugin.appspot.com/o/OB2.gif?alt=media&token=9f56ab26-7239-4996-9f79-2a09a70a0f40' },
    null
  )

  let onboardingImage3 = React.createElement(
    'img',
    { src: 'https://firebasestorage.googleapis.com/v0/b/spirous-figma-plugin.appspot.com/o/OB3.gif?alt=media&token=41020145-1d2d-4a0e-bbdd-6e9b4d012a29' },
    null
  )

  return (
    <div>
      {currentScreen == 1 && (
        <div className="onBoardingScreen">
          <h1 className="onBoardingTxt txtPrimary">
            Choose from a <span className="txtSecondary">hand picked</span>{" "}
            library of Spirographs
          </h1>
          <div className="shadowBorder">
          <img className={`${currentScreen == 1 ? 'shadow-bottom' : ''}`} src="https://firebasestorage.googleapis.com/v0/b/spirous-figma-plugin.appspot.com/o/OB1.gif?alt=media&token=8b1945e1-a423-4379-8354-2826c4d14196" />
          </div>
          <div className="onBoardingRadioBtnSection">
            <div
              className="onBoardingRadioBtn activeRadioBtn"
              onClick={() => {
                setCurrentScreen(1);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(2);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(3);
              }}
            ></div>
          </div>
          <div className="onBoardingBtnSection">
            <button
              className="onBoardingBtnSecondary"
              onClick={() => {
                setCurrentScreen(2);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentScreen == 2 && (
        <div className="onBoardingScreen">
          <h1 className="onBoardingTxt txtPrimary">
            Get your creative juice running by creating spirographs that are{" "}
            <span className="txtSecondary">unique</span> to you
          </h1>
          {onboardingImage2}
          <div className="onBoardingRadioBtnSection">
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(1);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn  activeRadioBtn"
              onClick={() => {
                setCurrentScreen(2);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(3);
              }}
            ></div>
          </div>
          <div className="onBoardingBtnSection">
            <button
              className="onBoardingBtnPrimary"
              onClick={() => {
                setCurrentScreen(1);
              }}
            >
              Prev
            </button>
            <button
              className="onBoardingBtnSecondary"
              onClick={() => {
                setCurrentScreen(3);
              }}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {currentScreen == 3 && (
        <div className="onBoardingScreen">
          <h1 className="onBoardingTxt txtPrimary">
            <span className="txtSecondary">Sign up to save </span> your
            self-created Spirographs on your account
          </h1>
          {onboardingImage3}
          <div className="onBoardingRadioBtnSection">
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(1);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn"
              onClick={() => {
                setCurrentScreen(2);
              }}
            ></div>
            <div
              className="onBoardingRadioBtn  activeRadioBtn"
              onClick={() => {
                setCurrentScreen(3);
              }}
            ></div>
          </div>
          <div className="onBoardingStackedBtnSection">
            
          {!userDetails.loggedIn && ( <button
              id="onBoardingGoogleBtn"
              className="onBoardingBtnSecondary"
              onClick={() => {
                clickedLogin();
                setCurrentScreen(4);
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
                  d="M17.1713 7.36791H16.5V7.33333H9.00002V10.6667H13.7096C13.0225 12.6071 11.1763 14 9.00002 14C6.23877 14 4.00002 11.7612 4.00002 9C4.00002 6.23875 6.23877 4 9.00002 4C10.2746 4 11.4342 4.48083 12.3171 5.26625L14.6742 2.90916C13.1859 1.52208 11.195 0.666664 9.00002 0.666664C4.39794 0.666664 0.666687 4.39791 0.666687 9C0.666687 13.6021 4.39794 17.3333 9.00002 17.3333C13.6021 17.3333 17.3334 13.6021 17.3334 9C17.3334 8.44125 17.2759 7.89583 17.1713 7.36791Z"
                  fill="#FFC107"
                />
                <path
                  d="M1.6275 5.12125L4.36542 7.12916C5.10625 5.295 6.90042 4 9 4C10.2746 4 11.4342 4.48083 12.3171 5.26625L14.6742 2.90916C13.1858 1.52208 11.195 0.666664 9 0.666664C5.79917 0.666664 3.02334 2.47375 1.6275 5.12125Z"
                  fill="#FF3D00"
                />
                <path
                  d="M8.99999 17.3333C11.1525 17.3333 13.1083 16.5096 14.5871 15.17L12.0079 12.9875C11.1431 13.6452 10.0864 14.0009 8.99999 14C6.83249 14 4.99207 12.6179 4.29874 10.6892L1.58124 12.7829C2.9604 15.4817 5.76124 17.3333 8.99999 17.3333Z"
                  fill="#4CAF50"
                />
                <path
                  d="M17.1712 7.36792H16.5V7.33334H9V10.6667H13.7096C13.3809 11.5902 12.7889 12.3972 12.0067 12.9879L12.0079 12.9871L14.5871 15.1696C14.4046 15.3354 17.3333 13.1667 17.3333 9C17.3333 8.44125 17.2758 7.89584 17.1712 7.36792Z"
                  fill="#1976D2"
                />
              </svg>

              <span>Signup With Google</span>
            </button> )
            }
            <button
              className={`onBoardingBtnHollow ${!userDetails.loggedIn ? 'margin-top-32' : '' }`}
              onClick={() => {

                if(props.location && props.location.onboardingProps && props.location.onboardingProps.routeFrom!== 'login') {
                  props.setOnboarding(false);
                }

                else if(props.location && props.location.onboardingProps && props.location.onboardingProps.routeFrom == 'login') {
                  history.push("/");
                }

                else {
                  props.setOnboarding(false);
                  history.push("/");
                }
                
              }}
            >
              Skip
            </button>
          </div>
        </div>
      )}
      {currentScreen == 4 && (
        <div className="onBoardingScreen">
          <h1 className="onBoardingTxt txtPrimary">
            Switch to your browser window and login with your{" "}
            <span className="txtSecondary">Google</span> account
          </h1>
          <img src={onboarding4Img} />
          <h3 className="onBoardingSubTxt">Can't see the options?</h3>
          <div className="onBoardingStackedBtnSection">
            <button
              className="onBoardingBtnSecondary"
              onClick={() => {
                clickedLogin();
              }}
            >
              Try again
            </button>
            <button
              className="onBoardingBtnHollow"
              onClick={() => {
                props.setOnboarding(false);
                history.push("/");
              }}
            >
              Skip
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
