import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Calendar, 
  CheckCircle, 
  ExternalLink, 
  Download, 
  Star, 
  Trophy, 
  Medal,
  X,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Factory,
  Printer,
  Cogs,
  Shield,
  Brain,
  Network,
  BookOpen
} from 'lucide-react';

const Achievements = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const certificates = [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description: "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "VISWA CSWA.png",
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
  ];

  const specializations = [
    {
      id: 1,
      title: "Additive Manufacturing",
      issuer: "Arizona State University",
      image: "additive-manufacturing-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Printer,
      courses: [
        "Introduction to Additive Manufacturing Processes",
        "Material Extrusion",
        "Material Jetting and Stereolithography",
        "Selective Laser Sintering and Metal Laser Powder Bed Fusion",
        "Design for Additive Manufacturing"
      ],
      color: "from-blue-500 to-cyan-500",
      thumbnail: "additive-manufacturing-thumbnail.png", // Main specialization certificate
      allCertificates: [
        "additive-manufacturing-cert-1.png",
        "additive-manufacturing-cert-2.png",
        "additive-manufacturing-cert-3.png",
        "additive-manufacturing-cert-4.png",
        "additive-manufacturing-cert-5.png"
      ]
    },
    {
      id: 2,
      title: "Digital Technologies and the Future of Manufacturing",
      issuer: "University of Michigan",
      image: "digital-tech-manufacturing-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Cpu,
      courses: [
        "Industrial Internet of Things (IIoT)",
        "Digital Twins",
        "Additive Manufacturing"
      ],
      color: "from-green-500 to-emerald-500",
      thumbnail: "digital-tech-thumbnail.png",
      allCertificates: [
        "digital-tech-cert-1.png",
        "digital-tech-cert-2.png",
        "digital-tech-cert-3.png"
      ]
    },
    {
      id: 3,
      title: "Rapid Prototyping Using 3D Printing",
      issuer: "Arizona State University",
      image: "rapid-prototyping-3d-printing-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Printer,
      courses: [
        "Engineering and Product Design Processes",
        "Prototyping",
        "3D Printing Technology Deep Dive and Use Cases"
      ],
      color: "from-purple-500 to-pink-500",
      thumbnail: "rapid-prototyping-thumbnail.png",
      allCertificates: [
        "rapid-prototyping-cert-1.png",
        "rapid-prototyping-cert-2.png",
        "rapid-prototyping-cert-3.png"
      ]
    },
    {
      id: 4,
      title: "Rapid Prototyping and Tooling",
      issuer: "Arizona State University",
      image: "rapid-prototyping-tooling-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Cogs,
      courses: [
        "Using Rapid Prototyping in the Engineering Design Process",
        "Adding Electronics to Rapid Prototypes",
        "Rapid Prototyping Materials and Tooling"
      ],
      color: "from-orange-500 to-red-500",
      thumbnail: "prototyping-tooling-thumbnail.png",
      allCertificates: [
        "prototyping-tooling-cert-1.png",
        "prototyping-tooling-cert-2.png",
        "prototyping-tooling-cert-3.png"
      ]
    },
    {
      id: 5,
      title: "The Engineering of Structures Around Us",
      issuer: "Dartmouth College",
      image: "engineering-structures-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Network,
      courses: [
        "Engineering of Structures: Tension",
        "Engineering of Structures: Compression",
        "Engineering of Structures: Tension and Compression",
        "Engineering of Structures: Shear and Bending",
        "Engineering of Structures: Response of Structures"
      ],
      color: "from-indigo-500 to-blue-500",
      thumbnail: "engineering-structures-thumbnail.png",
      allCertificates: [
        "structures-cert-1.png",
        "structures-cert-2.png",
        "structures-cert-3.png",
        "structures-cert-4.png",
        "structures-cert-5.png"
      ]
    },
    {
      id: 6,
      title: "Digital Manufacturing & Design Technology",
      issuer: "University at Buffalo, The State University of New York",
      image: "digital-manufacturing-design-cert.png",
      category: "Coursera Specialization",
      date: "2024",
      icon: Factory,
      courses: [
        "Digital Manufacturing & Design",
        "Digital Thread: Components & Implementation",
        "Advanced Manufacturing Process Analysis",
        "Intelligent Machining",
        "Advanced Manufacturing Enterprise",
        "Cyber Security in Manufacturing",
        "MBSE: Model-Based Systems Engineering",
        "Roadmap to Success in Digital Manufacturing & Design"
      ],
      color: "from-teal-500 to-green-500",
      thumbnail: "digital-manufacturing-thumbnail.png",
      allCertificates: [
        "digital-mfg-cert-1.png",
        "digital-mfg-cert-2.png",
        "digital-mfg-cert-3.png",
        "digital-mfg-cert-4.png",
        "digital-mfg-cert-5.png",
        "digital-mfg-cert-6.png",
        "digital-mfg-cert-7.png",
        "digital-mfg-cert-8.png",
        "digital-mfg-cert-9.png"
      ]
    },
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ];

  const openLightbox = (specializationIndex, certificateIndex = 0) => {
    setCurrentImageIndex(specializationIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateImage = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % specializations.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + specializations.length) % specializations.length);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  const currentSpecialization = specializations[currentImageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50 mb-6">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">Technical Achievements</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Engineering
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Advanced technical certifications and specializations in modern manufacturing technologies, 
              digital transformation, and engineering innovation.
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-purple-400 mb-2">{achievement.count}</div>
                  <h3 className="font-semibold text-white mb-1">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm">{achievement.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Specialization Thumbnail Section */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Specialization Portfolio
              </h3>
              <div className="flex items-center gap-2 text-gray-400">
                <BookOpen className="w-5 h-5" />
                <span>{specializations.length} Specializations</span>
              </div>
            </div>

            {/* Main Thumbnail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {specializations.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <motion.div
                    key={spec.id}
                    className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    {/* Thumbnail Header */}
                    <div className={`bg-gradient-to-r ${spec.color} p-6`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                          <span className="bg-black/30 text-white px-3 py-1 rounded-full text-sm">
                            {spec.courses.length} Courses
                          </span>
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">{spec.title}</h4>
                      <p className="text-white/80 text-sm">{spec.issuer}</p>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="p-6">
                      <div className="relative rounded-lg overflow-hidden bg-gray-900/50 border border-gray-700/50 mb-4">
                        <img
                          src={spec.thumbnail || spec.image}
                          alt={spec.title}
                          className="w-full h-48 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                          onClick={() => openLightbox(index)}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Course List */}
                      <div className="space-y-2 mb-4">
                        {spec.courses.slice(0, 3).map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <span className="truncate">{course}</span>
                          </div>
                        ))}
                        {spec.courses.length > 3 && (
                          <div className="text-sm text-purple-400 font-medium">
                            +{spec.courses.length - 3} more courses
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openLightbox(index)}
                        >
                          <BookOpen className="w-4 h-4" />
                          View Certificates
                        </motion.button>
                        <motion.button
                          className="px-4 py-3 border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 rounded-lg transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = spec.image;
                            link.download = `${spec.title}.png`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Featured Professional Certification */}
          <motion.div variants={itemVariants} className="mb-20">
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12 text-white">
              Professional <span className="text-purple-400">Certification</span>
            </h3>

            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Certificate Image */}
                  <div className="relative w-full flex items-center justify-center p-8">
                    <motion.div
                      className="relative cursor-pointer group"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                      onClick={() => window.open(cert.image, "_blank")}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-auto max-h-[400px] object-contain rounded-lg shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-white mb-2">{cert.title}</h4>
                        <p className="text-purple-400 font-medium">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1 rounded-full text-xs border bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          Certified
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed">{cert.description}</p>

                    {/* Certificate Info Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Issue Date</h5>
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Level</h5>
                        <span className="text-gray-300">{cert.level}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Credential ID</h5>
                        <span className="text-gray-300 font-mono text-sm">{cert.credentialId}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-2">Valid Until</h5>
                        <span className="text-gray-300">{cert.validUntil}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-purple-300 mb-3">Skills Validated</h5>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <motion.button
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(cert.image, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </motion.button>
                      <motion.button
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const link = document.createElement("a");
                          link.href = cert.image;
                          link.download = `${cert.title}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && (
              <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <motion.div
                  className="relative bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
                  variants={modalVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {currentSpecialization.title}
                      </h3>
                      <p className="text-gray-400">{currentSpecialization.issuer}</p>
                    </div>
                    <button
                      onClick={closeLightbox}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Certificate Display */}
                      <div className="relative">
                        <div className="bg-gray-800 rounded-lg p-4 mb-4">
                          <img
                            src={currentSpecialization.thumbnail || currentSpecialization.image}
                            alt={currentSpecialization.title}
                            className="w-full h-auto max-h-[500px] object-contain rounded"
                          />
                        </div>
                        <div className="flex gap-3">
                          <motion.button
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(currentSpecialization.image, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open Full Size
                          </motion.button>
                          <motion.button
                            className="px-6 py-3 border border-gray-600 text-gray-300 hover:border-purple-500 hover:text-purple-400 rounded-lg transition-all duration-300 flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              const link = document.createElement("a");
                              link.href = currentSpecialization.image;
                              link.download = `${currentSpecialization.title}.png`;
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            }}
                          >
                            <Download className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>

                      {/* Course Details */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4">Course Curriculum</h4>
                        <div className="space-y-3 max-h-[400px] overflow-y-auto">
                          {currentSpecialization.courses.map((course, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
                              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              <span className="text-gray-300">{course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/80 hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>

                  {/* Navigation Dots */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {specializations.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex 
                            ? 'bg-purple-500' 
                            : 'bg-gray-600 hover:bg-gray-500'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Achievements;
