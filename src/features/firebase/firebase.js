// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE8pO4mJOdCygfUm3Z9ON6KYIjdRBLOAw",
  authDomain: "face-e4951.firebaseapp.com",
  projectId: "face-e4951",
  storageBucket: "face-e4951.appspot.com",
  messagingSenderId: "921149471053",
  appId: "1:921149471053:web:2638deacf8184eaf305f04",
  measurementId: "G-FJR7EV8YCP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);




const ggProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();
const auth = getAuth(app);

export const ggSignIn =() => signInWithPopup(auth, ggProvider)
.then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  // IdP data available using getAdditionalUserInfo(result)
  // ...
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = GoogleAuthProvider.credentialFromError(error);
  // ...
});

export const fbSignIn = () => signInWithPopup(auth, fbProvider)
.then((result) => {
  console.log('done')
  // The signed-in user info.
  const user = result.user;

  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const accessToken = credential.accessToken;

  // IdP data available using getAdditionalUserInfo(result)
  // ...
})
.catch((error) => {
  console.log(error)
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.customData.email;
  // The AuthCredential type that was used.
  const credential = FacebookAuthProvider.credentialFromError(error);

  // ...
});
