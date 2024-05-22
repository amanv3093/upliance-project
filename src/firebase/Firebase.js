import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBB9-XFOfIUcQHXSLZ4JSmZn1mkdUmIiOs",
  authDomain: "upliance-project.firebaseapp.com",
  projectId: "upliance-project",
  storageBucket: "upliance-project.appspot.com",
  messagingSenderId: "175840947493",
  appId: "1:175840947493:web:11c7f5a240c3a89a707ecc",
  measurementId: "G-675NMSZ5NZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
