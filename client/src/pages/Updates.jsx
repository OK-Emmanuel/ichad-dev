import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { updates } from '../services/updates';

const Updates = () => {
  const [updatesList, setUpdatesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'post', 'event'

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      setLoading(true);
      const response = await updates.getAll();
      
      // Process the data to handle Strapi's response structure
      const processedUpdates = response.data.map(update => ({
        ...update,
        coverImage: update.coverImage?.data?.attributes,
        // publishedAt: update.publishedAt || update.startDate
      }));
      
      setUpdatesList(processedUpdates);
    } catch (error) {
      console.error('Error fetching updates:', error);
      setError('Failed to load updates. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUpdates = updatesList.filter(update => {
    if (filter === 'all') return true;
    return update.type === filter;
  });

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
              Updates
            </h1>
            <p className="text-lg text-white/80">
              Stay informed about our latest news, events, and announcements
            </p>
          </div>
        </div>
      </section>

      {/* Filter Controls */}
      <div className="bg-gray-50 py-6">
        <div className="container mx-auto px-4 flex gap-4">
          <button 
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('post')}
            className={`px-6 py-2 rounded-full ${filter === 'post' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            News
          </button>
          <button 
            onClick={() => setFilter('event')}
            className={`px-6 py-2 rounded-full ${filter === 'event' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            Events
          </button>
        </div>
      </div>

      {/* Updates Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredUpdates.length === 0 ? (
            <div className="text-center text-gray-500">No updates found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredUpdates.map(update => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  );
};

const UpdateCard = ({ update }) => {
  const isEvent = update.type === 'event';
  const imageUrl = update.coverImage?.url;
  
  return (
    <article className="group bg-white rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-60 overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={update.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <i className="ri-image-line text-4xl text-gray-400"></i>
          </div>
        )}
        {/* Type Tag */}
        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
          {update.type}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <time dateTime={update.publishedAt} className="flex items-center gap-1">
            <i className="ri-calendar-line"></i>
            {new Date(update.publishedAt).toLocaleDateString()}
          </time>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
          <Link to={`/updates/${update.slug}?type=${update.type}`}>
            {update.title}
          </Link>
        </h2>

        {/* Event Specific Info */}
        {isEvent && (
          <div className="space-y-2 mb-4">
            <p className="flex items-center text-gray-600">
              <i className="ri-calendar-line mr-2"></i>
              {new Date(update.startDate).toLocaleDateString()}
            </p>
            {update.location && (
              <p className="flex items-center text-gray-600">
                <i className="ri-map-pin-line mr-2"></i>
                {update.location}
              </p>
            )}
          </div>
        )}

        {/* Excerpt */}
        {update.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">
            {update.description.length > 150 
              ? `${update.description.substring(0, 150)}...` 
              : update.description}
          </p>
        )}

        {/* Read More Link */}
        <Link 
          to={`/updates/${update.slug}?type=${update.type}`}
          className="inline-flex items-center gap-2 text-primary font-medium mt-4 hover:gap-3 transition-all"
        >
          {isEvent ? 'View Event' : 'Read More'}
          <i className="ri-arrow-right-line"></i>
        </Link>
      </div>
    </article>
  );
};

export default Updates; 