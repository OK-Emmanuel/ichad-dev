import { motion } from 'framer-motion';
import { FaLinkedin, FaFacebook } from 'react-icons/fa';
import template from '../assets/team/template.jpg';

// Reusable presentational component for a team member card
const TeamMemberCard = ({ name, role, image, linkedin, facebook, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.1 }} // Use index for staggered animation
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center text-center"
    >
      <div className="relative w-56 h-56 mb-4 overflow-hidden rounded-full shadow-lg">
        <img
          src={image || template} // Use passed image URL or fallback
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Final fallback if the processed image URL still fails
            e.target.src = template;
          }}
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
      <p className="text-gray-600 text-sm mb-2">{role}</p>
      
      {/* Show social icons if available */}
      {(linkedin || facebook) && (
        <div className="flex space-x-4 mt-1">
          {linkedin && linkedin !== '#' && (
            <a 
              href={linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-dark transition-colors"
              aria-label={`${name}'s LinkedIn Profile`}
              onClick={(e) => e.stopPropagation()} // Prevent nested link issues
            >
              <FaLinkedin size={20} />
            </a>
          )}
          
          {facebook && facebook !== '#' && (
            <a 
              href={facebook}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-colors"
              aria-label={`${name}'s Facebook Profile`}
              onClick={(e) => e.stopPropagation()} // Prevent nested link issues
            >
              <FaFacebook size={20} />
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TeamMemberCard; 