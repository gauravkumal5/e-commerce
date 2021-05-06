import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
   apiKey: "AIzaSyC7h__zj_xI_ttAZWg9TYPGDoEvV6VWflE",
   authDomain: "e-commerce-5a5fb.firebaseapp.com",
   projectId: "e-commerce-5a5fb",
   storageBucket: "e-commerce-5a5fb.appspot.com",
   messagingSenderId: "938039736542",
   appId: "1:938039736542:web:da9af4f6dc65d1cdf2ea4f",
   measurementId: "G-8Z36VYMWD5",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
   if (!userAuth) return;

   // console.log(firestore.doc("users/128asdkfasd"));
   const userRef = firestore.doc(`users/${userAuth.uid}`);
   const snapShot = await userRef.get();

   if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData,
         });
      } catch (error) {
         console.log("error creating user", error.message);
      }
   }
   return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
