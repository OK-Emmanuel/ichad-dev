import { useState, useEffect } from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import CallToAction from '../components/CallToAction';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import TeamMemberCard from '../components/TeamMemberCard';
import template from '../assets/team/template.jpg';
import teamBanner from '../assets/team-banner.jpg';
import { teamService } from '../services/api';

// Helper function to construct image URL (similar to TeamSection)
const getImageUrl = (imageData, fallback) => {
  const url = imageData?.url || null;
  // Construct the full URL if it's relative
  const fullUrl = url && !url.startsWith('http') ? `http://localhost:1337${url}` : url;
  return fullUrl || fallback;
};

const Team = () => {
  const [executiveTeam, setExecutiveTeam] = useState([]);
  const [advisoryBoard, setAdvisoryBoard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllTeams = async () => {
      setLoading(true);
      setError(false);
      try {
        // Using Promise.all to fetch both team types concurrently
        const [teamMembers, advisoryMembers] = await Promise.all([
          teamService.getTeamMembers(),
          teamService.getAdvisoryMembers()
        ]);

        setExecutiveTeam(teamMembers);
        setAdvisoryBoard(advisoryMembers);
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTeams();
  }, []);

  // Presentational component for a section
  const TeamSectionDisplay = ({ title, members }) => (
    <div className="mb-20">
      <div className="w-full mb-12 text-center">
        <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4 inline-block">
          {title}
        </h2>
      </div>
      {members && members.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-12 justify-center">
          {members.map((member, index) => (
            <TeamMemberCard 
              key={member._id}
              name={member.name}
              role={member.role}
              // bio={member.bio}
              image={member.image} 
              linkedin={member.linkedin}
              index={index}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Information for this section is not yet available.</p>
      )}
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
            src={teamBanner}
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

        {/* Team Content - Fetched Data */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-[1300px]">
            {loading && <div className="text-center"><LoadingSpinner /></div>}
            {error && <EmptyState title="Error Loading Team" message="Could not fetch team data. Please try again later." />}
            {!loading && !error && (
              <>
                <TeamSectionDisplay title="Executive Team" members={executiveTeam} />
                <TeamSectionDisplay title="Advisory Board" members={advisoryBoard} />
              </>
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

export default Team;
