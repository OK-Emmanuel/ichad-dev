import { motion } from 'framer-motion';

const ValuesComponent = () => {
  const values = [
    {
      icon: "ri-presentation-line",
      title: "Empowerment",
      description: "We don't just tell young people to \"say no\" to drugs, we equip them with reasons and resources to choose a better path."
    },
    {
      icon: "ri-heart-line",
      title: "Compassion",
      description: "Every young person's journey is different. We meet them where they are, offering judgment-free guidance and support."
    },
    {
      icon: "ri-lightbulb-line",
      title: "Innovation",
      description: "We use modern, practical, and creative solutions to address real-world problems, from digital skills training to accessible therapy."
    },
    {
      icon: "ri-team-line",
      title: "Community",
      description: "We believe prevention is a shared responsibility, and we foster networks of support to help young people thrive."
    },
    {
      icon: "ri-shield-check-line",
      title: "Integrity",
      description: "We are committed to transparency, accountability, and impact-driven action in everything we do."
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl outline outline-1 outline-gray-200 transition-all duration-300 group"
            >
              <div className="text-secondary text-4xl mb-4 group-hover: transition-transform duration-300">
                <i className={value.icon}></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesComponent; 