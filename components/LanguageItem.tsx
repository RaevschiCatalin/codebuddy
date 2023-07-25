import { useState } from 'react';

interface Language {
  name: string;
  iconUrl: string;
}

interface LanguageItemProps {
  language: Language;
}

const LanguageItem: React.FC<LanguageItemProps> = ({ language }) => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div
      className={`w-24 h-12 overflow-hidden cursor-pointer rounded-3xl ${
        isSelected ? 'bg-green-500' : ''
      }`}
      onClick={toggleSelection}
    >
      <div className="relative w-full h-full">
        {isSelected && (
          <div className="absolute inset-0 flex justify-center items-center bg-green-400">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
        <img className="w-full h-full object-cover" src={language.iconUrl} alt={language.name} />
      </div>
    </div>
  );
};

export default LanguageItem;
