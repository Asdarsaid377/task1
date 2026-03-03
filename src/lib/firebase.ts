import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyB8dohT7M0VHx1sVVeCRs5GkTcU6ORu3Fs",
	authDomain: "YOUR_PROJECT.firebaseapp.com",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_PROJECT.appspot.com",
	messagingSenderId: "YOUR_ID",
	appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
