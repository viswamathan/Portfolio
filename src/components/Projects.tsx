import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Calendar,
  Clock,
  Users,
  Target,
  Award,
  Sparkles,
  Star,
  Heart,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  RotateCcw,
} from 'lucide-react';

/**
 * Enhanced Projects Component with Premium Gallery & Sophisticated Cards
 * - Advanced gallery viewer with full-screen mode
 * - Premium card designs with glass morphism effects
 * - Enhanced animations and interactive elements
 * - Professional layout with better visual hierarchy
 */

/* ----------------------------- Enhanced Modal Components ---------------------------- */

type SimulationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  simulations: string[];
  title?: string;
};

const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, simulations, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl">
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-purple-500/20">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title || 'Simulation View'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {currentIndex + 1} of {simulations.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentIndex(prev => prev === 0 ? simulations.length - 1 : prev - 1)}
                className="p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-full transition-all border border-purple-500/30"
              >
                <ChevronLeft className="w-5 h-5 text-purple-400" />
              </button>
              <button 
                onClick={() => setCurrentIndex(prev => prev === simulations.length - 1 ? 0 : prev + 1)}
                className="p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-full transition-all border border-purple-500/30"
              >
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </button>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-full transition-all border border-red-500/30 group"
            >
              <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <img
                src={simulations[currentIndex]}
                alt={`Simulation ${currentIndex + 1}`}
                className="max-w-full max-h-[60vh] rounded-xl border-2 border-purple-500/30 shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        {simulations.length > 1 && (
          <div className="p-6 border-t border-purple-500/20 bg-gray-900/50">
            <div className="flex justify-center gap-3">
              {simulations.map((sim, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentIndex === index 
                      ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/25' 
                      : 'border-gray-600 hover:border-purple-400/50 hover:scale-105'
                  }`}
                >
                  <img src={sim} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
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
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-t-2xl backdrop-blur-md border-b border-purple-500/30">
          {title && (
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h3>
          )}
          <button 
            onClick={onClose} 
            className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
          >
            <X className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-b-2xl p-8">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={image} 
            alt="Project View" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-2 border-purple-500/20" 
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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !project) return null;

  const images = [project.image1, project.image2].filter(Boolean) as string[];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/95 z-50 ${isFullscreen ? '' : 'p-4 flex items-center justify-center'}`}
      onClick={onClose}
    >
      <div
        className={`relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 shadow-2xl ${
          isFullscreen ? 'w-full h-full' : 'max-w-7xl w-full max-h-[95vh] rounded-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md p-6 border-b border-purple-500/20 z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {project.title}
              </h3>
              {project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFullscreen}
                className="p-3 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl transition-all border border-blue-500/30 group"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                )}
              </button>
              <button 
                onClick={onClose} 
                className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
              >
                <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-140px)]">
          {/* Enhanced Image Viewer */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                  )}
                  <img
                    src={images[currentImageIndex]}
                    alt={`${project.title} - View ${currentImageIndex + 1}`}
                    className={`max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl border-2 border-purple-500/30 transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Enhanced Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                      >
                        <ChevronLeft className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                      >
                        <ChevronRight className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm text-white border border-purple-500/30">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Thumbnails */}
            {images.length > 1 && (
              <div className="mt-6">
                <div className="flex justify-center gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PenTool as Tool,
  Cpu,
  Microscope,
  GraduationCap,
  Award,
  ChevronRight,
  Briefcase,
  FileText,
  Calendar,
  User,
  Shield,
  ExternalLink,
  X,
  Eye,
  ZoomIn,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Download,
  Sparkles,
  Target,
  Maximize2,
  Minimize2,
  Github,
  Play,
  Layers,
  Clock,
  Users as UsersIcon
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [modalImage, setModalImage] = useState<{image: string; title?: string} | null>(null);
  const [selectedPatent, setSelectedPatent] = useState<any | null>(null);
  const [galleryPatent, setGalleryPatent] = useState<any | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 },
  };

  const cardHover = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 },
  };

  // Enhanced Patent Data
  const patents = [
    {
      id: 1,
      img: "SOLAR DRYER MODAL.jpeg",
      title: "Modified Solar Dryer Integrated with Thermal Energy Storage with Concave fins",
      appNo: "202541021927",
      status: "Pending",
      type: "Utility Patent",
      category: "Renewable Energy",
      filingDate: "2024-03-15",
      inventors: ["Viswa M", "Co-inventor Name"],
      description: "A solar dryer integrating phase change material for enhanced thermal energy storage and efficiency improvement with innovative concave fin design for optimal heat transfer.",
      features: [
        "Phase Change Material (PCM) integration",
        "Concave fin heat exchanger design",
        "Modular construction",
        "IoT monitoring capability",
        "60% improved efficiency"
      ],
      technicalSpecs: {
        efficiency: "60% improvement",
        temperature: "45-75°C operating range",
        capacity: "50kg batch processing",
        material: "Food-grade stainless steel"
      },
      images: ["SOLAR DRYER MODAL.jpeg", "SOLAR DRYER PROTOTYPE.jpeg"],
      simulations: [],
      report: '/patent-documents/solar-dryer.pdf',
      onView: () => window.open('/patent-documents/solar-dryer.pdf', '_blank')
    },
    {
      id: 2,
      img: "Multi Purpose Knife.png",
      title: "Multi Purpose Knife",
      appNo: "2024112346",
      status: "Approved",
      type: "Design Patent",
      category: "Kitchen Tools",
      filingDate: "2024-01-10",
      inventors: ["Viswa M"],
      description: "Innovative multi-functional knife for cutting, peeling, and slicing, enhancing convenience and efficiency in the kitchen with ergonomic design and safety features.",
      features: [
        "7-in-1 functionality",
        "Ergonomic handle design",
        "Safety locking mechanism",
        "Dishwasher safe",
        "Food-grade materials"
      ],
      technicalSpecs: {
        material: "420 Stainless Steel",
        weight: "150g",
        dimensions: "18cm total length",
        features: "Integrated peeler, slicer, chopper"
      },
      images: ["Multi Purpose Knife.png"],
      simulations: [],
      report: '/patent-documents/multi-knife.pdf',
      onView: () => window.open('/patent-documents/multi-knife.pdf', '_blank')
    }
  ];

  /* ----------------------------- Enhanced Modal Components ---------------------------- */

  const PatentGalleryModal: React.FC<{ isOpen: boolean; onClose: () => void; patent: any | null }> = ({ 
    isOpen, 
    onClose, 
    patent 
  }) => {
    const [currentImgIndex, setCurrentImgIndex] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);

    if (!isOpen || !patent) return null;

    const images = patent.images || [patent.img];

    const toggleFullscreen = () => {
      setIsFullscreen(!isFullscreen);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 bg-black/95 z-50 ${isFullscreen ? '' : 'p-4 flex items-center justify-center'}`}
        onClick={onClose}
      >
        <div
          className={`relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 shadow-2xl ${
            isFullscreen ? 'w-full h-full' : 'max-w-7xl w-full max-h-[95vh] rounded-3xl'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md p-6 border-b border-purple-500/20 z-10">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {patent.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                    {patent.type}
                  </span>
                  <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    patent.status === 'Approved' 
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  }`}>
                    {patent.status}
                  </span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                    {patent.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={toggleFullscreen}
                  className="p-3 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl transition-all border border-blue-500/30 group"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  ) : (
                    <Maximize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                <button 
                  onClick={onClose} 
                  className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
                >
                  <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Main Content */}
          <div className="flex flex-col lg:flex-row h-[calc(95vh-140px)]">
            {/* Enhanced Image Viewer */}
            <div className="flex-1 flex flex-col p-6">
              <div className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImgIndex}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                      </div>
                    )}
                    <img
                      src={images[currentImgIndex]}
                      alt={`${patent.title} - View ${currentImgIndex + 1}`}
                      className={`max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl border-2 border-purple-500/30 transition-opacity duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                    />
                    
                    {/* Enhanced Navigation Arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setCurrentImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                        >
                          <ChevronLeft className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                        >
                          <ChevronRightIcon className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm text-white border border-purple-500/30">
                      {currentImgIndex + 1} / {images.length}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced Thumbnails */}
              {images.length > 1 && (
                <div className="mt-6">
                  <div className="flex justify-center gap-4">
                    {images.map((img: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentImgIndex(index);
                          setImageLoaded(false);
                        }}
                        className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                          currentImgIndex === index 
                            ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/25' 
                            : 'border-gray-600 hover:border-purple-400/50 hover:scale-105'
                        }`}
                      >
                        <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                        <div className={`absolute inset-0 bg-purple-500/20 transition-opacity ${
                          currentImgIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Patent Info Sidebar */}
            <div className="lg:w-96 bg-gradient-to-b from-gray-900/80 to-gray-800/80 backdrop-blur-md border-l border-purple-500/20 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Patent Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
                    <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{patent.filingDate}</div>
                    <div className="text-xs text-purple-300">Filing Date</div>
                  </div>
                  <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                    <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{patent.features?.length || 0}</div>
                    <div className="text-xs text-blue-300">Key Features</div>
                  </div>
                </div>

                {/* Patent Description */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Patent Overview
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{patent.description}</p>
                </div>

                {/* Patent Information */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Application No:</span>
                    <span className="text-white font-mono text-sm">{patent.appNo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Inventors:</span>
                    <span className="text-white text-right text-sm">{patent.inventors.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Category:</span>
                    <span className="text-purple-300 text-sm">{patent.category}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Key Features</h4>
                  <div className="space-y-2">
                    {patent.features.map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div>
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Technical Specifications</h4>
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-2">
                    {Object.entries(patent.technicalSpecs).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-1">
                        <span className="text-gray-400 capitalize text-sm">{key}:</span>
                        <span className="text-white text-sm">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 pt-4">
                  {patent.report && (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={patent.report}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 px-4 py-3 rounded-xl transition-all border border-purple-500/30"
                    >
                      <FileText className="w-5 h-5" />
                      <span>View Patent Documents</span>
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const ImageModal: React.FC<{ isOpen: boolean; onClose: () => void; image: string; title?: string }> = ({ 
    isOpen, 
    onClose, 
    image, 
    title 
  }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="relative max-w-7xl w-full max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-t-2xl backdrop-blur-md border-b border-purple-500/30">
            {title && (
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {title}
              </h3>
            )}
            <button 
              onClick={onClose} 
              className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
            >
              <X className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-b-2xl p-8">
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={image} 
              alt="Patent View" 
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-2 border-purple-500/20" 
            />
          </div>
        </div>
      </motion.div>
    );
  };

  /* --------------------------- Premium Patent Card -------------------------- */

  const PremiumPatentCard: React.FC<{
    patent: any;
    onViewGallery: (patent: any) => void;
    onViewImage: (image: string, title?: string) => void;
  }> = ({ patent, onViewGallery, onViewImage }) => {
    const images = patent.images || [patent.img];
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full"
      >
        {/* Background Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Header with Gradient */}
        <div className="relative p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {patent.title}
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">{patent.description}</p>
            </div>
            <motion.button
              onClick={() => onViewGallery(patent)}
              className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 rounded-xl transition-all duration-300 border border-purple-500/30 flex-shrink-0 ml-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ZoomIn className="w-5 h-5 text-purple-400" />
            </motion.button>
          </div>

          {/* Status & Type Badges */}
          <div className="flex flex-wrap gap-2">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
                patent.status === 'Approved' 
                  ? 'bg-green-500/20 text-green-300 border-green-500/30'
                  : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
              }`}
            >
              {patent.status}
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-500/30 backdrop-blur-sm"
            >
              {patent.type}
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30 backdrop-blur-sm"
            >
              {patent.category}
            </motion.span>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative p-6 pt-0 flex-1 flex flex-col">
          {/* Patent Details */}
          <div className="space-y-3 mb-6 flex-1">
            <motion.div 
              className="flex items-start gap-3 text-sm"
              whileHover={{ x: 4 }}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-purple-400 font-medium">Application: </span>
                <span className="text-gray-400 font-mono">{patent.appNo}</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start gap-3 text-sm"
              whileHover={{ x: 4 }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-blue-400 font-medium">Filed: </span>
                <span className="text-gray-400">{patent.filingDate}</span>
              </div>
            </motion.div>

            <motion.div 
              className="flex items-start gap-3 text-sm"
              whileHover={{ x: 4 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-green-400 font-medium">Inventors: </span>
                <span className="text-gray-400">{patent.inventors.join(', ')}</span>
              </div>
            </motion.div>
          </div>

          {/* Feature Highlights */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Key Innovations
            </h4>
            <div className="flex flex-wrap gap-1">
              {patent.features.slice(0, 3).map((feature: string, idx: number) => (
                <span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700/50">
                  {feature}
                </span>
              ))}
              {patent.features.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700/50">
                  +{patent.features.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Enhanced Image Gallery */}
          {images.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Patent Visuals
                </h4>
                <span className="text-gray-500 text-xs">{images.length} images</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {images.map((img: string, idx: number) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="relative group/image rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500 cursor-pointer"
                    onClick={() => onViewImage(img, patent.title)}
                  >
                    <img 
                      src={img} 
                      alt={`${patent.title} - View ${idx + 1}`} 
                      className="w-full h-32 object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
                        View {idx + 1}
                      </div>
                      <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                        <Eye className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Action Buttons */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-3">
              {patent.report && (
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={patent.report}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-purple-500/25"
                >
                  <FileText className="w-4 h-4" />
                  <span>Documents</span>
                </motion.a>
              )}

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewGallery(patent)}
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-blue-500/25"
              >
                <ZoomIn className="w-4 h-4" />
                <span>Details</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewGallery(patent)}
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-pink-500/25"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Gallery</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500 pointer-events-none" />
      </motion.div>
    );
  };

  const openLightbox = (image: string, title?: string) => setModalImage({ image, title });
  const closeLightbox = () => setModalImage(null);

  const openGallery = (patent: any) => setGalleryPatent(patent);
  const closeGallery = () => setGalleryPatent(null);

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl bg-gray-900">
      {/* Heading */}
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        About{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Me
        </span>
      </motion.h2>

      {/* Intro Section */}
      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20 mb-16"
      >
        <p className="text-center text-lg font-semibold mb-6">
          I am a Mechanical Engineer passionate about merging traditional design
          principles with modern technology.
        </p>
        <p className="text-center text-lg">
          With expertise in CAD modeling, FEA/CFD simulations, and automation
          with Python, I create solutions that optimize performance, reduce
          complexity, and deliver real-world impact.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        className="grid md:grid-cols-2 gap-10 mt-16"
      >
        {/* Left Column */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Professional Summary */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tool className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Professional Summary</h3>
            </div>
            <p className="text-gray-300">
              Results-driven engineer with a strong foundation in mechanics and
              product design. Experienced in tackling multidisciplinary
              challenges and leveraging automation to enhance engineering
              workflows.
            </p>
          </motion.div>

          {/* Technical Focus */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Technical Focus</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>CAD design & design optimization</li>
              <li>FEA & CFD for real-world problem solving</li>
              <li>Engineering automation with Python</li>
              <li>Design for Manufacturing (DFM)</li>
              <li>System-level efficiency optimization</li>
            </ul>
          </motion.div>

          {/* Research Interests */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Research Interests</h3>
            </div>
            <ul className="space-y-4">
              {[
                { title: "Renewable Energy Systems", desc: "Solar thermal, energy storage, and sustainable design" },
                { title: "Advanced Materials", desc: "Composites, failure analysis, lightweight structures" },
                { title: "AI in Engineering", desc: "Predictive maintenance, ML-driven optimization" },
                { title: "Thermal Management", desc: "Heat transfer, cooling systems, HVAC design" },
              ].map((item, idx) => (
                <motion.li 
                  key={idx} 
                  whileHover={{ x: 10 }} 
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-purple-300">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Education */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">B.E Mechanical Engineering</h4>
                <p className="text-purple-300 text-sm">Sri Krishna College of Technology</p>
                <p className="text-gray-400 text-sm">2022 - 2026 | CGPA: 7.50/10</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Senior Secondary</h4>
                <p className="text-purple-300 text-sm">Alagar Public School, Tuticorin</p>
                <p className="text-gray-400 text-sm">2021 - 2022 | 61% - MPCS</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Secondary School</h4>
                <p className="text-purple-300 text-sm">Amrita Vidyalayam, Ramnad</p>
                <p className="text-gray-400 text-sm">2019 - 2020 | 78%</p>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Key Achievements</h3>
            </div>
            <div className="space-y-3">
              {[
                "Certified SolidWorks Associate (CSWA)",
                "NIOT Research Internship Completion",
                "15+ Engineering Projects Completed",
                "Advanced FEA & CFD Specialization",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Focus Areas */}
          <motion.div 
            whileHover={cardHover} 
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Current Focus Areas</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-300 mb-1">Solar Dryer Development</h4>
                <p className="text-gray-400 text-sm">Thermal energy storage integration with PCM</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-1">FEA Optimization</h4>
                <p className="text-gray-400 text-sm">Advanced structural analysis techniques</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-300 mb-1">Automation Scripts</h4>
                <p className="text-gray-400 text-sm">Python-based engineering calculations</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------------- Enhanced Patent Section ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 py-16 px-8 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-800/60 rounded-3xl shadow-2xl border border-purple-500/30 backdrop-blur-md"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 drop-shadow-md"
          >
            Patents & Innovations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Transforming innovative ideas into protected intellectual property with practical applications
          </motion.p>
        </div>

        {/* Patent Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { label: "Total Patents", value: patents.length.toString(), icon: FileText },
            { label: "Approved", value: patents.filter(p => p.status === 'Approved').length.toString(), icon: Shield },
            { label: "Pending", value: patents.filter(p => p.status === 'Pending').length.toString(), icon: Calendar },
            { label: "Categories", value: [...new Set(patents.map(p => p.category))].length.toString(), icon: User },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 text-center border border-purple-500/20"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patent Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {patents.map((patent, idx) => (
            <PremiumPatentCard
              key={patent.id}
              patent={patent}
              onViewGallery={openGallery}
              onViewImage={openLightbox}
            />
          ))}
        </div>
      </motion.div>

      {/* Enhanced Modals */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeLightbox}
        image={modalImage?.image || ''}
        title={modalImage?.title}
      />

      <PatentGalleryModal 
        isOpen={!!galleryPatent} 
        onClose={closeGallery} 
        patent={galleryPatent} 
      />
    </div>
  );
};

export default About;
