import React from 'react';
import { motion } from 'framer-motion';
import { Box, Download, Eye, Layers, Ruler, Cog, Zap, Award, Users, Target, TrendingUp, Lightbulb } from 'lucide-react';

const CADModels = () => {
  const cadModels = [
    {
      title: "Advanced Gear Transmission System",
      description: "High-precision planetary gear system with optimized tooth profiles for maximum power transmission efficiency and minimal backlash.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Advanced",
      designTime: "120 hours",
      features: ["Parametric Design", "Motion Study", "Stress Analysis", "Manufacturing Ready"],
      specifications: {
        ratio: "1:15.7",
        torque: "500 Nm",
        efficiency: "98.5%",
        material: "Hardened Steel"
      },
      image: "https://images.pexels.com/photos/159275/macro-gear-gear-wheel-clockwork-159275.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/gear-system.step",
      views: 1247,
      downloads: 89
    },
    {
      title: "Automotive Brake Disc Assembly",
      description: "Ventilated brake disc with optimized cooling channels, weight reduction features, and integrated ABS sensor mounting.",
      software: "CATIA",
      category: "Automotive",
      complexity: "Intermediate",
      designTime: "85 hours",
      features: ["Thermal Analysis", "Weight Optimization", "Manufacturing DFM", "Quality Control"],
      specifications: {
        diameter: "330mm",
        thickness: "32mm",
        weight: "8.2kg",
        material: "Cast Iron GG-15"
      },
      image: "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/brake-disc.step",
      views: 892,
      downloads: 67
    },
    {
      title: "Industrial Valve Control System",
      description: "Multi-port industrial control valve with pneumatic actuator, position feedback, and fail-safe mechanisms for critical applications.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Advanced",
      designTime: "150 hours",
      features: ["Flow Simulation", "Pressure Testing", "Actuator Integration", "Safety Systems"],
      specifications: {
        pressure: "40 bar",
        temperature: "200°C",
        flow: "500 L/min",
        material: "Stainless Steel 316L"
      },
      image: "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/valve.step",
      views: 1156,
      downloads: 94
    },
    {
      title: "Compact Heat Exchanger Design",
      description: "Shell-and-tube heat exchanger with enhanced thermal performance, minimal pressure drop, and compact footprint for space-constrained applications.",
      software: "SolidWorks",
      category: "Thermal Systems",
      complexity: "Advanced",
      designTime: "200 hours",
      features: ["CFD Analysis", "Thermal Optimization", "Pressure Drop Analysis", "Maintenance Access"],
      specifications: {
        capacity: "500 kW",
        efficiency: "92%",
        pressure: "16 bar",
        material: "Titanium Alloy"
      },
      image: "https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/heat-exchanger.step",
      views: 743,
      downloads: 52
    },
    {
      title: "Precision Robotic Joint Mechanism",
      description: "Six-axis robotic joint with precision bearings, servo motor integration, and advanced position control for industrial automation.",
      software: "Fusion 360",
      category: "Robotics",
      complexity: "Expert",
      designTime: "180 hours",
      features: ["Kinematic Analysis", "Servo Integration", "Precision Bearings", "Control Systems"],
      specifications: {
        payload: "25 kg",
        repeatability: "±0.02mm",
        speed: "180°/s",
        material: "Aluminum 7075-T6"
      },
      image: "https://images.pexels.com/photos/2085831/pexels-photo-2085831.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/robotic-joint.step",
      views: 1389,
      downloads: 112
    },
    {
      title: "Multi-Component Assembly System",
      description: "Complex mechanical assembly with 150+ components, featuring advanced mating conditions, motion studies, and exploded views for manufacturing.",
      software: "SolidWorks",
      category: "Assembly",
      complexity: "Expert",
      designTime: "300 hours",
      features: ["Large Assembly", "Motion Simulation", "Interference Detection", "BOM Generation"],
      specifications: {
        components: "156 parts",
        weight: "45.7 kg",
        envelope: "800x600x400mm",
        material: "Mixed Materials"
      },
      image: "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/assembly.step",
      views: 2156,
      downloads: 178
    }
  ];

  const categories = ["All", "Assembly", "Mechanical Parts", "Automotive", "Industrial", "Thermal Systems", "Robotics"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredModels = activeCategory === "All"
    ? cadModels
    : cadModels.filter(model => model.category === activeCategory);

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case 'Beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Advanced': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Expert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const stats = [
    { label: "Total Models", value: "50+", icon: Box, color: "purple" },
    { label: "Downloads", value: "2.5K+", icon: Download, color: "blue" },
    { label: "Categories", value: "8", icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          CAD Model <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Showcase</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-4xl mx-auto">
          Explore my comprehensive collection of precision-engineered CAD models, showcasing advanced mechanical design,
          assembly modeling, and engineering optimization across various industries. Each model represents hours of meticulous
          design work and real-world engineering challenges.
        </motion.p>

        {/* Enhanced Stats Section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="text-xl font-semibold text-center mb-6 text-purple-400">Filter by Category</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700/50 hover:border-purple-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {activeCategory === category && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
                    layoutId="activeCategory"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Models Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {filteredModels.map((model, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 group shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Enhanced Image Section */}
              <div className="relative overflow-hidden h-64">
                <motion.img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Stats */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {model.views}
                  </div>
                  <div className="bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                    <Download className="w-3 h-3" />
                    {model.downloads}
                  </div>
                </div>

                {/* Complexity Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs border ${getComplexityColor(model.complexity)}`}>
                    {model.complexity}
                  </span>
                </div>

                {/* Software Badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white font-medium">
                    {model.software}
                  </span>
                </div>
              </div>

              {/* Enhanced Content Section */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
                      {model.title}
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {model.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {model.designTime}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{model.description}</p>

                {/* Technical Specifications */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Key Specifications</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(model.specifications).map(([key, value]) => (
                      <div key={key} className="bg-gray-700/30 px-3 py-2 rounded-lg">
                        <div className="text-xs text-gray-400 capitalize">{key}</div>
                        <div className="text-sm font-medium text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-purple-300 mb-2">Design Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {model.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>Preview</span>
                  </motion.button>

                  <motion.a
                    href={model.downloadUrl}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-4 py-3 rounded-lg text-sm transition-all duration-300 border border-gray-600/50 hover:border-gray-500/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>STEP</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Design Philosophy */}
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-purple-500/20 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-500 rotate-45 rounded-lg"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-purple-500 rotate-12 rounded-lg"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-center text-purple-400 mb-8">Design Philosophy & Approach</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <Ruler className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="font-bold text-white mb-4 text-lg">Precision Engineering</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Every dimension, tolerance, and geometric relationship is meticulously calculated using advanced CAD techniques.
                  Our designs prioritize manufacturability while maintaining optimal performance characteristics.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">±0.01mm Tolerance</span>
                  <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">GD&T Compliant</span>
                </div>
              </motion.div>

              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <Cog className="w-8 h-8 text-blue-400" />
                </div>
                <h4 className="font-bold text-white mb-4 text-lg">Functional Excellence</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Form follows function with emphasis on efficiency, reliability, and ease of assembly. Each design undergoes
                  rigorous simulation and validation to ensure real-world performance.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">FEA Validated</span>
                  <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">Motion Studies</span>
                </div>
              </motion.div>

              <motion.div 
                className="text-center group"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/30 transition-colors">
                  <Layers className="w-8 h-8 text-green-400" />
                </div>
                <h4 className="font-bold text-white mb-4 text-lg">Modular Innovation</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Designs are optimized for modularity, scalability, and future modifications. Parametric modeling ensures
                  rapid design iterations and customization for specific applications.
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Parametric</span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">Scalable</span>
                </div>
              </motion.div>
            </div>

            {/* Additional Philosophy Points */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-orange-400" />
                  <h4 className="font-bold text-white">Industry Standards</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  All designs comply with international standards including ISO, ASME, and DIN specifications.
                  Material selection follows industry best practices for durability and performance.
                </p>
              </motion.div>

              <motion.div 
                className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-yellow-400" />
                  <h4 className="font-bold text-white">Sustainable Design</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Environmental considerations are integrated into every design phase, focusing on material efficiency,
                  recyclability, and energy-conscious manufacturing processes.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CADModels;