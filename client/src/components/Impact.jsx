import { useState, useEffect } from 'react';

const Impact = () => {
  const [impactData, setImpactData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Default stats as fallback
  const defaultStats = [
    {
      number: "1000+",
      label: "Young Adults Reached",
      description: "Through our NAVIGATE program across Africa"
    },
    {
      number: "4000+",
      label: "Pupils Reached",
      description: "Through our School Drug Sensitization and prevention Project"
    },
    {
      number: "30+",
      label: "Schools Engaged",
      description: "Multiple engagements through our School Project"
    },
    {
      number: "250+",
      label: "Navigate Graduates",
      description: "Successfully completed the Navigate mentorship Academy"
    }
  ];

  useEffect(() => {
    fetchImpactContent();
  }, []);

  const fetchImpactContent = async () => {
    try {
      const response = await fetch('/api/about-content/impact_stats');
      if (response.ok) {
        const data = await response.json();
        setImpactData(data);
      }
    } catch (error) {
      console.error('Error fetching impact content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use dynamic data if available, otherwise use defaults
  const stats = impactData?.data || defaultStats;
  const title = impactData?.title || "Our Impact";
  const subtitle = impactData?.content || "Making measurable changes in youth development and substance abuse prevention";

  // Array of color combinations for cards
  const cardStyles = [
    "bg-primary text-white", // Primary blue with white text
    "bg-primary-light text-white", // Lighter blue with white text
    "bg-primary text-white", // Primary blue with white text again
    "bg-primary-light text-white", // Lighter blue with white text
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">{title}</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>
        
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${cardStyles[index % cardStyles.length]}`}
            >
              <div className="text-4xl font-bold mb-2 text-white">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2 text-white">
                {stat.label}
              </div>
              <p className="text-white/90">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact; 