const Team = () => {
  const teamMembers = [
    {
      name: "Okey Davids",
      role: "Founder/ Community Director",
      image: "/src/assets/team/okey.jpg", // Update with actual image path
    },
    {
      name: "Success Iselen",
      role: "Social Media Manager",
      image: "/src/assets/team/success.jpg", // Update with actual image path
    },
    {
      name: "Godsgift Ibe",
      role: "Partnership & Fundraising Officer",
      image: "/src/assets/team/godsgift.jpg", // Update with actual image path
    },
    {
      name: "Azeez Akinola Bada",
      role: "ICHAD Administrator",
      image: "/src/assets/team/azeez.jpg", // Update with actual image path
    },
    {
      name: "Msen Nabo",
      role: "ICHAD Youth Ambassador",
      image: "/src/assets/team/msen.jpg", // Update with actual image path
    },
    {
      name: "Jemilat Yahaya",
      role: "Intern - ICHAD Youth Advisory Program Coordinator",
      image: "/src/assets/team/jemilat.jpg", // Update with actual image path
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-primary">Our Team</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Meet the dedicated professionals working to make a difference in the lives of young people
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x300?text=Team+Member";
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team; 