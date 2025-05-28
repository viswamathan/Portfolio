import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Layers, TrendingUp, X, Cog, Cpu } from 'lucide-react';
import ProjectCard from './ProjectCard';

const SimulationModal = ({ isOpen, onClose, simulations }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-gray-900 p-4 flex justify-between items-center border-b border-gray-800">
          <h3 className="text-xl font-bold text-purple-400">Simulation View</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          {simulations.map((simulation, index) => (
            <div key={index} className="flex justify-center">
              <img
                src={simulation}
                alt={`Simulation ${index + 1}`}
                className="max-w-full rounded-lg border-2 border-purple-500/30"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const projectCategories = {
  mechanical: {
    icon: Cog,
    title: "Mechanical Engineering",
    intro: "Pure mechanical engineering projects focusing on design, analysis, and optimization.",
    projects: [
      {
        title: "Flat Sprocket Analysis",
        description: "Comprehensive structural analysis and optimization of a flat sprocket using advanced FEA techniques.",
        problem: "Traditional sprocket designs showing premature wear and structural weaknesses under high loads.",
        solution: "Implemented optimized geometry and material distribution through FEA-driven design iterations.",
        impact: "40% increase in durability and 25% reduction in material usage while maintaining performance.",
        technologies: ["SolidWorks", "ANSYS", "FEA", "Material Science"],
        image1: "/images/SPROCKET STRESS.jpg",
        image2: "/images/SPROCKET DEFORM.jpg",
        report: "/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf",
        simulations: [
          "/simulations/deform.gif",
          "/simulations/stress.gif"
        ]
      }
    ]
  },
  software: {
    icon: Code,
    title: "Software Engineering",
    intro: "Projects combining programming and automation with engineering principles.",
    projects: [
      {
        title: "Engineering Calculation Automation",
        description: "Python-based automation tool for mechanical engineering calculations and analysis.",
        problem: "Time-consuming manual calculations in engineering design process.",
        solution: "Developed automated calculation tools with Python and engineering libraries.",
        impact: "Reduced calculation time by 75% and improved accuracy by eliminating human error.",
        technologies: ["Python", "NumPy", "SciPy", "Matplotlib"],
        image1: "/calculator-1.jpg",
        image2: "/calculator-2.jpg",
        report: "/reports/automation-report.pdf"
      }
    ]
  },
  hybrid: {
    icon: Cpu,
    title: "Mechatronics & Automation",
    intro: "Projects combining mechanical systems with electronic control and automation.",
    projects: [
      {
        title: "Solar Dryer with PCM",
        description: "Advanced solar dryer incorporating Phase Change Materials (PCM) for enhanced efficiency.",
        problem: "Inconsistent drying performance and energy wastage in traditional solar dryers.",
        solution: "Integrated PCM technology with forced convection and optimized fin design.",
        impact: "60% improvement in drying efficiency and 8-hour extended operation after sunset.",
        technologies: ["MATLAB", "CFD", "Thermal Analysis", "Arduino"],
        image1: "/SOLAR DRYER MODAL.jpeg",
        image2: "/SOLAR DRYER PROTOTYPE.jpeg",
        report: "/reports/Modified Solar Dryer Report.pdf"
      }
    ]
  }
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("mechanical");
  const [modalSimulations, setModalSimulations] = useState<string[] | null>(null);

  const handleViewSimulation = (simulations: string[]) => {
    setModalSimulations(simulations);
  };

  const closeModal = () => {
    setModalSimulations(null);
  };

  return (
    <div className="container mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Featured <span className="text-purple-500">Projects</span>
      </motion.h2>

      {/* Category Navigation */}
      <div className="flex justify-center mb-12 space-x-4">
        {Object.entries(projectCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                activeCategory === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.title}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Category Intro */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-300 mb-12 max-w-3xl mx-auto"
      >
        {projectCategories[activeCategory].intro}
      </motion.p>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {projectCategories[activeCategory].projects.map((project, index) => (
          <ProjectCard
            key={index}
            {...project}
            onViewSimulation={project.simulations ? handleViewSimulation : undefined}
          />
        ))}
      </div>

      <SimulationModal
        isOpen={!!modalSimulations}
        onClose={closeModal}
        simulations={modalSimulations || []}
      />
    </div>
  );
};

export default Projects;