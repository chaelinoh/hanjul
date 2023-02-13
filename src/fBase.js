import firebase from 'firebase/compat/app';
import {initializeApp} from 'firebase/compat/app';
import "firebase/compat/auth";
import {getFirestore} from "firebase/firestore";
// eslint-disable-next-line



const firebaseConfig = {
  apiKey: "AIzaSyDW9zu8mwch7MyH27zc06P9cF47nnbDrh4",
  authDomain: "hanjul-47dcd.firebaseapp.com",
  projectId: "hanjul-47dcd",
  storageBucket: "hanjul-47dcd.appspot.com",
  messagingSenderId: "612031098721",
  appId:"1:612031098721:web:3401cea243843565da5f20",
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
export const dbService = getFirestore();

