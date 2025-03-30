const TeamSection = () => {
  const team = [
    {
      name: "Okey Davids",
      role: "Community Director",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/t_Banner 16:9/v1743267097/David-26_1_r0nn6o.jpg"
    },
    {
      name: "Amb. Msen Nabo",
      role: "ICHAD Youth Ambassador",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/t_Banner 16:9/v1743267097/David-26_1_r0nn6o.jpg"
    },
    {
      name: "Suzannah Aletile",
      role: "EA/Board Liaison Officer",
      image: "https://res.cloudinary.com/djvolnu9s/image/upload/t_Banner 16:9/v1743267097/David-26_1_r0nn6o.jpg"
    }
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 max-w-[1300px]">
        <div className="w-full md:w-1/2 mb-12">
          <h2 className="text-3xl font-bold uppercase border-l-4 border-primary pl-4">
            Meet Our Team
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
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

        <div className="text-center mt-12">
          <a
            href="/team"
            className="inline-block px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary-dark transition-all duration-300"
          >
            See More
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 