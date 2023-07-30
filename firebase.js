// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from 'firebase/auth'
import {addDoc, collection, doc, getDocs, getFirestore, query, updateDoc, where} from "firebase/firestore"

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
    }).then(res => addUserId(res.id))//after we have the user id we update the user with proper id

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