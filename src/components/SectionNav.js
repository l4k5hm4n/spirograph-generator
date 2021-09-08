import React from "react";
import { NavLink, useHistory, MemoryRouter as Router } from "react-router-dom";
import "../style/nav.css";

function Nav(props) {
    
let { title, route, routeParams, hideProfile, hideCreate } = props;
const history = useHistory();

  return (
    <div>
      <div className="navbar">
        <NavLink 
        to={
            routeParams ? (
                { 
                    routeParams,
                    pathname: route
                }
                ) : 
                (
                    { pathname: route }
                )
        }
        >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="#FFC700"/>
        </svg>
        </NavLink>
        

        <div className="sectionTitle">
            {title}
        </div>
        <div className="links">
        { !hideCreate && (
          <NavLink to="/customizePage" id="createPage">
            <div>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5.66665H5.66667V8.99998C5.66667 9.36665 5.36666 9.66665 5 9.66665C4.63333 9.66665 4.33333 9.36665 4.33333 8.99998V5.66665H0.999999C0.633332 5.66665 0.333332 5.36665 0.333332 4.99998C0.333332 4.63331 0.633332 4.33331 0.999999 4.33331H4.33333V0.99998C4.33333 0.633313 4.63333 0.333313 5 0.333313C5.36666 0.333313 5.66667 0.633313 5.66667 0.99998V4.33331H9C9.36666 4.33331 9.66667 4.63331 9.66667 4.99998C9.66667 5.36665 9.36666 5.66665 9 5.66665Z"
                  fill="white"
                />
              </svg>
              <span>Create!</span>
            </div>
          </NavLink>
        )}

        { !hideProfile && ( 
            <NavLink to="/loginPage" id="navLoginPageLink">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6C7.6575 6 9 4.6575 9 3C9 1.3425 7.6575 0 6 0C4.3425 0 3 1.3425 3 3C3 4.6575 4.3425 6 6 6ZM6 7.5C3.9975 7.5 0 8.505 0 10.5V12H12V10.5C12 8.505 8.0025 7.5 6 7.5Z"
                fill="white"
              />
            </svg>
            </NavLink>
        )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
