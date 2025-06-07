import { useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import { hubLeaderService } from '../services/api';

const HubLeaders = ({ hubId }) => {
  const [hubLeaders, setHubLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (hubId) {
      fetchHubLeaders();
    }
  }, [hubId]);

  const fetchHubLeaders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await hubLeaderService.getHubLeadersByHub(hubId);
      setHubLeaders(data);
    } catch (err) {
      console.error("Error fetching hub leaders:", err);
      // Check if it's a 404 error (no leaders found), which is fine
      if (err.response && err.response.status === 404) {
        setHubLeaders([]);
      } else {
        setError(err.message);
        setHubLeaders([]);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Our Hub Leaders</h2>
        <div className="text-center py-8 text-gray-500">Loading leaders...</div>
      </div>
    );
  }

  if (error) {
    console.warn("Hub leaders error:", error);
    return null; // Don't show anything if there's an error
  }

  if (hubLeaders.length === 0) {
    return null; // Don't show the section if no leaders
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-primary mb-6">Our Hub Leaders</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hubLeaders.map((leader) => (
          <div 
            key={leader._id}
            className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={leader.image || "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457517/team_template_gfahah.jpg"} 
                alt={leader.name}
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.src = "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457517/team_template_gfahah.jpg";
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">{leader.name}</h3>
              <p className="text-primary font-medium mb-2">{leader.role}</p>
              {leader.bio && (
                <p className="text-gray-600 text-sm mb-3">
                  {leader.bio.length > 120 ? `${leader.bio.substring(0, 120)}...` : leader.bio}
                </p>
              )}
              {leader.linkedin && leader.linkedin !== '#' && (
                <a 
                  href={leader.linkedin}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark transition-colors"
                  aria-label={`${leader.name}'s LinkedIn Profile`}
                >
                  <FaLinkedin size={20} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HubLeaders; 