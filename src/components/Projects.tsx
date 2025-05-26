import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Layers, TrendingUp, X } from 'lucide-react';
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
    title: "Next-Gen Mechanical Solutions",
    icon: Rocket,
    intro: "Explore cutting-edge mechanical engineering projects designed to solve real-world challenges with innovation and precision.",
    projects: [
      {
        title: "Flat Sprocket Analysis",
        description: "Comprehensive structural analysis and optimization of a flat sprocket using advanced FEA techniques.",
        problem: "Traditional sprocket designs showing premature wear and structural weaknesses under high loads.",
        solution: "Implemented optimized geometry and material distribution through FEA-driven design iterations.",
        impact: "40% increase in durability and 25% reduction in material usage while maintaining performance.",
        technologies: ["SolidWorks", "ANSYS", "Python", "CAE"],
        image1: "/images/SPROCKET STRESS.jpg",
        image2: "/images/SPROCKET DEFORM.jpg",
        report: "/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf",
        simulations: [
          "/simulations/deform.gif",
          "/simulations/stress.gif"
        ]
      },
      {
        title: "Solar Dryer with PCM",
        description: "Advanced solar dryer incorporating Phase Change Materials (PCM) for enhanced efficiency.",
        problem: "Inconsistent drying performance and energy wastage in traditional solar dryers.",
        solution: "Integrated PCM technology with forced convection and optimized fin design.",
        impact: "60% improvement in drying efficiency and 8-hour extended operation after sunset.",
        technologies: ["MATLAB", "CFD", "Thermal Analysis", "CAD"],
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
    <div className="container mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Featured <span className="text-purple-500">Projects</span>
      </motion.h2>

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