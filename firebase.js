// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKFxILb0RsVNpssZtstwSOc9_vrmJm3XI",
  authDomain: "authrealstate-749de.firebaseapp.com",
  projectId: "authrealstate-749de",
  storageBucket: "authrealstate-749de.firebasestorage.app",
  messagingSenderId: "600013131738",
  appId: "1:600013131738:web:42fb1a84cc864113737ae3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export {app , auth}