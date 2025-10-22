import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Code,
  Layers,
  TrendingUp,
  X,
  Cog,
  Cpu,
  Github,
  Eye,
  ZoomIn,
  Play,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/**
 * Professional Projects Component
 * - Perfect image alignment and consistency
 * - Clean, professional layout
 * - Consistent spacing and proportions
 * - Professional color scheme and typography
 */

/* ----------------------------- Modal Components ---------------------------- */

type SimulationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  simulations: string[];
  title?: string;
};

const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, simulations, title }) => {
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
          <h3 className="text-xl font-bold text-blue-600">
            {title || 'Simulation View'}
          </h3>
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
                className="max-w-full rounded-lg border-2 border-blue-500/30"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title?: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image, title }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-6xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img 
            src={image} 
            alt="Project View" 
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
          />
        </div>
      </div>
    </motion.div>
  );
};

type ProjectGalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: any | null;
};

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !project) return null;

  const images = [project.image1, project.image2].filter(Boolean) as string[];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full max-h-[95vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            {project.technologies && (
              <p className="text-gray-400">{project.technologies.join(', ')}</p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Main Image */}
        <div className="flex-1 flex items-center justify-center mb-6">
          <div className="relative">
            <img
              src={images[currentImageIndex]}
              alt={`${project.title} - View ${currentImageIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex justify-center gap-4 mb-6">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentImageIndex === index ? 'border-blue-500' : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Project Info */}
        <div className="bg-gray-900/80 backdrop-blur-sm rounded-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-600 mb-2">Project Overview</h4>
              <p className="text-gray-300 text-sm mb-4">{project.description}</p>
              {project.problem && (
                <div className="mb-3">
                  <h5 className="font-medium text-white mb-1">Challenge:</h5>
                  <p className="text-gray-400 text-sm">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="mb-3">
                  <h5 className="font-medium text-white mb-1">Solution:</h5>
                  <p className="text-gray-400 text-sm">{project.solution}</p>
                </div>
              )}
            </div>

            <div>
              {project.impact && (
                <div className="mb-4">
                  <h5 className="font-medium text-green-400 mb-1">Impact:</h5>
                  <p className="text-gray-300 text-sm">{project.impact}</p>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech: string, idx: number) => (
                  <span key={idx} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------- Professional Project Card -------------------------- */

type ProjectCardProps = {
  project: any;
  onViewGallery: (project: any) => void;
  onViewImage: (image: string, title?: string) => void;
  onViewSimulation: (sims: string[], title?: string) => void;
};

const ProfessionalProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewGallery,
  onViewImage,
  onViewSimulation,
}) => {
  const images = [project.image1, project.image2].filter(Boolean) as string[];

  const buttonStyle = "flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium flex-1 min-w-[140px]";

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 flex flex-col h-full"
    >
      {/* Image Section - Consistent Height */}
      {images.length > 0 && (
        <div className="relative">
          <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={img}
                  alt={`${project.title} - View ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => onViewImage(img, project.title)}
                />
                <button
                  onClick={() => onViewImage(img, project.title)}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-blue-600 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Eye className="w-3 h-3 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{project.description}</p>
          </div>
          <motion.button
            onClick={() => onViewGallery(project)}
            className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors ml-4 flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ZoomIn className="w-4 h-4 text-blue-600" />
          </motion.button>
        </div>

        {/* Project Details */}
        <div className="flex-1 space-y-4 mb-6">
          {/* Problem/Solution/Impact Cards */}
          <div className="space-y-3">
            {project.problem && (
              <div className="bg-red-50 border border-red-100 rounded-lg p-3">
                <h4 className="font-semibold text-red-700 text-sm mb-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  Challenge
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <h4 className="font-semibold text-blue-700 text-sm mb-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Solution
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">{project.solution}</p>
              </div>
            )}
            {project.impact && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-3">
                <h4 className="font-semibold text-green-700 text-sm mb-1 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Impact
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed">{project.impact}</p>
              </div>
            )}
          </div>

          {/* Technologies */}
          {project.technologies && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 text-sm">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs border border-gray-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {project.report && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.report}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyle}
              >
                <FileText className="w-4 h-4" />
                <span>Report</span>
              </motion.a>
            )}

            {project.simulations && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewSimulation(project.simulations, project.title)}
                className={buttonStyle}
              >
                <Play className="w-4 h-4" />
                <span>Simulation</span>
              </motion.button>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyle}
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewGallery(project)}
              className={buttonStyle}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Details</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------- Project Data -------------------------------- */

const projectCategories: Record<
  string,
  {
    icon: React.ComponentType<any>;
    title: string;
    intro: string;
    projects: any[];
  }
> = {
  mechanical: {
    icon: Cog,
    title: 'Mechanical Engineering',
    intro: 'Advanced mechanical engineering projects showcasing design optimization, structural analysis, and innovative solutions using cutting-edge technology.',
    projects: [
      {
        title: 'Flat Sprocket Analysis',
        description: 'Comprehensive structural analysis and optimization of a flat sprocket using advanced FEA techniques to enhance durability and performance.',
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
        title: 'Piston Head Optimization',
        description: 'Thermal and structural FEA simulation of piston head to identify hotspots and optimize design for enhanced durability and material efficiency.',
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
    title: 'Software Development',
    intro: 'Innovative software solutions and applications built with modern technologies to solve real-world problems efficiently.',
    projects: [
      {
        title: 'Petrol Management System',
        description: 'Comprehensive fuel management system designed to track stock, sales, and transactions with real-time monitoring and reporting capabilities.',
        problem: 'Manual tracking of fuel inventory and sales leading to inefficiencies and errors in management.',
        solution: 'Developed an automated system with database integration and real-time monitoring features.',
        impact: 'Improved accuracy in inventory management and streamlined operations for petrol stations.',
        technologies: ['Python', 'MySQL', 'OS Module', 'Matplotlib'],
        githubUrl: 'https://github.com/viswamathan/PETROL-MANAGEMENT-PROJECT-USING-PYTHON-AND-SQL',
        image1: 'https://tse1.mm.bing.net/th/id/OIP.MiI4dSBh7VjBXlCSkD6uDwHaD5?pid=Api&P=0&h=180',
        image2: 'https://tse1.mm.bing.net/th/id/OIP.cjsy2jUvC0aT29PsC8kRRAHaEK?pid=Api&P=0&h=180',
        report: '/reports/automation-report.pdf',
      },
    ],
  },
  automation: {
    icon: Cpu,
    title: 'Automation Systems',
    intro: 'Advanced systems combining mechanical design with smart control systems and automation technologies.',
    projects: [
      {
        title: 'Modified Solar Dryer with Thermal Storage',
        description: 'Solar dryer prototype enhanced with copper fins and paraffin wax-based PCM for efficient and continuous food dehydration.',
        problem: 'Conventional solar dryers suffer from poor heat retention and uneven temperature distribution.',
        solution: 'Integrated copper fins for improved heat transfer and PCM for thermal energy storage with forced-air circulation.',
        impact: 'Reduced drying time by 30-40% and maintained consistent temperature for better product quality.',
        technologies: ['SolidWorks', 'Copper Fins', 'PCM', 'Forced Air Circulation', 'Solar Energy'],
        image1: 'SOLAR DRYER PROTOTYPE.jpeg',
        image2: 'SOLAR DRYER MODAL.jpeg',
        report: '/reports/Modified Solar Dryer Report.pdf',
      },
    ],
  },
};

/* ------------------------------- Main Page --------------------------------- */

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'mechanical' | 'software' | 'automation'>('mechanical');
  const [modalSimulations, setModalSimulations] = useState<{simulations: string[], title?: string} | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ image: string; title?: string } | null>(null);
  const [galleryProject, setGalleryProject] = useState<any | null>(null);

  const handleViewSimulation = (simulations: string[], title?: string) => setModalSimulations({simulations, title});
  const closeSimulationModal = () => setModalSimulations(null);

  const openLightbox = (image: string, title?: string) => setLightboxImage({ image, title });
  const closeLightbox = () => setLightboxImage(null);

  const openGallery = (project: any) => setGalleryProject(project);
  const closeGallery = () => setGalleryProject(null);

  const categoryButtonStyle = (isActive: boolean) => 
    `flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium border-2 ${
      isActive 
        ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
        : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:text-blue-600'
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Professional Portfolio</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Showcasing innovative engineering solutions and software development projects
          </p>
        </motion.div>

        {/* Category Navigation */}
        <div className="flex justify-center mb-12 space-x-4">
          {Object.entries(projectCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(key as any)}
                className={categoryButtonStyle(activeCategory === key)}
              >
                <Icon className="w-5 h-5" />
                <span>{category.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Category Description */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
            {projectCategories[activeCategory].intro}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {projectCategories[activeCategory].projects.map((project, index) => (
            <ProfessionalProjectCard
              key={index}
              project={project}
              onViewGallery={openGallery}
              onViewImage={openLightbox}
              onViewSimulation={handleViewSimulation}
            />
          ))}
        </div>

        {/* Empty State */}
        {projectCategories[activeCategory].projects.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
              <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Available</h3>
              <p className="text-gray-600">Projects for this category are currently under development.</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <SimulationModal 
        isOpen={!!modalSimulations} 
        onClose={closeSimulationModal} 
        simulations={modalSimulations?.simulations || []}
        title={modalSimulations?.title ? `${modalSimulations.title} - Simulations` : undefined}
      />

      <ImageModal
        isOpen={!!lightboxImage}
        onClose={closeLightbox}
        image={lightboxImage?.image || ''}
        title={lightboxImage?.title}
      />

      <ProjectGalleryModal 
        isOpen={!!galleryProject} 
        onClose={closeGallery} 
        project={galleryProject} 
      />
    </div>
  );
};

export default Projects;
