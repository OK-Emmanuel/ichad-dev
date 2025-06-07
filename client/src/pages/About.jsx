import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
import { aboutService } from '../services/api';

const About = () => {
  const [aboutContent, setAboutContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    try {
      setLoading(true);
      const data = await aboutService.getAboutContent();
      console.log('Client: Fetched about content:', data);
      // Convert array to object with section as key
      const contentObj = data.reduce((acc, item) => {
        acc[item.section] = item;
        return acc;
      }, {});
      console.log('Client: Processed about content object:', contentObj);
      setAboutContent(contentObj);
    } catch (err) {
      console.error('Error fetching about content:', err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get content or fallback
  const getContent = (section, fallbackContent) => {
    return aboutContent[section]?.content || fallbackContent;
  };

  const getTitle = (section, fallbackTitle) => {
    return aboutContent[section]?.title || fallbackTitle;
  };

  const getImage = (section, fallbackImage) => {
    const imageUrl = aboutContent[section]?.image || fallbackImage;
    console.log(`Client: Getting image for ${section}:`, imageUrl);
    return imageUrl;
  };

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
                <h2 className="text-3xl font-bold mb-4 text-primary">{getTitle('about_us', 'About Us')}</h2>
                <div className="text-lg space-y-6 whitespace-pre-line">
                  {getContent('about_us', 
                    `At the ICHAD Project, we are dedicated to empowering adolescents and young adults with the resilience, skills, and support systems they need to thrive, without resorting to harmful substances.

Across our communities, the rising rates of substance use and abuse among young people are deeply concerning. Many are driven to drugs by unemployment, limited opportunities, social pressures, Family dysfunctionality, and mental health struggles. At ICHAD, we believe that the best way to prevent substance abuse is by addressing its root causes and offering meaningful alternatives.

Through our education, Mentorship, skill development, mental health support, and community engagement programs, we equip young people with practical tools for success.

At ICHAD, we are not just preventing drug use, we are building a generation of young leaders, innovators, and changemakers who are equipped to lead healthy, purpose-driven lives.`
                  )}
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
                  src={optimizeImageUrl(getImage('about_us', "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413943/FRONT_3_h0bonu_gwmzxa.jpg"))}
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
                    {getTitle('vision', 'Our Vision')}
                  </h2>
                </div>
                <div className="leading-relaxed opacity-90 whitespace-pre-line">
                  {getContent('vision', 'We envision a world where every young person is empowered with the skills, support, and opportunities to lead a life free from drugs, full of purpose, and rich in possibilities.')}
                </div>
              </div>

              {/* Mission */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
                    {getTitle('mission', 'Our Mission')}
                  </h2>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {getContent('mission', 'Our mission is simple but powerful; To prevent drug use by providing young people with sustainable alternatives that empower them mentally, socially and economically.')}
                </div>
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
                  src={optimizeImageUrl(getImage('our_story', "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413943/FRONT_3_h0bonu_gwmzxa.jpg"))}
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
                <h2 className="text-3xl font-bold mb-4 text-primary">{getTitle('our_story', 'Our Story')}</h2>
                <div className="text-lg space-y-6 whitespace-pre-line">
                  {getContent('our_story', 
                    `The ICHAD Project was born out of a deep concern for the rising rates of drug abuse among young people; a crisis fueled by unemployment, lack of opportunities, and social pressures. What began as a mission to prevent substance abuse has grown into a movement of empowerment, resilience, and hope.

We believe that the best way to keep young people away from drugs is to equip them with the skills, support, and opportunities they need to thrive. Through mentorship, skills training, mental health support, and creative expression, we are transforming lives and communities; one young person at a time.

Today, ICHAD is more than just an initiative; it's a lifeline. We stand as a guiding light, ensuring that every young person has the chance to rewrite their story, not with drugs, but with purpose, passion, and possibility.`
                  )}
                </div>
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
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-white pl-4">{getTitle('our_philosophy', 'Our Philosophy')}</h2>
                <div className="text-md leading-relaxed whitespace-pre-line">
                  {getContent('our_philosophy', 
                    'Our Philosophy provides opportunities for young people to reach their full potential, imbibe the skills and confidence to make healthy choices that enables them successfully navigate adolescents. While our focus is to keep young people drug and alcohol free, we believe that the most effective way to do this is by addressing ROOT CAUSES which contribute to drug and alcohol use and abuse.'
                  )}
                </div>
              </div>
              
              {/* Why We Exist */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6 border-l-4 border-white pl-4">{getTitle('why_we_exist', 'Why We Exist')}</h2>
                <div className="text-lg leading-relaxed whitespace-pre-line">
                  {getContent('why_we_exist', 'We believe in the power of prevention, education, and community support to create lasting change.')}
                </div>
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
