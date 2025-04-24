import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';

// Helper function to construct image URL (similar to TeamSection)
const getImageUrl = (imageData, fallback) => {
  if (!imageData || !imageData.data) return fallback;
  
  const url = imageData.data.attributes?.url || null;
  // Construct the full URL if it's relative
  const fullUrl = url && !url.startsWith('http') ? `http://localhost:1337${url}` : url;
  return fullUrl || fallback;
};

const HubsComponent = () => {
  const [hubs, setHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Default placeholder image - update this path as needed
  const fallbackImage = "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457517/team_template_gfahah.jpg";

  useEffect(() => {
    const fetchHubs = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const strapiUrl = process.env.NODE_ENV === 'production' 
          ? '/api/hubs?populate=hubLogo' 
          : 'http://localhost:1337/api/hubs?populate=hubLogo';

        const response = await fetch(strapiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Log the response to understand the structure
        console.log("Raw Strapi response:", data);
        
        // Ensure data.data exists and is an array
        if (!data.data || !Array.isArray(data.data)) {
          console.error("Unexpected data structure:", data);
          throw new Error("Invalid response format from API");
        }
        
        // Process hubs data with careful property checking
        const processedHubs = data.data.map(hub => {
          if (!hub || typeof hub !== 'object') {
            console.warn("Invalid hub entry:", hub);
            return null; // Will be filtered out later
          }
          
          // Create a URL-friendly slug from the name
          const slug = hub.name.toLowerCase().replace(/\s+/g, '-');
          
          // Handle image URL based on provider
          let imageUrl = fallbackImage;
          if (hub.hubLogo) {
            if (hub.hubLogo.provider === '@strapi/provider-upload-cloudinary') {
              imageUrl = hub.hubLogo.url;
            } else {
              imageUrl = `http://localhost:1337${hub.hubLogo.url}`;
            }
          }
          
          return {
            id: hub.id,
            name: hub.name,
            slug: slug,
            address: hub.address || '',
            location: `${hub.state || ''}, ${hub.country || ''}`,
            email: hub.contactEmail || 'info@ichadproject.org',
            image: imageUrl,
            status: hub.hubStatus || 'active'
          };
        }).filter(Boolean); // Remove any null entries

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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Hubs</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, index) => (
            <Link to={`/hubs/${hub.slug}`} key={hub.id || index}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={hub.image} 
                    alt={hub.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
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
                <div className="p-4">
                  <div className="mb-3">
                    <a 
                      href={`mailto:${hub.email}`} 
                      className="text-primary hover:underline flex items-center text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <i className="ri-mail-line mr-2"></i>
                      {hub.email}
                    </a>
                  </div>
                  {/* We're not fetching programs as per request */}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HubsComponent; 