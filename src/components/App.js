import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import CustomizePage from "./CustomizePage";
import LoginPage from "./LoginPage";
import MyTemplates from "./MyTemplates";
import AboutUs from "./AboutUs";
import { Route, MemoryRouter as Router, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserDetails } from "../store/userDetailsSlice";
import "../style/app.css";

function App() {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.userDetails.loggedIn);
  const [onboarding, setOnboarding] = useState(true);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    dispatch(fetchUserDetails());
    setOnboarding(!loginStatus);
    setSplash(false);
  }, [loginStatus]);

  const splashScreen = <div>splash screen</div>;

  const App = (
    <div>
      <Router>
        {onboarding ? (
          <div>
            <p>Onboarding Screens</p>
            <button
              onClick={() => {
                setOnboarding(false);
              }}
            >
              Click Me
            </button>
          </div>
        ) : (
          <React.Fragment>
            <Nav />
            <Switch>
              <Route
                exact
                path="/"
                //used render instead of component here to pass dynamic props
                render={(props) => <LandingPage {...props} />}
              />
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
          </React.Fragment>
        )}
      </Router>
    </div>
  );

  if (splash) {
    return splashScreen;
  } else {
    return App;
  }
}

export default App;
