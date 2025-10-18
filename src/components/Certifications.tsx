import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Certification Data with Logos, Descriptions & Coursera fallback
const certificationsData = {
  "Product Design & CAD": [
    {
      name: "Basics of CATIA V5 Workshop",
      org: "Skill-Lync",
      desc: "Introduction to CATIA V5 interface, 3D modeling, and drafting fundamentals.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "SolidWorks Course for Beginners",
      org: "Udemy",
      desc: "Covered part modeling, assembly creation, and rendering in SolidWorks.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Complete Course in Creo Parametric",
      org: "Udemy",
      desc: "Mastered Creo Parametric design workflows, constraints, and surface modeling.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg",
    },
    {
      name: "Fusion 360: 3D Model Creation & 3-Axis Machining",
      org: "Autodesk",
      desc: "Hands-on training in CAD/CAM and simulation for 3D printing and CNC machining.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Autodesk_logo_2021.svg",
    },
    {
      name: "New Product Design Work in SolidWorks",
      org: "Pumo Technovation",
      desc: "Product design prototyping using SolidWorks and manufacturing analysis.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
  ],

  "Manufacturing & Advanced Processes": [
    {
      name: "Additive Manufacturing",
      org: "University of Michigan",
      desc: "Explored 3D printing processes, design strategies, and performance optimization.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/University_of_Michigan_logo.svg",
    },
    {
      name: "Design for Additive Manufacturing (DFAM)",
      org: "Arizona State University",
      desc: "Learned DFAM principles, topology optimization, and lightweight structures.",
      logo: "https://upload.wikimedia.org/wikipedia/en/d/d7/Arizona_State_University_seal.svg",
    },
    {
      name: "Advanced Manufacturing Process Analysis",
      org: "University at Buffalo",
      desc: "Covered advanced machining, simulation-based manufacturing, and quality control.",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/University_at_Buffalo_logo.svg",
    },
    {
      name: "Intelligent Machining",
      org: "University at Buffalo",
      desc: "Focused on digital machining, process monitoring, and smart manufacturing.",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/University_at_Buffalo_logo.svg",
    },
    {
      name: "Advanced Industrial Automation in Pneumatics & Hydraulics",
      org: "SKCT",
      desc: "Hands-on session covering industrial automation control circuits and sensors.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Digital Manufacturing & Design",
      org: "University at Buffalo",
      desc: "Digital twin integration, smart factory concept, and sustainable manufacturing.",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/University_at_Buffalo_logo.svg",
    },
  ],

  "Energy & Thermal Systems": [
    {
      name: "Basics of Air Conditioning and VRF Technology",
      org: "SKCT",
      desc: "Introduced refrigerant flow mechanisms, heat exchange, and HVAC components.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Wind Energy",
      org: "DTU",
      desc: "Covered wind turbine aerodynamics, design optimization, and energy analysis.",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/9a/Technical_University_of_Denmark_logo.svg",
    },
  ],

  "Engineering Mechanics & Material Science": [
    {
      name: "Material Behavior",
      org: "Georgia Institute of Technology",
      desc: "Studied deformation mechanisms, stress-strain behavior, and fatigue analysis.",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Georgia_Tech_logo.svg",
    },
    {
      name: "Fundamentals of Materials Science",
      org: "Shanghai Jiao Tong University",
      desc: "Focused on material properties, crystallography, and phase diagrams.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Engineering of Structures Series",
      org: "Dartmouth College",
      desc: "Applied static and dynamic analysis for load-bearing structural systems.",
      logo: "https://upload.wikimedia.org/wikipedia/en/e/e2/Dartmouth_College_shield.svg",
    },
    {
      name: "Engineering Systems in Motion: Dynamics",
      org: "Georgia Institute of Technology",
      desc: "Learned principles of kinematics, vibrations, and mechanical motion analysis.",
      logo: "https://upload.wikimedia.org/wikipedia/en/6/6e/Georgia_Tech_logo.svg",
    },
  ],

  "AI, Programming & Digital Technologies": [
    {
      name: "Python for Data Science, AI & Development",
      org: "IBM",
      desc: "Comprehensive Python programming course covering AI and data workflows.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    },
    {
      name: "Generative AI Fundamentals",
      org: "Google",
      desc: "Learned the basics of generative AI, model prompting, and ethical AI use.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "AI for Everyone",
      org: "DeepLearning.AI",
      desc: "Covered AI applications, ethics, and industry adoption insights.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Goldman Sachs Software Engineering Job Simulation",
      org: "Forage",
      desc: "Practical simulation covering code review, debugging, and API development.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
  ],

  "Digital Twin, IoT & Smart Systems": [
    {
      name: "Digital Twins",
      org: "University of Michigan",
      desc: "Explored digital twin architectures and data synchronization frameworks.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/University_of_Michigan_logo.svg",
    },
    {
      name: "Mastering Digital Twins",
      org: "28Digital",
      desc: "Learned model synchronization and industrial applications of digital twins.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Industrial Internet of Things (IIoT)",
      org: "University of Michigan",
      desc: "Studied IIoT frameworks, predictive maintenance, and cloud integration.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/University_of_Michigan_logo.svg",
    },
    {
      name: "MBSE: Model-Based Systems Engineering",
      org: "University at Buffalo",
      desc: "Covered SysML, system modeling, and digital integration strategies.",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a7/University_at_Buffalo_logo.svg",
    },
  ],

  "Innovation, IP & Management": [
    {
      name: "Design Thinking for Innovation",
      org: "SKCT",
      desc: "Learned structured innovation, empathy mapping, and prototype iteration.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Role of Intellectual Property Rights in R&D",
      org: "SKCT",
      desc: "Explored patents, copyrights, and industrial design protection.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Coursera-Logo_600x600.svg",
    },
    {
      name: "Foundations of Project Management",
      org: "Google",
      desc: "Core project planning, risk assessment, and agile methodologies.",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Certifications = () => {
  const [activeCategory, setActiveCategory] = useState("Product Design & CAD");
  const categoryKeys = Object.keys(certificationsData);

  return (
    <section className="p-8 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-400">
        Certifications & Courses
      </h2>

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
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
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
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 20px rgba(168, 85, 247, 0.5)",
              }}
              className="bg-gray-800/80 p-5 rounded-2xl border border-purple-500/20 shadow-md backdrop-blur-md"
            >
              <div className="flex items-center mb-3">
                <img
                  src={cert.logo}
                  alt={`${cert.org} logo`}
                  className="h-8 w-8 mr-3 object-contain rounded-md bg-white p-1"
                />
                <div>
                  <h4 className="font-semibold text-lg text-purple-300">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-gray-400">{cert.org}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">
                {cert.desc}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
