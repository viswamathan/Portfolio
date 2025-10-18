import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Certifications with descriptions and levels
const certificationsData = {
  "Product Design & CAD": [
    { name: "Basics of CATIA V5 Workshop", level: "Beginner", desc: "Introduction to CATIA V5 interface, 3D modeling, and drafting fundamentals." },
    { name: "SolidWorks Course for Beginners", level: "Beginner", desc: "Covered part modeling, assembly creation, and rendering in SolidWorks." },
    { name: "Complete Course in Creo Parametric", level: "Intermediate", desc: "Mastered Creo design workflows, constraints, and surface modeling." },
    { name: "Fusion 360: 3D Model Creation & 3-Axis Machining", level: "Intermediate", desc: "Hands-on training in CAD/CAM and simulation for 3D printing and CNC machining." },
    { name: "New Product Design Work in SolidWorks", level: "Advanced", desc: "Product design prototyping using SolidWorks and manufacturing analysis." },
  ],
  "Manufacturing & Advanced Processes": [
    { name: "Additive Manufacturing", level: "Intermediate", desc: "Explored 3D printing processes, design strategies, and performance optimization." },
    { name: "Design for Additive Manufacturing (DFAM)", level: "Intermediate", desc: "Learned DFAM principles, topology optimization, and lightweight structures." },
    { name: "Advanced Manufacturing Process Analysis", level: "Advanced", desc: "Covered advanced machining, simulation-based manufacturing, and quality control." },
    { name: "Intelligent Machining", level: "Advanced", desc: "Focused on digital machining, process monitoring, and smart manufacturing." },
    { name: "Advanced Industrial Automation in Pneumatics & Hydraulics", level: "Intermediate", desc: "Hands-on session covering automation control circuits and sensors." },
    { name: "Digital Manufacturing & Design", level: "Advanced", desc: "Digital twin integration, smart factory concept, and sustainable manufacturing." },
  ],
  "Energy & Thermal Systems": [
    { name: "Basics of Air Conditioning and VRF Technology", level: "Beginner", desc: "Introduced refrigerant flow mechanisms, heat exchange, and HVAC components." },
    { name: "Wind Energy", level: "Intermediate", desc: "Covered wind turbine aerodynamics, design optimization, and energy analysis." },
  ],
  "Engineering Mechanics & Material Science": [
    { name: "Material Behavior", level: "Intermediate", desc: "Studied deformation mechanisms, stress-strain behavior, and fatigue analysis." },
    { name: "Fundamentals of Materials Science", level: "Beginner", desc: "Focused on material properties, crystallography, and phase diagrams." },
    { name: "Engineering of Structures Series", level: "Advanced", desc: "Applied static and dynamic analysis for load-bearing structural systems." },
    { name: "Engineering Systems in Motion: Dynamics", level: "Intermediate", desc: "Learned principles of kinematics, vibrations, and mechanical motion analysis." },
  ],
  "AI, Programming & Digital Technologies": [
    { name: "Python for Data Science, AI & Development", level: "Intermediate", desc: "Comprehensive Python programming course covering AI and data workflows." },
    { name: "Generative AI Fundamentals", level: "Beginner", desc: "Learned the basics of generative AI, model prompting, and ethical AI use." },
    { name: "AI for Everyone", level: "Beginner", desc: "Covered AI applications, ethics, and industry adoption insights." },
    { name: "Goldman Sachs Software Engineering Job Simulation", level: "Advanced", desc: "Practical simulation covering code review, debugging, and API development." },
  ],
  "Digital Twin, IoT & Smart Systems": [
    { name: "Digital Twins", level: "Intermediate", desc: "Explored digital twin architectures and data synchronization frameworks." },
    { name: "Mastering Digital Twins", level: "Advanced", desc: "Learned model synchronization and industrial applications of digital twins." },
    { name: "Industrial Internet of Things (IIoT)", level: "Intermediate", desc: "Studied IIoT frameworks, predictive maintenance, and cloud integration." },
    { name: "MBSE: Model-Based Systems Engineering", level: "Advanced", desc: "Covered SysML, system modeling, and digital integration strategies." },
  ],
  "Innovation, IP & Management": [
    { name: "Design Thinking for Innovation", level: "Beginner", desc: "Learned structured innovation, empathy mapping, and prototype iteration." },
    { name: "Role of Intellectual Property Rights in R&D", level: "Intermediate", desc: "Explored patents, copyrights, and industrial design protection." },
    { name: "Foundations of Project Management", level: "Intermediate", desc: "Core project planning, risk assessment, and agile methodologies." },
  ],
};

// Color mapping for levels
const levelColors = {
  Beginner: "bg-green-400",
  Intermediate: "bg-yellow-400",
  Advanced: "bg-purple-500",
};

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("Product Design & CAD");
  const categoryKeys = Object.keys(certificationsData);

  return (
    <section className="p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">📜 Certifications & Courses</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center mb-10 gap-4">
        {categoryKeys.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
              activeCategory === category
                ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
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
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 25px rgba(168, 85, 247, 0.5)" }}
              className="bg-gray-800/70 backdrop-blur-md border border-purple-500/20 p-5 rounded-2xl shadow-md transition-all"
            >
              {/* Badge for level */}
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold mb-2 ${levelColors[cert.level]}`}>
                {cert.level}
              </div>

              <h4 className="font-semibold text-lg text-purple-300 mb-2">{cert.name}</h4>
              <p className="text-gray-300 text-sm mb-3">{cert.desc}</p>

              {/* Progress bar style intensity indicator */}
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${levelColors[cert.level]}`}
                  style={{ width: cert.level === "Beginner" ? "33%" : cert.level === "Intermediate" ? "66%" : "100%" }}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
