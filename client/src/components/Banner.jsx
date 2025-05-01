import { useState, useEffect } from 'react';
import { configService } from '../services/api';
import banner1 from '../assets/banner1.jpg'; // Import the image
import ichadbanner from '../assets/ichadbanner.jpg';
import ichadbanner1 from '../assets/ichadbanner1.jpg';


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Default slides with static content as fallback
  const defaultSlides = [
    {
      image: ichadbanner1,
      title: "THE ICHAD PROJECT",
      subtitle: "...proving life can be better without drugs",
      description: "We are committed to helping adolescents and young adults build resilient mindsets, valuable skills, and strong support networks."
    },
    {
      image: ichadbanner,
      title: "OUR COMMITMENT",
      subtitle: "What we stand for",
      description: "Discourage the initiation/use and abuse of substances and introduce healthy alternatives."
    },
    {
      image: banner1,
      title: "EMPOWER YOUNG ADULTS",
      subtitle: "Building a drug-free future",
      description: "Equip young adults with relevant employable skills and facilitate life skills enhancement programs."
    }
  ];

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        // Fetch banner for home page - with proper formatting
        const bannerData = await configService.getBanner('home');
        
        // If API returns null or no data, use defaults
        if (!bannerData) {
          setSlides(defaultSlides);
          return;
        }
        
        if (Array.isArray(bannerData)) {
          // If we have API banners, process them
          const apiBanners = bannerData.map(banner => ({
            image: banner.imageUrl || defaultSlides[0].image,
            title: banner.title || defaultSlides[0].title,
            subtitle: banner.subtitle || defaultSlides[0].subtitle,
            description: banner.description || defaultSlides[0].description
          }));
          
          // If we don't have at least 3 banners from API, fill in with defaults
          if (apiBanners.length < 3) {
            const combinedSlides = [...apiBanners];
            
            // Add default slides until we have 3
            for (let i = apiBanners.length; i < 3; i++) {
              combinedSlides.push(defaultSlides[i]);
            }
            
            setSlides(combinedSlides);
          } else {
            setSlides(apiBanners);
          }
        } else {
          // If we have a single banner object
          const singleBanner = {
            image: bannerData.imageUrl || defaultSlides[0].image,
            title: bannerData.title || defaultSlides[0].title,
            subtitle: bannerData.subtitle || defaultSlides[0].subtitle,
            description: bannerData.description || defaultSlides[0].description
          };
          
          // Add the single banner and fill in with defaults
          setSlides([singleBanner, ...defaultSlides.slice(1)]);
        }
      } catch (error) {
        console.error('Error fetching banners:', error);
        // Fall back to default slides
        setSlides(defaultSlides);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  useEffect(() => {
    // Only start carousel when slides are loaded
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  // Show loading or default first slide while loading
  if (loading || slides.length === 0) {
    return (
      <div className="relative h-[600px] top-0 w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/50" />
        <img
          src={defaultSlides[0].image}
          alt="Loading..."
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-4">{defaultSlides[0].title}</h1>
          <p className="text-xl mb-6 italic">{defaultSlides[0].subtitle}</p>
          <p className="max-w-2xl text-lg">{defaultSlides[0].description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] top-0 w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black/50" />
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to default image if the API image fails to load
              e.target.src = defaultSlides[index % defaultSlides.length].image;
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
            <h1 className="text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-xl mb-6 italic">{slide.subtitle}</p>
            <p className="max-w-2xl text-lg">{slide.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner; 