import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { hubService } from '../services/api';

// Default placeholder image
const fallbackImage = "https://via.placeholder.com/400x300?text=Hub+Image";

const HubsComponent = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const data = await hubService.getHubs();
        
        // Process hubs data
        const processedHubs = data.map(hub => {
          // Create a URL-friendly slug from the name
          const slug = hub.name.toLowerCase().replace(/\s+/g, '-');
          
          return {
            _id: hub._id,
            name: hub.name,
            slug: slug,
            address: hub.address || '',
            location: `${hub.state || ''}, ${hub.country || ''}`.replace(', ,', '').replace(/^, /, '').replace(/, $/, ''),
            email: hub.contactEmail || 'info@ichadproject.org',
            image: hub.hubLogo || fallbackImage,
            status: hub.hubStatus || 'active'
          };
        });

        // Only use active hubs if you want to filter by status
        const activeHubs = processedHubs.filter(hub => hub.status === 'active');
        setHubs(activeHubs.length ? activeHubs : processedHubs);
      } catch (err) {
        console.error("Error fetching hubs:", err);
        setError(true);
        setHubs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHubs();
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <EmptyState 
            title="Error Loading Hubs" 
            message="Could not fetch hubs information. Please try again later." 
            icon="ri-building-line"
          />
        </div>
      </section>
    );
  }

  // Empty State
  if (!loading && hubs.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <EmptyState 
            title="No Hubs Available" 
            message="Hub information is not yet available." 
            icon="ri-building-line"
          />
        </div>
      </section>
    );
  }

  // Function to handle email click
  const handleEmailClick = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Hubs</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hubs.map((hub, index) => (
            <div key={hub._id || index} className="flex flex-col shadow-md rounded-lg overflow-hidden">
              <Link to={`/hubs/${hub.slug}`} className="flex-grow">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
                >
                  <div className="overflow-hidden relative flex h-full">
                    <img 
                      src={hub.image} 
                      alt={hub.name}
                      className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold">{hub.name}</h3>
                      <p className="text-sm opacity-90">{hub.location}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
              <div className="p-4 bg-white">
                <div className="mb-3">
                  <button 
                    onClick={(e) => handleEmailClick(e, hub.email)}
                    className="text-primary hover:underline flex items-center text-sm w-full text-left"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    {hub.email}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HubsComponent; 