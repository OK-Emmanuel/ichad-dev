import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Programs from '../components/Programs';
import CallToAction from '../components/CallToAction';
import SDGComponent from '../components/SDGComponent';

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
                Our mission is simple but powerful; To prevent drug use by providing young people with sustainable alternatives that empower them mentally, socially and economically.
                </p>
                {/* <div className="mt-6 space-y-3">
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
                </div> */}
              </div>

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
                {/* <div className="mt-6 space-y-3">
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
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Programs Section */}
        <Programs />

        {/* SDG Activities section */}
        <SDGComponent />

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default WhatWeDo; 