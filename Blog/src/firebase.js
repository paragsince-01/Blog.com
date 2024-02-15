// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-b7aa9.firebaseapp.com",
  projectId: "blog-b7aa9",
  storageBucket: "blog-b7aa9.appspot.com",
  messagingSenderId: "976098225871",
  appId: "1:976098225871:web:cc821a7e159f222dfd91ba"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

