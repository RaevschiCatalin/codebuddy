"use client"
import DisplayLogButton from '@components/DisplayLogButton';
import {auth, getAllUsers, getUser} from "@firebase";
import {SetStateAction, useEffect, useState} from "react";
import BuddyCard from "@components/BuddyCard";
import WelcomeHeader from '@components/WelcomeHeader';

export default function Home() {

    const [user, setUser] = useState({
        id: "",
        mail: "",
        skills: [],
        username: "",
        linkedin: "",
        github: "",
        discord: ""
    })

    const [displayedUsers, setDisplayedUsers] = useState<any[]>([])

    useEffect(() => {
        const getDisplayedUsers = async () => {
            await getUser(auth.currentUser?.email).then(resp => {
                // @ts-ignore
                setUser(resp);
                return resp;
            }).then(response => {
                getAllUsers().then(resp => {
                    const auxUsers: SetStateAction<any[]> = [];
                    resp.map(r => {
                        let sim = 0;
                        r.data().skills.map((skill: never) => {
                            // @ts-ignore
                            if (response.skills.includes(skill)) {
                                sim += 1;
                            }
                        })
                        // @ts-ignore
                        if (sim >= response.skills.length / 2 && response.skills.length!==0) {
                            auxUsers.push(r.data());
                        }

                    })
                    setDisplayedUsers(auxUsers);
                })
            })
        }

        if (auth.currentUser !== null) {
            getDisplayedUsers();
        }

    }, []);


    return (
        <main className="flex flex-col items-center justify-start min-h-screen ">
            <div className="w-4/5 md:w-3/4 h-2 mt-12 pb-2 mb-6">
                <WelcomeHeader />
            </div>
            <div className="mt-96 items-center">
            <DisplayLogButton />
            </div>
            <div>
            {auth.currentUser && user.skills.length !== 0 && displayedUsers.length > 1 && (
                <h1 className="text-2xl p-6 font-extrabold text-center md:text-4xl mb-8 mt-36" style={{ lineHeight: 1.1 }}>
                    Look what <span className="lilac_gradient">buddies</span> we have found for you! 🤩:
                </h1>
            )}
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4 mb-24 md:mt-8">
                {displayedUsers
                    .filter((u) => u.mail !== auth.currentUser?.email)
                    .map((u, index) => {
                        return (
                            <div key={index} className="flex justify-center">
                                <BuddyCard username={u.username} skills={u.skills} linkedin={u.linkedin} github={u.github} discord={u.discord} />
                            </div>
                        );
                    })}
            </div>
        </main>



    )
}
