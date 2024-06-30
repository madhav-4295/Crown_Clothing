// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,

} from "firebase/auth";

import {getFirestore, doc, getDoc, setDoc, collection, writeBatch, getDocs, query} from "firebase/firestore";
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
    const collectionRef = collection(db, collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    })
    await batch.commit()

    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
    return categoryMap;
}
export const createUserDocFromAuth = async (userAuth,additionalInformation={}) =>{
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
                date: createdAt,
                ...additionalInformation
            })
        }catch(error){
            console.log("error occured in crreating the user")
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth);


//take two params, 1. auth i.e. user, 2. callback function
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);


