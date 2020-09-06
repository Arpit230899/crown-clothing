import firebase, { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const Config = {
    apiKey: "AIzaSyCuY8zNn3TWPlfuF_ETMieeq4CcGtNVhSo",
    authDomain: "crown-clothing-db-a5184.firebaseapp.com",
    databaseURL: "https://crown-clothing-db-a5184.firebaseio.com",
    projectId: "crown-clothing-db-a5184",
    storageBucket: "crown-clothing-db-a5184.appspot.com",
    messagingSenderId: "156923367015",
    appId: "1:156923367015:web:2183c04f13c86da04f8ec2",
    measurementId: "G-85SVW2EXXM"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();
    
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(Config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;