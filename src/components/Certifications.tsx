import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Award, Layers } from "lucide-react";

// Certification Data (with Descriptions)
const certificationsData = {
  "Product Design & CAD": [
    {
      name: "Basics of CATIA V5 Workshop",
      org: "Skill-Lync",
      desc: "Introduced 3D parametric modeling and assembly design using CATIA V5 tools."
    },
    {
      name: "SolidWorks Course for Beginners",
      org: "Udemy",
      desc: "Learned solid modeling, drafting, and simulation basics with real-time projects."
    },
    {
      name: "Complete Course in Creo Parametric",
      org: "Udemy",
      desc: "Covered part design, surface modeling, and product assembly workflows in Creo."
    },
    {
      name: "Fusion 360: 3D Model Creation & 3-Axis Machining",
      org: "Autodesk",
      desc: "Explored CAD-CAM integration and toolpath generation for 3-axis CNC machining."
    },
    {
      name: "New Product Design Work in SolidWorks",
      org: "Pumo Technovation",
      desc: "Hands-on training in designing innovative components using SolidWorks."
    },
  ],

  "Manufacturing & Advanced Processes": [
    {
      name: "Additive Manufacturing",
      org: "University of Michigan",
      desc: "Studied 3D printing technologies and materials for digital manufacturing."
    },
    {
      name: "Design for Additive Manufacturing (DFAM)",
      org: "Arizona State University",
      desc: "Focused on lightweight structures and topology optimization for AM."
    },
    {
      name: "Advanced Manufacturing Process Analysis",
      org: "University at Buffalo",
      desc: "Explored precision manufacturing and process control strategies."
    },
    {
      name: "Intelligent Machining",
      org: "University at Buffalo",
      desc: "Learned smart manufacturing principles integrating sensors and data analytics."
    },
    {
      name: "Advanced Industrial Automation in Pneumatics & Hydraulics",
      org: "SKCT",
      desc: "Trained on automation systems, control circuits, and industrial applications."
    },
    {
      name: "Digital Manufacturing & Design",
      org: "University at Buffalo",
      desc: "Studied integration of digital twins and cyber-physical systems in production."
    },
  ],

  "Energy & Thermal Systems": [
    {
      name: "Basics of Air Conditioning and VRF Technology",
      org: "SKCT",
      desc: "Introduced cooling cycle fundamentals and design principles of VRF systems."
    },
    {
      name: "Wind Energy",
      org: "DTU",
      desc: "Explored aerodynamics and energy conversion mechanisms in wind turbines."
    },
  ],

  "Engineering Mechanics & Material Science": [
    {
      name: "Material Behavior",
      org: "Georgia Institute of Technology",
      desc: "Learned mechanical properties, deformation, and fatigue of materials."
    },
    {
      name: "Fundamentals of Materials Science",
      org: "Shanghai Jiao Tong University",
      desc: "Covered material structures, diffusion, and phase transformation fundamentals."
    },
    {
      name: "Engineering of Structures Series",
      org: "Dartmouth College",
      desc: "Explored static and dynamic analysis principles for load-bearing systems."
    },
    {
      name: "Engineering Systems in Motion: Dynamics",
      org: "Georgia Institute of Technology",
      desc: "Focused on dynamic systems, motion equations, and vibration modeling."
    },
  ],

  "AI, Programming & Digital Technologies": [
    {
      name: "Python for Data Science, AI & Development",
      org: "IBM",
      desc: "Learned Python libraries for AI, data visualization, and ML applications."
    },
    {
      name: "Generative AI Fundamentals",
      org: "Google",
      desc: "Explored foundation models, transformers, and prompt engineering basics."
    },
    {
      name: "AI for Everyone",
      org: "DeepLearning.AI",
      desc: "Understood AI concepts, workflow, and strategic impact on industries."
    },
    {
      name: "Goldman Sachs Software Engineering Job Simulation",
      org: "Forage",
      desc: "Completed simulation tasks replicating real-world software engineering roles."
    },
  ],

  "Digital Twin, IoT & Smart Systems": [
    {
      name: "Digital Twins",
      org: "University of Michigan",
      desc: "Studied twin modeling, synchronization, and data-driven design validation."
    },
    {
      name: "Mastering Digital Twins",
      org: "28Digital",
      desc: "Learned full lifecycle management of digital twin frameworks for industries."
    },
    {
      name: "Industrial Internet of Things (IIoT)",
      org: "University of Michigan",
      desc: "Explored IIoT architecture, sensors, and connectivity for smart factories."
    },
    {
      name: "MBSE: Model-Based Systems Engineering",
      org: "University at Buffalo",
      desc: "Focused on SysML, system architecture modeling, and digital thread integration."
    },
  ],

  "Innovation, IP & Management": [
    {
      name: "Design Thinking for Innovation",
      org: "SKCT",
      desc: "Learned creative problem-solving methods for user-centered design."
    },
    {
      name: "Role of Intellectual Property Rights in R&D",
      org: "SKCT",
      desc: "Explored IP protection, patents, and innovation management concepts."
    },
    {
      name: "Foundations of Project Management",
      org: "Google",
      desc: "Covered project planning, execution, and stakeholder management techniques."
    },
  ],
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -25 },
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("Product Design & CAD");
  const [searchTerm, setSearchTerm] = useState("");
  const categoryKeys = Object.keys(certificationsData);

  const filteredCertifications = certificationsData[activeCategory].filter((cert) =>
    cert.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="p-8 bg-gradient-to-br from-gray-900 via-purple-900/30 to-black min-h-screen text-white relative overflow-hidden">
      <motion.h2
        className="text-4xl font-extrabold text-center mb-8 tracking-wide"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
          Certifications & Courses
        </span>
      </motion.h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search certification..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800/60 rounded-lg border border-purple-500/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categoryKeys.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 backdrop-blur-md border 
            ${
              activeCategory === category
                ? "bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/40"
                : "bg-gray-800/50 text-gray-300 border-gray-600 hover:border-purple-400"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Progress Bar */}
      <motion.div
        className="h-2 w-64 mx-auto rounded-full bg-gray-700 mb-10 overflow-hidden"
        initial={{ width: 0 }}
        animate={{ width: "16rem" }}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>

      {/* Certification Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        <AnimatePresence mode="wait">
          {filteredCertifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{
                scale: 1.06,
                rotateY: 5,
                boxShadow: "0px 10px 30px rgba(128,0,255,0.4)",
              }}
              className="p-5 rounded-2xl border border-purple-500/20 bg-white/10 backdrop-blur-md hover:border-purple-400 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <Award className="text-purple-400" size={22} />
                <h4 className="text-lg font-semibold">{cert.name}</h4>
              </div>
              <p className="text-gray-300 text-sm mb-3">{cert.desc}</p>
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 text-sm bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300">
                  {cert.org}
                </span>
                <Layers className="text-gray-400" size={18} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Subtle Background Glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
    </section>
  );
};

export default Certifications;
