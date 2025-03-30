import { useState, useEffect } from 'react';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "NAVIGATE Program Graduate",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263930/_MG_2915_1_v2j02g.jpg",
      quote: "The NAVIGATE program completely changed my perspective on life. The mentorship and support I received helped me develop the confidence to pursue my dreams drug-free.",
    },
    {
      name: "Michael Adebayo",
      role: "Drug Prevention Champion",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263930/_MG_2915_1_v2j02g.jpg",
      quote: "Being a Drug Prevention Champion has given me the platform to positively influence my peers. The training from ICHAD equipped me with the knowledge to make real impact.",
    },
    {
      name: "Chioma Okafor",
      role: "Project Enable Participant",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263930/_MG_2915_1_v2j02g.jpg",
      quote: "Through Project Enable, I gained both vocational skills and mental strength. The program didn't just teach me a trade; it prepared me for life's challenges.",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Success Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from young people whose lives have been transformed through our programs
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
                        />
                      </div>
                      
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
      </div>
    </section>
  );
};

export default Testimonials; 