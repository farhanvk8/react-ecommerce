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
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectioRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectioRef.doc();
    batch.set(newDocRef, obj);
  });
return await batch.commit();
}; 
 
export const convertCollectionsSnapshotToMap = (collections) =>{
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });
return transformedCollection.reduce( (accumulator, collection) => {
  accumulator[collection.title.toLowerCase()] = collection;
  return accumulator;
},{});

}

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
