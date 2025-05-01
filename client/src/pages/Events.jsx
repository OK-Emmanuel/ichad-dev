import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import LoadingSpinner from '../components/LoadingSpinner';
import { eventService } from '../services/api';
import EmptyState from '../components/EmptyState';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getEvents();
      
      // Process the events data
      const processedEvents = data.map(event => ({
        _id: event._id,
        title: event.title || '',
        summary: event.summary || '',
        content: event.content || '',
        slug: event.slug || '',
        coverImage: event.coverImage || '',
        visibility: event.visibility || 'draft',
        startDate: event.startDate || '',
        endDate: event.endDate || '',
        location: event.location || '',
        eventType: event.eventType || 'physical',
        status: event.status || 'upcoming',
        registrationLink: event.registrationLink || '',
        hubs: event.hubs || [],
        program: event.program || null,
        speakers: event.speakers || [],
        sponsors: event.sponsors || [],
        capacity: event.capacity || 0,
        isFeatured: event.isFeatured || false
      }));
      
      // Only show public events
      const publicEvents = processedEvents.filter(event => event.visibility === 'public');
      
      setEvents(publicEvents);
      setError(null);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events. Please try again later.');
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
      <BackToTop />
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
      <BackToTop />
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
              Upcoming Events
            </h1>
            <p className="text-lg text-white/80">
              Join us at our upcoming events and make a difference
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {events.length === 0 ? (
            <EmptyState 
              title="No Events Available"
              message="We don't have any upcoming events at the moment. Please check back soon!"
              icon="ri-calendar-event-line"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {event.coverImage ? (
                      <img 
                        src={optimizeImageUrl(event.coverImage)} 
                        alt={event.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/600x400?text=Event';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <i className="ri-calendar-event-line text-4xl text-gray-400"></i>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Link 
                      to={`/events/${event.slug}`}
                      className="text-xl font-bold mb-3 hover:text-primary transition-colors block"
                    >
                      {event.title}
                    </Link>
                    
                    {/* Event Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <i className="ri-calendar-line mr-2 text-primary"></i>
                        <span>
                          {new Date(event.startDate).toLocaleDateString()}
                          {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                        </span>
                      </div>
                      
                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <i className="ri-map-pin-line mr-2 text-primary"></i>
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>

                    {event.summary && (
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {event.summary}
                      </p>
                    )}
                  </div>
                </div>
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

export default Events; 