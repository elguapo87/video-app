import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAB9dxPkgf7Y1JlikPiqTNcvNY6rfx2J_4",
  authDomain: "video-app-best-version.firebaseapp.com",
  projectId: "video-app-best-version",
  storageBucket: "video-app-best-version.appspot.com",
  messagingSenderId: "202976130680",
  appId: "1:202976130680:web:07c3613cd4a78c0b309f8d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;