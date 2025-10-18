import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Certification Data (Categorized)
const certificationsData = {
  "Product Design & CAD": [
    { name: "Basics of CATIA V5 Workshop", org: "Skill-Lync" },
    { name: "SolidWorks Course for Beginners", org: "Udemy" },
    { name: "Complete Course in Creo Parametric", org: "Udemy" },
    { name: "Fusion 360: 3D Model Creation & 3-Axis Machining", org: "Autodesk" },
    { name: "New Product Design Work in SolidWorks", org: "Pumo Technovation" },
  ],
  "Manufacturing & Advanced Processes": [
    { name: "Additive Manufacturing", org: "University of Michigan" },
    { name: "Design for Additive Manufacturing (DFAM)", org: "Arizona State University" },
    { name: "Advanced Manufacturing Process Analysis", org: "University at Buffalo" },
    { name: "Intelligent Machining", org: "University at Buffalo" },
    { name: "Advanced Industrial Automation in Pneumatics & Hydraulics", org: "SKCT" },
    { name: "Digital Manufacturing & Design", org: "University at Buffalo" },
  ],
  "Energy & Thermal Systems": [
    { name: "Basics of Air Conditioning and VRF Technology", org: "SKCT" },
    { name: "Wind Energy", org: "DTU" },
  ],
  "Engineering Mechanics & Material Science": [
    { name: "Material Behavior", org: "Georgia Institute of Technology" },
    { name: "Fundamentals of Materials Science", org: "Shanghai Jiao Tong University" },
    { name: "Engineering of Structures Series", org: "Dartmouth College" },
    { name: "Engineering Systems in Motion: Dynamics", org: "Georgia Institute of Technology" },
  ],
  "AI, Programming & Digital Technologies": [
    { name: "Python for Data Science, AI & Development", org: "IBM" },
    { name: "Generative AI Fundamentals", org: "Google" },
    { name: "AI for Everyone", org: "DeepLearning.AI" },
    { name: "Goldman Sachs Software Engineering Job Simulation", org: "Forage" },
  ],
  "Digital Twin, IoT & Smart Systems": [
    { name: "Digital Twins", org: "University of Michigan" },
    { name: "Mastering Digital Twins", org: "28Digital" },
    { name: "Industrial Internet of Things (IIoT)", org: "University of Michigan" },
    { name: "MBSE: Model-Based Systems Engineering", org: "University at Buffalo" },
  ],
  "Innovation, IP & Management": [
    { name: "Design Thinking for Innovation", org: "SKCT" },
    { name: "Role of Intellectual Property Rights in R&D", org: "SKCT" },
    { name: "Foundations of Project Management", org: "Google" },
  ],
};

// Animation variants for cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("Product Design & CAD");
  const categoryKeys = Object.keys(certificationsData);

  return (
    <section className="p-8 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Certifications & Courses</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        {categoryKeys.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition ${
              activeCategory === category ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-200"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {certificationsData[activeCategory].map((cert, index) => (
            <motion.div
              key={cert.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(128, 0, 128, 0.5)" }}
              className="bg-gray-800 p-4 rounded-2xl border border-purple-500/20 shadow-lg"
            >
              <h4 className="font-semibold text-lg mb-2">{cert.name}</h4>
              <p className="text-gray-300">{cert.org}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
