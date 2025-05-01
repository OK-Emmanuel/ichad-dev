import { createContext, useContext, useState, useEffect } from 'react';
import { configService } from '../services/api';

// Default configuration values to use as fallbacks
const defaultConfig = {
  siteName: 'ICHAD Project',
  contactEmail: 'info@ichadproject.org',
  contactPhone: '+234 703 369 6676',
  address: 'Lagos, Nigeria',
  facebook: 'https://www.facebook.com/TheICHADproject?mibextid=LQQJ4d',
  twitter: '',
  instagram: 'https://www.instagram.com/theichadproject?igsh=eGZkMjRlZzJyejBs',
  tiktok: 'https://www.tiktok.com/@theichadproject?_t=8oY3rXp1RBd&_r=1',
  linkedin: 'https://www.linkedin.com/company/international-comunity-for-healthy-alternatives-on-drugs-ichad/'
};

const SiteConfigContext = createContext(defaultConfig);

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await configService.getSiteConfig();
        if (data) {
          // Merge received data with defaults for any missing fields
          setConfig({
            ...defaultConfig,
            ...data,
          });
        }
      } catch (error) {
        console.error('Failed to fetch site configuration:', error);
        // Keep using default config on error
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return (
    <SiteConfigContext.Provider value={{ config, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);

export default SiteConfigContext; 