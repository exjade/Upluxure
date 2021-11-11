import Firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// import seed file
import { seedDatabase } from '../seed';

const config = {
  apiKey: "AIzaSyB9e3f7-KfrsZQRZVZB3KDz8Hb6DLhxIr4",
  authDomain: "upluxure.firebaseapp.com",
  projectId: "upluxure",
  storageBucket: "upluxure.appspot.com",
  messagingSenderId: "608331965920",
  appId: "1:608331965920:web:c08403a7f130be1cef7785",
  measurementId: "G-T0JKQPVQCB"
};

const firebase  = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// console.log("firebase", firebase)

// call the seed file
seedDatabase(firebase);

export { firebase, FieldValue };