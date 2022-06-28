import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBduQkUmkiifW6jj3S6e-Fn-upAnkQaOa8",
    authDomain: "fir-tutorial-5d4bd.firebaseapp.com",
    projectId: "fir-tutorial-5d4bd",
    storageBucket: "fir-tutorial-5d4bd.appspot.com",
    messagingSenderId: "378448350751",
    appId: "1:378448350751:web:d125900744dee270098f2a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);