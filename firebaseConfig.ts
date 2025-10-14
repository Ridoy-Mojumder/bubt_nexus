// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg8SXobwSZ-g3infDVCmkMtBZ6aXk5to0",
  authDomain: "bubt-nexus.firebaseapp.com",
  projectId: "bubt-nexus",
  storageBucket: "bubt-nexus.firebasestorage.app",
  messagingSenderId: "491259241291",
  appId: "1:491259241291:web:ed017b2950c0fe4797fece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;