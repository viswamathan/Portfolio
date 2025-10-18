import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Stable CDN URLs for logos
const logos = {
  coursera: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/coursera/coursera-original.svg",
  udemy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/udemy/udemy-original.svg",
  google: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
  ibm: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ibm/ibm-original.svg",
  autodesk: "https://upload.wikimedia.org/wikipedia/commons/5/56/Autodesk_Logo.png",
  buffalo: "https://seeklogo.com/images/U/university-at-buffalo-logo-BF02E423B7-seeklogo.com.png",
  michigan: "https://upload.wikimedia.org/wikipedia/commons/8/88/Michigan_Wolverines_logo.svg",
  georgiatech: "https://seeklogo.com/images/G/georgia-tech-yellow-jackets-logo-33F7C993D5-seeklogo.com.png",
  asu: "https://upload.wikimedia.org/wikipedia/en/d/d7/Arizona_State_University_seal.svg",
  dartmouth: "https://upload.wikimedia.org/wikipedia/en/e/e2/Dartmouth_College_shield.svg",
  forage: "https://forage-uploads-prod.s3.amazonaws.com/org-logo/forage_logo_square.png",
  dtu: "https://upload.wikimedia.org/wikipedia/en/9/9a/Technical_University_of_Denmark_logo.svg",
};

const certificationsData = {
  "Product Design & CAD": [
    {
      name: "Basics of CATIA V5 Workshop",
      org: "Skill-Lync",
      desc: "Introduction to CATIA V5 interface, 3D modeling, and drafting fundamentals.",
      logo: logos.coursera,
    },
    {
      name: "SolidWorks Course for Beginners",
      org: "Udemy",
      desc: "Covered part modeling, assembly creation, and rendering in SolidWorks.",
      logo: logos.udemy,
    },
    {
      name: "Complete Course in Creo Parametric",
      org: "Udemy",
      desc: "Mastered Creo design workflows, constraints, and surface modeling.",
      logo: logos.udemy,
    },
    {
      name: "Fusion 360: 3D Model Creation & 3-Axis Machining",
      org: "Autodesk",
      desc: "Hands-on training in CAD/CAM and simulation for 3D printing and CNC machining.",
      logo: logos.autodesk,
    },
    {
      name: "New Product Design Work in SolidWorks",
      org: "Pumo Technovation",
      desc: "Product design prototyping using SolidWorks and manufacturing analysis.",
      logo: logos.coursera,
    },
  ],

  "Manufacturing & Advanced Processes": [
    {
      name: "Additive Manufacturing",
      org: "University of Michigan",
      desc: "Explored 3D printing processes, design strategies, and performance optimization.",
      logo: logos.michigan,
    },
    {
      name: "Design for Additive Manufacturing (DFAM)",
      org: "Arizona State University",
      desc: "Learned DFAM principles, topology optimization, and lightweight structures.",
      logo: logos.asu,
    },
    {
      name: "Advanced Manufacturing Process Analysis",
      org: "University at Buffalo",
      desc: "Covered advanced machining, simulation-based manufacturing, and quality control.",
      logo: logos.buffalo,
    },
    {
      name: "Intelligent Machining",
      org: "University at Buffalo",
      desc: "Focused on digital machining, process monitoring, and smart manufacturing.",
      logo: logos.buffalo,
    },
    {
      name: "Advanced Industrial Automation in Pneumatics & Hydraulics",
      org: "SKCT",
      desc: "Hands-on session covering automation control circuits and sensors.",
      logo: logos.coursera,
    },
    {
      name: "Digital Manufacturing & Design",
      org: "University at Buffalo",
      desc: "Digital twin integration, smart factory concept, and sustainable manufacturing.",
      logo: logos.buffalo,
    },
  ],

  "Energy & Thermal Systems": [
    {
      name: "Basics of Air Conditioning and VRF Technology",
      org: "SKCT",
      desc: "Introduced refrigerant flow mechanisms, heat exchange, and HVAC components.",
      logo: logos.coursera,
    },
    {
      name: "Wind Energy",
      org: "DTU",
      desc: "Covered wind turbine aerodynamics, design optimization, and energy analysis.",
      logo: logos.dtu,
    },
  ],

  "Engineering Mechanics & Material Science": [
    {
      name: "Material Behavior",
      org: "Georgia Institute of Technology",
      desc: "Studied deformation mechanisms, stress-strain behavior, and fatigue analysis.",
      logo: logos.georgiatech,
    },
    {
      name: "Fundamentals of Materials Science",
      org: "Shanghai Jiao Tong University",
      desc: "Focused on material properties, crystallography, and phase diagrams.",
      logo: logos.coursera,
    },
    {
      name: "Engineering of Structures Series",
      org: "Dartmouth College",
      desc: "Applied static and dynamic analysis for load-bearing structural systems.",
      logo: logos.dartmouth,
    },
    {
      name: "Engineering Systems in Motion: Dynamics",
      org: "Georgia Institute of Technology",
      desc: "Learned principles of kinematics, vibrations, and mechanical motion analysis.",
      logo: logos.georgiatech,
    },
  ],

  "AI, Programming & Digital Technologies": [
    {
      name: "Python for Data Science, AI & Development",
      org: "IBM",
      desc: "Comprehensive Python programming course covering AI and data workflows.",
      logo: logos.ibm,
    },
    {
      name: "Generative AI Fundamentals",
      org: "Google",
      desc: "Learned the basics of generative AI, model prompting, and ethical AI use.",
      logo: logos.google,
    },
    {
      name: "AI for Everyone",
      org: "DeepLearning.AI",
      desc: "Covered AI applications, ethics, and industry adoption insights.",
      logo: logos.coursera,
    },
    {
      name: "Goldman Sachs Software Engineering Job Simulation",
      org: "Forage",
      desc: "Practical simulation covering code review, debugging, and API development.",
      logo: logos.forage,
    },
  ],

  "Digital Twin, IoT & Smart Systems": [
    {
      name: "Digital Twins",
      org: "University of Michigan",
      desc: "Explored digital twin architectures and data synchronization frameworks.",
      logo: logos.michigan,
    },
    {
      name: "Mastering Digital Twins",
      org: "28Digital",
      desc: "Learned model synchronization and industrial applications of digital twins.",
      logo: logos.coursera,
    },
    {
      name: "Industrial Internet of Things (IIoT)",
      org: "University of Michigan",
      desc: "Studied IIoT frameworks, predictive maintenance, and cloud integration.",
      logo: logos.michigan,
    },
    {
      name: "MBSE: Model-Based Systems Engineering",
      org: "University at Buffalo",
      desc: "Covered SysML, system modeling, and digital integration strategies.",
      logo: logos.buffalo,
    },
  ],

  "Innovation, IP & Management": [
    {
      name: "Design Thinking for Innovation",
      org: "SKCT",
      desc: "Learned structured innovation, empathy mapping, and prototype iteration.",
      logo: logos.coursera,
    },
    {
      name: "Role of Intellectual Property Rights in R&D",
      org: "SKCT",
      desc: "Explored patents, copyrights, and industrial design protection.",
      logo: logos.coursera,
    },
    {
      name: "Foundations of Project Management",
      org: "Google",
      desc: "Core project planning, risk assessment, and agile methodologies.",
      logo: logos.google,
    },
  ],
};

// Animation
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
                  className="h-8 w-8 mr-3 object-contain bg-white rounded-md p-1"
                />
                <div>
                  <h4 className="font-semibold text-lg text-purple-300">{cert.name}</h4>
                  <p className="text-sm text-gray-400">{cert.org}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-2 leading-relaxed">{cert.desc}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Certifications;
