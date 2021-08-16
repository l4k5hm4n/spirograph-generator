import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import CustomizePage from "./CustomizePage";
import LoginPage from "./LoginPage";
import MyTemplates from "./MyTemplates";
import AboutUs from "./AboutUs";
import { Route, Link, MemoryRouter as Router, Switch } from "react-router-dom";
import "../style/app.css";
import { createStore, applyMiddleware, compose } from "redux";
import allReducers from "../reducers/index.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {
  createFirestoreInstance,
  reduxFirestore,
  getFirestore,
} from "redux-firestore";
import {
  reactReduxFirebaseProvider,
  getFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import fbConfig from "../config/firebase-config";
import firebase from "firebase/app";
function App() {
  const store = createStore(allReducers, applyMiddleware(thunk));
  // const store = createStore(
  //   allReducers,
  //   compose(
  //     applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
  //     reduxFirestore(fbConfig)
  //     // reactReduxFirebase(fbConfig)
  //   )
  // );
  // const rrfProps = {
  //   firebase,
  //   config: fbConfig,
  //   createFirestoreInstance,
  // };
  store.subscribe(() => {
    console.log(" State is ", store.getState());
  });
  return (
    <div>
      <Provider store={store}>
        {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" component={() => <LandingPage />} />
            <Route
              exact
              path="/customizePage"
              component={() => <CustomizePage />}
            />
            <Route exact path="/loginPage" component={() => <LoginPage />} />
            <Route
              exact
              path="/loginPage/myTemplates"
              component={() => <MyTemplates />}
            />
            <Route
              exact
              path="/loginPage/AboutUs"
              component={() => <AboutUs />}
            />
          </Switch>
          <div id="modalRoot"></div>
          <div id="infoHoverRoot"></div>
        </Router>
        {/* </ReactReduxFirebaseProvider> */}
      </Provider>
    </div>

    // <div>
    //   <div className="navbar">
    //     <button onClick={callLandingPage}>Spirous</button>
    //     <div className="links">
    //       <button onClick={callCustomizePage}>Create</button>
    //       <button onClick={callLoginPage}>Login</button>
    //     </div>
    //   </div>

    //   <div>{showLandingPage && <LandingPage />}</div>
    //   <div>{showCustomizePage && <CustomizePage />}</div>
    //   <div>{showLoginPage && <LoginPage />}</div>
    // </div>
  );
}

export default App;
