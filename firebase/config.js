import firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDSS5RhfVG6qmVDeHF_rjTrtQW5QrUVqr0",
    authDomain: "projetakip-f6840.firebaseapp.com",
    projectId: "projetakip-f6840",
    storageBucket: "projetakip-f6840.appspot.com",
    messagingSenderId: "558465022466",
    appId: "1:558465022466:web:be7ec8958e8b793566051b"
  }

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore,projectAuth,projectStorage,timestamp}