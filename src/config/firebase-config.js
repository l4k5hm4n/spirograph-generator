import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAYgk5sh6NUcVoeXwXdRQHr69yT2FW5XnI",
  authDomain: "spirous-demo.firebaseapp.com",
  projectId: "spirous-demo",
  storageBucket: "spirous-demo.appspot.com",
  messagingSenderId: "783830015376",
  appId: "1:783830015376:web:a45fe969dddb9d47fba715",
  measurementId: "G-1MBNBYN94P",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore().settings({ timestampsInSnapshots: true });
let db = firebase.firestore();

export default firebase;
export { db };
