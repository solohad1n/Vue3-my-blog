import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAgqnc7No44nDyFXl1MXpynCSLUlLtiVhU",
  authDomain: "vue-my-blog-8a878.firebaseapp.com",
  projectId: "vue-my-blog-8a878",
  storageBucket: "vue-my-blog-8a878.appspot.com",
  messagingSenderId: "631409377626",
  appId: "1:631409377626:web:1b5e66460af3eb3404b363"
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app)