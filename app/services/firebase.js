import * as firebase from 'firebase';
const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
};
firebase.initializeApp(config);

export default firebase;
