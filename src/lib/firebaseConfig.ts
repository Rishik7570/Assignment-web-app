// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtUYAbfib99tecrRopOYds163z8B0PX7Q",
  authDomain: "login-cb902.firebaseapp.com",
  projectId: "login-cb902",
  storageBucket: "login-cb902.firebasestorage.app",
  messagingSenderId: "394182967245",
  appId: "1:394182967245:web:dc1d54b98b491fa2184e84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };