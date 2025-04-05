import { motion } from 'framer-motion';

const TeamSection = () => {
  // Organized by hierarchy based on roles
  const team = [
    {
      name: "Okey Davids",
      role: "Founder/ Community Director",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/t_Banner 16:9/v1743683791/eupyzsmgwjyhemxnehqk.jpg"
    },
    {
      name: "Godsgift Ibe",
      role: "Partnership & Fundraising Officer",
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Azeez Akinola Bada",
      role: "ICHAD Administrator",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743683793/m3iylzjjzval5cwccngi.jpg"
    },
    {
      name: "Success Iselen",
      role: "Social Media Manager",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743685865/gxxunxdt45wayvcwjfhy.jpg"
    },
    {
      name: "Msen Nabo",
      role: "ICHAD Youth Ambassador",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/t_Banner 16:9/v1743683864/wiwiipaqqlnh3zcbzdh9.jpg"
    },
    {
      name: "Jemilat Yahaya",
      role: "Intern - ICHAD Youth Advisory Program Coordinator",
      image: "/src/assets/team/template.jpg"
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="w-full md:w-1/2 mb-12">
          <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4">
            Meet Our Team
          </h2>
          <p className="mt-4 text-gray-600">
            Dedicated professionals working to make a difference in the lives of young people
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/team"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
          >
            See Full Team
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 