interface SelectedLanguageProps {
    selectedLanguage: string;
}

const SelectedLanguage: React.FC<SelectedLanguageProps> = ({selectedLanguage}) => {
    return (
        <div>
            <h2>Selected Language:</h2>
            <p>{selectedLanguage}</p>
        </div>
    );
};

export default SelectedLanguage;
