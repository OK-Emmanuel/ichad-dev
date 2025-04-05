import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { programs as programsApi } from '../services/api';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';

const Programs = () => {
  const [apiPrograms, setApiPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Hardcoded programs - commented out but kept for reference
  /*
  const hardcodedPrograms = [
    {
      title: "NAVIGATE",
      image: "/src/assets/navigate3.jpeg",
      description: "An eight-week online mentorship program designed to equip participants with the knowledge, skills, and confidence needed to make informed decisions, build essential life skills, and lead healthier, substance-free lives.",
      link: "/programs/navigate"
    },
    {
      title: "Project Enable",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg",
      description: "Designed to provide young adults with employable skills in an environment that prepares them both mentally and physically to make a living from their chosen career path through the ICHAD School Of Skills (I-SOS).",
      link: "/programs/enable"
    },
    {
      title: "ICHAD Internship Program",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263299/IMG_0919_kxrf4x.jpg",
      description: "An initiative that provides young people with hands-on leadership experience in social impact and mental health advocacy. Interns oversee youth-centered programs, develop initiatives, and contribute to expanding ICHAD's reach.",
      link: "/programs/internship"
    },
    {
      title: "Drug Prevention Champions",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263449/FRONT_3_h0bonu.jpg",
      description: "A program designed specifically for students in tertiary institutions, aimed at equipping them with the knowledge, skills, and leadership capabilities to become effective drug prevention ambassadors within their campuses and beyond.",
      link: "/programs/champions"
    },
    {
      title: "School Drug Sensitization",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263541/FRONT_2_gov7f8.jpg",
      description: "An initiative that creates awareness and educates students in secondary schools on the dangers of drug abuse and strategies to prevent initiation.",
      link: "/programs/school-program"
    },
    {
      title: "Xpression by ICHAD",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263622/IMG_0966_mzzzbf.jpg",
      description: "A creative empowerment program that allows young people to express themselves through drama, dance, art, and other forms of creativity. This platform provides a healthy outlet for emotions while promoting mental well-being.",
      link: "/programs/xpression"
    }
  ];
  */

  // Fetch programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        const response = await programsApi.getAll();
        setApiPrograms(response.data.data || []);
        setError(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setError(true);
        setApiPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    // Fetch programs from the backend
    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  // Show empty state when no programs are available
  if (error || apiPrograms.length === 0) {
    return (
      <EmptyState
        title="No Programs Available"
        message="We're currently developing our programs. Please check back soon!"
        icon="ri-community-line"
      />
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4">
            OUR PROGRAMS
          </h2>
          <p className="text-gray-600 max-w-3xl">
            Comprehensive initiatives designed to empower youth and prevent substance abuse through education, mentorship, and community engagement.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apiPrograms.map((program, index) => (
            <div 
              key={program._id || index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={program.coverImage || 'https://via.placeholder.com/400x300?text=Program+Image'}
                  alt={program.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {program.summary || program.description}
                </p>
                <Link
                  to={`/programs/${program.slug}`}
                  className="inline-block px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors duration-300"
                >
                  Learn More
                  <span className="ml-2">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs; 