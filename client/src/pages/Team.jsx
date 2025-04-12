import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';

// Helper function to optimize images from Cloudinary (with face and perfect square crop)
const getOptimizedImage = (url) => {
  if (!url.includes("cloudinary.com")) return url; // Just return if it's not from Cloudinary

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url; // Handle if the URL doesn't follow expected format

  // Adjust the URL to make sure it's always square and the face is centered
  return `${parts[0]}/upload/w_400,h_400,c_fill,g_face,r_max/${parts[1]}`;
};

const Team = () => {
  const executiveTeam = [
    {
      name: "Okey Davids",
      role: "Founder/ Community Director",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744415415/David-26_1_r0nn6o_ua3zqf.jpg"
    },
    {
      name: "Godsgift Ibe",
      role: "Partnership & Fundraising Officer",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744456059/godsgift_kmgjwt.jpg "
    },
    {
      name: "Azeez Akinola Bada",
      role: "ICHAD Administrator",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744414608/m3iylzjjzval5cwccngi_xyevcb.jpg"
    },
    {
      name: "Success Iselen",
      role: "Social Media Manager",
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Msen Nabo",
      role: "ICHAD Youth Ambassador",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744456335/Msen_gibjfj.jpg"
    },
    {
      name: "Jemilat Yahaya",
      role: "Intern - ICHAD Youth Advisory Program Coordinator",
      image: "/src/assets/team/template.jpg"
    }
  ];

  const advisoryBoard = [
    {
      name: "Mr. Arthur Otoijamun",
      role: "Advisory Board Chair",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744457938/arthur_r1sa5n.jpg"
    },
    {
      name: "Mrs. Fiona Wagbatsoma E",
      role: "Member",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744414023/jfhl7502exntzkct6gsr_fd0pto.jpg"
    },
    {
      name: "Mr. Gbenga Remi",
      role: "Member",
      image: "/src/assets/team/template.jpg"
    },
    {
      name: "Mrs. Chidinma Kadiri",
      role: "Member",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744413801/ehubby1vd2dzr3sylwwg_si0zfy.jpg"
    },
    {
      name: "Ms. Racheal Ajibade",
      role: "Member",
      image: "https://res.cloudinary.com/dzzavh0nq/image/upload/v1744414735/_MG_2915_1_v2j02g_rbpfys.jpg"
    }
  ];

  const TeamSection = ({ title, members }) => (
    <div className="mb-20">
      <div className="w-full mb-12 text-center">
        <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4 inline-block">
          {title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-12 justify-center">
        {members.map((member, index) => (
          <div key={index} className="flex flex-col items-center justify-center">
            <div className="relative w-56 h-56 mb-4 overflow-hidden rounded-full shadow-lg">
              <img
                src={getOptimizedImage(member.image)} // Optimized image URL with square and face-centered crop
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/src/assets/team/template.jpg";
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
            <p className="text-gray-600 text-sm">{member.role}</p>
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
