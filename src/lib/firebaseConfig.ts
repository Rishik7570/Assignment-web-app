// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// provider.setCustomParameters({
//   'redirect_uri': 'myapp://auth'
// })

// export { auth, provider };

// auth.ts (in your NextJS app)
import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  Auth, 
  UserCredential 
} from 'firebase/auth';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Your Firebase configuration
const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
  throw error;
}

// Function to handle Google sign-in
export const loginWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  
  // Use signInWithPopup instead of signInWithRedirect for WebView compatibility
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error('Google authentication error:', error);
    throw error;
  }
};

// Function to handle logout
export const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

export { auth };