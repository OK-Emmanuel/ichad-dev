import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import LoadingSpinner from '../components/LoadingSpinner';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

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
        
        // Convert URL parameter back to original slug format
        const originalSlug = eventSlug.split('-').join(' ');
        
        // Fetch event with populated related fields
        const strapiUrl = process.env.NODE_ENV === 'production'
          ? `/api/events?filters[slug][$eqi]=${originalSlug}&populate=*`
          : `http://localhost:1337/api/events?filters[slug][$eqi]=${originalSlug}&populate=*`;
        
        console.log("Fetching event from:", strapiUrl);
        
        const response = await fetch(strapiUrl);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("API Error Response:", errorData);
          setNotFound(true);
          setEvent(null);
          return;
        }
        
        const data = await response.json();
        console.log("Event detail raw response:", data);
        
        // Verify the data structure
        if (!data || !data.data || !Array.isArray(data.data) || data.data.length === 0) {
          setNotFound(true);
          setEvent(null);
          return;
        }
        
        // Get the first event from the filtered results
        const eventData = data.data[0];
        
        // Process the event data
        const processedEvent = {
          id: eventData.id,
          title: eventData.title,
          content: eventData.content,
          summary: eventData.summary,
          description: eventData.description,
          startDate: eventData.startDate,
          endDate: eventData.endDate,
          location: eventData.location,
          coverImage: eventData.coverImage,
          slug: eventData.slug
        };
        
        setEvent(processedEvent);
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
                {event.coverImage?.url && (
                  <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={event.coverImage.url}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Summary */}
                {event.summary && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 italic">{event.summary}</p>
                  </div>
                )}
                {!event.summary && event.description && (
                  <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                    <p className="text-lg text-gray-700 italic">{event.description}</p>
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
                  </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none">
                  {event.content && (
                    <BlocksRenderer 
                      content={event.content}
                      blocks={{
                        paragraph: ({ children }) => (
                          <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>
                        ),
                        heading: ({ children, level }) => {
                          const Tag = `h${level}`;
                          const classes = {
                            1: 'text-4xl font-bold text-primary mb-6',
                            2: 'text-3xl font-bold text-primary mb-5',
                            3: 'text-2xl font-bold text-primary mb-4',
                            4: 'text-xl font-bold text-primary mb-3',
                            5: 'text-lg font-bold text-primary mb-2',
                            6: 'text-base font-bold text-primary mb-2'
                          };
                          return <Tag className={classes[level]}>{children}</Tag>;
                        },
                        list: ({ children, format }) => (
                          <ul className={`list-${format} mb-4 pl-6 space-y-2`}>
                            {children}
                          </ul>
                        ),
                        listItem: ({ children }) => (
                          <li className="text-gray-700">{children}</li>
                        ),
                        quote: ({ children }) => (
                          <blockquote className="border-l-4 border-primary pl-4 italic text-gray-600 my-4">
                            {children}
                          </blockquote>
                        ),
                        code: ({ children }) => (
                          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                            <code className="text-sm">{children}</code>
                          </pre>
                        ),
                        link: ({ children, url }) => (
                          <a 
                            href={url} 
                            className="text-primary hover:text-primary-dark underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {children}
                          </a>
                        ),
                        image: ({ image }) => (
                          <div className="my-6">
                            <img 
                              src={image.url} 
                              alt={image.alternativeText || ''}
                              className="rounded-lg shadow-md"
                            />
                            {image.caption && (
                              <p className="text-sm text-gray-500 mt-2 text-center">
                                {image.caption}
                              </p>
                            )}
                          </div>
                        )
                      }}
                      modifiers={{
                        bold: ({ children }) => (
                          <strong className="font-bold">{children}</strong>
                        ),
                        italic: ({ children }) => (
                          <em className="italic">{children}</em>
                        ),
                        underline: ({ children }) => (
                          <u className="underline">{children}</u>
                        ),
                        strikethrough: ({ children }) => (
                          <s className="line-through">{children}</s>
                        ),
                        code: ({ children }) => (
                          <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
                            {children}
                          </code>
                        )
                      }}
                    />
                  )}
                </div>
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