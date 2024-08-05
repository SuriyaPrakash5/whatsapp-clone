import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD6XRH48NMpj8E0I6_ZLNiGsLhzQavnQeM",
    authDomain: "whatsapp-clone-689ce.firebaseapp.com",
    projectId: "whatsapp-clone-689ce",
    storageBucket: "whatsapp-clone-689ce.appspot.com",
    messagingSenderId: "332012096592",
    appId: "1:332012096592:web:465d1597ff5c2a5d6c5555",
    measurementId: "G-QGJ8SDEVDP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(auth);

export { db, auth, provider };



