import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Programs from '../components/Programs';
import CallToAction from '../components/CallToAction';

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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Programs</h2>
            
            <div className="space-y-12">
              {/* Program 1 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-primary">
                    <div className="h-full flex items-center justify-center p-8">
                      <i className="ri-mental-health-line text-white text-6xl"></i>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold mb-4">Mental Health Support</h3>
                    <p className="text-lg mb-4">
                      We provide accessible mental health resources, including counseling, support groups, and stress management workshops, to help young people navigate emotional challenges without turning to substances.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Program 2 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-primary-light">
                    <div className="h-full flex items-center justify-center p-8">
                      <i className="ri-book-open-line text-white text-6xl"></i>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold mb-4">Education & Awareness</h3>
                    <p className="text-lg mb-4">
                      Our evidence-based drug education programs go beyond scare tactics to provide young people with accurate information about substance abuse and its consequences, empowering them to make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Program 3 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-primary">
                    <div className="h-full flex items-center justify-center p-8">
                      <i className="ri-user-star-line text-white text-6xl"></i>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold mb-4">Mentorship & Leadership</h3>
                    <p className="text-lg mb-4">
                      Through our Navigate program, we connect young people with positive role models who provide guidance, support, and inspiration, helping them develop leadership skills and a sense of purpose.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Program 4 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-primary-light">
                    <div className="h-full flex items-center justify-center p-8">
                      <i className="ri-tools-line text-white text-6xl"></i>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold mb-4">Skills Development</h3>
                    <p className="text-lg mb-4">
                      We offer practical skills training in areas like digital marketing, graphic design, and entrepreneurship, providing young people with pathways to employment and economic independence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDG Activities section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-primary">Our Activities on SDG</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Good Health and Wellbeing</h3>
                <p>
                  Strengthen the awareness and prevention of substance abuse for the promotion of Good Health and Wellbeing.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  4
                </div>
                <h3 className="text-xl font-bold mb-4">Quality Education</h3>
                <p>
                  Promote Good Education that goes beyond the classroom and captures soft, hard, and digital skills.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 text-2xl font-bold">
                  8
                </div>
                <h3 className="text-xl font-bold mb-4">Decent Work and Economic Growth</h3>
                <p>
                  Substantially reduce the rate of unemployed youth that lack basic vocational training through our healthy alternatives to drug approach, as well as our business funding initiative.
                </p>
              </div>
            </div>
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