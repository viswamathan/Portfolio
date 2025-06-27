import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { 
  Briefcase, 
  Award, 
  FileText, 
  Star, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  Building, 
  Clock,
  Download,
  ExternalLink,
  Zap,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Eye,
  Share2,
  BookOpen,
  Code,
  Lightbulb
} from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState<{ [key: string]: boolean }>({});
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<{ [key: number]: string }>({});

  const handleNIOTCertificate = () => {
    window.open('/NIOT INTERNSHIP CERTIFICATE.png', '_blank');
  };

  const handleNIOTReport = () => {
    window.open('/INTERNSHIP REPORT.pdf', '_blank');
  };

  const handleUpcomingCertificate = () => {
    window.open('/SAF CERTIFICATE.pdf', '_blank');
  };

  const handleUpcomingReport = () => {
    window.open('/SAF INTERNSHIP REPORT.pdf', '_blank');
  };

  const handleImageLoad = (imageSrc: string) => {
    setImageLoading(prev => ({ ...prev, [imageSrc]: false }));
  };

  const handleImageError = (imageSrc: string) => {
    setImageLoading(prev => ({ ...prev, [imageSrc]: false }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const experiences = [
    {
      title: "Student Intern",
      company: "National Institute Of Ocean Technology",
      location: "Chennai, Tamil Nadu",
      duration: "June 2024 - July 2024",
      type: "Research Internship",
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
      achievements: [
        "Successfully completed 40+ hours of hands-on ANSYS training",
        "Analyzed 5+ different marine component designs",
        "Achieved 15% improvement in structural efficiency through optimization",
        "Presented research findings to senior engineers"
      ],
      technologies: [
        { name: "ANSYS Workbench", level: 85 },
        { name: "FEA Analysis", level: 75 },
        { name: "Marine Systems", level: 70 },
        { name: "Research Methods", level: 80 }
      ],
      onCertificate: handleNIOTCertificate,
      onReport: handleNIOTReport,
      status: "Completed",
      rating: 4.8
    },
    {
      title: "Design Engineer Intern",
      company: "Super Auto Forge",
      location: "Coimbatore, Tamil Nadu",
      duration: "May 2025 - July 2025",
      type: "Industrial Internship",
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
      achievements: [
        "Designed 10+ forging stage configurations",
        "Reduced material waste by 20% through process optimization",
        "Created comprehensive documentation for 15+ processes",
        "Improved production efficiency by 12%"
      ],
      technologies: [
        { name: "CAD Modeling", level: 90 },
        { name: "Process Design", level: 85 },
        { name: "Manufacturing", level: 80 },
        { name: "Quality Systems", level: 75 }
      ],
      onCertificate: handleUpcomingCertificate,
      onReport: handleUpcomingReport,
      status: "Upcoming",
      rating: 4.9
    }
  ];

  const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-w-4xl max-h-[90vh] bg-gray-900 rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.open(src, '_blank')}
              className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-700/80 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full text-white hover:bg-gray-700/80 transition-colors"
            >
              <Maximize2 className="w-5 h-5" />
            </motion.button>
          </div>
          <img
            src={src}
            alt="Experience Detail"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Enhanced Header */}
      <motion.div 
        className="relative mb-16 text-center"
        variants={itemVariants}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Briefcase className="w-32 h-32 text-purple-500" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold relative z-10">
          Professional <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Experience</span>
        </h2>
        <motion.div 
          className="mt-4 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Transforming theoretical knowledge into practical engineering solutions through hands-on industry experience
        </p>
      </motion.div>

      {/* Experience Cards */}
      <div className="space-y-8 lg:space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative"
          >
            {/* Status Badge */}
            <motion.div
              className={`absolute -top-3 left-8 z-20 px-4 py-1 rounded-full text-xs font-bold ${
                exp.status === 'Completed' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {exp.status === 'Completed' ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
              {exp.status}
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-6 sm:p-8 lg:p-10 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:border-purple-500/30 relative overflow-hidden"
              whileHover={{ scale: 1.01, y: -5 }}
              layout
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl" />
              </div>

              {/* Header Section */}
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
                <div className="flex items-start gap-6 mb-6 lg:mb-0 flex-1">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={exp.logo}
                      alt={`${exp.company} Logo`}
                      className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl border-2 border-purple-500/50 shadow-lg object-cover bg-white/10 backdrop-blur-sm"
                      onLoad={() => handleImageLoad(exp.logo)}
                      onError={() => handleImageError(exp.logo)}
                    />
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300"
                      whileHover={{ scale: 1.1 }}
                    />
                    {/* Rating Badge */}
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {exp.rating}
                    </div>
                  </motion.div>

                  <div className="flex-1 min-w-0">
                    <motion.h3 
                      className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-400 mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      {exp.title}
                    </motion.h3>
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white mb-4">
                      {exp.company}
                    </h4>
                    
                    {/* Enhanced Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-gray-400">
                      <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg px-3 py-2">
                        <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg px-3 py-2">
                        <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg px-3 py-2">
                        <Building className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.type}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-800/30 rounded-lg px-3 py-2">
                        <TrendingUp className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">High Impact</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-wrap gap-3 lg:flex-col lg:w-auto">
                  <motion.button
                    onClick={exp.onCertificate}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Certificate</span>
                    <Download className="w-3 h-3 opacity-70" />
                  </motion.button>
                  
                  <motion.button
                    onClick={exp.onReport}
                    className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Report</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </motion.button>

                  <motion.button
                    onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-4 h-4" />
                    <span>{expandedCard === index ? 'Less' : 'More'}</span>
                  </motion.button>
                </div>
              </div>

              {/* Description */}
              <motion.p 
                className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8 max-w-4xl relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {exp.description}
              </motion.p>

              {/* Tabbed Content */}
              <div className="relative z-10">
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-700/50">
                  {['responsibilities', 'skills', 'achievements'].map((tab) => (
                    <motion.button
                      key={tab}
                      onClick={() => setActiveTab(prev => ({ ...prev, [index]: tab }))}
                      className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-all duration-300 ${
                        (activeTab[index] || 'responsibilities') === tab
                          ? 'bg-purple-600/20 text-purple-400 border-b-2 border-purple-500'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tab === 'responsibilities' && <Target className="w-4 h-4 inline mr-1" />}
                      {tab === 'skills' && <Zap className="w-4 h-4 inline mr-1" />}
                      {tab === 'achievements' && <Star className="w-4 h-4 inline mr-1" />}
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab[index] || 'responsibilities'}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="mb-8"
                  >
                    {(activeTab[index] || 'responsibilities') === 'responsibilities' && (
                      <div className="grid lg:grid-cols-2 gap-6">
                        <div>
                          <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-500" />
                            Key Responsibilities
                          </h5>
                          <ul className="space-y-3">
                            {exp.responsibilities.map((item, idx) => (
                              <motion.li 
                                key={idx}
                                className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                whileHover={{ x: 5 }}
                              >
                                <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                                <span>{item}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Technology Proficiency */}
                        <div>
                          <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-purple-500" />
                            Technology Proficiency
                          </h5>
                          <div className="space-y-4">
                            {exp.technologies.map((tech, idx) => (
                              <motion.div
                                key={idx}
                                className="space-y-2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 * idx }}
                              >
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium text-gray-300">{tech.name}</span>
                                  <span className="text-xs text-purple-400">{tech.level}%</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${tech.level}%` }}
                                    transition={{ duration: 1, delay: 0.2 * idx }}
                                  />
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {(activeTab[index] || 'responsibilities') === 'skills' && (
                      <div>
                        <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Zap className="w-5 h-5 text-purple-500" />
                          Skills & Technologies
                        </h5>
                        <div className="flex flex-wrap gap-3">
                          {exp.skills.map((skill, idx) => (
                            <motion.span
                              key={idx}
                              className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * idx }}
                              whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                            >
                              {skill}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(activeTab[index] || 'responsibilities') === 'achievements' && (
                      <div>
                        <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Star className="w-5 h-5 text-purple-500" />
                          Key Achievements
                        </h5>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {exp.achievements.map((achievement, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-start gap-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 p-4 rounded-lg border border-green-500/20"
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              whileHover={{ scale: 1.02 }}
                            >
                              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{achievement}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Enhanced Images Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-10">
                {exp.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group overflow-hidden rounded-2xl cursor-pointer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedImage(image)}
                  >
                    <div className="relative">
                      {imageLoading[image] !== false && (
                        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-2xl" />
                      )}
                      <img 
                        src={image} 
                        alt={`${exp.company} Experience ${idx + 1}`} 
                        className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-2xl border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                        onLoad={() => handleImageLoad(image)}
                        onError={() => handleImageError(image)}
                      />
                    </div>
                    
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end">
                      <div className="p-4 w-full">
                        <p className="text-white text-sm font-medium mb-2">
                          {exp.company} - Experience {idx + 1}
                        </p>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-white" />
                          <span className="text-white text-xs">Click to view full size</span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      whileHover={{ scale: 1.05 }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Expandable Content */}
              <AnimatePresence>
                {expandedCard === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 pt-8 border-t border-gray-700/50 relative z-10"
                  >
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <h6 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <Lightbulb className="w-5 h-5" />
                            Learning Outcomes
                          </h6>
                          <ul className="space-y-2 text-gray-300 text-sm">
                            <li>• Advanced technical skills in industry-standard software</li>
                            <li>• Real-world problem-solving methodologies</li>
                            <li>• Professional communication and teamwork</li>
                            <li>• Project management and time optimization</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h6 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            Future Applications
                          </h6>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            The knowledge and skills gained during this internship will be directly applicable to future engineering projects, 
                            research initiatives, and professional development in the mechanical engineering field.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-6 border border-purple-500/20">
                        <h6 className="text-lg font-semibold text-purple-400 mb-4">Quick Stats</h6>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{exp.responsibilities.length}</div>
                            <div className="text-xs text-gray-400">Key Tasks</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{exp.skills.length}</div>
                            <div className="text-xs text-gray-400">Skills Gained</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{exp.achievements.length}</div>
                            <div className="text-xs text-gray-400">Achievements</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{exp.rating}</div>
                            <div className="text-xs text-gray-400">Rating</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Experience Summary */}
      <motion.div
        variants={itemVariants}
        className="mt-16 lg:mt-20 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-3xl p-8 lg:p-12 border border-purple-500/20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl" />
        </div>

        <div className="relative z-10">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-purple-400 mb-8">
            Experience Impact & Growth
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { value: "2+", label: "Months of Experience", icon: Clock },
              { value: "10+", label: "Technical Skills", icon: Zap },
              { value: "100%", label: "Project Success", icon: CheckCircle },
              { value: "4.8+", label: "Average Rating", icon: Star }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Each internship experience has contributed significantly to my professional development, 
              providing hands-on expertise in cutting-edge engineering technologies and methodologies.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal 
          src={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </motion.div>
  );
};

export default Experience;