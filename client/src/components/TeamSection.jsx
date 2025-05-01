import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import EmptyState from './EmptyState';
import TeamMemberCard from './TeamMemberCard';
import template from '../assets/team/template.jpg';
import { teamService } from '../services/api';

// Simplified image helper or can be removed if Strapi URL is absolute
const getImageUrl = (imageData, fallback) => {
  const url = imageData?.url || null;
  // Construct the full URL if it's relative (assuming Strapi returns relative /uploads/...)
  const fullUrl = url && !url.startsWith('http') ? `http://localhost:1337${url}` : url;
  return fullUrl || fallback;
};

const TeamSection = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(false);
        
        const data = await teamService.getTeamMembers();

        // Limit the number of team members displayed to 6
        const limitedData = data.slice(0, 6); 

        setTeamMembers(limitedData);
      } catch (err) {
        console.error("Error fetching team members:", err);
        setError(true);
        setTeamMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  // Loading State
  if (loading) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  // Error State
  if (error) {
    return (
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <EmptyState title="Error Loading Team" message="Could not fetch team members. Please try again later." />
        </div>
      </section>
    );
  }

  // Empty State
  if (!loading && teamMembers.length === 0) {
      return null;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Meet Our Team Section */}
        <div className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4 inline-block">
            Meet Our Team
          </h2>
          <p className="mt-4 text-gray-600">
            Dedicated professionals working to make a difference in the lives of young people
          </p>
        </div>

        {/* Team Members Grid - Use TeamMemberCard */}
        <div className="grid md:grid-cols-3 gap-12 justify-center">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member._id}
              name={member.name}
              role={member.role}
              image={member.image}
              bio={member.bio}
              linkedin={member.linkedin}
              index={index}
            />
          ))}
        </div>

        {/* See Full Team Button */}
        <div className="text-center mt-12">
          <a
            href="/team"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
          >
            See Full Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
