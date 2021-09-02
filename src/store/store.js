import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./userDetailsSlice.js";

export default configureStore({
  reducer: {
    userDetails: userDetailsSlice,
  }
});