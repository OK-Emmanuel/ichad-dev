import { useConfetti } from '../contexts/ConfettiContext';

const CallToAction = () => {
  // const { triggerConfetti } = useConfetti();

  const handleButtonClick = (type) => {
    // triggerConfetti();
    
    // You can add additional logic based on which button was clicked
    if (type === 'donate') {
      window.open('https://paystack.com/pay/ichad-donation', '_blank');
    } else if (type === 'volunteer') {
      window.open('/volunteer', '_blank');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white relative overflow-hidden ">
      <div className="absolute inset-0 bg-[url('/src/assets/pattern.png')] opacity-10"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Make a Difference?
        </h2>
        <p className="mb-12 max-w-2xl mx-auto text-lg text-white/90">
          Join us in our mission to create a drug-free future for young people. Your support can change lives.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <button 
            onClick={() => handleButtonClick('donate')}
            className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Donate Now
            <i className="ri-heart-fill text-red-500 ml-2"></i>
          </button>
          <button 
            onClick={() => handleButtonClick('volunteer')}
            className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transform hover:scale-105 transition-all duration-300"
          >
            Become a Volunteer
            <i className="ri-user-heart-line ml-2"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 