import { useEffect, useState } from 'react';
import ReactConfetti from 'react-confetti';
import { useConfetti } from '../contexts/ConfettiContext';

const ConfettiEffect = () => {
  const { isConfettiActive } = useConfetti();
  const [windowDimension, setWindowDimension] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    // Automatically scroll to the top when confetti is triggered
    if (isConfettiActive) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isConfettiActive]);

  return (
    <>
      {isConfettiActive && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={3000}  // Increased confetti pieces for a bigger burst
          gravity={0.5}  // Faster falling confetti
          wind={0.05}  // Slight wind effect to add horizontal movement
          recycle={true}  // Keeps confetti falling continuously
          colors={['#FF5A5F', '#3498DB', '#2ECC71', '#F1C40F', '#9B59B6', '#FFEB3B', '#9C27B0']}  // Variety of colors
          style={{
            position: 'absolute',  // Ensures it covers the full page
            top: 0,
            left: 0,
            zIndex: 9999,  // Ensures the confetti appears on top of everything else
          }}
        />
      )}
    </>
  );
};

export default ConfettiEffect;
