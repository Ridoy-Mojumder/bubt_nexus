import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg8SXobwSZ-g3infDVCmkMtBZ6aXk5to0",
  authDomain: "bubt-nexus.firebaseapp.com",
  projectId: "bubt-nexus",
  storageBucket: "bubt-nexus.firebasestorage.app",
  messagingSenderId: "491259241291",
  appId: "1:491259241291:web:ed017b2950c0fe4797fece"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
export const auth = getAuth(app); 