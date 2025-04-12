import { motion } from 'framer-motion';

const HubsComponent = () => {
  const hubs = [
    {
      name: "Unilag",
      location: "University of Lagos",
      email: "info@ichadproject.org",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/UNILAG_ygfauk.jpg",
      programs: ["NAVIGATE Program", "Drug Prevention Champions"]
    },
    {
      name: "OAU",
      location: "Obafemi Awolowo University",
      email: "info@ichadproject.org",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg",
      programs: ["NAVIGATE Program", "School Sensitization"]
    },
    {
      name: "Yabatech",
      location: "Yaba College of Technology",
      email: "info@ichadproject.org",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/YABATECH_bc2owc.jpg",
      programs: ["Skills Development", "Mental Health Support"]
    },
    {
      name: "ICHAD Portharcourt",
      location: "Port Harcourt, Rivers State",
      email: "info@ichadproject.org",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/PORTHARCOURT_jf5iao.jpg",
      programs: ["Community Outreach", "Youth Advocacy"]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Hubs</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={hub.image} 
                  alt={hub.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=ICHAD+Hub";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{hub.name}</h3>
                  <p className="text-sm opacity-90">{hub.location}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <a href={`mailto:${hub.email}`} className="text-primary hover:underline flex items-center text-sm">
                    <i className="ri-mail-line mr-2"></i>
                    {hub.email}
                  </a>
                </div>
                {/* <div className="space-y-2">
                  {hub.programs.map((program, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div className="w-2 h-2 bg-primary transform rotate-45 mr-2" />
                      {program}
                    </div>
                  ))}
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HubsComponent; 