import { motion } from 'framer-motion';
import template from '../assets/team/template.jpg';
// Helper function to optimize images from Cloudinary (with face and perfect square crop)
const getOptimizedImage = (url) => {
  if (!url.includes("cloudinary.com")) return url; // Just return if it's not from Cloudinary

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url; // Handle if the URL doesn't follow expected format

  // Adjust the URL to make sure it's always square and the face is centered
  return `${parts[0]}/upload/w_400,h_400,c_fill,g_face,r_max/${parts[1]}`;
};

const TeamSection = () => {
  // Organized by hierarchy based on roles
  const team = [
    {
      name: "Okey Davids",
      role: "Founder/ Community Director",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744415415/David-26_1_r0nn6o_ua3zqf.jpg"
    },
    {
      name: "Godsgift Ibe",
      role: "Partnership & Fundraising Officer",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744456059/godsgift_kmgjwt.jpg"
    },
    {
      name: "Azeez Akinola Bada",
      role: "ICHAD Administrator",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744414608/m3iylzjjzval5cwccngi_xyevcb.jpg"
    },
    {
      name: "Success Iselen",
      role: "Social Media Manager",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457517/team_template_gfahah.jpg"
    },
    {
      name: "Msen Nabo",
      role: "ICHAD Youth Ambassador",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744456335/Msen_gibjfj.jpg"
    },
    {
      name: "Jemilat Yahaya",
      role: "Intern - ICHAD Youth Advisory Program Coordinator",
      image: template
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-[1300px]">
        {/* Meet Our Team Section */}
        <div className="w-full text-center mb-12">
          <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4 inline-block">
            Meet Our Team
          </h2>
          <p className="mt-4 text-gray-600">
            Dedicated professionals working to make a difference in the lives of young people
          </p>
        </div>

        {/* Team Members Grid */}
        <div className="grid md:grid-cols-3 gap-12 justify-center">
          {team.map((member, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-56 h-56 mb-4 overflow-hidden rounded-full shadow-lg">
                <img
                  src={getOptimizedImage(member.image)} // Optimized image URL with square and face-centered crop
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = template;
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </motion.div>
          ))}
        </div>

        {/* See Full Team Button */}
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
