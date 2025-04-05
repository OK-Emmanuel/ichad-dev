import { createContext, useState, useContext } from 'react';

const ConfettiContext = createContext();

export const ConfettiProvider = ({ children }) => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const triggerConfetti = () => {
    setIsConfettiActive(true);
    setTimeout(() => {
      setIsConfettiActive(false);
    }, 5000); // Run confetti for 5 seconds
  };

  return (
    <ConfettiContext.Provider value={{ isConfettiActive, triggerConfetti }}>
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = () => useContext(ConfettiContext); 