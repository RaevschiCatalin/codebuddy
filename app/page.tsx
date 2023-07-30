"use client"
import DisplayLogButton from '@components/DisplayLogButton';
import {auth, getAllUsers, getUser} from "@firebase";
import {SetStateAction, useEffect, useState} from "react";
import BuddyCard from "@components/BuddyCard";
import WelcomeHeader from '@components/WelcomeHeader';

export default function Home() {

    const [displayedUsers, setDisplayedUsers] = useState<any[]>([])

    useEffect(() => {
        const getDisplayedUsers = async () => {
            await getUser(auth.currentUser?.email).then(resp => {
                // @ts-ignore
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
        <main className="flex flex-col min-h-screen items-center justify-center  p-6">
            <div className='flex flex-col relative m-6'>

            <WelcomeHeader/>
            
            </div>
            <DisplayLogButton/>
            <br/><br/> 
            <h1 className="text-4xl p-6 font-extrabold text-center mb-8 mt-8" style={{lineHeight: 1.1}}>
                Take a look at those <span className='lilac_gradient'>buddies</span>:
            </h1>
            <div className='grid grid-cols-2 gap-6 justify-center mt-12'>
           
            {displayedUsers.filter(u => u.mail !== auth.currentUser?.email).map((u, index) => {
                return (
                    <>
                    <div key={index} className='flex justify-center'>
                        <BuddyCard username={u.username} skills={u.skills} linkedin={u.linkedin} github={u.github} discord={u.discord}/>
                    </div>
                    </>
                );
            })}
            </div>
            <br/>
            <br/>
            <br/>
        </main>


    )
}
