import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';
import Hub from '../components/Hub';
import TeamSection from '../components/TeamSection';

const About = () => {
  const hubs = [
    {
      name: "OAU Hub",
      location: "Surulere, Lagos",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg",
      description: "Our primary hub serving the youth of Lagos State with comprehensive programs and facilities.",
      programs: [
        "NAVIGATE Program",
        "Drug Prevention Champions",
        "School Sensitization",
        "Skills Development"
      ]
    },
    {
      name: "UNIHLAG Hub",
      location: "Surulere, Lagos",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg",
      description: "Our primary hub serving the youth of Lagos State with comprehensive programs and facilities.",
      programs: [
        "NAVIGATE Program",
        "Drug Prevention Champions",
        "School Sensitization",
        "Skills Development"
      ]
    },
    {
      name: "YABATECH Hub",
      location: "Surulere, Lagos",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg",
      description: "Our primary hub serving the youth of Lagos State with comprehensive programs and facilities.",
      programs: [
        "NAVIGATE Program",
        "Drug Prevention Champions",
        "School Sensitization",
        "Skills Development"
      ]
    },
    // Add other hubs
  ];

  const sdgs = [
    {
      number: 3,
      title: "Good Health and Well-being",
      description: "Promoting healthy lives and well-being for youth"
    },
    {
      number: 4,
      title: "Quality Education",
      description: "Ensuring inclusive and quality education"
    },
    // Add other SDGs
  ];

  const values = [
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
     
    {
      icon: "ri-heart-fill",
      title: "Compassion",
      description: "We approach our work with empathy and understanding"
    },
     
    // Add other values
  ];

  return (
    <>
      <TopBar />
      <Navbar />
      <main className="overflow-hidden">
        {/* Hero Section */}
        <header className="relative h-[80vh]">
          <img
            src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743263449/FRONT_3_h0bonu.jpg"
            alt="About ICHAD"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-white"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6">
                  Empowering Youth for a Better Tomorrow
                </h1>
                <p className="text-xl md:text-2xl opacity-90">
                  Building resilient communities through youth development and drug abuse prevention
                </p>
              </motion.div>
            </div>
          </div>
        </header>

        {/* Mission & Vision Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-primary">Our Mission</h2>
                  <p className="text-gray-600 leading-relaxed">
                    To empower young people with knowledge, skills, and opportunities
                    for a drug-free and purposeful life while fostering community development.
                  </p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-secondary">Our Vision</h2>
                  <p className="text-gray-600 leading-relaxed">
                    A world where every young person lives free from drug abuse,
                    equipped with the tools to reach their full potential.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6" />
                <img
                  src="https://scontent-zrh1-1.xx.fbcdn.net/v/t39.30808-6/482359442_630685819669940_4517958022707485434_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEcCOcCHsRI8oZGzIU0TlWq6MYJYDvu1rfoxglgO-7Wt1U3tMD85IHSudIhSHDIZW69oDBHeyQKFxXesgyrtgz_&_nc_ohc=09ZI1ZTfv0kQ7kNvgF3adnl&_nc_oc=AdlMSAfTAwagZS1GlK-3wUhS4vQ7votZDle81PuuFeCdu0Oe3RtEdat2hrhkV4ykseU&_nc_zt=23&_nc_ht=scontent-zrh1-1.xx&_nc_gid=WMV4zHv2aN7dT_YkPdwegQ&oh=00_AYHjK-O5CIqgd3syQqK-kt8I1WvjHouVu_7K1k3x4GNsBA&oe=67EDD7FB"
                  alt="Our Impact"
                  className="relative rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Original About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">About ICHAD Project</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  The Initiative for Community Health and Development (ICHAD) Project is a youth-focused 
                  non-profit organization committed to preventing drug abuse and promoting youth development.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div>
                  <img
                    src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743265297/IMG_0953_perjad.jpg"
                    alt="About ICHAD"
                    className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
                  />
                </div>
                <div className="flex items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Our Story</h3>
                    <p className="text-gray-600 mb-6">
                      Founded in response to the growing challenges of drug abuse among young people,
                      ICHAD Project has evolved into a comprehensive youth development initiative.
                    </p>
                    <p className="text-gray-600">
                      Through our various programs and interventions, we work to create lasting positive
                      change in communities across Nigeria.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Original Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-[1100px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Programs</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Through our comprehensive programs, we create lasting impact in the lives of young 
                  people and their communities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "NAVIGATE",
                    desc: "An eight-week online mentorship program equipping participants with knowledge, skills, and confidence for healthier, substance-free lives."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  {
                    title: "Project Enable",
                    desc: "Providing young adults with employable skills through the ICHAD School Of Skills (I-SOS)."
                  },
                  // ... rest of the programs remain the same ...
                ].map((program, index) => (
                  <div 
                    key={index}
                    className={`relative p-6 rounded-lg transition-all duration-300 hover:shadow-lg ${
                      Math.floor(index/2) % 2 === 0 ? 'bg-primary text-white' : 'bg-primary-light'
                    }`}
                  >
                    <div className="absolute left-2 top-[22px] w-3 h-3 transform rotate-45 bg-white/80"></div>
                    <h3 className="font-semibold mb-2 text-white">
                      {program.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {program.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Why Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold mb-8">Why We Exist</h2>
              <p className="text-xl leading-relaxed opacity-90">
                In a world where young people face increasing challenges with drug abuse
                and limited opportunities, ICHAD stands as a beacon of hope and transformation.
                We believe in the power of prevention, education, and community support to
                create lasting change.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center p-6 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <i className={`${value.icon} text-5xl text-secondary mb-4`}></i>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SDGs Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
              Supporting UN Sustainable Development Goals
            </h2>
            <div className="grid md:grid-cols-2 gap-4 shadow-xl">
              {sdgs.map((sdg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-lg shadow-lg"
                >
                  <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-center text-2xl font-bold mb-4">
                    {sdg.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{sdg.title}</h3>
                  <p className="text-gray-600">{sdg.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Hubs Section */}
        <section className="py-20 hover:shadow-2xl">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">Our Hubs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {hubs.map((hub, index) => (
                <Hub key={index} {...hub} />
              ))}
            </div>
          </div>
        </section>
        <TeamSection />

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default About; 