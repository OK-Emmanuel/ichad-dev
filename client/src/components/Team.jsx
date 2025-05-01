import { useState, useEffect } from 'react';
import { FaLinkedin } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import { teamService } from '../services/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const data = await teamService.getTeamMembers();
        // Limit to 6 team members for the homepage
        setTeamMembers(data.slice(0, 6));
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <EmptyState title="Error Loading Team" message="Could not fetch team members. Please try again later." />
        </div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Our Team</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Meet the dedicated professionals working to make a difference in the lives of young people
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-2">{member.role}</p>
                {/* {member.bio && (
                  <p className="text-gray-600 mb-2">
                    {member.bio.length > 100 ? `${member.bio.substring(0, 100)}...` : member.bio}
                  </p>
                )} */}
                {member.linkedin && member.linkedin !== '#' && (
                  <a 
                    href={member.linkedin}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark transition-colors"
                    aria-label={`${member.name}'s LinkedIn Profile`}
                  >
                    <FaLinkedin size={24} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 