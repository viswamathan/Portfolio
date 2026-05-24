import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, Building, Award, FileText, Briefcase, Eye, X,
  ChevronLeft, ChevronRight, Sparkles, TrendingUp, Clock, CheckCircle2,
  Layers, Zap, Code2, ExternalLink, Download, ZoomIn
} from 'lucide-react';

// --- Image Lightbox Component ---
const Lightbox = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image}
          alt="Full resolution view"
          className="max-h-[85vh] max-w-full rounded-2xl object-contain shadow-2xl"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-3 rounded-full hover:bg-black/70 transition-all duration-300"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6 text-white" />
        </button>
      </motion.div>
    </motion.div>
  );
};

// --- Gallery Component with Horizontal Scroll ---
const ImageGallery = ({ images, onImageClick }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => ref.removeEventListener('scroll', checkScroll);
    }
  }, [images]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const amount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-800/30 rounded-xl border border-dashed border-gray-600">
        <div className="bg-gray-800/50 rounded-full p-4 mb-3">
          <Layers className="w-10 h-10 text-gray-500" />
        </div>
        <p className="text-gray-400 text-sm">Gallery images will be added soon</p>
      </div>
    );
  }

  return (
    <div className="relative group">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-4 pb-4 scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.02 }}
            className="relative flex-shrink-0 w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-300 group/image"
            onClick={() => onImageClick(img)}
          >
            <div className="aspect-video bg-gray-900 flex items-center justify-center">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity flex items-end justify-center p-3">
              <div className="bg-purple-600/90 rounded-full p-2">
                <ZoomIn className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      )}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// --- Skill Tag with Hover Effect ---
const SkillTag = ({ skill }) => (
  <motion.span
    whileHover={{ scale: 1.05, y: -2 }}
    className="group relative bg-gradient-to-r from-purple-500/20 to-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 backdrop-blur-sm cursor-default overflow-hidden"
  >
    <span className="relative z-10">{skill}</span>
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-purple-600/40 to-purple-500/40"
      initial={{ x: '-100%' }}
      whileHover={{ x: 0 }}
      transition={{ duration: 0.3 }}
    />
  </motion.spans>
);

// --- Experience Card Component ---
const ExperienceCard = ({ exp, showButtons = true, index, isInView }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: index * 0.1, type: 'spring', stiffness: 100 }
    }
  };

  const handleCertificateClick = () => {
    if (exp.onCertificate) exp.onCertificate();
  };

  const handleReportClick = () => {
    if (exp.onReport) exp.onReport();
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative"
    >
      {/* Animated border gradient on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 blur-xl" />
      
      <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-purple-500/10">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-gray-800/90 to-gray-900/90 p-6 md:p-8 border-b border-gray-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-5 flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-0 bg-purple-500 rounded-xl blur-md opacity-50" />
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-gray-800 border-2 border-purple-500/50 shadow-xl">
                  {exp.logo ? (
                    <img
                      src={exp.logo}
                      alt={`${exp.company} logo`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://placehold.co/400x400?text=Logo';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-purple-700">
                      <Building className="w-8 h-8 text-purple-300" />
                    </div>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1 truncate">{exp.title}</h3>
                <h4 className="text-lg md:text-xl text-purple-400 font-semibold mb-3">{exp.company}</h4>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-purple-500" />
                    <span>{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-purple-500" />
                    <span>{exp.type}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4 flex-shrink-0">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold border backdrop-blur-sm ${
                exp.status === 'Current' 
                  ? 'bg-purple-500/20 text-purple-400 border-purple-500/50 shadow-glow-purple' 
                  : 'bg-green-500/20 text-green-400 border-green-500/50'
              }`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  {exp.status}
                </div>
              </div>
              {showButtons && (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCertificateClick}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg"
                  >
                    <Award className="w-4 h-4" />
                    Certificate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleReportClick}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg border border-gray-700"
                  >
                    <FileText className="w-4 h-4" />
                    Report
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 md:p-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            {exp.description}
          </motion.p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left column: Responsibilities */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  Key Responsibilities
                </h5>
                <div className="space-y-3">
                  {exp.responsibilities.slice(0, isExpanded ? undefined : 4).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex gap-4 p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                      <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                    </motion.div>
                  ))}
                </div>
                {exp.responsibilities.length > 4 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 text-purple-400 text-sm hover:text-purple-300 transition-colors flex items-center gap-1"
                  >
                    {isExpanded ? 'Show less' : `Show ${exp.responsibilities.length - 4} more`}
                    <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>
                )}
              </div>

              {/* Skills */}
              <div className="bg-gray-800/40 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  Skills & Technologies
                </h5>
                <div className="flex flex-wrap gap-2.5">
                  {exp.skills.map((skill, idx) => (
                    <SkillTag key={idx} skill={skill} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right column: Gallery */}
            <div className="space-y-6">
              <div className="bg-gray-800/40 rounded-xl p-5 border border-gray-700/50 backdrop-blur-sm h-full">
                <h5 className="text-lg font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                  <Eye className="w-5 h-5 text-purple-500" />
                  Experience Gallery
                </h5>
                <ImageGallery 
                  images={exp.images || []} 
                  onImageClick={(img) => {
                    if (window.openLightbox) window.openLightbox(img);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Experience Component ---
const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  // Store lightbox function globally for gallery
  useEffect(() => {
    window.openLightbox = setSelectedImage;
    return () => { delete window.openLightbox; };
  }, []);

  // Handlers for internships (same as original)
  const handleNIOTCertificate = () => window.open('/NIOT INTERNSHIP CERTIFICATE.png', '_blank');
  const handleNIOTReport = () => window.open('/INTERNSHIP REPORT.pdf', '_blank');
  const handleSAFCertificate = () => window.open('/SAF CERTIFICATE.pdf', '_blank');
  const handleSAFReport = () => window.open('/SAF INTERNSHIP REPORT.pdf', '_blank');

  // Professional experience data
  const professionalExperience = {
    title: "Graduate Engineer Trainee – Design",
    company: "Shanthi Gears Limited (Murugappa Group)",
    location: "Coimbatore, Tamil Nadu",
    duration: "Apr 2026 – Present",
    type: "Full-time Professional",
    status: "Current",
    logo: "/ShanthiGears.png",
    images: [],
    description: "Working in Worm Gearbox Design team, contributing to mechanical product design, CAD development, engineering analysis, and manufacturing workflows.",
    responsibilities: [
      "Assisted in worm gearbox product design and development including CAD modeling, assembly validation, and engineering drawing preparation.",
      "Supported product lifecycle activities through BOM preparation, engineering documentation, and design revisions using Oracle ERP and SLGPDM systems.",
      "Participated in engineering analysis, simulation support, and technical reviews to improve product quality and manufacturing feasibility.",
      "Collaborated with manufacturing and quality teams for corrective actions, defect resolution, and process optimization activities.",
      "Supported prototype evaluation, product testing, engineering change management, and technical documentation activities.",
      "Assisted in maintaining engineering standards, drawing consistency, and reusable design practices across projects."
    ],
    skills: [
      "SolidWorks", "Siemens NX", "Creo Parametric", "ANSYS Workbench",
      "Oracle ERP", "SLGPDM", "PLM Systems", "BOM Management",
      "Worm Gearbox Design", "GD&T", "FEA", "Technical Documentation",
      "Product Testing", "Manufacturing Processes", "Process Optimization"
    ]
  };

  const internships = [
    {
      title: "Student Intern",
      company: "National Institute Of Ocean Technology",
      location: "Chennai, Tamil Nadu",
      duration: "June 2024 - July 2024",
      type: "Research Internship",
      status: "Completed",
      logo: "/NIOT_LOGO.png",
      images: ["/NIOT IMAGE 1.jpg", "/NIOT IMAGE 2.jpg"],
      description: "Specialized training in marine energy systems and advanced simulation techniques with focus on OTEC & LTDD systems.",
      responsibilities: [
        "Trained in ANSYS Workbench with real-time simulation of marine energy components",
        "Analyzed OTEC & LTDD beam structures for strength and efficiency optimization",
        "Optimized material performance through comprehensive simulation and research methodologies",
        "Conducted structural analysis of marine components under various load conditions"
      ],
      skills: ["ANSYS Workbench", "FEA", "Marine Engineering", "Structural Analysis", "Research Methodology", "OTEC Systems"],
      onCertificate: handleNIOTCertificate,
      onReport: handleNIOTReport,
    },
    {
      title: "Research and Development Intern",
      company: "Super Auto Forge Pvt. Ltd",
      location: "Chennai, Tamil Nadu",
      duration: "May 2025 - July 2025",
      type: "Industrial Internship",
      status: "Completed",
      logo: "/SUPERAUTOFORGE_LOGO.png",
      images: ["/SAF 1.jpg", "/SAF 2.jpg"],
      description: "Hands-on experience in automotive forging processes and manufacturing optimization with advanced CAD modeling.",
      responsibilities: [
        "Assisted in Forging Stage Design & advanced CAD Modeling techniques",
        "Analyzed Material Flow & Defect Prediction via sophisticated simulation tools",
        "Optimized Process Parameters & documented comprehensive process sheets",
        "Developed standardized manufacturing procedures for improved efficiency"
      ],
      skills: ["CAD Design", "Forging Processes", "Material Flow Analysis", "Process Optimization", "Manufacturing", "Quality Control"],
      onCertificate: handleSAFCertificate,
      onReport: handleSAFReport,
    }
  ];

  // Statistics data
  const stats = [
    { value: "Ongoing", label: "Graduate Engineer Trainee", detail: "Full-time Professional Role", icon: TrendingUp },
    { value: "15+", label: "Technical Skills Gained", detail: "CAD, FEA, PLM & Manufacturing", icon: Code2 },
    { value: "2", label: "Completed Internships", detail: "Marine & Automotive Domains", icon: Layers },
  ];

  // Animation variants for header
  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div ref={sectionRef} className="bg-gradient-to-b from-gray-900 to-gray-950 py-20 px-4 md:px-6 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        {/* Animated Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={childVariants} className="inline-block mb-4">
            <div className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 backdrop-blur-sm">
              <span className="text-purple-400 text-sm font-medium flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                My Journey
              </span>
            </div>
          </motion.div>
          <motion.h2 variants={childVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">Experience</span>
          </motion.h2>
          <motion.p variants={childVariants} className="text-gray-400 text-lg max-w-2xl mx-auto">
            Full-time engineering role combined with research internships in marine and automotive domains,
            developing expertise in product design, simulation, and manufacturing optimization.
          </motion.p>
        </motion.div>

        {/* Timeline connector line */}
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-purple-500/20 to-transparent hidden lg:block" />
          
          {/* Professional Experience */}
          <div className="mb-16 relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Current Role</h3>
            </motion.div>
            <ExperienceCard 
              exp={professionalExperience} 
              showButtons={false} 
              index={0} 
              isInView={isInView}
            />
          </div>

          {/* Internships */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Internships & Training</h3>
            </motion.div>
            <div className="space-y-12">
              {internships.map((intern, idx) => (
                <ExperienceCard 
                  key={idx} 
                  exp={intern} 
                  showButtons={true} 
                  index={idx + 1} 
                  isInView={isInView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-purple-900/20 via-gray-900/40 to-purple-900/20 rounded-2xl p-8 border border-purple-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-center bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent mb-8">
              Experience Snapshot
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + idx * 0.1, type: 'spring' }}
                  className="text-center p-6 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <stat.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.value}</div>
                  <div className="text-gray-300 font-medium mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl text-white font-medium hover:from-purple-500 hover:to-purple-600 transition-all shadow-lg hover:shadow-purple-500/25"
          >
            <Download className="w-4 h-4" />
            View Full Resume
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
