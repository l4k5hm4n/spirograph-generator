import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

let initialState = {
  loggedIn: false,
  name: "",
  email: "",
  photo: "",
  myTemplates: [],
};

export const fetchUserDetails = createAsyncThunk(
  "userDetails/updateUserDetails",
  async () => {
    parent.postMessage({ pluginMessage: { type: "checkUserLogin" } }, "*");

    let loggedIn, name, email, photo, myTemplates;

    let userDetails = await new Promise((resolve, reject) => {
      window.addEventListener("message", async (event) => {
        if (event.data.pluginMessage.type === "checkUserLogin") {
          loggedIn = event.data.pluginMessage.UserLoggedIn;
          name = event.data.pluginMessage.UserDetails.name;
          email = event.data.pluginMessage.UserDetails.email;
          photo = event.data.pluginMessage.UserDetails.photo;
          myTemplates = event.data.pluginMessage.myTemplates;
          return resolve({ loggedIn, name, email, photo, myTemplates });
        }
      });
    });

    return userDetails;
  }
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    updateUserDetails(state, action) {
      const { status, name, email, photo, myTemplates } = action.payload;

      switch (status) {
        case "login":
            return { loggedIn: true, name, email, photo, myTemplates };
        case "updateTemplates":
            return myTemplates;
        case "logout":
            return initialState;
      }
    },
    addUserTemplate: {
      reducer(state, action) {
        state.myTemplates.push(action.payload);
      },
      prepare(config) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            ...config
          },
        };
      },
    },
    deleteUserTemplate(state, action) {
      const { id } = action.payload;
      const updatedTemplates = state.filter((template) => template.id !== id);
      state.myTemplates = updatedTemplates;
    },
    editUserTemplate(state, action) {
      const { id, config } = action.payload;
      const existingPost = state.find((template) => template.id === id);
      if (existingPost) {
        existingPost.date = new Date().toISOString();
        existingPost.config = config;
      }
    },
  },
  extraReducers: {
    [fetchUserDetails.fulfilled]: (state, action) => {
      let { loggedIn, name, email, photo, myTemplates } = action.payload;

      if (loggedIn) {
        return {
          loggedIn: true,
          name,
          email,
          photo,
          myTemplates,
        };
      } else {
        return {
          loggedIn: false,
        };
      }

    },
  },
});

export const {
  updateUserDetails,
  addUserTemplate,
  deleteUserTemplate,
  editUserTemplate,
} = userDetailsSlice.actions;

export default userDetailsSlice.reducer;
