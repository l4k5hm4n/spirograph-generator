import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../config/firebase-config";

let initialState = {
  loggedIn: true,
  name: "Neel Pandit",
  email: "neelp@zeta.tech",
  photo:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
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

          let tempUser = db.collection("users").doc(email);

          tempUser
            .get()
            .then((user) => {
              if (user.exists) {
                myTemplates = user.data().myTemplates;
                console.log("dfd");
              }

              return resolve({ loggedIn, name, email, photo, myTemplates });
            })
            .catch((error) => {
              console.log("error while fetching user details", error);
            });
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
          let tempUser = db.collection("users").doc(email);

          tempUser
            .get()
            .then((user) => {
              tempUser.update({
                myTemplates: myTemplates,
              });

              parent.postMessage(
                {
                  pluginMessage: {
                    type: "sync_myTemplates",
                    template: myTemplates,
                  },
                },
                "*"
              );
            })
            .catch((error) => {
              console.log("error while adding template", error);
            });
          return myTemplates;

        case "logout":
          return initialState;
      }
    },
    addUserTemplate: {
      reducer(state, action) {
        state.myTemplates.push(action.payload);
        let { email } = state;
        let tempUser = db.collection("users").doc(email);

        tempUser
          .get()
          .then((user) => {
            tempUser.update({
              myTemplates: [...user.data().myTemplates, action.payload],
            });

            parent.postMessage(
              {
                pluginMessage: {
                  type: "insert_template",
                  template: action.payload,
                },
              },
              "*"
            );
          })
          .catch((error) => {
            console.log("error while adding template", error);
          });
      },
      prepare(config) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            ...config,
          },
        };
      },
    },
    deleteUserTemplate(state, action) {
      let { email } = state;
      let tempUser = db.collection("users").doc(email);
      const id = action.payload;
      const updatedTemplates = state.myTemplates.filter(
        (template) => template.id !== id
      );

      try {
        tempUser.update({
          myTemplates: updatedTemplates,
        });

        state.myTemplates = updatedTemplates;

        parent.postMessage(
          {
            pluginMessage: {
              type: "sync_myTemplates",
              template: updatedTemplates,
            },
          },
          "*"
        );
      } catch (error) {
        console.log("error while deleting template", error);
      }
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
