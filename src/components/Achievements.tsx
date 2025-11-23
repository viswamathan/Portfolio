import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, CheckCircle, ExternalLink, Download, Star, Trophy, Medal, X, ChevronLeft, ChevronRight, Book, Layers, Clock, Users, GraduationCap, Eye } from 'lucide-react';

// Lazy load heavy components
const LazyImage = lazy(() => import('./LazyImage'));

const Achievements = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());

  // Preload critical images
  const preloadImages = useCallback((imageUrls) => {
    imageUrls.forEach(url => {
      if (!loadedImages.has(url)) {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          setLoadedImages(prev => new Set(prev).add(url));
        };
      }
    });
  }, [loadedImages]);

  const certificates = useMemo(() => [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description: "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "/Certifications/VISWA CSWA.png",
      thumbnail: "/Certifications/thumbnails/VISWA CSWA-thumb.jpg", // Add compressed thumbnails
      skills: ["3D Modeling", "Assembly Design", "Technical Drawings", "Part Configuration", "Design Validation"],
      credentialId: "C-L3G7SF84B9",
      category: "Professional Certification",
      level: "Associate",
      validUntil: "Lifetime",
      highlights: [
        "Demonstrated proficiency in 3D part modeling",
        "Mastered assembly creation and constraints",
        "Skilled in creating technical drawings and annotations",
        "Validated understanding of design intent and best practices",
      ],
    },
  ], []);

  const specializations = useMemo(() => [
    {
      id: 1,
      title: "Additive Manufacturing Specialization",
      issuer: "Arizona State University (Coursera)",
      date: "2024",
      description: "Comprehensive specialization covering additive manufacturing processes, materials, and design principles for advanced manufacturing applications. Mastered various AM technologies including material extrusion, jetting, and laser-based processes.",
      specializationImage: '/Certifications/Additive Manufacturing.png',
      specializationThumbnail: '/Certifications/thumbnails/Additive Manufacturing-thumb.jpg',
      category: "Coursera Specialization",
      level: "Advanced",
      courses: 5,
      duration: "5 months",
      skills: ["Material Extrusion", "Material Jetting", "Stereolithography", "Selective Laser Sintering", "Design for AM", "3D Printing", "Rapid Prototyping"],
      credentialId: "SP-L3G7SF84B1",
      courseCertificates: [
        {
          id: 1,
          title: "Introduction to Additive Manufacturing Processes",
          issuer: "Arizona State University",
          image: '/Certifications/Additive Manufacturing 1.png',
          thumbnail: '/Certifications/thumbnails/Additive Manufacturing 1-thumb.jpg',
          skills: ["AM Fundamentals", "Process Selection", "Technology Overview", "Manufacturing Processes"]
        },
        // ... other courses with thumbnails
      ]
    },
    // ... other specializations with thumbnails
  ], []);

  const achievements = useMemo(() => [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ], []);

  // Animation variants
  const containerVariants = useMemo(() => ({ 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } // Reduced stagger for faster appearance
    } 
  }), []);

  const itemVariants = useMemo(() => ({ 
    hidden: { opacity: 0, y: 20 }, // Reduced y movement
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } // Faster animations
    } 
  }), []);

  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0.98 }, // Less aggressive scale
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } // Faster
    },
    hover: {
      scale: 1.01, // More subtle hover
      y: -4,
      transition: { duration: 0.2, ease: "easeInOut" }
    }
  }), []);

  // Optimized event handlers with useCallback
  const openCoursesModal = useCallback((specialization) => {
    setSelectedSpecialization(specialization);
    setCoursesModalOpen(true);
    
    // Preload course images when modal opens
    if (specialization.courseCertificates) {
      const imageUrls = specialization.courseCertificates.map(course => course.image);
      preloadImages(imageUrls);
    }
  }, [preloadImages]);

  const closeCoursesModal = useCallback(() => {
    setCoursesModalOpen(false);
    setSelectedSpecialization(null);
  }, []);

  const openLightbox = useCallback((specialization, index = 0) => {
    setSelectedSpecialization(specialization);
    setCurrentCertIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setSelectedSpecialization(null);
  }, []);

  const nextCertificate = useCallback(() => {
    if (selectedSpecialization) {
      setCurrentCertIndex((prev) => 
        (prev + 1) % selectedSpecialization.courseCertificates.length
      );
    }
  }, [selectedSpecialization]);

  const prevCertificate = useCallback(() => {
    if (selectedSpecialization) {
      setCurrentCertIndex((prev) => 
        (prev - 1 + selectedSpecialization.courseCertificates.length) % selectedSpecialization.courseCertificates.length
      );
    }
  }, [selectedSpecialization]);

  // Optimized image handler
  const handleImageError = useCallback((e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMWYyOTM3Ii8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOWNhM2FmIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE4Ij5DZXJ0aWZpY2F0ZSBJbWFnZTwvdGV4dD4KPC9zdmc+';
    e.target.alt = 'Certificate image not available';
  }, []);

  // Preload critical images on component mount
  React.useEffect(() => {
    const criticalImages = [
      certificates[0]?.image,
      ...specializations.map(spec => spec.specializationImage)
    ].filter(Boolean);
    
    preloadImages(criticalImages);
  }, [certificates, specializations, preloadImages]);

  // Optimized Image Component
  const OptimizedImage = React.memo(({ 
    src, 
    alt, 
    className, 
    thumbnail, 
    onError,
    ...props 
  }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(thumbnail || src);

    const handleLoad = useCallback(() => {
      setIsLoaded(true);
      // Switch to high-res image after thumbnail loads
      if (thumbnail && currentSrc === thumbnail) {
        const highResImg = new Image();
        highResImg.src = src;
        highResImg.onload = () => {
          setCurrentSrc(src);
        };
        highResImg.onerror = onError;
      }
    }, [src, thumbnail, currentSrc, onError]);

    const handleError = useCallback((e) => {
      if (onError) onError(e);
    }, [onError]);

    return (
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        decoding="async"
        {...props}
      />
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-50px" }} // Reduced margin
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
              <span className="text-gray-300 text-xs sm:text-sm font-medium">Professional Credentials</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 px-4">
              Achievements & 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent block sm:inline"> Certifications</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-4">
              Validated expertise through professional certifications and advanced specializations 
              in mechanical engineering, additive manufacturing, and digital technologies.
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 sm:mb-20">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/40 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border border-gray-700/30 hover:border-purple-500/20 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }} // More subtle hover
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {achievement.count}
                  </div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-sm sm:text-base lg:text-lg">{achievement.title}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{achievement.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Featured Certification */}
          <motion.div variants={itemVariants} className="mb-16 sm:mb-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Featured Certification</h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-gray-400 text-sm">Industry Recognized</p>
                <p className="text-purple-400 font-semibold">Professional Standard</p>
              </div>
            </div>

            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/30 shadow-xl sm:shadow-2xl"
                whileHover="hover"
              >
                <div className="grid xl:grid-cols-2 gap-0">
                  {/* Certificate Image */}
                  <div className="relative p-6 sm:p-8 lg:p-12 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <div className="relative group cursor-pointer w-full">
                      <OptimizedImage
                        src={cert.image}
                        alt={cert.title}
                        thumbnail={cert.thumbnail}
                        className="w-full max-w-md h-auto object-contain rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl"
                        onError={handleImageError}
                      />
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6 sm:p-8 lg:p-12">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
                      <div className="flex-1">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 leading-tight">{cert.title}</h3>
                        <p className="text-purple-400 font-semibold text-base sm:text-lg">{cert.issuer}</p>
                      </div>
                      <div className="w-full sm:w-auto">
                        <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-2 justify-center sm:justify-start">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">Verified</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">{cert.description}</p>

                    {/* Certificate Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Issue Date</h5>
                          <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                            <span className="font-medium text-sm sm:text-base">{cert.date}</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Level</h5>
                          <span className="text-gray-300 font-medium bg-gray-700/50 px-2 sm:px-3 py-1 rounded-lg text-sm">{cert.level}</span>
                        </div>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Credential ID</h5>
                          <span className="text-gray-300 font-mono text-xs sm:text-sm bg-gray-700/50 px-2 sm:px-3 py-1 rounded-lg">{cert.credentialId}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Valid Until</h5>
                          <span className="text-gray-300 font-medium text-sm sm:text-base">{cert.validUntil}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6 sm:mb-8">
                      <h5 className="font-semibold text-purple-300 mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wide">Skills Validated</h5>
                      <div className="flex flex-wrap gap-2 sm:gap-3">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm border border-purple-500/30 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <motion.button
                        className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold justify-center sm:flex-1"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(cert.image, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">View Certificate</span>
                      </motion.button>

                      <motion.button
                        className="flex items-center gap-2 sm:gap-3 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 font-semibold justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = cert.image;
                          link.download = `${cert.title}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base hidden sm:inline">Download</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* University Specializations */}
          <motion.div variants={itemVariants} className="mb-16 sm:mb-20">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                <span className="text-gray-300 text-xs sm:text-sm font-medium">Advanced Specializations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6 px-4">
                University <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Specializations</span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
                Comprehensive professional programs from leading universities focusing on 
                cutting-edge manufacturing technologies and engineering principles.
              </p>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              {specializations.map((specialization) => (
                <motion.div
                  key={specialization.id}
                  variants={cardVariants}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-700/30 shadow-xl sm:shadow-2xl"
                  whileHover="hover"
                >
                  <div className="grid xl:grid-cols-2 gap-0">
                    {/* Specialization Image */}
                    <div className="relative p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                      <div className="relative w-full">
                        <OptimizedImage
                          src={specialization.specializationImage}
                          alt={specialization.title}
                          thumbnail={specialization.specializationThumbnail}
                          className="w-full max-w-lg h-auto object-contain rounded-lg sm:rounded-xl shadow-lg sm:shadow-2xl"
                          onError={handleImageError}
                        />
                      </div>
                    </div>

                    {/* Specialization Details */}
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 leading-tight">{specialization.title}</h3>
                          <p className="text-purple-400 font-semibold text-base">{specialization.issuer}</p>
                        </div>
                        <div className="w-full sm:w-auto">
                          <div className="px-3 py-1 rounded-full border bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-2 justify-center sm:justify-start">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium">Completed</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">{specialization.description}</p>

                      {/* Specialization Info Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Completion Date</h5>
                            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              <span className="font-medium text-sm sm:text-base">{specialization.date}</span>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Level</h5>
                            <span className="text-gray-300 font-medium bg-gray-700/50 px-2 sm:px-3 py-1 rounded-lg text-sm">{specialization.level}</span>
                          </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Duration</h5>
                            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span className="font-medium text-sm sm:text-base">{specialization.duration}</span>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs sm:text-sm uppercase tracking-wide">Courses</h5>
                            <div className="flex items-center gap-2 sm:gap-3 text-gray-300">
                              <Book className="w-4 h-4 text-purple-400" />
                              <span className="font-medium text-sm sm:text-base">{specialization.courses} Modules</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-4 sm:mb-6">
                        <h5 className="font-semibold text-purple-300 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">Core Competencies</h5>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {specialization.skills.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-lg text-xs border border-purple-500/30 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <motion.button
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 font-semibold justify-center sm:flex-1"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openCoursesModal(specialization)}
                        >
                          <Book className="w-4 h-4" />
                          <span className="text-sm sm:text-base">View Courses</span>
                        </motion.button>

                        <div className="flex gap-2 sm:gap-2">
                          <motion.button
                            className="flex items-center gap-1 sm:gap-2 bg-gray-700 hover:bg-gray-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 font-semibold flex-1 justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.open(specialization.specializationImage, "_blank")}
                          >
                            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm hidden sm:inline">Open</span>
                          </motion.button>

                          <motion.button
                            className="flex items-center gap-1 sm:gap-2 bg-gray-700 hover:bg-gray-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-300 font-semibold flex-1 justify-center"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = specialization.specializationImage;
                              link.download = `${specialization.title}.png`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm hidden sm:inline">Download</span>
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Courses Modal */}
      <AnimatePresence>
        {coursesModalOpen && selectedSpecialization && (
          <CoursesModal
            selectedSpecialization={selectedSpecialization}
            closeCoursesModal={closeCoursesModal}
            openLightbox={openLightbox}
            handleImageError={handleImageError}
            OptimizedImage={OptimizedImage}
          />
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedSpecialization && (
          <LightboxModal
            selectedSpecialization={selectedSpecialization}
            currentCertIndex={currentCertIndex}
            closeLightbox={closeLightbox}
            nextCertificate={nextCertificate}
            prevCertificate={prevCertificate}
            handleImageError={handleImageError}
            OptimizedImage={OptimizedImage}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted Modal Components for better performance
const CoursesModal = React.memo(({ 
  selectedSpecialization, 
  closeCoursesModal, 
  openLightbox, 
  handleImageError,
  OptimizedImage 
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl max-w-4xl lg:max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 truncate">{selectedSpecialization.title}</h3>
            <p className="text-purple-400 font-semibold text-sm sm:text-base truncate">{selectedSpecialization.issuer}</p>
          </div>
          <motion.button
            onClick={closeCoursesModal}
            className="p-2 sm:p-3 hover:bg-gray-800 rounded-lg sm:rounded-xl transition-colors flex-shrink-0 ml-2 sm:ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </motion.button>
        </div>

        {/* Courses Grid */}
        <div className="p-4 sm:p-6 lg:p-8 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto">
          <div className="space-y-4 sm:space-y-6">
            {selectedSpecialization.courseCertificates.map((course, index) => (
              <motion.div
                key={course.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden border border-gray-700/30 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }} // Faster stagger
                whileHover={{ scale: 1.005, y: -1 }} // More subtle hover
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Course Image */}
                  <div className="relative p-3 sm:p-4 lg:p-6 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <div className="relative w-full">
                      <OptimizedImage
                        src={course.image}
                        alt={course.title}
                        thumbnail={course.thumbnail}
                        className="w-full h-32 sm:h-40 lg:h-48 object-contain rounded-lg shadow-md"
                        onError={handleImageError}
                      />
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="p-3 sm:p-4 lg:p-6">
                    <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 truncate">{course.title}</h4>
                        <p className="text-blue-400 font-medium text-xs sm:text-sm truncate">{course.issuer}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="bg-green-500/20 text-green-400 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                          Course {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-3 sm:mb-4">
                      <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-xs uppercase tracking-wide">Skills Gained</h5>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {course.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="bg-purple-500/20 text-purple-300 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs border border-purple-500/30 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 sm:gap-3">
                      <motion.button
                        className="flex items-center gap-1 sm:gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 font-semibold flex-1 justify-center text-xs sm:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openLightbox(selectedSpecialization, index)}
                      >
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                        Preview
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors text-xs sm:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(course.image, "_blank")}
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white p-1.5 sm:p-2 rounded-lg transition-colors text-xs sm:text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = course.image;
                          link.download = `${course.title}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

const LightboxModal = React.memo(({ 
  selectedSpecialization, 
  currentCertIndex, 
  closeLightbox, 
  nextCertificate, 
  prevCertificate, 
  handleImageError,
  OptimizedImage 
}) => {
  const currentCert = selectedSpecialization.courseCertificates[currentCertIndex];

  return (
    <motion.div
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeLightbox}
    >
      <motion.div
        className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl max-w-4xl lg:max-w-7xl w-full max-h-[95vh] overflow-hidden border border-purple-500/20 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2 truncate">
              {currentCert.title}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 lg:gap-6 text-sm sm:text-base">
              <p className="text-purple-400 font-semibold truncate">{currentCert.issuer}</p>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-300 font-medium">
                Course {currentCertIndex + 1} of {selectedSpecialization.courseCertificates.length}
              </span>
            </div>
          </div>
          <motion.button
            onClick={closeLightbox}
            className="p-2 sm:p-3 hover:bg-gray-800 rounded-lg sm:rounded-xl transition-colors flex-shrink-0 ml-2 sm:ml-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
          </motion.button>
        </div>

        {/* Certificate Image */}
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8 max-h-[50vh] sm:max-h-[65vh] overflow-auto bg-gray-800/30">
          <OptimizedImage
            key={currentCertIndex}
            src={currentCert.image}
            alt={currentCert.title}
            thumbnail={currentCert.thumbnail}
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={handleImageError}
          />
        </div>

        {/* Footer with Navigation */}
        <div className="p-4 sm:p-6 lg:p-8 border-t border-gray-700/50 bg-gray-800/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="text-gray-300 text-sm sm:text-base lg:text-lg text-center sm:text-left truncate flex-1">
              {selectedSpecialization.title}
            </div>
            
            <div className="flex items-center gap-3 sm:gap-4 order-first sm:order-none">
              <motion.button
                onClick={prevCertificate}
                className="p-2 sm:p-3 lg:p-4 bg-gray-700 hover:bg-purple-600 rounded-lg sm:rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={selectedSpecialization.courseCertificates.length <= 1}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </motion.button>

              <motion.button
                className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl transition-colors font-semibold text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = currentCert.image;
                  link.download = `${currentCert.title}.png`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download
              </motion.button>

              <motion.button
                onClick={nextCertificate}
                className="p-2 sm:p-3 lg:p-4 bg-gray-700 hover:bg-purple-600 rounded-lg sm:rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                disabled={selectedSpecialization.courseCertificates.length <= 1}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default Achievements;
