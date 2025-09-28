import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Download,
  Eye,
  Layers,
  Ruler,
  Cog,
  Award,
  Lightbulb,
  Target,
} from "lucide-react";

const CADModels = () => {
  const cadModels = [
    {
      title: "Pair of Spur Gears",
      description:"Precision-engineered spur gear pair with optimized module and pressure angle for smooth torque transmission and minimal vibration under varying loads.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      designTime: "1 hour",
      features: ["Parametric Design", "Gear Ratio Analysis", "Motion Study"],
      image:"/3d Pictures/gear profile.png",
      downloadUrl: "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
      views: 1247,
      downloads: 89,
    },
    {
      title: "Exhaust Manifold",
      description:"Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance. Features smooth flow paths and minimized thermal stresses for durability.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Advanced",
      designTime: "3 hours",
      features: ["Flow Simulation", "Thermal Analysis", "Parametric Design"],
      image:"/3d Pictures/exhaust manifold.png",
      downloadUrl: "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
      views: 500,
      downloads: 25,
    },
    {
      title: "Knuckle Joint",
      description:"Robust knuckle joint designed for heavy load applications, ensuring secure connections while allowing limited angular movement. Suitable for linkages in structural and mechanical systems.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      designTime: "2 hours",
      features: ["Parametric Design", "Stress Analysis", "Motion Study"],
      image:"/3d Pictures/knuckle joint.png",
      downloadUrl: "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
      views: 226,
      downloads: 10,
    },
    {
      title: "Universal Coupling",
      description:"Precision universal coupling enabling torque transmission between shafts at varying angles. Designed to minimize backlash and maintain smooth power delivery in dynamic conditions.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Beginner",
      designTime: "3 hours",
      features: ["Parametric Design", "Motion Study", "Torque Analysis"],
      image:"/3d Pictures/universal coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
      views: 189,
      downloads: 15,
    },
    {
      title: "Muff Coupling",
      description:"Simple and efficient muff coupling designed for rigid torque transmission between co-axial shafts. Features a hollow cylindrical sleeve with key and keyway for secure power transfer.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Basic",
      designTime: "1 hour",
      features: ["Parametric Design", "Torque Analysis", "Stress Check"],
      image:"/3d Pictures/muff coupling.png",
      downloadUrl:"https://drive.google.com/file/d/1swp0ZzEw2iwtmelt6Dzu66cQZQu1cvqz/view?usp=sharing"
      views: 189,
      downloads: 15,
    },

  ];

  const categories = [
    "All",
    "Assembly",
    "Mechanical Parts",
    "Automotive",
    "Industrial",
    "Thermal Systems",
    "Robotics",
    "Aerospace",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);

  const filteredModels =
    activeCategory === "All"
      ? cadModels
      : cadModels.filter((m) => m.category === activeCategory);

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Expert":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Stats
  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
    { label: "Downloads", value: "2.5K+", icon: Download, color: "blue" },
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-center"
      >
        CAD Model{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Showcase
        </span>
      </motion.h2>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700/50"
            >
              <div
                className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <motion.div
                initial={{ count: 0 }}
                animate={{ count: stat.value }}
                transition={{ duration: 2 }}
                className="text-2xl font-bold text-white mb-2"
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all relative ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredModels.map((model, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {model.views}
                </span>
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {model.downloads}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getComplexityColor(
                    model.complexity
                  )}`}
                >
                  {model.complexity}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-purple-600/80 px-3 py-1 rounded-full text-xs text-white">
                  {model.software}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {model.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{model.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {model.features.map((f, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPreviewImage(model.image)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm border border-purple-500/30"
                >
                  <Eye className="w-4 h-4" /> Preview
                </motion.button>
                <motion.a
                  href={model.downloadUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-4 py-3 rounded-lg text-sm border border-gray-600/50"
                >
                  <Download className="w-4 h-4" /> STEP
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewImage(null)}
        >
          <img
            src={previewImage}
            alt="Preview"
            className="max-w-3xl max-h-[80vh] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Design Philosophy */}
      <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-purple-500/20">
        <h3 className="text-3xl font-bold text-center text-purple-400 mb-8">
          Design Philosophy & Approach
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Ruler className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="font-bold text-white mb-4 text-lg">
              Precision Engineering
            </h4>
            <p className="text-gray-300 text-sm">
              Every dimension, tolerance, and geometric relationship is
              meticulously calculated with CAD best practices.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cog className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="font-bold text-white mb-4 text-lg">
              Functional Excellence
            </h4>
            <p className="text-gray-300 text-sm">
              Designs focus on efficiency, reliability, and ease of assembly,
              validated through rigorous simulations.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="font-bold text-white mb-4 text-lg">
              Modular Innovation
            </h4>
            <p className="text-gray-300 text-sm">
              Optimized for modularity, scalability, and rapid design iterations
              via parametric modeling.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-orange-400" />
              <h4 className="font-bold text-white">Industry Standards</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Compliant with ISO, ASME, and DIN standards. Materials chosen for
              durability and proven performance.
            </p>
          </div>
          <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-6 h-6 text-yellow-400" />
              <h4 className="font-bold text-white">Sustainable Design</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Integrated sustainability through material efficiency, recycling,
              and energy-conscious manufacturing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CADModels;
