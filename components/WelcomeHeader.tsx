import welcomeMessage from '../data/welcome.json';
import React from 'react';

function WelcomeHeader() {
    const number = Math.floor(Math.random() * welcomeMessage.messages.length);
    const { text, highlightWord } = welcomeMessage.messages[number];
  
    const words = text.split(' ');
  
    return (
      <h1 className="text-6xl head_text font-extrabold mb-4 mt-8 text-center" style={{ lineHeight: 1.4 }}>
        {words.map((word, index) => (
          <React.Fragment key={index}>
            {index === highlightWord ? (
              <span className="lilac_gradient">{word} </span>
            ) : (
              word + ' '
            )}
          </React.Fragment>
        ))}
      </h1>
    );
  }

export default WelcomeHeader;
