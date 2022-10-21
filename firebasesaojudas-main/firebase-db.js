// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// incluir as configurações obtidas no firebase console 
//
const firebaseConfig = {
    apiKey: "AIzaSyB7gkMh3COscJKN0SxZa6J9_sbHPaAHclI",
    authDomain: "qs-usabilidademanhagabriel.firebaseapp.com",
    databaseURL: "https://qs-usabilidademanhagabriel-default-rtdb.firebaseio.com",
    projectId: "qs-usabilidademanhagabriel",
    storageBucket: "qs-usabilidademanhagabriel.appspot.com",
    messagingSenderId: "110622912187",
    appId: "1:110622912187:web:2949ceff45102fc196c39e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//serve para carregar o Firebase
const database = getDatabase(app);

export default database
