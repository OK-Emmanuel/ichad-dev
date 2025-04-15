import { useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { useConfetti } from '../contexts/ConfettiContext';
import successIcon from '../assets/success-icon.png'; 

const DonationSuccess = () => {
  const { triggerConfetti } = useConfetti();

  useEffect(() => {
    // Trigger confetti automatically on page load
    triggerConfetti();

    // Optional: Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <TopBar />
      <Navbar />
      {/* <ConfettiEffect />  Commented out the rendering as well, based on the request to comment out the confetti trigger */}
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12">
            <img 
              src={successIcon} 
              alt="Success" 
              className="w-24 h-24 mx-auto mb-6" 
            />
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Thank You for Your Generous Donation!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Your support makes a real difference in our mission to empower young people and create drug-free communities. We are incredibly grateful for your contribution.
            </p>
            <p className="text-gray-600 mb-8">
              You are helping us build a brighter future. Thank you!
            </p>
            <a
              href="/"
              className="inline-block px-8 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300 font-semibold"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default DonationSuccess; 