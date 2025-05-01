import { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUpdatesOpen, setIsUpdatesOpen] = useState(false);

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

  useEffect(() => {
    // Check if user is actually logged in by checking for the strapi session cookie
    const checkAdminAuth = () => {
      const cookies = document.cookie.split(';');
      const strapiCookie = cookies.find(cookie => cookie.trim().startsWith('strapi='));
      setIsAdmin(!!strapiCookie);
    };

    checkAdminAuth();
    // Check every 30 seconds to update the admin status
    const interval = setInterval(checkAdminAuth, 30000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'What We Do', path: '/what-we-do' },
    { name: 'Our Impact', path: '/impact' },
    { name: 'Updates', path: '/updates', hasSubmenu: true },
    { name: 'Ebook', path: '/ebook' },
    { name: 'Partner', path: '/partner' }
    // { name: 'Gallery', path: '/gallery' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUpdatesMenu = () => {
    setIsUpdatesOpen(!isUpdatesOpen);
  };

  return (
    <nav className={`bg-primary fixed w-full z-30 transition-all duration-300 ${
      isScrolled ? 'top-0 shadow-lg' : 'md:top-[60px] top-0'
    }`}>
      <div className="container mx-auto px-4 mt-0">
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
              onClick={toggleMenu}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasSubmenu ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={toggleUpdatesMenu}
                      className="text-white text-base font-medium hover:text-gray-200 transition-all duration-200 hover:scale-110"
                    >
                      {item.name}
                    </button>
                    <i className="ri-arrow-down-s-line text-white"></i>
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className="text-white text-base font-medium hover:text-gray-200 transition-all duration-200 hover:scale-110"
                  >
                    {item.name}
                  </a>
                )}
                {item.hasSubmenu && (
                  <div className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${isUpdatesOpen ? 'block' : 'hidden'}`}>
                    <Link to="/updates/posts" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors">
                      Posts
                    </Link>
                    <Link to="/updates/events" className="block px-4 py-2 hover:bg-gray-50 hover:text-primary transition-colors">
                      Events
                    </Link>
                  </div>
                )}
              </div>
            ))}
            {isAdmin && (
              <a
                href={`${process.env.REACT_APP_STRAPI_URL}/admin`}
                className="text-white text-base font-medium hover:text-gray-200 transition-all duration-200 hover:scale-110"
              >
                Admin
              </a>
            )}
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
              <div key={item.name}>
                {item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={toggleUpdatesMenu}
                      className="text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200 flex items-center gap-1"
                    >
                      {item.name}
                      <i className="ri-arrow-down-s-line"></i>
                    </button>
                    {isUpdatesOpen && (
                      <div className="pl-4 mt-2 space-y-2">
                        <Link to="/updates/posts" className="block text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200">
                          Posts
                        </Link>
                        <Link to="/updates/events" className="block text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200">
                          Events
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.path}
                    className="text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200"
                  >
                    {item.name}
                  </a>
                )}
              </div>
            ))}
            {isAdmin && (
              <a
                href={`${process.env.REACT_APP_STRAPI_URL}/admin`}
                className="text-white hover:text-gray-200 hover:translate-x-2 transition-all duration-200"
              >
                Admin
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 