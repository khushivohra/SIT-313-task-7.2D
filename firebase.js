// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import {getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ4fEmc8oP-22MV62hheVak9Vg_qLGNFE",
  authDomain: "image-a4146.firebaseapp.com",
  projectId: "image-a4146",
  storageBucket: "image-a4146.appspot.com",
  messagingSenderId: "493417673993",
  appId: "1:493417673993:web:15d5d0c1d069e33c91cfd8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const dbase = getFirestore(app);