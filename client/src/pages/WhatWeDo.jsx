import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Programs from '../components/Programs';
import CallToAction from '../components/CallToAction';
import EmptyState from '../components/EmptyState';

const WhatWeDo = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Banner Section */}
        <header className="h-[60vh] relative">
          <img
            src="https://res.cloudinary.com/djvolnu9s/image/upload/v1743186602/posts/yquz4cxqqhnnhohufm4u.jpg"
            alt="Our Programs"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">What We Do</h1>
              <p className="text-xl md:text-2xl">Empowering Youth for a Drug-Free Future</p>
            </div>
          </div>
        </header>

        {/* Mission & Vision Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold border-l-4 border-primary pl-4">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To empower young people with the knowledge, skills, and support needed to 
                  live fulfilling lives free from substance abuse, while creating sustainable 
                  pathways for their personal and professional development.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary mt-2 transform rotate-45"></div>
                    <p className="text-gray-600 flex-1">
                      Providing comprehensive drug abuse prevention education
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary mt-2 transform rotate-45"></div>
                    <p className="text-gray-600 flex-1">
                      Building resilient mindsets through mentorship and support
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary mt-2 transform rotate-45"></div>
                    <p className="text-gray-600 flex-1">
                      Developing employable skills and career opportunities
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision */}
              <div className="bg-primary p-8 rounded-lg shadow-lg text-white">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold border-l-4 border-white pl-4">
                    Our Vision
                  </h2>
                </div>
                <p className="leading-relaxed opacity-90">
                  To create a society where every young person has the opportunity to thrive, 
                  making informed decisions about their lives while contributing positively to 
                  their communities, free from the constraints of substance abuse.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white mt-2 transform rotate-45"></div>
                    <p className="opacity-90 flex-1">
                      A drug-free youth population across Nigeria
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white mt-2 transform rotate-45"></div>
                    <p className="opacity-90 flex-1">
                      Empowered communities with strong support networks
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-white mt-2 transform rotate-45"></div>
                    <p className="opacity-90 flex-1">
                      Sustainable youth development through education and skills
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Our Programs</h2>
            {programs.length === 0 ? (
              <EmptyState
                title="No Programs Available"
                message="We are currently developing our programs. Please check back soon."
                icon="ri-community-line"
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* ... your existing programs mapping ... */}
              </div>
            )}
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default WhatWeDo; 