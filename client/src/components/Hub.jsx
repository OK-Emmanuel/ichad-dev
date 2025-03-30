import { motion } from 'framer-motion';

const Hub = ({ name, location, image, description, programs }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform hover:scale-105 transition-duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-sm opacity-90">{location}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="space-y-2">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="flex items-center text-sm text-gray-700"
            >
              <div className="w-2 h-2 bg-primary transform rotate-45 mr-3" />
              {program}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
  
};

export default Hub; 