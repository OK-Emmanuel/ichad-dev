import { motion } from 'framer-motion';

const SDGComponent = () => {
  const sdgs = [
    {
      number: 3,
      title: "Good Health and Well-being",
      description: "Strengthen the awareness and prevention of substance abuse for the promotion of Good Health and Wellbeing.",
      color: "bg-primary",
      icon: "ri-heart-pulse-line"
    },
    {
      number: 4,
      title: "Quality Education",
      description: "Promote Good Education that goes beyond the classroom and captures soft, hard, and digital skills.",
      color: "bg-blue-500",
      icon: "ri-book-open-line"
    },
    {
      number: 8,
      title: "Decent Work and Economic Growth",
      description: "Substantially reduce the rate of unemployed youth that lack basic vocational training through our healthy alternatives to drug approach, as well as our business funding initiative.",
      color: "bg-primary",
      icon: "ri-briefcase-line"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Our Activities on SDG</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Supporting the United Nations Sustainable Development Goals
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {sdgs.map((sdg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className={`${sdg.color} p-4 flex items-center justify-between`}>
                <div className="flex items-center">
                  <div className="text-white text-3xl mr-3">
                    <i className={sdg.icon}></i>
                  </div>
                  <div className="text-white font-bold text-xl">SDG {sdg.number}</div>
                </div>
                <div className="bg-white/20 w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {sdg.number}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{sdg.title}</h3>
                <p className="text-gray-600">{sdg.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SDGComponent; 