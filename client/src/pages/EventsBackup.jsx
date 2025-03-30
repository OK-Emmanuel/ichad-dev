import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';

const Events = () => {
  const events = [
    {
      title: "NAVIGATE Program Orientation",
      date: "April 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "ICHAD Hub, Lagos",
      image: "/src/assets/events/navigate-orientation.jpg",
      category: "Program",
      description: "Join us for the orientation of our flagship NAVIGATE program. Meet mentors, learn about the curriculum, and connect with fellow participants.",
      isUpcoming: true
    },
    {
      title: "Drug Prevention Workshop",
      date: "April 20, 2024",
      time: "9:00 AM - 3:00 PM",
      location: "Lagos State University",
      image: "/src/assets/events/workshop.jpg",
      category: "Workshop",
      description: "Interactive workshop focusing on drug abuse prevention strategies for university students.",
      isUpcoming: true
    },
    {
      title: "Community Outreach Day",
      date: "March 10, 2024",
      time: "11:00 AM - 4:00 PM",
      location: "Surulere Community Center",
      image: "/src/assets/events/outreach.jpg",
      category: "Community",
      description: "A successful outreach program where we engaged with local youth and distributed educational materials.",
      isUpcoming: false
    }
  ];

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => event.isUpcoming).map((event, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center text-gray-600">
                        <i className="ri-calendar-line mr-2"></i>
                        {event.date}
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
                      {event.description}
                    </p>
                    <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors">
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Past Events Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.filter(event => !event.isUpcoming).map((event, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
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
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="flex items-center text-gray-600">
                        <i className="ri-calendar-line mr-2"></i>
                        {event.date}
                      </p>
                      <p className="flex items-center text-gray-600">
                        <i className="ri-map-pin-line mr-2"></i>
                        {event.location}
                      </p>
                    </div>
                    <p className="text-gray-600">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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