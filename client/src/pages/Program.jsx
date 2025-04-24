import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import template from '../assets/team/template.jpg';
import { BlocksRenderer } from '@strapi/blocks-react-renderer'; // Import the renderer

const Program = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setNotFound(false);
        // Update backend URL for Strapi and add populate
        const backendUrl = process.env.NODE_ENV === 'production' 
          ? `/api/programs?filters[slug][$eq]=${slug}&populate=coverImage` 
          : `http://localhost:1337/api/programs?filters[slug][$eq]=${slug}&populate=coverImage`;

        const response = await fetch(backendUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);
            setProgram(null);
          } else {
            // Handle other errors if needed
            console.error(`HTTP error! status: ${response.status}`);
            setNotFound(true); // Treat other errors as not found for simplicity
            setProgram(null);
          }
          return; // Exit after handling error
        }

        const responseData = await response.json();

        // Strapi returns an array even when filtering by unique slug
        if (responseData.data && responseData.data.length > 0) {
          const programData = responseData.data[0]; // Get the first (and likely only) program

          // Construct the full image URL
          const coverImageUrl = programData.coverImage?.formats?.medium?.url || programData.coverImage?.url || null;
          const fullCoverImageUrl = coverImageUrl && !coverImageUrl.startsWith('http')
            ? `http://localhost:1337${coverImageUrl}`
            : coverImageUrl;

          // Set the state with processed data
          setProgram({
            id: programData.id,
            title: programData.title || '',
            summary: programData.summary || '',
            coverImage: fullCoverImageUrl,
            slug: programData.slug || '',
            startDate: programData.startDate || '',
            endDate: programData.endDate || '',
            content: programData.content || '', // Assuming content is still a Blocks/HTML string
            visibility: programData.visibility || 'draft'
          });
        } else {
          // No program found with that slug
          setNotFound(true);
          setProgram(null);
        }
        
      } catch (error) {
        console.error('Error fetching program:', error);
        setNotFound(true);
        setProgram(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

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
              <h1 className="text-3xl font-bold mb-4">Program Not Found</h1>
              <p className="mb-6">The program you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={() => navigate('/what-we-do')}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Back to What We Do
              </button>
            </div>
          </div>
        </main>
        <Footer />
        <BackToTop />
      </>
    );
  }

  // Render Program Details
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Hero Section - Inspired by Partner.jsx */}
        {program && (
          <section className="relative py-16 md:py-20 bg-primary">
            <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
            <div className="container relative mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {program.title}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          {program && (
            <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10"> {/* Offset content slightly */} 
              <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8"> {/* Add card styling */} 
                {program.coverImage && (
                  <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md"> {/* Adjusted height */}
                    <img
                      src={optimizeImageUrl(program.coverImage || template)} 
                      alt={program.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = template; }} 
                    />
                  </div>
                )}
                
                {/* Title moved to hero, keep summary/dates/content here */}

                {program.summary && (
                  <p className="text-md text-gray-700 mb-6 italic">{program.summary}</p>
                )}

                {(program.startDate || program.endDate) && (
                  <div className="mb-6 text-sm text-gray-600 flex items-center space-x-4 border-t border-b border-gray-200 py-3">
                    {program.startDate && (
                      <span>
                        <strong  className="text-secondary">Start Date:</strong> {new Date(program.startDate).toLocaleDateString()}
                      </span>
                    )}
                    {program.endDate && (
                      <span>
                        <strong  className="text-secondary">End Date:</strong> {new Date(program.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                )}
                
                <div className="prose max-w-none mt-6"> {/* Adjusted margin */}
                  {program.content && 
                    <BlocksRenderer content={program.content} />
                  }
                </div>
              </div>
            </div>
          )}

          {/* Add section for related programs or call to action if needed */}
          
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Program;