import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Certificate Logos (Official / Public URLs)
const logos = {
  "Coursera": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Coursera_logo.svg",
  "Udemy": "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
  "IBM": "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
  "Google": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "Autodesk": "https://upload.wikimedia.org/wikipedia/commons/d/dc/Autodesk_logo_2021.svg",
  "University of Michigan": "https://upload.wikimedia.org/wikipedia/commons/8/8a/Michigan_Wolverines_logo.svg",
  "University at Buffalo": "https://upload.wikimedia.org/wikipedia/en/f/f3/University_at_Buffalo_seal.svg",
  "Arizona State University": "https://upload.wikimedia.org/wikipedia/en/3/3f/Arizona_State_University_seal.svg",
  "Georgia Institute of Technology": "https://upload.wikimedia.org/wikipedia/en/8/8e/Georgia_Tech_Yellow_Jackets_logo.svg",
  "Shanghai Jiao Tong University": "https://upload.wikimedia.org/wikipedia/en/0/0e/Shanghai_Jiao_Tong_University_logo.svg",
  "Dartmouth College": "https://upload.wikimedia.org/wikipedia/en/b/b4/Dartmouth_College_shield.svg",
  "DeepLearning.AI": "https://upload.wikimedia.org/wikipedia/commons/5/51/DeepLearning.AI_logo.svg",
  "Forage": "https://upload.wikimedia.org/wikipedia/commons/3/37/The_Forage_logo.svg",
  "SKCT": "https://upload.wikimedia.org/wikipedia/en/0/0d/Sri_Krishna_College_of_Technology_logo.png",
  "28Digital": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Coursera_logo.svg",
  "Pumo Technovation": "https://upload.wikimedia.org/wikipedia/commons/7/7f/Coursera_logo.svg",
};

// Certifications with Descriptions
const certificationsData = {
  "Product Design & CAD": [
    { name: "Basics of CATIA V5 Workshop", org: "Skill-Lync", desc: "Introduced 3D modeling fundamentals and surface design using CATIA V5." },
    { name: "SolidWorks Course for Beginners", org: "Udemy", desc: "Learned sketching, feature-based modeling, and assembly design in SolidWorks." },
    { name: "Complete Course in Creo Parametric", org: "Udemy", desc: "Mastered parametric design and product modeling using Creo tools." },
    { name: "Fusion 360: 3D Model Creation & 3-Axis Machining", org: "Autodesk", desc: "Covered CAM operations and 3D part modeling in Fusion 360." },
    { name: "New Product Design Work in SolidWorks", org: "Pumo Technovation", desc: "Focused on new concept design and industrial drawing preparation." },
  ],
  "Manufacturing & Advanced Processes": [
    { name: "Additive Manufacturing", org: "University of Michigan", desc: "Explored 3D printing processes and material behavior in AM." },
    { name: "Design for Additive Manufacturing (DFAM)", org: "Arizona State University", desc: "Learned design principles specific to additive manufacturing." },
    { name: "Advanced Manufacturing Process Analysis", org: "University at Buffalo", desc: "Studied advanced machining and manufacturing analytics." },
    { name: "Intelligent Machining", org: "University at Buffalo", desc: "Covered adaptive and sensor-integrated manufacturing systems." },
    { name: "Advanced Industrial Automation in Pneumatics & Hydraulics", org: "SKCT", desc: "Hands-on learning of industrial control systems and automation." },
    { name: "Digital Manufacturing & Design", org: "University at Buffalo", desc: "Integrated manufacturing systems with digital simulation tools." },
  ],
  "Energy & Thermal Systems": [
    { name: "Basics of Air Conditioning and VRF Technology", org: "SKCT", desc: "Learned about HVAC system fundamentals and VRF mechanisms." },
    { name: "Wind Energy", org: "DTU", desc: "Explored aerodynamics, turbine design, and energy harvesting systems." },
  ],
  "Engineering Mechanics & Material Science": [
    { name: "Material Behavior", org: "Georgia Institute of Technology", desc: "Analyzed deformation, stress-strain, and mechanical failure behavior." },
    { name: "Fundamentals of Materials Science", org: "Shanghai Jiao Tong University", desc: "Studied atomic structures and thermomechanical properties." },
    { name: "Engineering of Structures Series", org: "Dartmouth College", desc: "Focused on static and dynamic analysis of mechanical structures." },
    { name: "Engineering Systems in Motion: Dynamics", org: "Georgia Institute of Technology", desc: "Applied Newtonian dynamics to real-world mechanical systems." },
  ],
  "AI, Programming & Digital Technologies": [
    { name: "Python for Data Science, AI & Development", org: "IBM", desc: "Learned Python, data visualization, and AI model development." },
    { name: "Generative AI Fundamentals", org: "Google", desc: "Explored generative models and prompt engineering concepts." },
    { name: "AI for Everyone", org: "DeepLearning.AI", desc: "Non-technical overview of AI use-cases and ethical implications." },
    { name: "Goldman Sachs Software Engineering Job Simulation", org: "Forage", desc: "Developed problem-solving skills via real-world project simulations." },
  ],
  "Digital Twin, IoT & Smart Systems": [
    { name: "Digital Twins", org: "University of Michigan", desc: "Learned to model physical systems with real-time digital counterparts." },
    { name: "Mastering Digital Twins", org: "28Digital", desc: "Explored architecture, modeling, and data integration for digital twins." },
    { name: "Industrial Internet of Things (IIoT)", org: "University of Michigan", desc: "Introduced IIoT networks and cloud-based control systems." },
    { name: "MBSE: Model-Based Systems Engineering", org: "University at Buffalo", desc: "Learned system modeling using SysML and simulation integration." },
  ],
  "Innovation, IP & Management": [
    { name: "Design Thinking for Innovation", org: "SKCT", desc: "Studied creative problem-solving and ideation methodologies." },
    { name: "Role of Intellectual Property Rights in R&D", org: "SKCT", desc: "Explored patent filing and IP protection in research." },
    { name: "Foundations of Project Management", org: "Google", desc: "Learned professional project planning and Agile methodologies." },
  ],
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
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">📜 Certifications & Courses</h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center mb-8 gap-4">
        {categoryKeys.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              activeCategory === category
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
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
          {certificationsData[activeCategory].map((cert, index) => {
            const logoSrc = logos[cert.org] || logos["Coursera"];
            return (
              <motion.div
                key={cert.name}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/70 backdrop-blur-lg border border-purple-500/20 p-5 rounded-2xl shadow-lg hover:shadow-purple-500/30 transition-all"
              >
                <div className="flex items-center mb-3">
                  <img src={logoSrc} alt={cert.org} className="w-10 h-10 mr-3 rounded-lg bg-white p-1 object-contain" />
                  <div>
                    <h4 className="font-semibold text-lg">{cert.name}</h4>
                    <p className="text-sm text-gray-400">{cert.org}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{cert.desc}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
