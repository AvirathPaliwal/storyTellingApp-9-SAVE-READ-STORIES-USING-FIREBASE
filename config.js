import firebase from 'firebase';
import 'firebase/app';
import 'firebase/auth';
require('firebase/auth');
require('firebase/app');

const firebaseConfig = {
    apiKey: "AIzaSyBtj2rozCwIOI6vAqcKoPawNIroxwY0QQY",
    authDomain: "storytellingapp-df873.firebaseapp.com",
    databaseURL: "https://storytellingapp-df873-default-rtdb.firebaseio.com",
    projectId: "storytellingapp-df873",
    storageBucket: "storytellingapp-df873.appspot.com",
    messagingSenderId: "109608171846",
    appId: "1:109608171846:web:694ec9e065aff79d9f4d47"
  };

  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase.database()