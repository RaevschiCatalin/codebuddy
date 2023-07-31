import React, { useEffect, useState } from 'react';
import welcomeMessage from '../data/welcome.json';

function WelcomeHeader() {
  //generate random number
  const randomNumber = Math.floor(Math.random() * 10);
  const [typedText, setTypedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(randomNumber);

  useEffect(() => { 
    if (isTyping) {
      const { text, highlightWord } = welcomeMessage.messages[currentMessageIndex];
      let currentCharacterIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentCharacterIndex <= text.length) {
          setTypedText(text.slice(0, currentCharacterIndex));
          currentCharacterIndex++;
        } else {
          setIsTyping(false);
          clearInterval(typingInterval);
        }
      }, 100); // Adjust the typing speed by changing the interval (milliseconds)

      return () => {
        clearInterval(typingInterval);
      };
    }
  }, [isTyping, currentMessageIndex]);

  useEffect(() => {
    if (!isTyping) {
      // Delay before showing the next message
      const delay = setTimeout(() => {
        setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % welcomeMessage.messages.length);
        setTypedText(''); // Reset the typedText to an empty string before typing the next message
        setIsTyping(true);
      }, 2000); // Change the time to wait before showing the next message (milliseconds)

      return () => clearTimeout(delay);
    }
  }, [isTyping, currentMessageIndex]);

  const { text, highlightWord } = welcomeMessage.messages[currentMessageIndex];

  return(
      <div className="flex items-start justify-center pt-12 pb-0 min-h-screen">
        <div className="w-3/4 md:w-2/3">
          <h1 className="text-6xl head_text font-extrabold my-4 text-center" style={{ lineHeight: 1.4 }}>
            {isTyping ? (
                <React.Fragment>
                  {typedText.split(' ').map((word, index) => (
                      <React.Fragment key={index}>
                        {index === highlightWord ? (
                            <span className="lilac_gradient">{word} </span>
                        ) : (
                            <span>{word} </span>
                        )}
                      </React.Fragment>
                  ))}
                </React.Fragment>
            ) : (
                <span className="">{text}</span>
            )}
          </h1>
        </div>
      </div>

  );
}

export default WelcomeHeader;
