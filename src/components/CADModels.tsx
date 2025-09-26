import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Download,
  Eye,
  Layers,
  Award,
  Ruler,
  Cog,
  Target,
  Lightbulb,
} from "lucide-react";

const CADModels = () => {
  const cadModels = [
    {
      title: "Advanced Gear Transmission System",
      description:
        "High-precision planetary gear system with optimized tooth profiles for maximum power transmission efficiency and minimal backlash.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Advanced",
      designTime: "120 hours",
      features: [
        "Parametric Design",
        "Motion Study",
        "Stress Analysis",
        "Manufacturing Ready",
      ],
      image:
        "https://images.pexels.com/photos/159275/macro-gear-gear-wheel-clockwork-159275.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/gear-system.step",
      views: 1247,
      downloads: 89,
    },
    {
      title: "Automotive Brake Disc Assembly",
      description:
        "Ventilated brake disc with optimized cooling channels, weight reduction features, and integrated ABS sensor mounting.",
      software: "CATIA",
      category: "Automotive",
      complexity: "Intermediate",
      designTime: "85 hours",
      features: [
        "Thermal Analysis",
        "Weight Optimization",
        "Manufacturing DFM",
        "Quality Control",
      ],
      image:
        "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/brake-disc.step",
      views: 892,
      downloads: 67,
    },
    {
      title: "Industrial Valve Control System",
      description:
        "Multi-port industrial control valve with pneumatic actuator, position feedback, and fail-safe mechanisms for critical applications.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Advanced",
      designTime: "150 hours",
      features: [
        "Flow Simulation",
        "Pressure Testing",
        "Actuator Integration",
        "Safety Systems",
      ],
      image:
        "https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800",
      downloadUrl: "/models/valve.step",
      views: 1156,
      downloads: 94,
    },
  ];

  const categories = [
    "All",
    "Mechanical Parts",
    "Automotive",
    "Industrial",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [previewImage, setPreviewImage] = useState(null);

  const filteredModels =
    activeCategory === "All"
      ? cadModels
      : cadModels.filter((model) => model.category === activeCategory);

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

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Category Filter */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold text-center mb-6 text-purple-400">
          Filter by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredModels.map((model) => (
          <motion.div
            key={model.title}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 group shadow-lg"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            {/* Image */}
            <div className="relative overflow-hidden h-64">
              <motion.img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
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
                <span className="bg-purple-600/80 px-3 py-1 rounded-full text-xs text-white font-medium">
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
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-purple-300 mb-2">
                  Design Features
                </h4>
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

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPreviewImage(model.image)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm transition-all duration-300 border border-purple-500/30"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Preview</span>
                </motion.button>

                <motion.a
                  href={model.downloadUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 hover:text-white px-4 py-3 rounded-lg text-sm border border-gray-600/50"
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
      </div>

      {/* Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[80vh] max-w-[90vw] rounded-lg"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
