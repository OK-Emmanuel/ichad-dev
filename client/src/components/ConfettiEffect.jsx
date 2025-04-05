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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isConfettiActive && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
          colors={['#FF5A5F', '#3498DB', '#2ECC71', '#F1C40F', '#9B59B6']}
        />
      )}
    </>
  );
};

export default ConfettiEffect; 