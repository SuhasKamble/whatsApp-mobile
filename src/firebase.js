import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC99jz3hnWD1hulKRCbqAEm2y_OMY_c4yg",
    authDomain: "whatsapp-clone2-d7c0f.firebaseapp.com",
    databaseURL: "https://whatsapp-clone2-d7c0f.firebaseio.com",
    projectId: "whatsapp-clone2-d7c0f",
    storageBucket: "whatsapp-clone2-d7c0f.appspot.com",
    messagingSenderId: "8720590225",
    appId: "1:8720590225:web:b7b0f7fec3c2a727856630",
    measurementId: "G-R5SKCLJPGD"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db =firebaseApp.firestore()
const auth = firebase.auth()
const provider =new  firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db;