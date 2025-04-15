import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Our Impact', path: '/impact' },
    // { name: 'News', path: '/news' },
    { name: 'Ebook', path: '/ebook' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Donate', path: 'https://paystack.com/pay/ichad-donation' }
    // { name: 'Events', path: '/events' },
    // { name: 'Gallery', path: '/gallery' }
  ];

  return (
    <nav className={`bg-primary fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'top-0 shadow-lg' : 'md:top-[60px] top-0'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="ICHAD Logo" className="h-12" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white text-base font-medium hover:text-gray-200 transition-all duration-200 hover:scale-110"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } md:hidden pb-4`}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.path}
                className="text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 