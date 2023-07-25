"use client"
import Image from 'next/image'
import LanguageItem from '@components/LanguageItem'
import  languagesData  from '../data/languages.json'
import { useState } from 'react';

const ITEMS_PER_PAGE = 6;


export default function Home() {

  const [currentPage, setCurrentPage] = useState(0);
  const totalLanguages = languagesData.length;

  const handleScrollLeft = () => {
    setCurrentPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleScrollRight = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1));
  };

  const visibleLanguages = languagesData.slice(currentPage * ITEMS_PER_PAGE, (currentPage + 1) * ITEMS_PER_PAGE);


  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-6 p-24">
      <h1 className="text-6xl font-extrabold text-center">Searching for a person with the same <span className='purple_gradient'> coding</span> prefferences?</h1>
      <p className="text-4xl font-bold text-center">We got you <span className='green_gradient'>covered!</span></p>
      <div className="flex justify-center items-center">
        <button
          onClick={handleScrollLeft}
          disabled={currentPage === 0}
          className={`p-2 rounded-3xl ${currentPage === 0 ? 'text-gray-400 cursor-default' : 'outline_btn cursor-pointer'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex flex-wrap gap-4 justify-center text-right">
          {visibleLanguages.map((language, index) => (
             <LanguageItem key={index} language={language} />
          ))}
        </div>
        <button
          onClick={handleScrollRight}
          disabled={currentPage === Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1}
          className={`p-2 rounded-full ${currentPage === Math.ceil(totalLanguages / ITEMS_PER_PAGE) - 1 ? 'text-gray-400 cursor-default' : 'outline_btn cursor-pointer'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </main>
  )
}
