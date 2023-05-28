// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserSessionPersistence, 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs,
  setDoc,
  doc,
  addDoc,
} from 'firebase/firestore';
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey : "AIzaSyBE8pO4mJOdCygfUm3Z9ON6KYIjdRBLOAw" , 
  authDomain : "face-e4951.firebaseapp.com" , 
  databaseURL : "https://face-e4951-default-rtdb.firebaseio.com" , 
  projectId : "face-e4951" , 
  storageBucket : "face-e4951.appspot.com" , 
  messagingSenderId : "921149471053" , 
  appId : "1:921149471053:web:2638deacf8184eaf305f04" , 
  measurementId : "G-FJR7EV8YCP" 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)

export default auth;
export const USER_COLLECTION = "info";
export const SPEND_COLLECTION = "spending";
export const DATA_COLLECTION = "datatemp";

const ggProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export const ggSignIn = () =>
  // setPersistence(auth, browserSessionPersistence)
  // .then(() => {
    // const uuid = null;
    signInWithPopup(auth, ggProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user)
        const uuid = user.uid.toString();
        // ...
        return uuid;
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      // return uuid;
  // })

export const fbSignIn = () =>
  signInWithPopup(auth, fbProvider)
    .then((result) => {
      console.log("done");
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(user)
      const uuid = user.uid.toString();
      return uuid;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });

export const emailSignIn = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uuid = user.uid.toString();
      return uuid
    })
    .catch((error) => {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;

      window.alert("Đăng nhập thất bại!");
    });

export const avatarImg = "https://firebasestorage.googleapis.com/v0/b/spending-management-c955a.appspot.com/o/FVK7wz5aIAA25l8.jpg?alt=media&token=ddceb8f7-7cf7-4c42-a806-5d0d48ce58f5";

export const signUp = (birthday, gender, username, email, password) =>
  createUserWithEmailAndPassword (auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const uuid = user.uid.toString();

      console.log(userCredential.user)

      // Add a new document with a generated id.
      try {
        setDoc(doc(db, USER_COLLECTION, uuid), {
            avatar: avatarImg,
            birthday: birthday,
            gender: gender,
            money: 0,
            name: username,
        });

      } catch (e) {
        console.error("Error adding document: ", e);
      }
      return {uuid, password};
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(error.message);

      window.alert("Đăng ký thất bại!");
      return null;
    });

export const logOut = () =>{
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("Sign-out successful.");
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}
