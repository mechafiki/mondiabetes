import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCN7hnobnAlTZnVga-HynjJYBJg-lDn-gg",
  authDomain: "projet-pfe-6e197.firebaseapp.com",
  projectId: "projet-pfe-6e197",
  storageBucket: "projet-pfe-6e197.appspot.com",
  messagingSenderId: "660309722505",
  appId: "1:660309722505:web:a4d7f8244a53a528728d58"
};

let app;

if ( firebase.apps.length === 0){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export{db, auth};
