import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, CheckCircle, ExternalLink, Download, Star, Trophy, Medal, X, ChevronLeft, ChevronRight, Book, Layers, Clock, Users } from 'lucide-react';

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
      description: "Comprehensive specialization covering additive manufacturing processes, materials, and design principles for advanced manufacturing applications.",
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
      description: "Exploring Industry 4.0 technologies including IIoT, digital twins, and additive manufacturing shaping modern manufacturing.",
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
      description: "Specialized course focusing on rapid prototyping techniques and 3D printing applications in product development.",
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
      transition: { staggerChildren: 0.1 } 
    } 
  };

  const itemVariants = { 
    hidden: { opacity: 0, y: 20 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    } 
  };

  const lightboxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
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
    <div className="container mx-auto px-6 py-20">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true }}
      >
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Achievements & <span className="text-purple-500">Certifications</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
          Professional certifications and achievements that demonstrate my expertise in mechanical engineering,
          CAD design, additive manufacturing, and continuous learning commitment.
        </motion.p>

        {/* Achievement Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-2">{achievement.count}</div>
                <h3 className="font-semibold text-white mb-1">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Certificate */}
        <motion.div variants={itemVariants} className="mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-400">
            Featured Certification
          </h3>

          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Certificate Image */}
                <div className="relative w-full flex items-center justify-center overflow-hidden p-8">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto max-h-[500px] object-contain cursor-pointer rounded-lg shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => window.open(cert.image, "_blank")}
                  />
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

                  {/* Key Highlights */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-purple-300 mb-3">Key Highlights</h5>
                    <ul className="space-y-2">
                      {cert.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
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
                      Download Certificate
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coursera Specializations */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-400 mb-4">
              Coursera Specializations
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Advanced professional specializations from leading universities demonstrating expertise in modern manufacturing technologies and engineering principles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {specializations.map((specialization) => (
              <motion.div
                key={specialization.id}
                className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-purple-500/10"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex flex-col h-full">
                  {/* Specialization Header with Large Thumbnail */}
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden bg-gradient-to-r from-purple-500/10 to-blue-500/10">
                      <img
                        src={specialization.specializationImage}
                        alt={specialization.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <div className="bg-purple-600/90 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                          <Layers className="w-4 h-4" />
                          {specialization.courses} Courses
                        </div>
                        <div className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {specialization.level}
                        </div>
                      </div>
                      
                      {/* University Badge */}
                      <div className="absolute bottom-4 left-4">
                        <div className="bg-gray-800/90 text-white px-3 py-1 rounded-lg text-sm font-medium border border-gray-600/50">
                          {specialization.issuer.split('(')[0].trim()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {specialization.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 flex-1 line-clamp-3">
                      {specialization.description}
                    </p>

                    {/* Skills */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {specialization.skills.slice(0, 4).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                        {specialization.skills.length > 4 && (
                          <span className="bg-gray-700 text-gray-400 px-3 py-1 rounded-full text-xs">
                            +{specialization.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Book className="w-4 h-4 text-purple-400" />
                          <span>{specialization.courses} modules</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>{specialization.date}</span>
                        </div>
                      </div>
                      <div className="text-green-400 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>Completed</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-gray-700/50">
                      <motion.button
                        className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium flex-1 justify-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openLightbox(specialization, 0)}
                      >
                        <Book className="w-4 h-4" />
                        View All Courses
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-lg transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(specialization.specializationImage, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Certifications Preview */}
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">More Certifications</h3>
          <p className="text-gray-400 mb-6">
            View my complete certification portfolio including technical courses, 
            industry standards, and professional development achievements.
          </p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Certifications
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Lightbox Modal for Course Certificates */}
      <AnimatePresence>
        {lightboxOpen && selectedSpecialization && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl"
              variants={lightboxVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {selectedSpecialization.courseCertificates[currentCertIndex].title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm">
                    <p className="text-purple-400">{selectedSpecialization.courseCertificates[currentCertIndex].issuer}</p>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300">
                      Course {currentCertIndex + 1} of {selectedSpecialization.courseCertificates.length}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Verified
                    </span>
                  </div>
                </div>
                <motion.button
                  onClick={closeLightbox}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors ml-4"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-400" />
                </motion.button>
              </div>

              {/* Certificate Image */}
              <div className="flex items-center justify-center p-8 max-h-[60vh] overflow-auto bg-gray-800/50">
                <motion.img
                  key={currentCertIndex}
                  src={selectedSpecialization.courseCertificates[currentCertIndex].image}
                  alt={selectedSpecialization.courseCertificates[currentCertIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Course Skills */}
              <div className="p-6 border-t border-gray-700">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Course Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpecialization.courseCertificates[currentCertIndex].skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Navigation and Actions */}
              <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800/50">
                <div className="text-gray-300 text-sm">
                  {selectedSpecialization.title} • {selectedSpecialization.issuer}
                </div>
                
                <div className="flex items-center gap-3">
                  {/* Previous Button */}
                  <motion.button
                    onClick={prevCertificate}
                    className="p-3 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={selectedSpecialization.courseCertificates.length <= 1}
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </motion.button>

                  {/* Download Button */}
                  <motion.button
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
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
                    <Download className="w-4 h-4" />
                    Download
                  </motion.button>

                  {/* Next Button */}
                  <motion.button
                    onClick={nextCertificate}
                    className="p-3 bg-gray-700 hover:bg-purple-600 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={selectedSpecialization.courseCertificates.length <= 1}
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </motion.button>
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
