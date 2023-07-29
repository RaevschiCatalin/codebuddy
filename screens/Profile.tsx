"use client";
import {auth, updateUserSkils} from "@firebase"
import {signOut} from "firebase/auth"
import Link from "next/link";
import LanguageItem from '@components/LanguageItem';
import languagesData from '../data/languages.json';
import {useEffect, useState} from 'react';
import {getUser} from "@firebase";
import Image from "next/image";

const ITEMS_PER_PAGE = 6;

const Profile = () => {
    const [user, setUser] = useState({
        id: "",
        mail: "",
        skills: [],
        username: ""
    })

    useEffect(() => {
        const getUserByMail = async () => {
            await getUser(auth.currentUser?.email).then(resp => {
                // @ts-ignore
                return setUser(resp);
            })
        }
        getUserByMail();
        console.log(user)
    }, [])
    const handleSignOut = () => {
        signOut(auth)
            .catch(err => alert(err))
    }

    const [currentPage, setCurrentPage] = useState(0);
    const totalLanguages = languagesData.length;
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    const handleScrollLeft = () => {
        setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
    };

    const handleScrollRight = () => {
        setCurrentPage((prevPage) =>
            Math.min(prevPage + 1, Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1)
        );
    };

    const toggleLanguageSelection = (languageName: string) => {
        setSelectedLanguages((prevSelectedLanguages) =>
            prevSelectedLanguages.includes(languageName)
                ? prevSelectedLanguages.filter((name) => name !== languageName)
                : [...prevSelectedLanguages, languageName]
        );
    };

    const visibleLanguages = languagesData.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );
    //here we can add a function to send the selected languages to the backend :)
    const handleSendSelectedLanguages = () => {
        updateUserSkils(user.id, selectedLanguages);
        console.log('Selected Languages:', selectedLanguages);
        getUser(auth.currentUser?.email).then(resp => {
            // @ts-ignore
            return setUser(resp);
        })
        setSelectedLanguages([])
    };

    const isExceededLanguageLimit = selectedLanguages.length > 7;


    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            marginTop: "10%"
        }}>
            <h1 className={"text-3xl font-bold"}>Hello, <span className={"text-3xl font-bold purple_gradient"}>{user.username}</span>!</h1>
            <br/>
            <br/>
            <br/>

            {
                user.skills.length !== 0 ?
                    <div style={{width: "100%", alignItems: 'center', display: "flex", flexDirection: "column"}}>
                        <h1 className="text-3xl font-bold">Your skills:</h1>
                        <br/>
                        <div style={{display: "flex", flexDirection: "row", gap: 30}}>
                            {user.skills.map(s => {
                                return (
                                    <div key={user.skills.indexOf(s)}
                                         style={{display: "flex", flexDirection: "row", gap: 5}}>
                                        <img
                                            className="w-8 h-8 object-contain"
                                            src={languagesData.filter(l => l.name === s)[0].iconUrl}
                                            alt={languagesData.filter(l => l.name === s)[0].name}
                                        />
                                        <div className="green_gradient text-2xl">{languagesData.filter(l => l.name === s)[0].name}</div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <h1 className="text-xl">No skills selected</h1>

            }

            <br/>
            <br/>
            <br/>
            {
                isExceededLanguageLimit && (
                    <div className="bg-pink-100 border  border-pink-400 text-pink-700 px-4 py-2 rounded-md mb-12">
                        You can only choose up to 7 languages. Please remove some selections.
                    </div>
                )
            }

            <div style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"#A3C7D6", padding:10, borderRadius:10}}>
                <button
                    onClick={() => {
                        if (window.confirm("Edit your skills?")) {
                            handleSendSelectedLanguages()
                        }
                    }}
                    className="black_btn h-10 mb-10 md:mb-10 cursor-pointer" // Use md:mb-24 for medium and large screens
                    disabled={selectedLanguages.length === 0}
                >
                    <h1 className="text-xl">Edit your skills</h1>
                </button>
                <div className="flex justify-center items-center mb-12"> {/* Add margin-bottom to the div */}
                    <button
                        onClick={handleScrollLeft}
                        disabled={currentPage === 0}
                        className={`p-2 rounded-3xl ${
                            currentPage === 0 ? 'text-gray-400 cursor-default' : 'outline_btn cursor-pointer'
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                    <div className="flex flex-wrap gap-4 justify-center text-right">
                        {visibleLanguages.map((language, index) => (
                            <LanguageItem
                                key={index}
                                language={language}
                                isSelected={selectedLanguages.includes(language.name)}
                                toggleSelection={() => toggleLanguageSelection(language.name)}
                            />
                        ))}
                    </div>
                    <button
                        onClick={handleScrollRight}
                        disabled={currentPage === Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1}
                        className={`p-2 rounded-full ${
                            currentPage === Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1
                                ? 'text-gray-400 cursor-default'
                                : 'outline_btn cursor-pointer'
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>

            </div>

            <br/>
            <button onClick={handleSignOut}><Link href="/">
                <Image alt={"logout"} src={require("./icons/logout.png")} height={32} width={32}/>
            </Link></button>
        </div>
    )
}

export default Profile;