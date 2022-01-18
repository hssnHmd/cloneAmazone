import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpeoJnOU1q8fBj5EYWFo0caYrNRpYaiXA",
  authDomain: "clone-e8499.firebaseapp.com",
  projectId: "clone-e8499",
  storageBucket: "clone-e8499.appspot.com",
  messagingSenderId: "15450450574",
  appId: "1:15450450574:web:d1ce4bbe8c66002abb77df"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
export {db, auth};