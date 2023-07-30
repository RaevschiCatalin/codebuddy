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
        <div className="flex flex-col justify-center w-full align-middle mt-6">
            <h1 className=" text-4xl font-extrabold text-center mb-12 ">Hello, <span className="purple_gradient">{user.username}</span>!</h1>
            {
                user.skills.length !== 0 ?
                    <div className="flex flex-col justify-center align-middle ">
                        <h1 className="text-3xl m-6 text-center font-bold">Here you can see your selected skills:</h1>
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
                                        <div className="lilac_gradient mb-6 text-2xl">{languagesData.filter(l => l.name === s)[0].name}</div>

                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    :
                    <h1 className="text-xl">No skills selected</h1>

            }

            {
                isExceededLanguageLimit && (
                    <div className="bg-pink-100 border  border-pink-400 text-pink-700 px-4 py-2 rounded-md mb-12">
                        You can only choose up to 7 languages. Please remove some selections.
                    </div>
                )
            }

            <div className="flex flex-col rounded-md gray_gradient_bg align-middle " >
                <button
                    onClick={() => {
                        if (window.confirm("Edit your skills?")) {
                            handleSendSelectedLanguages()
                        }
                    }}
                    className="black_btn w-1/3 mt-6 self-center mb-12 md:mb-10 cursor-pointer" // Use md:mb-24 for medium and large screens
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
            <button className=" self-center w-1/4 mt-12" onClick={handleSignOut}><Link href="/">
                <Image alt={"logout"} src={require("./icons/logout.png")} height={32} width={32}/>
            </Link></button>
        </div>
    )
}

export default Profile;