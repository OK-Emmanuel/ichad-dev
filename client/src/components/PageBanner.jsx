import { useState, useEffect } from 'react';
import { configService } from '../services/api';

/**
 * PageBanner component for displaying page-specific banner images with content.
 * Retrieves banner data from the API and falls back to provided default values when needed.
 * 
 * @param {string} page - The page identifier ('about', 'impact', etc.)
 * @param {string} defaultImage - Default image URL to use if API data is missing
 * @param {string} defaultTitle - Default title to use if API data is missing
 * @param {string} defaultDescription - Default description to use if API data is missing
 * @param {string} className - Additional CSS classes for the banner container
 */
const PageBanner = ({ 
  page, 
  defaultImage, 
  defaultTitle = "", 
  defaultSubtitle = "", 
  className = "h-[60vh]" 
}) => {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        setLoading(true);
        // Only fetch if page is provided
        if (page) {
          // Use page as is without adding slash
          const data = await configService.getBanner(page);
          
          if (data) {
            setBanner({
              imageUrl: data.imageUrl || defaultImage,
              title: data.title || defaultTitle,
              subtitle: data.subtitle || defaultSubtitle
            });
          } else {
            // Use defaults if no data
            setBanner({
              imageUrl: defaultImage,
              title: defaultTitle,
              subtitle: defaultSubtitle
            });
          }
        } else {
          // Use defaults if no page specified
          setBanner({
            imageUrl: defaultImage,
            title: defaultTitle,
            subtitle: defaultSubtitle
          });
        }
      } catch (error) {
        console.error(`Error fetching banner for ${page}:`, error);
        // Fall back to defaults on error
        setBanner({
          imageUrl: defaultImage,
          title: defaultTitle,
          subtitle: defaultSubtitle
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, [page, defaultImage, defaultTitle, defaultSubtitle]);

  if (loading || !banner) {
    return (
      <div className={`relative ${className}`}>
        <div className="w-full h-full bg-gray-300 animate-pulse" />
      </div>
    );
  }

  return (
    <header className={`relative ${className}`}>
      <img
        src={banner.imageUrl}
        alt={banner.title || "Page Banner"}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to default image if the API image fails to load
          e.target.src = defaultImage;
        }}
      />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white">
          {banner.title && (
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{banner.title}</h1>
          )}
          {banner.subtitle && (
            <p className="text-xl md:text-2xl">{banner.subtitle}</p>
          )}
        </div>
      </div>
    </header>
  );
};

export default PageBanner; 