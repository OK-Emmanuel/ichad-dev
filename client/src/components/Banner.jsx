import { useState, useEffect } from 'react';
import banner1 from '../assets/banner1.jpg'; // Import the image
import ichadbanner from '../assets/ichadbanner.jpg';
import ichadbanner1 from '../assets/ichadbanner1.jpg';


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Updated slides with new content
  const slides = [
    {
      image: ichadbanner1,
      title: "THE ICHAD PROJECT",
      subtitle: "...proving life can be better without drugs",
      description: "We are committed to helping adolescents and young adults build resilient mindsets, valuable skills, and strong support networks."
    },
    {
      image: ichadbanner,
      title: "OUR COMMITMENT",
      subtitle: "What we stand for",
      description: "Discourage the initiation/use and abuse of substances and introduce healthy alternatives."
    },
    {
      image: banner1,
      title: "EMPOWER YOUNG ADULTS",
      subtitle: "Building a drug-free future",
      description: "Equip young adults with relevant employable skills and facilitate life skills enhancement programs."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] top-0 w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl mb-6 italic">{slide.subtitle}</p>
            <p className="max-w-2xl text-lg">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner; 