import { motion } from 'framer-motion';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaGraduationCap, FaUsers, FaBook, FaChartLine } from 'react-icons/fa';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import BackToTop from './BackToTop';
import HubsComponent from './HubsComponent';
import Excos from '../assets/oau-excos.png';
import Faculty from '../assets/oau-faculty-reps.png';

const OAULanding = () => {
  const stats = [
    { number: "500+", label: "Students Reached", icon: FaUsers },
    { number: "20+", label: "Programs Conducted", icon: FaBook },
    { number: "15+", label: "Partnerships", icon: FaChartLine }
  ];

  const programs = [
    {
      title: "NAVIGATE Program",
      description: "An eight-week mentorship program designed to equip students with life skills and drug prevention knowledge.",
      image: optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg"),
      features: [
        "Weekly mentorship sessions",
        "Life skills training",
        "Career guidance",
        "Mental health support"
      ]
    },
    {
      title: "School Sensitization",
      description: "Regular awareness campaigns and workshops to educate students about substance abuse prevention.",
      image: optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg"),
      features: [
        "Interactive workshops",
        "Peer education",
        "Faculty training",
        "Resource distribution"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Adeola Johnson",
      role: "Student Leader",
      content: "The ICHAD Hub has transformed our campus community. The programs have helped many students make better choices and find support when needed.",
      image: optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg")
    },
    {
      name: "Dr. Michael Adebayo",
      role: "Faculty Advisor",
      content: "As a faculty member, I've seen firsthand the positive impact of ICHAD's programs on our students' academic performance and overall well-being.",
      image: optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg")
    }
  ];

  return (
    <>
      <TopBar />
      <Navbar />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <picture>
              <source 
                media="(max-width: 768px)" 
                srcSet="https://res.cloudinary.com/dzzavh0nq/image/upload/v1745422662/ichad-mobile_njl4yu.jpg"
              />
              <img
                src={optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg")}
                alt="OAU Campus"
                className="w-full h-full object-cover"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-end pb-20">
            <Link to="/" className="absolute top-8 left-4 text-white hover:text-primary transition-colors">
              <FaArrowLeft className="text-2xl" />
            </Link>
            
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                ICHAD Hub at OAU
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Empowering Youth, Building Futures
              </p>
              
              {/* <div className="grid grid-cols-3 gap-8">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-white/80">{stat.label}</div>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  To create a drug-free campus environment through comprehensive education, awareness programs, and community engagement. We aim to empower students with the knowledge and skills needed to make informed decisions about their health and future.
                </p>
              </div>
              <div className="relative h-96 rounded-lg overflow-hidden">
                <picture>
                <img
                  src={optimizeImageUrl("https://res.cloudinary.com/djvolnu9s/image/upload/v1744101045/ICHAD/Hubs/OAU_jygcqt.jpg")}
                  alt="Mission"
                  className="w-full h-full object-cover"
                />
                <source media="(max-width: 768px)" srcset="https://res.cloudinary.com/dzzavh0nq/image/upload/v1745422662/ichad-mobile_njl4yu.jpg"></source>
                </picture>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Executives Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Meet Our Executives</h2>
            <div className="max-w-4xl mx-auto">
              <img
                src={Excos}
                alt="OAU Executives"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Faculty Representatives Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Faculty Representatives</h2>
            <div className="max-w-4xl mx-auto">
              <img
                src={Faculty}
                alt="Faculty Representatives"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Our Programs</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {programs.map((program, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg overflow-hidden shadow-lg"
                >
                  <div className="h-64 relative">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">{program.title}</h3>
                    <p className="text-gray-700 mb-6">{program.description}</p>
                    <ul className="space-y-2">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-700">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">What People Say</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-8 rounded-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Other ICHAD Hubs Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Other ICHAD Hubs</h2>
            <HubsComponent />
          </div>
        </section>

        {/* Contact Section */}
        {/* <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-12">Get In Touch</h2>
            <div className="max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-center">
                    <i className="ri-mail-line text-primary text-2xl mr-4"></i>
                    <a href="mailto:info@ichadproject.org" className="text-gray-700 hover:text-primary">
                      info@ichadproject.org
                    </a>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-phone-line text-primary text-2xl mr-4"></i>
                    <span className="text-gray-700">+234 123 456 7891</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-map-pin-line text-primary text-2xl mr-4"></i>
                    <span className="text-gray-700">Obafemi Awolowo University, Ile-Ife, Osun State</span>
                  </div>
                </div>
                <div className="flex space-x-6 justify-center items-center">
                  <a
                    href="https://twitter.com/ICHADOAU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-3xl"
                  >
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a
                    href="https://instagram.com/ICHADOAU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-3xl"
                  >
                    <i className="ri-instagram-fill"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>

      <Footer />
      <BackToTop />
    </>
  );
};

export default OAULanding; 