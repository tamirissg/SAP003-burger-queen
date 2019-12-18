import firebase from 'firebase';
import 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAlnkIwnjAbYSaWlWLSzyX4aVlclLJUpMk",
    authDomain: "sap003-burger-queen-e72a4.firebaseapp.com",
    databaseURL: "https://sap003-burger-queen-e72a4.firebaseio.com",
    projectId: "sap003-burger-queen-e72a4",
    storageBucket: "sap003-burger-queen-e72a4.appspot.com",
    messagingSenderId: "224992073109",
    appId: "1:224992073109:web:c77ff8962383c4a2b9529c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const firestore = firebaseApp.firestore();
  
  export default firestore
