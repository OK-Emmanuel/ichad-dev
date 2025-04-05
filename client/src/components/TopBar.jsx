import { useConfetti } from '../contexts/ConfettiContext';

const TopBar = () => {
  const { triggerConfetti } = useConfetti();

  const handleDonateClick = () => {
    triggerConfetti();
    // You can add additional logic here, like redirecting to a donation page
    window.open('https://your-donation-link.com', '_blank');
  };

  return (
    <div className="hidden md:block"> {/* Hide on mobile, show on medium screens and up */}
      <div className="bg-primary text-white text-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
              <a href="tel:+2347033696676" className="flex items-center hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +234 703 369 6676
              </a>
              <a href="mailto:info@ichadproject.org" className="flex items-center hover:text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@ichadproject.org
              </a>
            </div>
            <button 
              onClick={handleDonateClick}
              className="bg-secondary text-white px-6 py-2 rounded-full text-sm hover:bg-red-600 transition-colors w-fit text-base font-medium"
            >
              Donate Now
            </button>
          </div>
        </div>
      <hr className="mt-1"/>
      </div>
    </div>
  );
};

export default TopBar;