import React from 'react';
import { motion } from 'framer-motion';
import { Box, Download, Eye, Layers, Ruler, Cog } from 'lucide-react';

const CADModels = () => {
  const cadModels = [
    {
      title: "Mechanical Assembly Design",
      description: "Complex mechanical assembly with multiple components and precise tolerances.",
      software: "SolidWorks",
      category: "Assembly",
      image: "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/assembly.step"
    },
    {
      title: "Precision Gear System",
      description: "High-precision gear system designed for optimal power transmission.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      image: "https://images.pexels.com/photos/159275/macro-gear-gear-wheel-clockwork-159275.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/gear-system.step"
    },
    // Add other models...
  ];

  const categories = ["All", "Assembly", "Mechanical Parts", "Automotive", "Industrial", "Thermal Systems", "Robotics"];
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [modalImage, setModalImage] = React.useState<string | null>(null);

  const filteredModels = activeCategory === "All" 
    ? cadModels 
    : cadModels.filter(model => model.category === activeCategory);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          CAD Model Showcase
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
          Explore my collection of precision-engineered CAD models across various industries.
        </motion.p>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Models Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredModels.map((model, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Model Image */}
              <div className="relative overflow-hidden">
                <motion.img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Eye Button Overlay */}
                <motion.button
                  className="absolute top-2 right-2 p-2 rounded-full bg-purple-600/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setModalImage(model.image)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye className="w-4 h-4 text-white" />
                </motion.button>
              </div>

              {/* Model Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">{model.title}</h3>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full border border-purple-500/30">
                    {model.software}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{model.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-400" />
                    <span className="text-xs text-gray-400">{model.category}</span>
                  </div>

                  <motion.a
                    href={model.downloadUrl}
                    className="flex items-center gap-1 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-3 py-1.5 rounded-lg text-xs transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-3 h-3" /> STEP
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image Modal */}
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative p-4 max-w-3xl w-full">
              <button
                className="absolute top-2 right-2 text-white p-2 rounded-full hover:bg-gray-800"
                onClick={() => setModalImage(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <img src={modalImage} alt="CAD Model" className="w-full rounded-lg shadow-lg" />
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default CADModels;
