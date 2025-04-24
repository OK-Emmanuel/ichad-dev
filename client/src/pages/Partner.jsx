import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { Link } from 'react-router-dom';
import { FaHandHoldingHeart, FaHandsHelping } from 'react-icons/fa';

const Partner = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-primary">
          <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
          <div className="container relative mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Partner With Us
              </h1>
              <p className="text-lg text-white/80">
                Join us in our mission to create a drug-free future for young people through your support and involvement
              </p>
            </div>
          </div>
        </section>

        {/* Partner Options Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How You Can Help</h2>
              <p className="text-lg text-gray-600">
                Your support, whether through donations or volunteering, helps us continue our vital work in drug prevention and youth empowerment.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Donate Card */}
              <div className="bg-primary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[400px] flex flex-col">
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="text-center">
                    <FaHandHoldingHeart className="text-red-500 text-5xl mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-6">Donate</h3>
                    <p className="text-white/90 text-lg mb-8">
                      Your financial support helps us expand our programs, reach more young people, and create lasting impact in our communities.
                    </p>
                    <a
                      href="https://paystack.com/pay/ichad-donation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 text-lg"
                    >
                      <FaHandHoldingHeart className="text-red-500 mr-3" />
                      Donate Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Volunteer Card */}
              <div className="bg-primary rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 min-h-[400px] flex flex-col">
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="text-center">
                    <FaHandsHelping className="text-red-500 text-5xl mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-white mb-6">Volunteer</h3>
                    <p className="text-white/90 text-lg mb-8">
                      Join our team of dedicated volunteers and make a direct impact in the lives of young people through mentorship and program support.
                    </p>
                    <Link
                      to="/volunteer"
                      className="inline-flex items-center justify-center bg-white text-primary px-8 py-4 rounded-lg font-medium hover:bg-white/90 transition-colors duration-300 text-lg"
                    >
                      <FaHandsHelping className="text-red-500 mr-3" />
                      Volunteer Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Partner; 