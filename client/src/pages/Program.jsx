import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
// import { programs } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Program = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        setLoading(true);
        const response = await programs.getOne(slug);
        setProgram(response.data.data);
      } catch (error) {
        console.error('Error fetching program:', error);
        if (error.response?.status === 404) {
          setNotFound(true);
        }
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
                Back to Programs
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
        <div className="container mx-auto px-4 py-12">
          {program && (
            <div>
              {program.coverImage && (
                <div className="mb-8 h-64 md:h-96 overflow-hidden rounded-lg">
                  <img
                    src={program.coverImage}
                    alt={program.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold mb-6">{program.title}</h1>
              
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: program.content }} />
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

export default Program;