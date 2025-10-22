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
 * Enhanced Projects Component with Unique Layout
 * - Asymmetric card designs with creative alignments
 * - Diagonal elements and angled containers
 * - Layered visual hierarchy with depth
 * - Unique grid patterns and overlapping elements
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
          <h3 className="text-xl font-bold text-purple-400">
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
                className="max-w-full rounded-lg border-2 border-purple-500/30"
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
                  currentImageIndex === index ? 'border-purple-500' : 'border-gray-600 hover:border-gray-400'
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
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Project Overview</h4>
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
                  <span key={idx} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
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

/* --------------------------- Enhanced Project Card -------------------------- */

type EnhancedProjectCardProps = {
  project: any;
  onViewGallery: (project: any) => void;
  onViewImage: (image: string, title?: string) => void;
  onViewSimulation: (sims: string[], title?: string) => void;
  index: number;
};

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({
  project,
  onViewGallery,
  onViewImage,
  onViewSimulation,
  index,
}) => {
  const images = [project.image1, project.image2].filter(Boolean) as string[];
  
  // Alternating layouts for unique appearance
  const isAlternate = index % 2 === 1;
  
  const buttonStyle = "flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium flex-1 min-w-[140px]";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col h-full ${
        isAlternate ? 'lg:flex-row-reverse' : 'lg:flex-row'
      }`}
    >
      {/* Decorative Diagonal Accent */}
      <div className={`absolute top-0 w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform -translate-y-1 ${
        isAlternate ? 'right-0' : 'left-0'
      }`}></div>
      
      {/* Image Section with Creative Border */}
      <div className={`relative lg:w-2/5 ${isAlternate ? 'lg:pl-6' : 'lg:pr-6'}`}>
        <div className={`absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl ${
          isAlternate ? 'transform skew-y-2' : 'transform -skew-y-2'
        }`}></div>
        
        {images.length > 0 && (
          <div className="relative p-6">
            <div className={`relative group ${
              isAlternate ? 'transform -rotate-1' : 'transform rotate-1'
            } hover:rotate-0 transition-transform duration-300`}>
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={images[0]}
                alt={`${project.title} main visual`}
                className="w-full h-48 lg:h-64 object-cover rounded-xl border-2 border-purple-500/30 shadow-lg"
                onClick={() => onViewImage(images[0], project.title)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                  onClick={() => onViewImage(images[0], project.title)}
                >
                  <Eye className="w-4 h-4 text-white" />
                </motion.button>
              </div>
            </div>
            
            {/* Secondary Image Indicator */}
            {images.length > 1 && (
              <div className={`absolute ${
                isAlternate ? '-left-2 bottom-4' : '-right-2 bottom-4'
              } transform ${isAlternate ? 'rotate-12' : '-rotate-12'}`}>
                <div className="relative">
                  <div className="w-16 h-16 bg-gray-700 rounded-lg border-2 border-purple-400/50 overflow-hidden shadow-lg">
                    <img 
                      src={images[1]} 
                      alt="Additional view" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+1</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col">
        {/* Header with Diagonal Accent */}
        <div className="relative mb-6">
          <div className={`absolute -top-2 -left-2 w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform ${
            isAlternate ? 'rotate-45' : '-rotate-45'
          }`}></div>
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-purple-400 mb-2 relative">
                {project.title}
                <div className={`absolute -bottom-1 left-0 w-16 h-0.5 bg-purple-500 ${
                  isAlternate ? 'transform -skew-x-12' : 'transform skew-x-12'
                }`}></div>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
            </div>
            <motion.button
              onClick={() => onViewGallery(project)}
              className="p-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-colors ml-4 flex-shrink-0"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <ZoomIn className="w-5 h-5 text-purple-400" />
            </motion.button>
          </div>
        </div>

        {/* Project Details Grid */}
        <div className="flex-1 space-y-4 mb-6">
          {(project.problem || project.solution || project.impact) && (
            <div className="grid gap-3">
              {project.problem && (
                <div className={`bg-red-500/10 border border-red-500/20 rounded-lg p-3 relative overflow-hidden ${
                  isAlternate ? 'transform -skew-x-1' : 'transform skew-x-1'
                } hover:skew-x-0 transition-transform`}>
                  <div className="absolute top-0 left-0 w-2 h-full bg-red-500/50"></div>
                  <h4 className="font-semibold text-red-400 text-sm mb-1 ml-2">Challenge</h4>
                  <p className="text-gray-300 text-xs leading-relaxed ml-2">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className={`bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 relative overflow-hidden ${
                  isAlternate ? 'transform skew-x-1' : 'transform -skew-x-1'
                } hover:skew-x-0 transition-transform`}>
                  <div className="absolute top-0 left-0 w-2 h-full bg-blue-500/50"></div>
                  <h4 className="font-semibold text-blue-400 text-sm mb-1 ml-2">Solution</h4>
                  <p className="text-gray-300 text-xs leading-relaxed ml-2">{project.solution}</p>
                </div>
              )}
              {project.impact && (
                <div className={`bg-green-500/10 border border-green-500/20 rounded-lg p-3 relative overflow-hidden ${
                  isAlternate ? 'transform -skew-x-1' : 'transform skew-x-1'
                } hover:skew-x-0 transition-transform`}>
                  <div className="absolute top-0 left-0 w-2 h-full bg-green-500/50"></div>
                  <h4 className="font-semibold text-green-400 text-sm mb-1 ml-2">Impact</h4>
                  <p className="text-gray-300 text-xs leading-relaxed ml-2">{project.impact}</p>
                </div>
              )}
            </div>
          )}

          {/* Technologies */}
          {project.technologies && (
            <div className="mb-4">
              <h4 className="font-semibold text-purple-300 mb-2 text-sm relative inline-block">
                Technologies Used
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500/30"></div>
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech: string, index: number) => (
                  <motion.span
                    key={index}
                    className={`bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30 ${
                      isAlternate ? 'transform rotate-1' : 'transform -rotate-1'
                    } hover:rotate-0 transition-transform`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Actions - Creative Layout */}
        <div className="mt-auto">
          <div className={`flex flex-wrap gap-3 justify-center ${
            isAlternate ? 'transform -skew-x-2' : 'transform skew-x-2'
          } hover:skew-x-0 transition-transform`}>
            {project.report && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewSimulation(project.simulations, project.title)}
                className={buttonStyle}
              >
                <Play className="w-4 h-4" />
                <span>Simulation</span>
              </motion.button>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
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
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewGallery(project)}
              className={buttonStyle}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Gallery</span>
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
        image1: 'https://tse1.mm.bing.net/th/id/OIP.MiI4dSBh7VjBXlCSkD6uDwHaD5?pid=Api&P=0&h=180',
        image2: 'https://tse1.mm.bing.net/th/id/OIP.cjsy2jUvC0aT29PsC8kRRAHaEK?pid=Api&P=0&h=180',
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
        title: 'Design and Development of a Modified Solar Dryer Integrated with Thermal Energy Storage with applicaation of Concave fins',
        description: 'A solar dryer prototype enhanced with copper fins and paraffin wax-based Phase Change Material (PCM) for efficient and continuous food dehydration.',
        problem: 'Conventional solar dryers suffer from poor heat retention, uneven temperature distribution, and dependency on sunlight, leading to incomplete drying and reduced product quality.',
        solution: 'Developed a modified solar dryer with copper fins for improved heat transfer, PCM for thermal energy storage, and a forced-air circulation system to ensure uniform and continuous drying even under low solar radiation.',
        impact: 'Reduced drying time by 30–40%, maintained chamber temperature up to 11°C higher than conventional dryers, ensured consistent drying even during cloudy conditions, and improved overall energy efficiency and product quality.',
        technologies: ['SolidWorks', 'Copper Fins', 'Paraffin Wax PCM', 'Forced Air Circulation', 'Solar Energy Systems'],
        image1: 'SOLAR DRYER PROTOTYPE.jpeg',
        image2: 'SOLAR DRYER MODAL.jpeg',
        report: '/reports/Modified Solar Dryer Report.pdf',
      },
    ],
  },
};

/* ------------------------------- Main Page --------------------------------- */

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'mechanical' | 'software' | 'hybrid'>('mechanical');
  const [modalSimulations, setModalSimulations] = useState<{simulations: string[], title?: string} | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ image: string; title?: string } | null>(null);
  const [galleryProject, setGalleryProject] = useState<any | null>(null);

  const handleViewSimulation = (simulations: string[], title?: string) => setModalSimulations({simulations, title});
  const closeSimulationModal = () => setModalSimulations(null);

  const openLightbox = (image: string, title?: string) => setLightboxImage({ image, title });
  const closeLightbox = () => setLightboxImage(null);

  const openGallery = (project: any) => setGalleryProject(project);
  const closeGallery = () => setGalleryProject(null);

  // Enhanced category button style with unique shapes
  const categoryButtonStyle = (isActive: boolean) => 
    `flex items-center gap-3 px-6 py-3 rounded-full transition-all font-medium relative overflow-hidden group ${
      isActive 
        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg transform -skew-x-6' 
        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white transform hover:-skew-x-3 transition-transform'
    }`;

  const renderSoftwareProject = (project: any, idx: number) => {
    const images = [project.image1, project.image2].filter(Boolean) as string[];
    const buttonStyle = "flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium flex-1 min-w-[140px]";
    const isAlternate = idx % 2 === 1;

    return (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`relative bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 p-6 flex flex-col h-full ${
          isAlternate ? 'lg:flex-row-reverse' : 'lg:flex-row'
        }`}
      >
        {/* Diagonal Background Pattern */}
        <div className={`absolute inset-0 opacity-5 ${
          isAlternate 
            ? 'bg-gradient-to-br from-purple-500 via-transparent to-pink-500' 
            : 'bg-gradient-to-bl from-purple-500 via-transparent to-pink-500'
        }`}></div>

        {/* Header */}
        <div className={`flex justify-between items-start mb-4 relative z-10 ${
          isAlternate ? 'lg:order-2' : 'lg:order-1'
        }`}>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-purple-400 mb-2 relative inline-block">
              {project.title}
              <div className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent ${
                isAlternate ? 'transform -skew-x-12' : 'transform skew-x-12'
              }`}></div>
            </h3>
            <p className="text-gray-300 leading-relaxed">{project.description}</p>
          </div>
          <motion.button
            onClick={() => openGallery(project)}
            className="p-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-colors ml-4 flex-shrink-0"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomIn className="w-5 h-5 text-purple-400" />
          </motion.button>
        </div>

        {/* Content Area */}
        <div className={`flex-1 space-y-6 relative z-10 ${
          isAlternate ? 'lg:order-1 lg:pr-6' : 'lg:order-2 lg:pl-6'
        }`}>
          {/* Technologies */}
          <div>
            <h4 className="font-semibold text-purple-300 mb-3 relative inline-block">
              Technologies Used
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500/30"></div>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string, index: number) => (
                <motion.span
                  key={index}
                  className={`bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30 ${
                    isAlternate ? 'transform rotate-1' : 'transform -rotate-1'
                  } hover:rotate-0 transition-transform`}
                  whileHover={{ scale: 1.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Images */}
          {images.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-semibold text-purple-300 relative inline-block">
                  Project Visuals
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-purple-500/30"></div>
                </h4>
                <span className="text-gray-400 text-sm">{images.length} images</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {images.map((img, idxImg) => (
                  <div key={idxImg} className="relative group">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: idxImg % 2 === 0 ? 1 : -1 }}
                      className="relative overflow-hidden rounded-lg border-2 border-purple-500/30 hover:border-purple-500 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${project.title} - View ${idxImg + 1}`}
                        className="w-full h-48 object-cover"
                        onClick={() => openLightbox(img, project.title)}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                          onClick={() => openLightbox(img, project.title)}
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </motion.button>
                      </div>
                    </motion.div>
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      View {idxImg + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 relative z-10 lg:mt-auto lg:w-full">
          <div className={`flex flex-wrap gap-3 justify-center ${
            isAlternate ? 'transform -skew-x-2' : 'transform skew-x-2'
          } hover:skew-x-0 transition-transform`}>
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyle}
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </motion.a>
            )}

            {project.report && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.report}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyle}
              >
                <FileText className="w-4 h-4" />
                <span>Report</span>
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openGallery(project)}
              className={buttonStyle}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Gallery</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center text-white relative"
      >
        Featured Projects
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </motion.h2>

      {/* Category Navigation */}
      <div className="flex justify-center mb-12 space-x-4">
        {Object.entries(projectCategories).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05, y: -2 }}
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
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="text-center text-gray-300 mb-12 max-w-3xl mx-auto text-lg leading-relaxed relative"
      >
        {projectCategories[activeCategory].intro}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-purple-500/30 rounded-full"></div>
      </motion.p>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-1">
        {activeCategory === 'software'
          ? projectCategories[activeCategory].projects.map((project, index) => renderSoftwareProject(project, index))
          : projectCategories[activeCategory].projects.map((project, index) => (
              <EnhancedProjectCard
                key={index}
                project={project}
                onViewGallery={openGallery}
                onViewImage={openLightbox}
                onViewSimulation={handleViewSimulation}
                index={index}
              />
            ))}
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
