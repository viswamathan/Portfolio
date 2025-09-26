import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, Layers, TrendingUp, X, Cog, Cpu, Github, Eye } from 'lucide-react';
import ProjectCard from './ProjectCard';

// Simulation Modal
const SimulationModal = ({ isOpen, onClose, simulations }: { isOpen: boolean; onClose: () => void; simulations: string[] }) => {
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
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
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

// Image Lightbox Modal
const ImageModal = ({ isOpen, onClose, image }: { isOpen: boolean; onClose: () => void; image: string }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
    >
      <div className="relative max-w-4xl w-full max-h-[90vh]">
        <button onClick={onClose} className="absolute top-2 right-2 p-2 hover:bg-gray-800 rounded-full z-50">
          <X className="w-6 h-6 text-white" />
        </button>
        <img src={image} alt="Project View" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
      </div>
    </motion.div>
  );
};

// Project Categories
const projectCategories = {
  mechanical: {
    icon: Cog,
    title: 'Optimization and Innovation',
    intro: 'Advanced Mechanical engineering projects showcasing design optimization, structural analysis, and innovative solutions.',
    projects: [
      {
        title: 'Flat Sprocket Analysis',
        description: 'Comprehensive structural analysis and optimization of a flat sprocket using advanced FEA techniques.',
        problem: 'Traditional sprocket designs showing premature wear and structural weaknesses under high loads.',
        solution: 'Implemented optimized geometry and material distribution through FEA-driven design iterations.',
        impact: '40% increase in durability and 25% reduction in material usage while maintaining performance.',
        technologies: ['SolidWorks', 'ANSYS', 'FEA', 'Material Science'],
        image1: '/images/SPROCKET STRESS.jpg',
        image2: '/images/SPROCKET DEFORM.jpg',
        report: '/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf',
        simulations: ['/simulations/deform.gif', '/simulations/stress.gif'],
      },
      {
        title: 'Piston Head Optimization Through Thermal and Structural FEA',
        description: 'Simulated piston head in ANSYS to identify thermal and stress hotspots, enabling durability and material optimization.',
        problem: 'Piston head faces extreme heat and pressure, causing thermal fatigue and structural deformation.',
        solution: 'Conducted integrated thermal and structural FEA to analyze temperature distribution, stress zones, and deformation.',
        impact: 'Achieved up to 40% increase in durability and 25% reduction in material usage through design optimization.',
        technologies: ['ANSYS', 'SolidWorks', 'FEA', 'Thermal Analysis'],
        image1: '/images/PISTON 1.png',
        image2: '/images/PISTON 2.png',
        report: '/reports/Thermo-Structural Analysis of Piston Head Using ANSYS Mechanical.pdf',
        simulations: ['/simulations/head deform.gif', '/simulations/head stress.gif', '/simulations/head temparature.gif'],
      },
    ],
  },
  software: {
    icon: Code,
    title: 'Software',
    intro: 'Innovative software solutions bridging modern technology.',
    projects: [
      {
        title: 'Petrol Management Project',
        description:
          'Designed to track fuel stock, sales, and transactions efficiently, enabling real-time monitoring and report generation for petrol stations.',
        technologies: ['Python', 'MySql', 'OS', 'Matplotlib'],
        githubUrl: 'https://github.com/viswamathan/PETROL-MANAGEMENT-PROJECT-USING-PYTHON-AND-SQL',
        image1: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
        image2: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpg?auto=compress&cs=tinysrgb&w=800',
        report: '/reports/automation-report.pdf',
      },
    ],
  },
  hybrid: {
    icon: Cpu,
    title: 'Automation',
    intro: 'Advanced Systems combining mechanical design with smart control systems.',
    projects: [
      {
        title: 'Automated Conveyor Sorting System',
        description: 'A smart conveyor system integrating mechanical design with sensors and Arduino control for automated item sorting.',
        problem: 'Manual sorting of items in production lines is slow and prone to errors.',
        solution: 'Implemented a conveyor system with proximity sensors, actuators, and Arduino-based logic to automatically sort items based on size and color.',
        impact: 'Reduced manual labor by 50% and improved sorting accuracy to 98%.',
        technologies: ['SolidWorks', 'Arduino', 'Sensors', 'PLC', 'Automation'],
        image1: '/images/conveyor1.jpg',
        image2: '/images/conveyor2.jpg',
        report: '/reports/Automated-Conveyor-Sorting-System.pdf',
        simulations: ['/simulations/conveyor_motion.gif', '/simulations/conveyor_sensor.gif'],
      },
    ],
  },
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('mechanical');
  const [modalSimulations, setModalSimulations] = useState<string[] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const handleViewSimulation = (simulations: string[]) => setModalSimulations(simulations);
  const closeSimulationModal = () => setModalSimulations(null);

  const openLightbox = (image: string) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  const renderSoftwareProject = (project) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 p-6"
    >
      <h3 className="text-2xl font-bold text-purple-400 mb-4">{project.title}</h3>
      <p className="text-gray-300 mb-6">{project.description}</p>

      <div className="mb-6">
        <h4 className="font-semibold text-purple-300 mb-2">Technologies Used:</h4>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[project.image1, project.image2].map((img, idx) => (
          <div key={idx} className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-purple-500/30">
            <motion.img whileHover={{ scale: 1.05 }} src={img} alt={`${project.title} - View ${idx + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => openLightbox(img)}
              className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-purple-600 transition-colors"
            >
              <Eye className="w-5 h-5 text-white" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {project.githubUrl && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </motion.a>
        )}

        {project.report && (
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.report}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Code className="w-4 h-4" />
            <span>View Documentation</span>
          </motion.a>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-6">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-4xl font-bold mb-12 text-center">
        Featured Projects
      </motion.h2>

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
                activeCategory === key ? 'bg-purple-600 text-white' : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{category.title}</span>
            </motion.button>
          );
        })}
      </div>

      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
        {projectCategories[activeCategory].intro}
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2">
        {activeCategory === 'software'
          ? projectCategories[activeCategory].projects.map((project, index) => renderSoftwareProject(project))
          : projectCategories[activeCategory].projects.map((project, index) => (
              <ProjectCard
                key={index}
                {...project}
                onViewSimulation={project.simulations ? handleViewSimulation : undefined}
                onViewImage={openLightbox}
              />
            ))}
      </div>

      <SimulationModal isOpen={!!modalSimulations} onClose={closeSimulationModal} simulations={modalSimulations || []} />
      <ImageModal isOpen={!!lightboxImage} onClose={closeLightbox} image={lightboxImage || ''} />
    </div>
  );
};

export default Projects;
