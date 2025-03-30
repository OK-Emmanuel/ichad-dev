import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { events as eventsApi } from '../services/api';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDateTime } from '../utils/dateUtils';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsApi.getOne(id);
      setEvent(response.data.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!event) return <div className="text-center">Event not found</div>;

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-[400px]">
              <img
                src={event.featuredImage}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
                  <div className="flex items-center justify-center space-x-4">
                    <span className="flex items-center">
                      <i className="ri-calendar-line mr-2"></i>
                      {formatDateTime(event.date, event.time)}
                    </span>
                    <span className="flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8">
              {/* Tags */}
              {event.tags && event.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              <div className="prose max-w-none">
                <p>{event.description}</p>
              </div>

              {/* Registration Button */}
              {event.registrationLink && (
                <div className="mt-8">
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Register Now
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default EventDetails; 