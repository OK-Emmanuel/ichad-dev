import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { eventService } from '../services/api';
import { optimizeImageUrl } from '../utils/imageOptimizer';

const EventDetail = () => {
  const { eventSlug } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        
        const eventData = await eventService.getEventBySlug(eventSlug);
        
        // Process the event data
        setEvent({
          _id: eventData._id,
          title: eventData.title || '',
          content: eventData.content || '',
          summary: eventData.summary || '',
          coverImage: eventData.coverImage || '',
          slug: eventData.slug || '',
          startDate: eventData.startDate || '',
          endDate: eventData.endDate || '',
          location: eventData.location || '',
          eventType: eventData.eventType || 'physical',
          status: eventData.status || 'upcoming',
          registrationLink: eventData.registrationLink || '',
          hubs: eventData.hubs || [],
          program: eventData.program || null,
          speakers: eventData.speakers || [],
          sponsors: eventData.sponsors || [],
          capacity: eventData.capacity || 0,
          isFeatured: eventData.isFeatured || false,
          visibility: eventData.visibility || 'public',
          createdAt: eventData.createdAt,
          updatedAt: eventData.updatedAt
        });
        
        setNotFound(false);
      } catch (err) {
        console.error("Error fetching event:", err);
        setNotFound(true);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventSlug]);

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
              <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
              <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
              <button 
                onClick={() => navigate('/events')}
                className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              >
                Back to Events
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
        {/* Hero Section */}
        {event && (
          <section className="relative py-16 md:py-20 bg-primary">
            <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
            <div className="container relative mx-auto px-4">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                  {event.title}
                </h1>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 text-white/90">
                  <div className="flex items-center">
                    <i className="ri-calendar-line mr-2"></i>
                    <span>
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center">
                      <i className="ri-map-pin-line mr-2"></i>
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-12">
          {event && (
            <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10">
              <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
                {/* Back Button */}
                <button
                  onClick={() => navigate('/events')}
                  className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Events
                </button>

                {/* Cover Image */}
                {event.coverImage && (
                  <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={optimizeImageUrl(event.coverImage)}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x400?text=Event+Image';
                      }}
                    />
                  </div>
                )}

                {/* Summary */}
                {event.summary && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 italic">{event.summary}</p>
                  </div>
                )}

                {/* Event Details */}
                <div className="mb-8 p-6 bg-primary/5 rounded-lg">
                  <h2 className="text-xl font-bold text-primary mb-4">Event Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <i className="ri-calendar-line text-primary text-xl mt-1 mr-4"></i>
                      <div>
                        <h3 className="font-semibold text-gray-800">Date & Time</h3>
                        <p className="text-gray-600">
                          {new Date(event.startDate).toLocaleDateString()}
                          {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                        </p>
                      </div>
                    </div>
                    
                    {event.location && (
                      <div className="flex items-start">
                        <i className="ri-map-pin-line text-primary text-xl mt-1 mr-4"></i>
                        <div>
                          <h3 className="font-semibold text-gray-800">Location</h3>
                          <p className="text-gray-600">{event.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {event.eventType && (
                      <div className="flex items-start">
                        <i className="ri-global-line text-primary text-xl mt-1 mr-4"></i>
                        <div>
                          <h3 className="font-semibold text-gray-800">Event Type</h3>
                          <p className="text-gray-600 capitalize">{event.eventType}</p>
                        </div>
                      </div>
                    )}
                    
                    {event.registrationLink && (
                      <div className="flex items-start">
                        <i className="ri-user-add-line text-primary text-xl mt-1 mr-4"></i>
                        <div>
                          <h3 className="font-semibold text-gray-800">Registration</h3>
                          <a 
                            href={event.registrationLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            Register for this event
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none">
                  {event.content && (
                    <div 
                      dangerouslySetInnerHTML={{ __html: event.content }}
                      className="text-gray-700 leading-relaxed"
                    />
                  )}
                </div>
                
                {/* Speakers Section */}
                {event.speakers && event.speakers.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-primary mb-6">Speakers</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {event.speakers.map((speaker, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                          {speaker.photo && (
                            <div className="w-16 h-16 mr-4 flex-shrink-0">
                              <img 
                                src={speaker.photo} 
                                alt={speaker.name} 
                                className="w-full h-full object-cover rounded-full"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/150?text=Speaker';
                                }}
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="font-bold text-lg">{speaker.name}</h3>
                            {speaker.bio && <p className="text-gray-600 text-sm">{speaker.bio}</p>}
                            {speaker.link && (
                              <a 
                                href={speaker.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-sm mt-1 inline-block"
                              >
                                More Info
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Sponsors Section */}
                {event.sponsors && event.sponsors.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-bold text-primary mb-6">Sponsors</h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {event.sponsors.map((sponsor, index) => (
                        <div key={index} className="text-center">
                          {sponsor.logo ? (
                            <a 
                              href={sponsor.link || '#'} 
                              target={sponsor.link ? "_blank" : "_self"} 
                              rel="noopener noreferrer"
                            >
                              <img 
                                src={sponsor.logo} 
                                alt={sponsor.name} 
                                className="h-12 max-w-xs object-contain mx-auto"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/200x80?text=Sponsor';
                                }}
                              />
                            </a>
                          ) : (
                            <a 
                              href={sponsor.link || '#'} 
                              target={sponsor.link ? "_blank" : "_self"} 
                              rel="noopener noreferrer"
                              className="text-primary font-medium"
                            >
                              {sponsor.name}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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

export default EventDetail; 