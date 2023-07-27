import { useState } from 'react';

// interface Language {
//   name: string;
//   iconUrl: string;
  
// }

interface LanguageItemProps {
  key: number;
  language: {
    name: string;
    iconUrl: string;
  };
  isSelected: boolean; // Add the isSelected prop here
  toggleSelection: () => void;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ language, isSelected, toggleSelection }) => {
  return (
    <div className="flex  items-center w-80 h-12 overflow-hidden cursor-pointer rounded-full mb-4">
      <div
        className={`w-12 h-12 flex justify-center items-center ${
          isSelected ? 'bg-green-500' : 'bg-gray-200'
        } rounded-full mr-4`}
        onClick={toggleSelection}
      >
        {isSelected && (
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {!isSelected && (
          <img
            className="w-8 h-8 object-contain"
            src={language.iconUrl}
            alt={language.name}
          />
        )}
      </div>
      <div className="text-xl" onClick={toggleSelection}>{language.name}</div>
    </div>
  );
};


export default LanguageItem;
