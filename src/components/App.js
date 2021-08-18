import React from "react";
import Nav from "./Nav";
import LandingPage from "./LandingPage";
import CustomizePage from "./CustomizePage";
import LoginPage from "./LoginPage";
import MyTemplates from "./MyTemplates";
import AboutUs from "./AboutUs";
import { Route, Link, MemoryRouter as Router, Switch } from "react-router-dom";
import "../style/app.css";

function App() {

  return (
    <div>
        <Router>
          <Nav />
          <Switch>
            <Route exact path="/" 
            //used render instead of component here to pass dynamic props
            render={(props) => (<LandingPage {...props} />) }            
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
        </Router>
    </div>

  );
}

export default App;
