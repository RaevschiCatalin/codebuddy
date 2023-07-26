// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {
    getFirestore,
    addDoc,
    collection,
    doc,
    updateDoc,
  } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnfvFdjDA1kHpJM3qjjudeYCiFYrGvjAA",
  authDomain: "code-buddies-1cb83.firebaseapp.com",
  projectId: "code-buddies-1cb83",
  storageBucket: "code-buddies-1cb83.appspot.com",
  messagingSenderId: "437799520030",
  appId: "1:437799520030:web:514e4fb16619f0f3f42b0f",
  measurementId: "G-DK6R1YE55S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app)
const auth = getAuth(app)

// Select the users collection

const userCollection = collection(firestore, "Users")

// Updating the user with the id got in the params
async function addUserId(mail,username,skills,id){
    await updateDoc(doc(firestore,"Users",id),{
      username:username,
      mail:mail,
      skills:skills,
      id:id,
    })
  }

// Adding users without the id
async function addNewUser(mail, username){
    const newUser = await addDoc(userCollection,{
      username:username,
      mail:mail,
      skills:[],
      id:""
    }).then(res=>addUserId(mail,username,[],res.id))//after we have the user id we update the user with proper id
    
  }

// Expose the instances we'll need
export { app, firestore, auth, addNewUser }