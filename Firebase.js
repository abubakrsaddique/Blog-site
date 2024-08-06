import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9uhIkY-oNeVdIX7rOGmBkLfRTriWzZpI",
  authDomain: "blog-site-77bd1.firebaseapp.com",
  projectId: "blog-site-77bd1",
  storageBucket: "blog-site-77bd1.appspot.com",
  messagingSenderId: "841070723217",
  appId: "1:841070723217:web:82c5fd2cc2c30a235a3f30",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
