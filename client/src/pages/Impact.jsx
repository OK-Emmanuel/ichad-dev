import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';

const Impact = () => {
  const stats = [
    {
      number: "1000+",
      text: "young adults reached through our NAVIGATE program"
    },
    {
      number: "4000+",
      text: "pupils reached through our School Drug Sensitization Project"
    },
    {
      number: "20+",
      text: "schools engaged through multiple programs"
    },
    {
      number: "200+",
      text: "Navigate Academy graduates"
    }
  ];

  const caseStudies = [
    {
      title: "Sarah's Journey",
      description: "A 17-year-old who found purpose through our NAVIGATE program, now mentoring others.",
      link: "/case-studies/sarah"
    },
    {
      title: "The School Project",
      description: "How we transformed drug awareness in 5 secondary schools in Lagos State.",
      link: "/case-studies/school-project"
    },
    {
      title: "Youth Leadership",
      description: "Our Drug Prevention Champions making impact in universities.",
      link: "/case-studies/youth-leadership"
    },
    {
      title: "Skills Development",
      description: "Success stories from our ICHAD School of Skills (I-SOS) program.",
      link: "/case-studies/skills-development"
    }
  ];

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Banner Section */}
        <header className="h-[60vh] relative">
          <img
            src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg"
            alt="Our Impact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Impact</h1>
              <p className="text-xl md:text-2xl">Creating Lasting Change in Communities</p>
            </div>
          </div>
        </header>

        {/* Stats Counter Section - Updated colors */}
        <section className="relative py-20 bg-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="text-center relative"
                >
                  <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
                    {stat.number}
                  </h2>
                  <p className="text-lg font-semibold text-white/90">
                    {stat.text}
                  </p>
                  {index !== stats.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-1/2 h-16 w-px bg-white/20 -translate-y-1/2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Description Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold border-l-4 border-primary pl-4 mb-6">
                  Our Impact Story
                </h2>
                <div className="space-y-4">
                  <p className="text-gray-700 text-justify">
                    Since our inception, ICHAD Project has been at the forefront of youth development 
                    and drug abuse prevention in Nigeria. Our impact extends beyond numbers – we're 
                    creating lasting change in communities and transforming lives.
                  </p>
                  <p className="text-gray-700 text-justify">
                    Through our comprehensive programs, we've seen remarkable transformations: young 
                    people overcoming substance abuse challenges, developing valuable skills, and 
                    becoming positive influences in their communities.
                  </p>
                  <p className="text-gray-700 text-justify">
                    Our partnerships with schools, community organizations, and government agencies 
                    have enabled us to reach more young people and create sustainable impact across 
                    different regions.
                  </p>
                </div>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743263098/Copy_of_ICHAD-drug-conference-2023-2128_mfppjv.jpg" 
                  alt="ICHAD Impact"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {caseStudies.map((study, index) => (
                <div 
                  key={index}
                  className="bg-primary text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 uppercase">
                      {study.title}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {study.description}
                    </p>
                    {/* <a 
                      href={study.link}
                      className="inline-block bg-white text-primary px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Read More
                    </a> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA Section - Similar to Urbond's */}
        {/* <section className="bg-black text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to Support Our Mission?
            </h2>
            <p className="mb-4">
              Email: <a href="mailto:info@ichadproject.org" className="text-primary underline">info@ichadproject.org</a>
              {' '}|{' '}
              Phone: <span className="text-primary">+234 123 456 7890</span>
            </p>
          </div>
        </section> */}

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Impact; 