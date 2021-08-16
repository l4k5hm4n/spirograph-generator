import firebase from "../config/firebase-config";
const socialMediaAuth = (provider) => {
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      return error;
    });
};

export default socialMediaAuth;
