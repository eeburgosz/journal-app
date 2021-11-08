import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyApPxUBsi6-V-EVuNmHnb3XFkr1xKkbSFc",
    authDomain: "react-app-curso-3396b.firebaseapp.com",
    projectId: "react-app-curso-3396b",
    storageBucket: "react-app-curso-3396b.appspot.com",
    messagingSenderId: "757385543633",
    appId: "1:757385543633:web:4242d7133e4a3adcad6af0"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 
  const db = getFirestore(app);
   
  const googleAuthProvider = new GoogleAuthProvider();
   
  export{
      db,
      googleAuthProvider
  }

