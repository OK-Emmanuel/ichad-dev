import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmptyState from './EmptyState';
import LoadingSpinner from './LoadingSpinner';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import templateImage from '../assets/team/template.jpg'; // Import the default image

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch programs from Strapi API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);
        // Use the Strapi API endpoint with populate parameter
        const strapiUrl = process.env.NODE_ENV === 'production' 
          ? '/api/programs?populate=coverImage' 
          : 'http://localhost:1337/api/programs?populate=coverImage';
        
        const response = await fetch(strapiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log('API Response:', JSON.stringify(data, null, 2));
        
        // Transform the data to match our component's needs
        const transformedPrograms = data.data.map(program => {
          // Get the cover image URL - prefer medium format, fallback to original url
          const coverImageUrl = program.coverImage?.formats?.medium?.url || program.coverImage?.url || null;
          // Construct the full URL if it's relative
          const fullCoverImageUrl = coverImageUrl && !coverImageUrl.startsWith('http')
            ? `http://localhost:1337${coverImageUrl}`
            : coverImageUrl;

          return {
            _id: program.id,
            // Access fields directly
            title: program.title || '',
            summary: program.summary || '',
            coverImage: fullCoverImageUrl, // Use the potentially full URL
            slug: program.slug || '',
            startDate: program.startDate || '',
            endDate: program.endDate || '',
            content: program.content || '',
            visibility: program.visibility || 'draft'
          };
        });

        // Filter out any programs that don't have required fields
        const validPrograms = transformedPrograms.filter(program => 
          program.title && program.slug && program.coverImage 
        );

        setPrograms(validPrograms);
        setError(false);
      } catch (error) {
        console.error('Error fetching programs:', error);
        setError(true);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  // Show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message or empty state
  if (error || programs.length === 0) {
    return (
      <EmptyState
        title={error ? "Error Loading Programs" : "No Programs Available"}
        message={error ? "Could not fetch programs. Please try again later." : "We're currently developing our programs. Please check back soon!"}
        icon="ri-community-line"
      />
    );
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-4 inline-block">
            OUR PROGRAMS
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Comprehensive initiatives designed to empower youth and prevent substance abuse through education, mentorship, and community engagement.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => (
            <Link 
              key={program._id} 
              to={`/programs/${program.slug}`}
              className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={optimizeImageUrl(program.coverImage || templateImage)} 
                  alt={program.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.src = templateImage; }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {program.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;