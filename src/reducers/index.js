import loggedReducer from "./loggedReducer";
import userDefinedTemplatesReducer from "./userDefinedTemplatesReducer"; //
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  userDefinedTemplates: userDefinedTemplatesReducer,
});
export default allReducers;
