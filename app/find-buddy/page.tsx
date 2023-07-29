"use client"
import LanguageItem from '@components/LanguageItem';
import languagesData from '../../data/languages.json';
import {SetStateAction, useEffect, useState} from 'react';
import {auth, getAllUsers} from "@firebase";
import {mockSession} from "@node_modules/next-auth/client/__tests__/helpers/mocks";
import BuddyCard from '@components/BuddyCard';

const ITEMS_PER_PAGE = 6;

export default function FindBuddy() {
    const [currentPage, setCurrentPage] = useState(0);
    const totalLanguages = languagesData.length;
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
    const [users, setUsers] = useState<any[]>([])

    const showUsers = () => {
        getAllUsers().then(resp => {
            const auxUsers: SetStateAction<any[]> = [];
            resp.map(r => {
                let ok = 1;
                for (let i = 0; i < selectedLanguages.length; i++) {
                    if (!r.data().skills.includes(selectedLanguages[i])) {
                        ok = 0;
                    }
                }
                if (ok) {
                    auxUsers.push(r.data())
                }
            })
            setUsers(auxUsers);
        })
    }
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

        console.log('Selected Languages:', selectedLanguages);
        showUsers()
        setSelectedLanguages([])
    };

    const isExceededLanguageLimit = selectedLanguages.length > 7;

    return (
        <main className="flex min-h-screen flex-col items-center m-6 pt-10">
            {isExceededLanguageLimit && (
                <div className="bg-pink-100 border  border-pink-400 text-pink-700 px-4 py-2 rounded-md mb-12">
                    You can only choose up to 7 languages. Please remove some selections.
                </div>
            )}
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

            {/* Button to send selected languages */}
            <button
                onClick={handleSendSelectedLanguages}
                className="black_btn h-10 mb-12 md:mb-72 cursor-pointer" // Use md:mb-24 for medium and large screens
                disabled={selectedLanguages.length === 0}
            >
                <h1 className="text-xl">Search for buddies</h1>
            </button>

            <div style={{width: "100%", display: "flex", flexDirection: "row", flexWrap:"wrap", gap: 30, alignItems: "center"}}>
                {users.filter(u => u.mail != auth.currentUser?.email).map(u => {
                    return (
                        <BuddyCard key={users.indexOf(u)}  username={u.username} skills={u.skills}/>
                    )
                })}
            </div>
            <br/><br/>
            <br/><br/>
            <br/><br/>
            <br/><br/>
        </main>
    );
}
