import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import HubLeaders from './HubLeaders';
import { hubService } from '../services/api';

// Default fallback image
const fallbackImage = "https://via.placeholder.com/400x300?text=Hub+Image";

const HubDetail = () => {
  const { hubName } = useParams();
  const navigate = useNavigate();
  const [hub, setHub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchHub = async () => {
      try {
        setLoading(true);
        
        // Convert URL parameter back to original name format
        const originalName = hubName.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        
        // Fetch hub with name
        const data = await hubService.getHubByName(originalName);
        
        // Verify the data structure
        if (!data || !Array.isArray(data) || data.length === 0) {
          setNotFound(true);
          setHub(null);
          return;
        }
        
        // Get the first hub from the results
        const hubData = data[0];
        
        // Process the hub data
        const processedHub = {
          _id: hubData._id,
          name: hubData.name,
          address: hubData.address || '',
          state: hubData.state || '',
          country: hubData.country || '',
          contactEmail: hubData.contactEmail || 'info@ichadproject.org',
          phone: hubData.phone || '',
          description: hubData.description || '',
          logoUrl: hubData.hubLogo || fallbackImage
        };
        
        setHub(processedHub);
        setNotFound(false);
      } catch (err) {
        console.error("Error fetching hub:", err);
        setNotFound(true);
        setHub(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHub();
  }, [hubName]);

  if (loading) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <TopBar />
        <Navbar />
        <main>
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">Hub Not Found</h1>
              <p className="mb-6">The hub you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={() => navigate('/about')}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Back to About
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Hero Section */}
        {hub && (
          <section className="relative py-16 md:py-20 bg-primary">
            <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
            <div className="container relative mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {hub.name}
                </h1>
                <p className="text-xl text-white/90 mt-4">
                  {hub.address}
                  {hub.state && `, ${hub.state}`}
                  {hub.country && `, ${hub.country}`}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          {hub && (
            <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10">
              <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
                {hub.logoUrl && (
                  <div className="mb-8 overflow-hidden rounded-lg shadow-md flex">
                    <img
                      src={hub.logoUrl}
                      alt={hub.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = fallbackImage; }}
                    />
                  </div>
                )}

                {/* Contact Information */}
                <div className="mb-8 border-t border-b border-gray-200 py-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {hub.contactEmail && (
                      <div className="flex items-center">
                        <i className="ri-mail-line text-primary text-2xl mr-4"></i>
                        <a href={`mailto:${hub.contactEmail}`} className="text-gray-700 hover:text-primary">
                          {hub.contactEmail}
                        </a>
                      </div>
                    )}
                    
                    {hub.phone && (
                      <div className="flex items-center">
                        <i className="ri-phone-line text-primary text-2xl mr-4"></i>
                        <span className="text-gray-700">{hub.phone}</span>
                      </div>
                    )}
                    
                    {hub.address && (
                      <div className="flex items-center md:col-span-2">
                        <i className="ri-map-pin-line text-primary text-2xl mr-4"></i>
                        <span className="text-gray-700">
                          {hub.address}
                          {hub.state && `, ${hub.state}`}
                          {hub.country && `, ${hub.country}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description Section */}
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-bold text-primary mb-6">About Our Hub</h2>
                  {hub.description && 
                    <div className="text-gray-700 whitespace-pre-line">{hub.description}</div>
                  }
                
                </div>

                {/* Hub Leaders Section */}
                <HubLeaders hubId={hub._id} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default HubDetail; 