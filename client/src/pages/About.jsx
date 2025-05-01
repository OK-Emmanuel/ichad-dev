import { motion } from 'framer-motion';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';
import TeamSection from '../components/TeamSection';
import SDGComponent from '../components/SDGComponent';
import ValuesComponent from '../components/ValuesComponent';
import HubsComponent from '../components/HubsComponent';
import { optimizeImageUrl } from '../utils/imageOptimizer';
import PageBanner from '../components/PageBanner';

const About = () => {
 

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
        <PageBanner 
          page="about"
          defaultImage="https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413943/FRONT_3_h0bonu_gwmzxa.jpg"
          defaultTitle="Empowering Youth for a Better Tomorrow"
          defaultSubtitle="Building resilient communities through youth development and drug abuse prevention"
          className="h-[80vh]"
        />

        {/* About Us Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold mb-4 text-primary">About Us</h2>
                <p className="text-lg mb-6">
                  At the ICHAD Project, we are dedicated to empowering adolescents and young adults with the resilience, skills, and support systems they need to thrive, without resorting to harmful substances.
                </p>
                <p className="text-lg mb-6">
                  Across our communities, the rising rates of substance use and abuse among young people are deeply concerning. Many are driven to drugs by unemployment, limited opportunities, social pressures, Family dysfunctionality, and mental health struggles. At ICHAD, we believe that the best way to prevent substance abuse is by addressing its root causes and offering meaningful alternatives.
                </p>
                <p className="text-lg">
                  Through our education, Mentorship, skill development, mental health support, and community engagement programs, we equip young people with practical tools for success.
                </p>
                <p className="text-lg">
                  At ICHAD, we are not just preventing drug use, we are building a generation of young leaders, innovators, and changemakers who are equipped to lead healthy, purpose-driven lives.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full transform -rotate-6" />
                <img
                  src={optimizeImageUrl("https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413943/FRONT_3_h0bonu_gwmzxa.jpg")}
                  alt="About ICHAD"
                  className="relative rounded-lg shadow-xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-primary p-8 rounded-lg shadow-lg text-white">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold border-l-4 border-white pl-4">
                    Our Vision
                  </h2>
                </div>
                <p className="leading-relaxed opacity-90">
                  We envision a world where every young person is empowered with the skills, support, and opportunities to lead a life free from drugs, full of purpose, and rich in possibilities.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our mission is simple but powerful; To prevent drug use by providing young people with sustainable alternatives that empower them mentally, socially and economically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 md:order-1"
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full transform rotate-6" />
                <img
                  src="https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413943/FRONT_3_h0bonu_gwmzxa.jpg"
                  alt="Our Story"
                  className="relative rounded-lg shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6 order-1 md:order-2"
              >
                <h2 className="text-3xl font-bold mb-4 text-primary">Our Story</h2>
                <p className="text-lg mb-6">
                  The ICHAD Project was born out of a deep concern for the rising rates of drug abuse among young people; a crisis fueled by unemployment, lack of opportunities, and social pressures. What began as a mission to prevent substance abuse has grown into a movement of empowerment, resilience, and hope.
                </p>
                <p className="text-lg mb-6">
                  We believe that the best way to keep young people away from drugs is to equip them with the skills, support, and opportunities they need to thrive. Through mentorship, skills training, mental health support, and creative expression, we are transforming lives and communities; one young person at a time.
                </p>
                <p className="text-lg">
                  Today, ICHAD is more than just an initiative; it's a lifeline. We stand as a guiding light, ensuring that every young person has the chance to rewrite their story, not with drugs, but with purpose, passion, and possibility.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Philosophy & Why We Exist Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Philosophy */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-white pl-4">Our Philosophy</h2>
                <p className="text-md leading-relaxed">
                  Our Philosophy provides opportunities for young people to reach their full potential, imbibe the skills and confidence to make healthy choices that enables them successfully navigate adolescents. While our focus is to keep young people drug and alcohol free, we believe that the most effective way to do this is by addressing ROOT CAUSES which contribute to drug and alcohol use and abuse.
                </p>
              </div>
              
              {/* Why We Exist */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-white pl-4">Why We Exist</h2>
                <p className="text-lg leading-relaxed">
                We believe in the power of prevention, education, and community support to create lasting change.

                </p>
                
              </div>
            </div>
          </div>
        </section>
      
        {/* SDGs Section */}
        <SDGComponent />

        {/* Our Values Section */}
        <ValuesComponent />

        {/* Our Hubs Section */}
        <HubsComponent />
        <TeamSection />

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default About;
