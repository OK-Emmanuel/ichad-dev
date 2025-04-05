import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';

const Team = () => {
  const executiveTeam = [
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
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Success Iselen",
      role: "Social Media Manager",
      image: "/src/assets/team/template.jpg"
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
    },
    {
      name: "Suzannah Aletile",
      role: "EA/Board Liaison Officer",
      image: "/src/assets/team/template.jpg"
    }
    // Add any other executive team members
  ];

  const advisoryBoard = [
    {
      name: "Mr. Arthur Otoijamun",
      role: "Advisory Board Chair",
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Mrs. Fiona Wagbatsoma E",
      role: "Member",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743683803/jfhl7502exntzkct6gsr.jpg"
    },
    {
      name: "Mr. Gbenga Remi",
      role: "Member",
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Mrs. Chidinma Kadiri",
      role: "Member",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/v1743683790/ehubby1vd2dzr3sylwwg.jpg"
    },
    {
      name: "Ms. Racheal Ajibade",
      role: "Member",
      image: "/src/assets/team/template.jpg"
    },
    // Add more advisory board members
  ];

  const TeamSection = ({ title, members }) => (
    <div className="mb-20">
      <div className="w-full md:w-1/2 mb-12">
        <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {members.map((member, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transform hover:scale-105 transition-all duration-500"
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
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <TopBar />
      <Navbar />
      <main>
        {/* Banner Section */}
        <header className="h-[60vh] relative">
          <img
            src="/src/assets/team-banner.jpg"
            alt="Our Team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Team</h1>
              <p className="text-xl md:text-2xl">Meet the People Behind ICHAD Project</p>
            </div>
          </div>
        </header>

        {/* Team Content */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-[1300px]">
            <TeamSection title="Executive Team" members={executiveTeam} />
            <TeamSection title="Advisory Board" members={advisoryBoard} />
          </div>
        </section>

        <CallToAction />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
};

export default Team; 