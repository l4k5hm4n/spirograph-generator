import * as React from "react";
import * as ReactDOM from "react-dom";
import "./ui.css";
import App from "./components/App";
import store from "./store/store";
import { Provider } from 'react-redux';
ReactDOM.render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(App, null))), document.getElementById("spirous-plugin"));
