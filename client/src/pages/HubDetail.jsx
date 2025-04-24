import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const HubDetail = () => {
  const [hub, setHub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  // Default placeholder image - update this path as needed
  const fallbackImage = "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457517/team_template_gfahah.jpg";

  // Helper function to construct image URL (similar to HubsComponent)
  const getImageUrl = (imageData) => {
    if (!imageData || !imageData.data) return fallbackImage;
    
    const url = imageData.data.attributes?.url || null;
    // Construct the full URL if it's relative
    const fullUrl = url && !url.startsWith('http') ? `http://localhost:1337${url}` : url;
    return fullUrl || fallbackImage;
  };

  useEffect(() => {
    // Process the hub data
    const processedHub = {
      id: hubData.id,
      name: hubData.attributes.name,
      address: hubData.attributes.address,
      state: hubData.attributes.state,
      country: hubData.attributes.country,
      contactEmail: hubData.attributes.contactEmail,
      hubLogo: hubData.attributes.hubLogo,
      hubStatus: hubData.attributes.hubStatus,
      hubDescription: hubData.attributes.hubDescription,
      hubPrograms: hubData.attributes.hubPrograms,
      hubEvents: hubData.attributes.hubEvents,
      hubNews: hubData.attributes.hubNews,
      hubTeam: hubData.attributes.hubTeam,
      hubPartners: hubData.attributes.hubPartners,
      hubGallery: hubData.attributes.hubGallery,
      hubSocialMedia: hubData.attributes.hubSocialMedia,
      hubContact: hubData.attributes.hubContact,
      hubLocation: hubData.attributes.hubLocation,
      hubFacilities: hubData.attributes.hubFacilities,
      hubAchievements: hubData.attributes.hubAchievements,
      hubTestimonials: hubData.attributes.hubTestimonials,
      hubResources: hubData.attributes.hubResources,
      hubVolunteers: hubData.attributes.hubVolunteers,
      hubDonors: hubData.attributes.hubDonors,
      hubSponsors: hubData.attributes.hubSponsors,
      hubPartnerships: hubData.attributes.hubPartnerships,
      hubCollaborations: hubData.attributes.hubCollaborations,
      hubNetworks: hubData.attributes.hubNetworks,
      hubMemberships: hubData.attributes.hubMemberships,
      hubAffiliations: hubData.attributes.hubAffiliations,
      hubCertifications: hubData.attributes.hubCertifications,
      hubAccreditations: hubData.attributes.hubAccreditations,
      hubAwards: hubData.attributes.hubAwards,
      hubRecognition: hubData.attributes.hubRecognition,
      hubImpact: hubData.attributes.hubImpact,
      hubSuccess: hubData.attributes.hubSuccess,
      hubChallenges: hubData.attributes.hubChallenges,
      hubOpportunities: hubData.attributes.hubOpportunities,
      hubFuture: hubData.attributes.hubFuture,
      hubVision: hubData.attributes.hubVision,
      hubMission: hubData.attributes.hubMission,
      hubValues: hubData.attributes.hubValues,
      hubGoals: hubData.attributes.hubGoals,
      hubObjectives: hubData.attributes.hubObjectives,
      hubStrategies: hubData.attributes.hubStrategies,
      hubPlans: hubData.attributes.hubPlans,
      hubProjects: hubData.attributes.hubProjects,
      hubInitiatives: hubData.attributes.hubInitiatives,
      hubCampaigns: hubData.attributes.hubCampaigns,
      hubActivities: hubData.attributes.hubActivities,
      hubServices: hubData.attributes.hubServices
    };

    setHub(processedHub);
    setLoading(false);
  }, []);

  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notFound) {
    return <div>Hub not found</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 bg-primary">
        <div className="absolute inset-0 bg-[url('/src/assets/patterns/pattern-1.png')] opacity-50"></div>
        <div className="container relative mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              {hub.name}
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4 text-white/90">
              <div className="flex items-center">
                <i className="ri-map-pin-line mr-2"></i>
                <span>{hub.address}</span>
              </div>
              <div className="flex items-center">
                <i className="ri-building-line mr-2"></i>
                <span>{hub.state}, {hub.country}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto -mt-16 md:-mt-20 relative z-10">
          <div className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
            {/* Back Button */}
            <button
              onClick={() => navigate('/hubs')}
              className="mb-6 flex items-center text-primary hover:text-primary-dark transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Hubs
            </button>

            {/* Hub Logo */}
            <div className="mb-8 h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-md">
              <img
                src={getImageUrl(hub.hubLogo)}
                alt={hub.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubDetail; 