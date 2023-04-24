import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config ={
    apiKey: "AIzaSyBmKkY7LrJ8e0FjYh74X-nzn4USPCDO10I",
    authDomain: "react-ecommerce-44a2a.firebaseapp.com",
    databaseURL: "https://react-ecommerce-44a2a.firebaseio.com",
    projectId: "react-ecommerce-44a2a",
    storageBucket: "react-ecommerce-44a2a.appspot.com",
    messagingSenderId: "296594576486",
    appId: "1:296594576486:web:bf9ec96580b8858dca09a7"
  };

  firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
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
}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
