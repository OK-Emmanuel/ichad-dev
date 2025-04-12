const Goals = () => {
  const goals = [
    {
      title: "Discourage Substance Abuse",
      description: "Discourage the initiation/use and abuse of substances and introduce healthy alternatives."
    },
    {
      title: "Facilitate Protective Factors",
      description: "Facilitate and encourage protective factors such as school, family and community connectedness."
    },
    {
      title: "Empower Young Adults",
      description: "Equip young adult with relevant employable skills"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">OUR COMMITMENT </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {goals.map((goal, index) => (
            <div 
              key={index}
              className="bg-primary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/*  remove number from our commitment (MR David - 06/04/2025)*/}
              
              {/* <div className="w-12 h-12 bg-white rounded-full mb-4 flex items-center justify-center text-primary">
                {index + 1}
              </div> */} 
              <h3 className="text-xl font-semibold mb-3 text-white">{goal.title}</h3>
              <p className="text-white/90">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Goals; 