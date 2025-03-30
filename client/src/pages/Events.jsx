import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { events as eventsApi } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { truncateText } from '../utils/textUtils';
import { formatDate } from '../utils/dateUtils';
import EmptyState from '../components/EmptyState';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsApi.getAll();
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const upcomingEvents = events.filter(event => event.isUpcoming);
  const pastEvents = events.filter(event => !event.isUpcoming);

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Banner */}
        <header className="h-[60vh] relative">
          <img
            src="/src/assets/events-banner.jpg"
            alt="ICHAD Events"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Events</h1>
              <p className="text-xl md:text-2xl">Join Us in Making a Difference</p>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          {/* Upcoming Events Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            {upcomingEvents.length === 0 ? (
              <EmptyState
                title="No Upcoming Events"
                message="There are no upcoming events scheduled at the moment."
                icon="ri-calendar-line"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <Link to={`/events/${event._id}`}>
                      <div className="relative h-48">
                        <img
                          src={event.featuredImage}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                          {event.category}
                        </div>
                      </div>
                    </Link>
                    <div className="p-6">
                      <Link to={`/events/${event._id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary">
                          {event.title}
                        </h3>
                      </Link>
                      <div className="space-y-2 mb-4">
                        <p className="flex items-center text-gray-600">
                          <i className="ri-calendar-line mr-2"></i>
                          {formatDate(event.date)}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <i className="ri-time-line mr-2"></i>
                          {event.time}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <i className="ri-map-pin-line mr-2"></i>
                          {event.location}
                        </p>
                      </div>
                      <p className="text-gray-600 mb-6">
                        {truncateText(event.description)}
                      </p>
                      {event.registrationLink && (
                        <div className="p-4 border-t">
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          >
                            Register Now
                          </a>
                        </div>
                      )}
                      {/* Tags */}
                      {event.tags && Array.isArray(event.tags) && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Past Events Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            {pastEvents.length === 0 ? (
              <EmptyState
                title="No Past Events"
                message="There are no past events to display."
                icon="ri-history-line"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <div key={event._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative h-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                        {event.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <Link to={`/events/${event._id}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-primary">
                          {event.title}
                        </h3>
                      </Link>
                      <div className="space-y-2 mb-4">
                        <p className="flex items-center text-gray-600">
                          <i className="ri-calendar-line mr-2"></i>
                          {formatDate(event.date)}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <i className="ri-time-line mr-2"></i>
                          {event.time}
                        </p>
                        <p className="flex items-center text-gray-600">
                          <i className="ri-map-pin-line mr-2"></i>
                          {event.location}
                        </p>
                      </div>
                      <p className="text-gray-600">
                        {truncateText(event.description)}
                      </p>
                      {/* Tags */}
                      {event.tags && Array.isArray(event.tags) && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
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
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Events; 