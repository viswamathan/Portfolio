import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, CheckCircle, ExternalLink, Download, Star, Trophy, Medal, X, ChevronLeft, ChevronRight, Book, Layers, Clock, Users, GraduationCap } from 'lucide-react';

const Achievements = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

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
      title: "Additive Manufacturing Specialization",
      issuer: "Arizona State University (Coursera)",
      date: "2024",
      description: "Comprehensive specialization covering additive manufacturing processes, materials, and design principles for advanced manufacturing applications. Mastered various AM technologies including material extrusion, jetting, and laser-based processes.",
      specializationImage: "additive-manufacturing-specialization.png",
      category: "Coursera Specialization",
      level: "Advanced",
      courses: 5,
      skills: ["Material Extrusion", "Material Jetting", "Stereolithography", "Selective Laser Sintering", "Design for AM", "3D Printing", "Rapid Prototyping"],
      courseCertificates: [
        {
          id: 1,
          title: "Introduction to Additive Manufacturing Processes",
          issuer: "Arizona State University",
          image: "additive-intro-cert.png",
          skills: ["AM Fundamentals", "Process Selection", "Technology Overview", "Manufacturing Processes"]
        },
        {
          id: 2,
          title: "Material Extrusion",
          issuer: "Arizona State University",
          image: "material-extrusion-cert.png",
          skills: ["FDM/FFF", "Material Properties", "Process Parameters", "Extrusion Technology"]
        },
        {
          id: 3,
          title: "Material Jetting and Stereolithography",
          issuer: "Arizona State University",
          image: "material-jetting-cert.png",
          skills: ["SLA", "Material Jetting", "High-Resolution Printing", "Photopolymerization"]
        },
        {
          id: 4,
          title: "Selective Laser Sintering and Metal Laser Powder Bed Fusion",
          issuer: "Arizona State University",
          image: "sls-metal-cert.png",
          skills: ["SLS", "LPBF", "Metal AM", "Post-Processing", "Laser Technology"]
        },
        {
          id: 5,
          title: "Design for Additive Manufacturing",
          issuer: "Arizona State University",
          image: "dfam-cert.png",
          skills: ["DFAM Principles", "Topology Optimization", "Lattice Structures", "Generative Design"]
        }
      ]
    },
    {
      id: 2,
      title: "Digital Technologies and the Future of Manufacturing",
      issuer: "University of Michigan (Coursera)",
      date: "2024",
      description: "Comprehensive exploration of Industry 4.0 technologies transforming modern manufacturing. Focused on IIoT implementation, digital twin technology, and smart factory systems.",
      specializationImage: "digital-tech-specialization.png",
      category: "Coursera Specialization",
      level: "Intermediate",
      courses: 3,
      skills: ["IIoT", "Digital Twins", "Smart Manufacturing", "Industry 4.0", "Data Analytics", "Automation"],
      courseCertificates: [
        {
          id: 1,
          title: "Industrial Internet of Things (IIoT)",
          issuer: "University of Michigan",
          image: "iiot-cert.png",
          skills: ["IoT Sensors", "Data Analytics", "Connectivity", "Industrial Automation"]
        },
        {
          id: 2,
          title: "Digital Twins",
          issuer: "University of Michigan",
          image: "digital-twins-cert.png",
          skills: ["Virtual Modeling", "Simulation", "Real-time Monitoring", "Digital Replication"]
        },
        {
          id: 3,
          title: "Additive Manufacturing",
          issuer: "University of Michigan",
          image: "am-umich-cert.png",
          skills: ["AM Integration", "Digital Workflow", "Quality Control", "Manufacturing Innovation"]
        }
      ]
    },
    {
      id: 3,
      title: "Rapid Prototyping Using 3D Printing",
      issuer: "Arizona State University (Coursera)",
      date: "2024",
      description: "Advanced course focusing on rapid prototyping methodologies and 3D printing applications in engineering product development cycles and design validation processes.",
      specializationImage: "rapid-prototyping-specialization.png",
      category: "Coursera Specialization",
      level: "Intermediate",
      courses: 3,
      skills: ["3D Printing", "Prototyping", "Product Design", "CAD", "Iterative Design", "Product Development"],
      courseCertificates: [
        {
          id: 1,
          title: "Engineering and Product Design Processes",
          issuer: "Arizona State University",
          image: "design-process-cert.png",
          skills: ["Design Thinking", "Product Development", "Iterative Design", "Engineering Methodology"]
        },
        {
          id: 2,
          title: "Prototyping",
          issuer: "Arizona State University",
          image: "prototyping-cert.png",
          skills: ["Prototype Development", "Testing", "Validation", "Design Validation"]
        },
        {
          id: 3,
          title: "3D Printing Technology Deep Dive and Use Cases",
          issuer: "Arizona State University",
          image: "3d-printing-deepdive-cert.png",
          skills: ["Technology Comparison", "Use Cases", "Best Practices", "Industry Applications"]
        }
      ]
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ];

  const containerVariants = { 
    hidden: { opacity: 0 }, 
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    } 
  };

  const itemVariants = { 
    hidden: { opacity: 0, y: 30 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, ease: "easeOut" } 
    } 
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: {
      scale: 1.02,
      y: -8,
      transition: { duration: 0.3, ease: "easeInOut" }
    }
  };

  const openLightbox = (specialization, index = 0) => {
    setSelectedSpecialization(specialization);
    setCurrentCertIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedSpecialization(null);
  };

  const nextCertificate = () => {
    if (selectedSpecialization) {
      setCurrentCertIndex((prev) => 
        (prev + 1) % selectedSpecialization.courseCertificates.length
      );
    }
  };

  const prevCertificate = () => {
    if (selectedSpecialization) {
      setCurrentCertIndex((prev) => 
        (prev - 1 + selectedSpecialization.courseCertificates.length) % selectedSpecialization.courseCertificates.length
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-3 mb-6">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">Professional Credentials</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Achievements & 
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Certifications</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Validated expertise through professional certifications and advanced specializations 
              in mechanical engineering, additive manufacturing, and digital technologies.
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/30 hover:border-purple-500/20 transition-all duration-500 group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-500">
                    <Icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {achievement.count}
                  </div>
                  <h3 className="font-semibold text-white mb-2 text-lg">{achievement.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{achievement.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Featured Certification */}
          <motion.div variants={itemVariants} className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Featured Certification</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Industry Recognized</p>
                <p className="text-purple-400 font-semibold">Professional Standard</p>
              </div>
            </div>

            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/30 shadow-2xl"
                whileHover="hover"
              >
                <div className="grid xl:grid-cols-2 gap-0">
                  {/* Certificate Image */}
                  <div className="relative p-12 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                    <div className="relative group cursor-pointer">
                      <motion.img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full max-w-md h-auto object-contain rounded-xl shadow-2xl"
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.4 }}
                        onClick={() => window.open(cert.image, "_blank")}
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-all duration-500 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <ExternalLink className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="p-12">
                    <div className="flex items-start justify-between mb-8">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3 leading-tight">{cert.title}</h3>
                        <p className="text-purple-400 font-semibold text-lg">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <div className="px-4 py-2 rounded-full border bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Verified</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">{cert.description}</p>

                    {/* Certificate Info Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Issue Date</h5>
                          <div className="flex items-center gap-3 text-gray-300">
                            <Calendar className="w-5 h-5 text-purple-400" />
                            <span className="font-medium">{cert.date}</span>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Level</h5>
                          <span className="text-gray-300 font-medium bg-gray-700/50 px-3 py-1 rounded-lg">{cert.level}</span>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Credential ID</h5>
                          <span className="text-gray-300 font-mono text-sm bg-gray-700/50 px-3 py-1 rounded-lg">{cert.credentialId}</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Valid Until</h5>
                          <span className="text-gray-300 font-medium">{cert.validUntil}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                      <h5 className="font-semibold text-purple-300 mb-4 text-sm uppercase tracking-wide">Skills Validated</h5>
                      <div className="flex flex-wrap gap-3">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-xl text-sm border border-purple-500/30 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      <motion.button
                        className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold flex-1 justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.open(cert.image, "_blank")}
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Certificate
                      </motion.button>

                      <motion.button
                        className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold"
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
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coursera Specializations */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-3 mb-6">
                <Layers className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm font-medium">Advanced Specializations</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                University <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Specializations</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Comprehensive professional programs from leading universities focusing on 
                cutting-edge manufacturing technologies and engineering principles.
              </p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {specializations.map((specialization) => (
                <motion.div
                  key={specialization.id}
                  variants={cardVariants}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/30 hover:border-purple-500/20 transition-all duration-500 group"
                  whileHover="hover"
                >
                  <div className="flex flex-col h-full">
                    {/* Header with University Branding */}
                    <div className="p-8 pb-0">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-purple-300 transition-colors">
                            {specialization.title}
                          </h3>
                          <p className="text-blue-400 font-semibold text-lg">{specialization.issuer}</p>
                        </div>
                        <div className="text-right">
                          <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 px-4 py-2 rounded-xl border border-purple-500/30">
                            <div className="flex items-center gap-2 text-sm font-semibold">
                              <Layers className="w-4 h-4" />
                              {specialization.courses} Courses
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-8 flex-1">
                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                        {specialization.description}
                      </p>

                      {/* Skills Grid */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-purple-300 mb-4 text-sm uppercase tracking-wide">Core Competencies</h4>
                        <div className="flex flex-wrap gap-3">
                          {specialization.skills.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-purple-500/15 text-purple-300 px-4 py-2 rounded-xl text-sm border border-purple-500/20 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer with Actions */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Book className="w-4 h-4 text-blue-400" />
                            <span>{specialization.courses} Modules</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span>Completed</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <motion.button
                            className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => openLightbox(specialization, 0)}
                          >
                            <Book className="w-4 h-4" />
                            View Courses
                          </motion.button>
                          
                          <motion.button
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.open(specialization.specializationImage, "_blank")}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-3xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Explore Full Portfolio</h3>
              <p className="text-gray-400 text-xl mb-8 max-w-2xl mx-auto">
                Access complete documentation of all professional certifications, 
                technical training, and engineering qualifications.
              </p>
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-2xl shadow-purple-500/20"
                whileHover={{ scale: 1.05, shadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                View Complete Portfolio
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedSpecialization && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-purple-500/20 shadow-2xl"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {selectedSpecialization.courseCertificates[currentCertIndex].title}
                  </h3>
                  <div className="flex items-center gap-6 text-lg">
                    <p className="text-purple-400 font-semibold">{selectedSpecialization.courseCertificates[currentCertIndex].issuer}</p>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300 font-medium">
                      Course {currentCertIndex + 1} of {selectedSpecialization.courseCertificates.length}
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={closeLightbox}
                  className="p-3 hover:bg-gray-800 rounded-xl transition-colors ml-6"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-400" />
                </motion.button>
              </div>

              {/* Certificate Image */}
              <div className="flex items-center justify-center p-12 max-h-[65vh] overflow-auto bg-gray-800/30">
                <motion.img
                  key={currentCertIndex}
                  src={selectedSpecialization.courseCertificates[currentCertIndex].image}
                  alt={selectedSpecialization.courseCertificates[currentCertIndex].title}
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              {/* Footer with Navigation */}
              <div className="p-8 border-t border-gray-700/50 bg-gray-800/20">
                <div className="flex items-center justify-between">
                  <div className="text-gray-300 text-lg">
                    {selectedSpecialization.title}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <motion.button
                      onClick={prevCertificate}
                      className="p-4 bg-gray-700 hover:bg-purple-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={selectedSpecialization.courseCertificates.length <= 1}
                    >
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </motion.button>

                    <motion.button
                      className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl transition-colors font-semibold"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const cert = selectedSpecialization.courseCertificates[currentCertIndex];
                        const link = document.createElement("a");
                        link.href = cert.image;
                        link.download = `${cert.title}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="w-5 h-5" />
                      Download Certificate
                    </motion.button>

                    <motion.button
                      onClick={nextCertificate}
                      className="p-4 bg-gray-700 hover:bg-purple-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      disabled={selectedSpecialization.courseCertificates.length <= 1}
                    >
                      <ChevronRight className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Achievements;
