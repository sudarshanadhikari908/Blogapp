import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBKS8Vr4W_CrC0dHs7QPIwgVfL8iByhzdg",
    authDomain: "blog-f049b.firebaseapp.com",
    projectId: "blog-f049b",
    storageBucket: "blog-f049b.appspot.com",
    messagingSenderId: "283281696657",
    appId: "1:283281696657:web:0704b1b7bf2c184ffd9c30",
    // measurementId: "G-K3NJ15GG80"
  };

  const fire = firebase.initializeApp(firebaseConfig)

  export const auth = fire.auth();
  export const firestore = fire.firestore();
  export const storage = fire.storage();