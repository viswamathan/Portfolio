import React, { useState } from "react";
import { Rocket, Code, Layers, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const SimulationModal = ({ isOpen, onClose, simulations }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-full w-full h-full overflow-auto">
        <button
          onClick={onClose}
          className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-colors mb-4"
        >
          Close
        </button>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {simulations.map((simulation, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={simulation}
                alt={`Simulation ${index + 1}`}
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const projectCategories = {
  mechanical: {
    title: "Next-Gen Mechanical Solutions",
    icon: Rocket,
    intro: "Explore cutting-edge mechanical engineering projects designed to solve real-world challenges with innovation and precision.",
    projects: [
      {
        title: "Flat Sprocket Analysis",
        description: "Analyzing and optimizing the structural integrity of a flat sprocket using Finite Element Analysis.",
        problem: "Weak structural design.",
        solution: "Optimized sprocket geometry.",
        impact: "Improved durability.",
        image1: "/images/SPROCKET STRESS.jpg",
        image2: "/images/SPROCKET DEFORM.jpg",
        report: "/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf",
        technologies: ["SolidWorks", "ANSYS", "Python"],
        simulations: [
          "/simulations/deform.gif",
          "/simulations/stress.gif",
        ],
      },
      {
        title: "Solar Dryer with PCM",
        description: "A solar dryer using concave fins, forced convection, and PCM to enhance drying efficiency.",
        problem: "Inefficient drying process.",
        solution: "Integrated PCM technology.",
        impact: "Enhanced drying efficiency.",
        image1: "/SOLAR DRYER MODAL.jpeg",
        image2: "/SOLAR DRYER PROTOTYPE.jpeg",
        report: "/reports/Modified Solar Dryer Report.pdf",
        technologies: ["MATLAB", "CFD", "Thermal Analysis Tools"]
      },
    ]
  },
  cs: {
    title: "AI & Software Innovations",
    icon: Code,
    intro: "Discover groundbreaking AI and software projects that leverage technology to create smarter solutions.",
    projects: [
      {
        title: "AI Chatbot",
        description: "A conversational AI built using NLP and machine learning models.",
        problem: "Limited user interaction.",
        solution: "AI-driven chatbot.",
        impact: "Improved user engagement.",
        image1: "/images/cs1-1.jpg",
        image2: "/images/cs1-2.jpg",
        report: "/reports/cs1.pdf",
        technologies: ["Python", "TensorFlow", "React", "Node.js"]
      },
      {
        title: "Smart Attendance",
        description: "Facial recognition-based attendance system with backend analytics.",
        problem: "Manual attendance errors.",
        solution: "Automated facial recognition.",
        impact: "Accurate attendance tracking.",
        image1: "/images/cs2-1.jpg",
        image2: "/images/cs2-2.jpg",
        report: "/reports/cs2.pdf",
        technologies: ["OpenCV", "Python", "Flask", "SQLite"]
      },
    ]
  },
  interdisciplinary: {
    title: "Smart Tech Synergies",
    icon: Layers,
    intro: "Dive into interdisciplinary projects that blend mechanical, software, and IoT technologies for impactful solutions.",
    projects: [
      {
        title: "IoT Predictive Maintenance",
        description: "Predictive diagnostics for mechanical systems using sensor data and machine learning.",
        problem: "Unexpected equipment failures.",
        solution: "IoT-based monitoring.",
        impact: "Reduced downtime.",
        image1: "/images/inter1-1.jpg",
        image2: "/images/inter1-2.jpg",
        report: "/reports/inter1.pdf",
        technologies: ["IoT Sensors", "Python", "Machine Learning", "AWS"]
      },
      {
        title: "Smart Energy System",
        description: "Embedded system integrating sensors and cloud-based monitoring.",
        problem: "Energy inefficiency.",
        solution: "Smart energy monitoring.",
        impact: "Optimized energy usage.",
        image1: "/images/inter2-1.jpg",
        image2: "/images/inter2-2.jpg",
        report: "/reports/inter2.pdf",
        technologies: ["IoT Sensors", "Cloud Computing", "React", "Node.js"]
      },
    ]
  }
};

const Section = ({ title, icon: Icon, projects, intro }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentSimulations, setCurrentSimulations] = useState([]);

  const openModal = (simulations) => {
    setCurrentSimulations(simulations);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentSimulations([]);
  };

  return (
    <div className="mb-16 bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="text-purple-500 w-6 h-6" />
        <h3 className="text-4xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-lg mb-6 text-gray-300">{intro}</p>
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300 border-2 border-transparent hover:border-purple-500"
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Left Side: Project Details */}
              <div className="flex-1 space-y-4">
                <h4 className="text-2xl font-semibold text-purple-400 mb-2">
                  {project.title}
                </h4>
                <p className="text-gray-300 text-sm">{project.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
                  <li>
                    <strong>Problem:</strong> {project.problem}
                  </li>
                  <li>
                    <strong>Solution:</strong> {project.solution}
                  </li>
                  <li>
                    <strong>Impact:</strong> {project.impact}
                  </li>
                  <li>
                    <strong>Technologies Used:</strong> {project.technologies.join(', ')}
                  </li>
                </ul>
                <div className="mt-4 flex gap-4">
                  <a
                    href={project.report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                  >
                    View Report
                  </a>
                  {project.simulations && (
                    <button
                      onClick={() => openModal(project.simulations)}
                      className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                    >
                      View Simulation
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side: Project Images */}
              <div className="flex-1 grid grid-rows-2 gap-2">
                <img
                  src={project.image1}
                  alt={`${project.title} Image 1`}
                  className="w-full h-40 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
                <img
                  src={project.image2}
                  alt={`${project.title} Image 2`}
                  className="w-full h-40 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <SimulationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        simulations={currentSimulations}
      />
    </div>
  );
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const renderSection = () => {
    if (activeCategory === "all") {
      const allProjects = [
        ...projectCategories.mechanical.projects,
        ...projectCategories.cs.projects,
        ...projectCategories.interdisciplinary.projects,
      ];
      return (
        <Section
          title="Trending Projects"
          icon={TrendingUp}
          projects={allProjects}
          intro="Browse through all our projects across various domains. Each category showcases unique innovations and solutions."
        />
      );
    }
    const category = projectCategories[activeCategory];
    return (
      <Section
        title={category.title}
        icon={category.icon}
        projects={category.projects}
        intro={category.intro}
      />
    );
  };

  return (
    <section className="py-16 px-4 bg-gray-900 text-white" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <TrendingUp className="text-purple-500 w-8 h-8" />
          Explore Our <span className="text-purple-500">Projects</span>
        </h2>
        <div className="flex justify-center mb-8">
          {["all", ...Object.keys(projectCategories)].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mx-2 rounded ${
                activeCategory === category ? "bg-purple-600" : "bg-gray-700"
              } hover:bg-purple-500 transition-colors`}
              onClick={() => setActiveCategory(category)}
            >
              {category === "all" ? "Trending" : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        {renderSection()}
      </div>
    </section>
  );
}
