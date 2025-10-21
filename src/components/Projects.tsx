import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
  Sparkles,
  Brain,
  Target,
  Zap,
  Globe,
  Cctv,
  BarChart3,
  Wind,
  Sun,
  Battery,
  Cpu as CpuIcon,
} from 'lucide-react';

/**
 * Ultra-Enhanced Projects Component
 * - 3D Tilt Effects
 * - Interactive Background Elements
 * - AI-powered Project Recommendations
 * - Dynamic Project Showcase
 * - Advanced Visual Effects
 * - Project DNA Visualization
 * - Tech Stack Radiation Visualization
 * - Interactive Project Timeline
 */

/* ----------------------------- Custom Hooks ---------------------------- */

const useTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return {
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
  };
};

/* ----------------------------- Background Elements ---------------------------- */

const FloatingTechIcons = () => {
  const icons = [
    { icon: Cog, size: 24, delay: 0 },
    { icon: Code, size: 28, delay: 1 },
    { icon: Cpu, size: 22, delay: 2 },
    { icon: Brain, size: 26, delay: 3 },
    { icon: Zap, size: 24, delay: 4 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((IconData, index) => {
        const Icon = IconData.icon;
        return (
          <motion.div
            key={index}
            className="absolute text-purple-500/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              delay: IconData.delay,
            }}
          >
            <Icon size={IconData.size} />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ----------------------------- Advanced Components ---------------------------- */

const ProjectDNA = ({ technologies }: { technologies: string[] }) => {
  return (
    <div className="relative h-16 w-full mb-6 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="flex space-x-1"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech}
              className="relative"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="w-2 h-2 bg-purple-500 rounded-full" />
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs text-purple-300 bg-purple-900/50 px-2 py-1 rounded">
                {tech}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent transform -translate-y-1/2" />
    </div>
  );
};

const TechRadar = ({ technologies }: { technologies: string[] }) => {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <motion.div
        className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {technologies.map((tech, index) => {
        const angle = (index * 360) / technologies.length;
        const radius = 50;
        const x = radius * Math.cos((angle * Math.PI) / 180);
        const y = radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={tech}
            className="absolute w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center cursor-pointer text-white text-xs transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setActiveTech(tech)}
            onMouseLeave={() => setActiveTech(null)}
          >
            <Zap className="w-3 h-3" />
          </motion.div>
        );
      })}

      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {activeTech && (
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-purple-300 px-3 py-1 rounded-full text-sm whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTech}
        </motion.div>
      )}
    </div>
  );
};

const ProjectImpactMeter = ({ impact }: { impact: string }) => {
  const impactScore = impact.includes('40%') ? 90 : 
                     impact.includes('30%') ? 80 : 
                     impact.includes('25%') ? 70 : 60;

  return (
    <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-green-400">Impact Score</span>
        <span className="text-2xl font-bold text-green-300">{impactScore}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <motion.div
          className="bg-gradient-to-r from-green-500 to-emerald-400 h-3 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${impactScore}%` }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      </div>
      <motion.p
        className="text-xs text-gray-300 mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {impact}
      </motion.p>
    </div>
  );
};

const InteractiveTimeline = ({ projects }: { projects: any[] }) => {
  const [activeProject, setActiveProject] = useState(0);

  return (
    <div className="relative mb-8">
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {projects.map((project, index) => (
          <motion.button
            key={index}
            className={`flex-shrink-0 px-6 py-3 rounded-full transition-all ${
              activeProject === index
                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveProject(index)}
          >
            {project.title}
          </motion.button>
        ))}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProject}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-purple-400 mb-2">
              {projects[activeProject].title}
            </h4>
            <p className="text-gray-300 text-sm">
              {projects[activeProject].description}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

/* ----------------------------- Enhanced Modal Components ---------------------------- */

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

/* --------------------------- Ultra-Enhanced Project Card -------------------------- */

type EnhancedProjectCardProps = {
  project: any;
  onViewGallery: (project: any) => void;
  onViewImage: (image: string, title?: string) => void;
  onViewSimulation: (sims: string[], title?: string) => void;
};

const EnhancedProjectCard: React.FC<EnhancedProjectCardProps> = ({
  project,
  onViewGallery,
  onViewImage,
  onViewSimulation,
}) => {
  const images = [project.image1, project.image2].filter(Boolean) as string[];
  const tilt = useTilt();

  // Consolidated button style for consistency
  const buttonStyle = "flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium flex-1 min-w-[140px]";

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={tilt.handleMouseMove}
      onMouseLeave={tilt.handleMouseLeave}
      className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-lg hover:shadow-2xl flex flex-col h-full relative group"
    >
      {/* 3D Effect Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          transform: "translateZ(50px)",
        }}
      />

      <div className="p-6 flex flex-col flex-1 relative z-10">
        {/* Header with Tech Radar */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-purple-400">{project.title}</h3>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
          </div>
          <motion.button
            onClick={() => onViewGallery(project)}
            className="p-2 bg-purple-600/20 hover:bg-purple-600/40 rounded-lg transition-colors ml-4 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomIn className="w-5 h-5 text-purple-400" />
          </motion.button>
        </div>

        {/* Project DNA Visualization */}
        {project.technologies && (
          <div className="mb-6">
            <ProjectDNA technologies={project.technologies} />
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1">
          {/* Project Details Grid */}
          {(project.problem || project.solution || project.impact) && (
            <div className="grid gap-3 mb-6">
              {project.problem && (
                <motion.div 
                  className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-red-400" />
                    <h4 className="font-semibold text-red-400 text-sm">Challenge</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{project.problem}</p>
                </motion.div>
              )}
              {project.solution && (
                <motion.div 
                  className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Brain className="w-4 h-4 text-blue-400" />
                    <h4 className="font-semibold text-blue-400 text-sm">Solution</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{project.solution}</p>
                </motion.div>
              )}
              {project.impact && (
                <motion.div 
                  className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <h4 className="font-semibold text-green-400 text-sm">Impact</h4>
                  </div>
                  <p className="text-gray-300 text-xs leading-relaxed">{project.impact}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Impact Meter */}
          {project.impact && (
            <ProjectImpactMeter impact={project.impact} />
          )}

          {/* Tech Radar */}
          {project.technologies && (
            <div className="mb-6">
              <h4 className="font-semibold text-purple-300 mb-3 text-sm text-center">Tech Stack Radar</h4>
              <TechRadar technologies={project.technologies} />
            </div>
          )}
        </div>

        {/* Enhanced Image Gallery */}
        {images.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-purple-300 text-sm">Project Visuals:</h4>
              <span className="text-gray-400 text-xs">{images.length} images</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className="relative group/image"
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-purple-500/30 hover:border-purple-500 cursor-pointer"
                    onClick={() => onViewImage(img, project.title)}
                  >
                    <img 
                      src={img} 
                      alt={`${project.title} - View ${idx + 1}`} 
                      className="w-full h-full object-cover" 
                    />

                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                      <motion.button
                        className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>

                    {/* Enhanced Image Label */}
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
                      View {idx + 1}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Actions */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {project.report && (
              <motion.a
                whileHover={{ scale: 1.05 }}
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
                whileHover={{ scale: 1.05 }}
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
                whileHover={{ scale: 1.05 }}
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
              whileHover={{ scale: 1.05 }}
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

/* ----------------------------- Enhanced Project Data -------------------------------- */

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
        technologies: ['SolidWorks', 'ANSYS', 'FEA', 'Material Science', 'Structural Analysis'],
        image1: '/images/SPROCKET STRESS.jpg',
        image2: '/images/SPROCKET DEFORM.jpg',
        report: '/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf',
        simulations: ['/simulations/deform.gif', '/simulations/stress.gif'],
      },
      {
        title: 'Piston Head Optimization',
        description: 'Simulated piston head in ANSYS to identify thermal and stress hotspots, enabling durability and material optimization.',
        problem: 'Piston head faces extreme heat and pressure, causing thermal fatigue and structural deformation.',
        solution: 'Conducted integrated thermal and structural FEA to analyze temperature distribution, stress zones, and deformation.',
        impact: 'Achieved up to 40% increase in durability and 25% reduction in material usage through design optimization.',
        technologies: ['ANSYS', 'SolidWorks', 'FEA', 'Thermal Analysis', 'Computational Fluid Dynamics'],
        image1: '/images/PISTON 1.png',
        image2: '/images/PISTON 2.png',
        report: '/reports/Thermo-Structural Analysis of Piston Head Using ANSYS Mechanical.pdf',
        simulations: ['/simulations/head deform.gif', '/simulations/head stress.gif', '/simulations/head temparature.gif'],
      },
    ],
  },
  software: {
    icon: Code,
    title: 'Software Innovation',
    intro: 'Cutting-edge software solutions leveraging modern technologies to solve complex problems.',
    projects: [
      {
        title: 'Petrol Management System',
        description: 'Advanced fuel management system with real-time monitoring, predictive analytics, and automated reporting.',
        problem: 'Manual fuel tracking leading to inefficiencies, stock discrepancies, and reporting delays.',
        solution: 'Developed a comprehensive management system with real-time data processing and predictive analytics.',
        impact: 'Reduced manual errors by 95%, improved stock accuracy, and enabled real-time decision making.',
        technologies: ['Python', 'MySQL', 'Machine Learning', 'Data Visualization', 'REST APIs'],
        githubUrl: 'https://github.com/viswamathan/PETROL-MANAGEMENT-PROJECT-USING-PYTHON-AND-SQL',
        image1: 'https://tse1.mm.bing.net/th/id/OIP.MiI4dSBh7VjBXlCSkD6uDwHaD5?pid=Api&P=0&h=180',
        image2: 'https://tse1.mm.bing.net/th/id/OIP.cjsy2jUvC0aT29PsC8kRRAHaEK?pid=Api&P=0&h=180',
        report: '/reports/automation-report.pdf',
      },
    ],
  },
  hybrid: {
    icon: CpuIcon,
    title: 'Smart Automation',
    intro: 'Intelligent systems combining mechanical engineering with AI-driven automation for next-generation solutions.',
    projects: [
      {
        title: 'AI-Enhanced Solar Dryer',
        description: 'Smart solar dryer prototype with AI optimization, thermal energy storage, and IoT monitoring.',
        problem: 'Conventional solar dryers suffer from inefficiencies and lack of smart control systems.',
        solution: 'Integrated AI algorithms for optimal drying, PCM thermal storage, and real-time IoT monitoring.',
        impact: '40% faster drying, 35% energy savings, and fully automated operation with remote monitoring.',
        technologies: ['SolidWorks', 'AI/ML', 'IoT', 'Thermal Dynamics', 'Python', 'Embedded Systems'],
        image1: 'SOLAR DRYER PROTOTYPE.jpeg',
        image2: 'SOLAR DRYER MODAL.jpeg',
        report: '/reports/Modified Solar Dryer Report.pdf',
      },
    ],
  },
};

/* ------------------------------- Main Enhanced Component --------------------------------- */

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

  // Enhanced category button style
  const categoryButtonStyle = (isActive: boolean) => 
    `flex items-center gap-3 px-6 py-3 rounded-full transition-all font-medium relative overflow-hidden ${
      isActive 
        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg' 
        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <div className="container mx-auto px-6 py-12 relative">
      {/* Background Elements */}
      <FloatingTechIcons />
      
      {/* Animated Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-transparent pointer-events-none" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-12 text-center text-white relative"
      >
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Innovation Portfolio
        </span>
        <motion.div
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.h2>

      {/* Interactive Timeline for Projects */}
      <InteractiveTimeline projects={projectCategories[activeCategory].projects} />

      {/* Enhanced Category Navigation */}
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
              
              {/* Active indicator */}
              {activeCategory === key && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-700 rounded-full -z-10"
                  layoutId="activeCategory"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Enhanced Category Description */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-gray-300 mb-12 max-w-4xl mx-auto text-lg leading-relaxed bg-gray-800/30 rounded-2xl p-6 backdrop-blur-sm border border-gray-700/50"
      >
        {projectCategories[activeCategory].intro}
      </motion.p>

      {/* Projects Grid */}
      <div className="grid gap-8 md:grid-cols-2 relative z-10">
        {projectCategories[activeCategory].projects.map((project, index) => (
          <EnhancedProjectCard
            key={index}
            project={project}
            onViewGallery={openGallery}
            onViewImage={openLightbox}
            onViewSimulation={handleViewSimulation}
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
