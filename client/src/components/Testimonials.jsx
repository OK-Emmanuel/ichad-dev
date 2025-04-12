import { useState, useEffect } from 'react';
import googleUser from '../assets/testimonials/google-user.png'

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Manually added testimonials including Google reviews
  const testimonials = [
    // Program testimonials
    // {
    //   name: "Sarah Johnson",
    //   role: "NAVIGATE Program Graduate",
    //   image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263930/_MG_2915_1_v2j02g.jpg",
    //   quote: "The NAVIGATE program completely changed my perspective on life. The mentorship and support I received helped me develop the confidence to pursue my dreams drug-free.",
    //   source: "program"
    // },
    // Google reviews (manually copied from your Google reviews page)
    {
      name: "Abass Afolayan",
      role: "Google Review",
      image: googleUser,
      quote: "Participating in the Navigate Cohort Online Programme has been an incredibly enriching experience. From the moment I joined, I was welcomed into the Innovators Tribe, a community of driven, passionate, and like-minded individuals eager to learn and grow together. The program has not only helped me develop key skills but also introduced me to a new world of opportunities and self-discovery...",
      rating: 5,
      source: "google"
    },
    {
      name: "Marvelous Ifebube",
      role: "Google Review",
      image: googleUser,
      quote: "Joining the ICHAD Project, navigate 3.0 cohort was one of the best opportunities I'll ever appreciate. It was an amazing experience in the program, sensitive topics were treated, those that are barely talked about in the society.",
      rating: 5,
      source: "google"
    },
    {
      name: "Efemena Efiafia",
      role: "Google Review",
      image: "googleUser",
      quote: "The Navigate Cohort was a new experience for me. I relearned a lof of things and topics that I thought I was knowledgeable about. I met new people, some of whom are on their way to becoming close friends. I learned the importance of networking, consistency and above all building and maintaining one's self identity.",
      rating: 5,
      source: "google"
    },
    {
      name: "Makena Sylvia",
      role: "Google Review",
      image: googleUser,
      quote: "Wow! What a ride! The ICHAD Navigate Program was nothing short of enlightening, educative, and absolutely fun! One of my favorite parts? The catch-up sessions! These were more than just discussions—they were a safe space to ask anything about life, share what’s been happening, and truly unwind. It felt like a big, supportive family where no topic was off-limits.",
      rating: 5,
      source: "google"
    },
    {
      name: "Florence Oludipe",
      role: "Google Review",
      image: googleUser,
      quote: "Navigate 3.0 has been interesting so far, power, value and knowledge packed. During the orientation when we were informed about the drills, I already had the mindset that I wouldn't be able to keep up. But then I had this positive mind telling me okay you can do this. Glory be to God it's been wonderful so far.",
      rating: 5,
      source: "google"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from people whose lives have been transformed through our programs
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-lg shadow-lg p-8 mx-4">
                    <div className="flex flex-col items-center">
                      {/* Quote Icon */}
                      <svg className="w-12 h-12 text-primary mb-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      
                      {/* Testimonial Image */}
                      <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = "googleUser";
                          }}
                        />
                      </div>
                      
                      {/* Rating (if available) */}
                      {testimonial.rating && (
                        <div className="flex items-center mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i} 
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      )}
                      
                      {/* Quote */}
                      <blockquote className="text-center text-gray-600 mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="text-center">
                        <h4 className="font-semibold text-red-700">{testimonial.name}</h4>
                        <p className="text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  currentSlide === index ? 'bg-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews Link */}
        <div className="text-center mt-8">
          <a 
            href="https://www.google.com/search?sca_esv=fd0b6290a00de74f&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzZpWMYAz-K6n-s6B42OUi3sJW0Z4U_nj4ramYq8gS-KjvB8MkiNUzRK5zzmRcoBqmubLxvmD6ifQpeP85g6eS9uLzlRu8dUrwVBNCVqmXQB0qilKsQ%3D%3D&q=The+ICHAD+Projects+Reviews&sa=X&ved=2ahUKEwjxnc-YrrSMAxVKX0EAHdjJLycQ0bkNegQIHxAE&biw=1280&bih=641&dpr=1.5" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
            </svg>
            Read more reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 