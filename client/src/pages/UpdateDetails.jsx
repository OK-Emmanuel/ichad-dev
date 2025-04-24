import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import { updates } from '../services/updates';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

const UpdateDetails = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUpdate();
  }, [slug, type]);

  const fetchUpdate = async () => {
    try {
      setLoading(true);
      const response = await updates.getBySlug(slug, type);
      
      if (!response.data || response.data.length === 0) {
        throw new Error('Update not found');
      }

      // Process the data to handle Strapi's response structure
      const updateData = response.data[0].attributes;
      setUpdate({
        ...updateData,
        coverImage: updateData.coverImage?.data?.attributes,
        publishedAt: updateData.publishedAt || updateData.startDate
      });
    } catch (error) {
      console.error('Error fetching update:', error);
      setError('Failed to load update. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </main>
      <Footer />
    </>
  );

  if (error) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">{error}</div>
      </main>
      <Footer />
    </>
  );

  if (!update) return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-center">Update not found</div>
      </main>
      <Footer />
    </>
  );

  const isEvent = type === 'event';
  const imageUrl = update.coverImage?.url;

  return (
    <>
      <TopBar />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {update.title}
            </h1>
            <p className="text-lg text-white/80">
              {isEvent ? 'Event Details' : 'News Article'}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Image */}
            {imageUrl && (
              <div className="relative h-96">
                <img 
                  src={imageUrl} 
                  alt={update.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                <time dateTime={update.publishedAt} className="flex items-center gap-1">
                  <i className="ri-calendar-line"></i>
                  {new Date(update.publishedAt).toLocaleDateString()}
                </time>
              </div>

              {/* Event Specific Info */}
              {isEvent && (
                <div className="space-y-4 mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
                      <p className="flex items-center text-gray-700">
                        <i className="ri-calendar-line mr-2"></i>
                        {new Date(update.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">End Date</h3>
                      <p className="flex items-center text-gray-700">
                        <i className="ri-calendar-line mr-2"></i>
                        {new Date(update.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {update.location && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
                      <p className="flex items-center text-gray-700">
                        <i className="ri-map-pin-line mr-2"></i>
                        {update.location}
                      </p>
                    </div>
                  )}
                  {update.registrationLink && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Registration</h3>
                      <a 
                        href={update.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary hover:text-primary-dark"
                      >
                        Register Now
                        <i className="ri-external-link-line ml-2"></i>
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                {update.description && (
                  <BlocksRenderer content={update.description} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  );
};

export default UpdateDetails; 