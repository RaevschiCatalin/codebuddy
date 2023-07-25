"use client";
import { auth } from "@firebase"
import { signOut } from "firebase/auth"
import Link from "next/link";

const Profile = () => {
    const handleSignOut = () => {
        signOut(auth)
        .then(() => {
            console.log("** Logged of" )
        })
        .catch(err => alert(err))
    }
    return(
        <div>
            <p>{auth.currentUser?.email}</p>
            <button onClick={handleSignOut}><Link href="/">Logout</Link></button>
        </div>
    )
}

export default Profile;