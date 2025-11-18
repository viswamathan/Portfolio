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
  BookOpen, 
  Layers, 
  Cogs 
} from 'lucide-react';

const Achievements = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const certificates = [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description: "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "/certificates/VISWA-CSWA.png",
      skills: [
        "3D Modeling",
        "Assembly Design",
        "Technical Drawings",
        "Part Configuration",
        "Design Validation",
      ],
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
      issuer: "Arizona State University",
      mainImage: "/certificates/additive-manufacturing-specialization.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "5 months",
      level: "Advanced",
      technologies: ["3D Printing", "SLS", "FDM", "SLA", "Metal AM"],
      description: "Comprehensive specialization covering advanced additive manufacturing processes, materials, and design methodologies for industrial applications.",
      courses: [
        {
          title: "Introduction to Additive Manufacturing Processes",
          duration: "4 weeks",
          skills: ["AM Fundamentals", "Process Selection", "Technology Overview"]
        },
        {
          title: "Material Extrusion",
          duration: "3 weeks",
          skills: ["FDM/FFF", "Material Science", "Process Parameters"]
        },
        {
          title: "Material Jetting and Stereolithography",
          duration: "4 weeks",
          skills: ["SLA", "PolyJet", "Photopolymers", "High Resolution Printing"]
        },
        {
          title: "Selective Laser Sintering and Metal Laser Powder Bed Fusion",
          duration: "5 weeks",
          skills: ["SLS", "DMLS", "SLM", "Metal AM", "Post-Processing"]
        },
        {
          title: "Design for Additive Manufacturing",
          duration: "4 weeks",
          skills: ["DFAM", "Topology Optimization", "Lattice Structures", "Support Design"]
        }
      ],
      certificateImages: [
        "/certificates/additive-manufacturing-1.png",
        "/certificates/additive-manufacturing-2.png",
        "/certificates/additive-manufacturing-3.png",
        "/certificates/additive-manufacturing-4.png",
        "/certificates/additive-manufacturing-5.png"
      ]
    },
    {
      id: 2,
      title: "Digital Technologies and the Future of Manufacturing",
      issuer: "University of Michigan",
      mainImage: "/certificates/digital-tech-manufacturing.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Intermediate",
      technologies: ["IIoT", "Digital Twins", "Industry 4.0", "Smart Manufacturing"],
      description: "Exploring cutting-edge digital technologies transforming modern manufacturing through IIoT, digital twins, and additive manufacturing integration.",
      courses: [
        {
          title: "Industrial Internet of Things (IIoT)",
          duration: "4 weeks",
          skills: ["Sensor Networks", "Data Acquisition", "Cloud Platforms", "Real-time Monitoring"]
        },
        {
          title: "Digital Twins",
          duration: "5 weeks",
          skills: ["Virtual Modeling", "Simulation", "Predictive Analytics", "Digital Thread"]
        },
        {
          title: "Additive Manufacturing in Digital Context",
          duration: "3 weeks",
          skills: ["AM Integration", "Digital Workflow", "Quality Assurance"]
        }
      ],
      certificateImages: [
        "/certificates/digital-tech-1.png",
        "/certificates/digital-tech-2.png",
        "/certificates/digital-tech-3.png"
      ]
    },
    {
      id: 3,
      title: "Rapid Prototyping Using 3D Printing",
      issuer: "Arizona State University",
      mainImage: "/certificates/rapid-prototyping-3d.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Intermediate",
      technologies: ["FDM", "SLA", "Prototyping", "Design Thinking"],
      description: "Hands-on specialization focusing on practical applications of 3D printing for rapid prototyping and product development cycles.",
      courses: [
        {
          title: "Engineering and Product Design Processes",
          duration: "3 weeks",
          skills: ["Design Thinking", "Iterative Design", "User-Centered Design"]
        },
        {
          title: "Prototyping Methodologies",
          duration: "4 weeks",
          skills: ["Rapid Prototyping", "Validation Testing", "Feedback Integration"]
        },
        {
          title: "3D Printing Technology Deep Dive and Use Cases",
          duration: "5 weeks",
          skills: ["Technology Comparison", "Material Selection", "Case Studies", "Best Practices"]
        }
      ],
      certificateImages: [
        "/certificates/rapid-prototyping-1.png",
        "/certificates/rapid-prototyping-2.png",
        "/certificates/rapid-prototyping-3.png"
      ]
    },
    {
      id: 4,
      title: "Rapid Prototyping and Tooling",
      issuer: "Arizona State University",
      mainImage: "/certificates/rapid-prototyping-tooling.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Advanced",
      technologies: ["Electronics Integration", "Tooling", "Advanced Materials"],
      description: "Advanced techniques in rapid prototyping with focus on electronics integration and production tooling applications.",
      courses: [
        {
          title: "Using Rapid Prototyping in the Engineering Design Process",
          duration: "4 weeks",
          skills: ["Design Integration", "Workflow Optimization", "Quality Control"]
        },
        {
          title: "Adding Electronics to Rapid Prototypes",
          duration: "5 weeks",
          skills: ["Embedded Systems", "PCB Integration", "Sensor Implementation", "Wireless Connectivity"]
        },
        {
          title: "Rapid Prototyping Materials and Tooling",
          duration: "4 weeks",
          skills: ["Advanced Materials", "Mold Making", "Production Tooling", "Material Properties"]
        }
      ],
      certificateImages: [
        "/certificates/prototyping-tooling-1.png",
        "/certificates/prototyping-tooling-2.png",
        "/certificates/prototyping-tooling-3.png"
      ]
    },
    {
      id: 5,
      title: "The Engineering of Structures Around Us",
      issuer: "Dartmouth College",
      mainImage: "/certificates/engineering-structures.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "5 months",
      level: "Intermediate",
      technologies: ["Structural Analysis", "FEA", "Load Analysis", "Material Mechanics"],
      description: "Comprehensive structural engineering principles covering tension, compression, shear, and bending in real-world applications.",
      courses: [
        {
          title: "Engineering of Structures: Tension",
          duration: "3 weeks",
          skills: ["Tensile Analysis", "Material Strength", "Safety Factors"]
        },
        {
          title: "Engineering of Structures: Compression",
          duration: "3 weeks",
          skills: ["Compressive Loads", "Buckling Analysis", "Column Design"]
        },
        {
          title: "Engineering of Structures: Tension and Compression",
          duration: "4 weeks",
          skills: ["Combined Loading", "Stress Analysis", "Structural Optimization"]
        },
        {
          title: "Engineering of Structures: Shear and Bending",
          duration: "4 weeks",
          skills: ["Shear Stress", "Bending Moments", "Beam Design", "Deflection Analysis"]
        },
        {
          title: "Engineering of Structures: Response of Structures",
          duration: "4 weeks",
          skills: ["Dynamic Analysis", "Vibration", "Seismic Design", "Structural Response"]
        }
      ],
      certificateImages: [
        "/certificates/structures-1.png",
        "/certificates/structures-2.png",
        "/certificates/structures-3.png",
        "/certificates/structures-4.png",
        "/certificates/structures-5.png"
      ]
    },
    {
      id: 6,
      title: "Digital Manufacturing & Design Technology",
      issuer: "University at Buffalo, The State University of New York",
      mainImage: "/certificates/digital-manufacturing-design.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "9 months",
      level: "Advanced",
      technologies: ["Digital Thread", "MBSE", "Cybersecurity", "Intelligent Machining"],
      description: "Comprehensive digital manufacturing ecosystem covering design, implementation, cybersecurity, and advanced manufacturing systems.",
      courses: [
        {
          title: "Digital Manufacturing & Design",
          duration: "4 weeks",
          skills: ["Digital Transformation", "Manufacturing 4.0", "Digital Ecosystem"]
        },
        {
          title: "Digital Thread: Components",
          duration: "4 weeks",
          skills: ["Data Integration", "System Components", "Interoperability"]
        },
        {
          title: "Digital Thread: Implementation",
          duration: "5 weeks",
          skills: ["Implementation Strategy", "System Integration", "Change Management"]
        },
        {
          title: "Advanced Manufacturing Process Analysis",
          duration: "4 weeks",
          skills: ["Process Optimization", "Statistical Analysis", "Quality Engineering"]
        },
        {
          title: "Intelligent Machining",
          duration: "4 weeks",
          skills: ["Smart Machines", "Predictive Maintenance", "AI in Manufacturing"]
        },
        {
          title: "Advanced Manufacturing Enterprise",
          duration: "5 weeks",
          skills: ["Enterprise Systems", "Supply Chain", "Business Integration"]
        },
        {
          title: "Cyber Security in Manufacturing",
          duration: "4 weeks",
          skills: ["Industrial Security", "Network Protection", "Data Integrity"]
        },
        {
          title: "MBSE: Model-Based Systems Engineering",
          duration: "5 weeks",
          skills: ["Systems Modeling", "Requirements Engineering", "Model Validation"]
        },
        {
          title: "Roadmap to Success in Digital Manufacturing & Design",
          duration: "3 weeks",
          skills: ["Career Planning", "Industry Trends", "Implementation Roadmap"]
        }
      ],
      certificateImages: [
        "/certificates/digital-mfg-1.png",
        "/certificates/digital-mfg-2.png",
        "/certificates/digital-mfg-3.png",
        "/certificates/digital-mfg-4.png",
        "/certificates/digital-mfg-5.png",
        "/certificates/digital-mfg-6.png",
        "/certificates/digital-mfg-7.png",
        "/certificates/digital-mfg-8.png",
        "/certificates/digital-mfg-9.png"
      ]
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ];

  const openLightbox = (specialization, index = 0) => {
    setSelectedSpecialization(specialization);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedSpecialization(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedSpecialization) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedSpecialization.certificateImages.length
      );
    }
  };

  const prevImage = () => {
    if (selectedSpecialization) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedSpecialization.certificateImages.length - 1 : prev - 1
      );
    }
  };

  const handleDownload = (imageUrl, fileName) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Achievements & <span className="text-purple-500">Certifications</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-3xl mx-auto">
              Professional certifications and achievements that demonstrate my expertise in mechanical engineering,
              CAD design, and continuous learning commitment.
            </p>
          </motion.div>

          {/* Achievement Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-1 sm:mb-2">
                    {achievement.count}
                  </div>
                  <h3 className="font-semibold text-white text-sm sm:text-base mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 text-xs sm:text-sm">
                    {achievement.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Featured Certificate */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-purple-400">
              Featured Certification
            </h2>

            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Certificate Image */}
                  <div className="relative w-full flex items-center justify-center overflow-hidden p-4 sm:p-6">
                    <motion.img
                      src={cert.image}
                      alt={cert.title}
                      className="w-full h-auto max-h-[400px] sm:max-h-[500px] object-contain cursor-pointer rounded-lg"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => window.open(cert.image, "_blank")}
                    />
                  </div>

                  {/* Certificate Details */}
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 sm:mb-6">
                      <div className="mb-3 sm:mb-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {cert.title}
                        </h3>
                        <p className="text-purple-400 font-medium">{cert.issuer}</p>
                      </div>
                      <div className="text-right">
                        <div className="px-3 py-1 rounded-full text-xs border bg-green-500/20 text-green-400 border-green-500/30 inline-flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Certified
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                      {cert.description}
                    </p>

                    {/* Certificate Info Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-sm">Issue Date</h5>
                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-sm">Level</h5>
                        <span className="text-gray-300 text-sm">{cert.level}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-sm">Credential ID</h5>
                        <span className="text-gray-300 font-mono text-xs">{cert.credentialId}</span>
                      </div>
                      <div>
                        <h5 className="font-semibold text-purple-300 mb-1 sm:mb-2 text-sm">Valid Until</h5>
                        <span className="text-gray-300 text-sm">{cert.validUntil}</span>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-4 sm:mb-6">
                      <h5 className="font-semibold text-purple-300 mb-2 sm:mb-3 text-sm">Skills Validated</h5>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {cert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs border border-purple-500/30"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="mb-4 sm:mb-6">
                      <h5 className="font-semibold text-purple-300 mb-2 sm:mb-3 text-sm">Key Highlights</h5>
                      <ul className="space-y-1 sm:space-y-2">
                        {cert.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300 text-xs sm:text-sm">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <motion.button
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(cert.image, "_blank")}
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Certificate
                      </motion.button>

                      <motion.button
                        className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition-colors font-medium text-sm sm:text-base flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleDownload(cert.image, `${cert.title}.png`)}
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

          {/* Technical Specializations */}
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-purple-400">
              Technical Specializations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {specializations.map((specialization) => (
                <motion.div
                  key={specialization.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 group"
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {/* Specialization Icon */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                    <Layers className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  </div>
                  
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {specialization.title}
                  </h3>
                  
                  <p className="text-purple-400 font-medium text-sm sm:text-base mb-2">
                    {specialization.issuer}
                  </p>
                  
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
                    {specialization.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                    {specialization.technologies.slice(0, 3).map((tech, index) => (
                      <span key={index} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {specialization.technologies.length > 3 && (
                      <span className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                        +{specialization.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{specialization.courses.length} courses</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>{specialization.duration}</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <motion.button
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors flex-1 justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => openLightbox(specialization)}
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                      View Certificates
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-xs sm:text-sm transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSpecialization(specialization)}
                    >
                      <Cogs className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Lightbox Modal */}
          <AnimatePresence>
            {lightboxOpen && selectedSpecialization && (
              <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeLightbox}
              >
                <motion.div
                  className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">
                        {selectedSpecialization.title}
                      </h3>
                      <p className="text-purple-400 text-sm">
                        Certificate {currentImageIndex + 1} of {selectedSpecialization.certificateImages.length}
                      </p>
                    </div>
                    <button
                      onClick={closeLightbox}
                      className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative flex items-center justify-center p-4 sm:p-8">
                    <motion.img
                      key={currentImageIndex}
                      src={selectedSpecialization.certificateImages[currentImageIndex]}
                      alt={`Certificate ${currentImageIndex + 1}`}
                      className="max-w-full max-h-[50vh] sm:max-h-[60vh] object-contain rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Navigation Arrows */}
                    {selectedSpecialization.certificateImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 sm:left-4 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 sm:right-4 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-4 sm:p-6 border-t border-gray-700">
                    <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
                      {selectedSpecialization.courses[currentImageIndex]?.title}
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {selectedSpecialization.courses[currentImageIndex]?.skills.map((skill, index) => (
                        <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Specialization Detail Modal */}
          <AnimatePresence>
            {selectedSpecialization && !lightboxOpen && (
              <motion.div
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSpecialization(null)}
              >
                <motion.div
                  className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4 sm:mb-6">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                          {selectedSpecialization.title}
                        </h3>
                        <p className="text-purple-400 text-lg">{selectedSpecialization.issuer}</p>
                      </div>
                      <button
                        onClick={() => setSelectedSpecialization(null)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 sm:mb-4">Course Curriculum</h4>
                        <div className="space-y-3">
                          {selectedSpecialization.courses.map((course, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-3 sm:p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-white text-sm sm:text-base">{course.title}</h5>
                                <span className="text-purple-400 text-xs sm:text-sm bg-purple-500/20 px-2 py-1 rounded ml-2">
                                  {course.duration}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {course.skills.map((skill, skillIndex) => (
                                  <span key={skillIndex} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 sm:mb-4">Specialization Details</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-purple-300 mb-2 text-sm sm:text-base">Technologies Covered</h5>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {selectedSpecialization.technologies.map((tech, index) => (
                                <span key={index} className="bg-purple-500/20 text-purple-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            <div>
                              <h5 className="text-purple-300 mb-1 text-sm">Level</h5>
                              <p className="text-white text-sm">{selectedSpecialization.level}</p>
                            </div>
                            <div>
                              <h5 className="text-purple-300 mb-1 text-sm">Duration</h5>
                              <p className="text-white text-sm">{selectedSpecialization.duration}</p>
                            </div>
                            <div>
                              <h5 className="text-purple-300 mb-1 text-sm">Courses</h5>
                              <p className="text-white text-sm">{selectedSpecialization.courses.length}</p>
                            </div>
                            <div>
                              <h5 className="text-purple-300 mb-1 text-sm">Completed</h5>
                              <p className="text-white text-sm">{selectedSpecialization.date}</p>
                            </div>
                          </div>

                          <motion.button
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openLightbox(selectedSpecialization)}
                          >
                            View All Certificates ({selectedSpecialization.certificateImages.length})
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Explore More Certifications</h3>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Dive deeper into my technical expertise and professional development journey.
            </p>
            <motion.button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Complete Portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
export default Achievements;
