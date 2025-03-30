const Partners = () => {
  const partners = [
    { name: "Partner 1", logo: "/src/assets/logo.jpg" },
    { name: "Partner 2", logo: "/src/assets/logo.jpg" },
    { name: "Partner 2", logo: "/src/assets/logo.jpg" },
    { name: "Partner 2", logo: "/src/assets/logo.jpg" },
   
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Our Partners & Supporters</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Working together with leading organizations to create lasting impact
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="w-32 h-20 bg-white shadow-2xl rounded-lg  flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md"
            >
              {/* Image placeholder to show the logo */}
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} Logo`} 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
