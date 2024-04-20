// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfF9FqKmyA_-p0KNfJ15iYPrH6VV2bwIs",
  authDomain: "crown-clothing-3a817.firebaseapp.com",
  projectId: "crown-clothing-3a817",
  storageBucket: "crown-clothing-3a817.appspot.com",
  messagingSenderId: "1097346488722",
  appId: "1:1097346488722:web:ef72cdd49f59ecf65fc94b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWIthGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocFromAuth = async (userAuth) =>{
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot.exists())
    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await setDoc(userDocRef,{
                name:displayName,
                email: email,
                date: createdAt
            })
        }catch(error){
            console.log("error occured in crreating the user")
        }
    }
    return userDocRef;
}