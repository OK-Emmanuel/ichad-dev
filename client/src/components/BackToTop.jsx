import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && 
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none z-50 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <i className="ri-arrow-up-line text-2xl group-hover:animate-bounce"></i>
        </button>
      }
    </>
  );
};

export default BackToTop; 