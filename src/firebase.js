// Import fonctions
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase de mon projet
const firebaseConfig = {
    apiKey: "AIzaSyC0pHVeMHRdOeWNbO8nXQQXHN2OnEOqWYE",
    authDomain: "mon-twitter.firebaseapp.com",
    projectId: "mon-twitter",
    storageBucket: "mon-twitter.appspot.com",
    messagingSenderId: "518584700668",
    appId: "1:518584700668:web:a9a88d6eec0fa76802d179"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;