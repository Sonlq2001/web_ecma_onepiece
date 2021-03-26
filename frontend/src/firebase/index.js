import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDL5_G4fW8_ewg1wCRcQp8x1auEV525txI",
  authDomain: "one-piece-shop.firebaseapp.com",
  projectId: "one-piece-shop",
  storageBucket: "one-piece-shop.appspot.com",
  messagingSenderId: "404732398924",
  appId: "1:404732398924:web:8b2d010516fdf4320213e9"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;