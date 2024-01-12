import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1h9yegSp3_YoJGC__MLQ-ZDFr467KcAI",
    authDomain: "codingbuddy-ae189.firebaseapp.com",
    projectId: "codingbuddy-ae189",
    storageBucket: "codingbuddy-ae189.appspot.com",
    messagingSenderId: "466983029386",
    appId: "1:466983029386:web:ac7b930f82eb98c942fb73",
    measurementId: "G-T13KGTN3XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const firestore = getFirestore(app)
const auth = getAuth(app)


// Select the users collection

const userCollection = collection(firestore, "Users")

// Updating the user with the id got in the params
async function addUserId(id) {
    await updateDoc(doc(firestore, "Users", id), {
        id: id,
    })
}

// Adding users without the id
async function addNewUser(mail, username) {
    const newUser = await addDoc(userCollection, {
        username: username,
        mail: mail,
        skills: [],
        github: "",
        linkedin: "",
        discord: "",
        id: ""
    }).then(res => addUserId(res.id));
}

// Get users credentials from firestore
async function getUser(mail) {
    const user = query(
        collection(firestore, "Users"),
        where("mail", "==", mail)
    )

    const querySnapshot = await getDocs(user)
    const allDocs = querySnapshot.docs
    return allDocs[0].data()
}

// Update user skills with the skills selected in profile page
async function updateUserSkils(id, skills) {
    await updateDoc(doc(firestore, "Users", id), {
        skills: skills,
    })
}

// Get all users
async function getAllUsers() {
    const users = query(
        collection(firestore, "Users"),
    )
    const querySnapshot = await getDocs(users)
    return querySnapshot.docs
}

async function updateSocial(id, social, socialLink) {
    await updateDoc(doc(firestore, "Users", id), social === "linkedin" ? {
        linkedin: socialLink
    } : social === "github" ? {
        github: socialLink
    } : {
        discord: socialLink
    })
}

// Expose the instances we'll need
export {app, firestore, auth, addNewUser, getUser, updateUserSkils, getAllUsers, updateSocial}