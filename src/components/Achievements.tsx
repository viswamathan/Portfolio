import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Cogs,
} from "lucide-react";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  image: string;
  skills: string[];
  credentialId: string;
  category?: string;
  level?: string;
  validUntil?: string;
  highlights: string[];
};

type Course = {
  title: string;
  duration: string;
  skills: string[];
};

type Specialization = {
  id: number;
  title: string;
  issuer: string;
  mainImage: string;
  category?: string;
  date: string;
  duration: string;
  level?: string;
  technologies: string[];
  description: string;
  courses: Course[];
  certificateImages: string[];
};

type AchievementItem = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  count: string;
  description: string;
};

const Achievements: React.FC = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState<Specialization | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const certificates: Certificate[] = [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description:
        "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "/assets/VISWA CSWA.png",
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

  const specializations: Specialization[] = [
    {
      id: 1,
      title: "Additive Manufacturing Specialization",
      issuer: "Arizona State University",
      mainImage: "/assets/additive-manufacturing-specialization.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "5 months",
      level: "Advanced",
      technologies: ["3D Printing", "SLS", "FDM", "SLA", "Metal AM"],
      description:
        "Comprehensive specialization covering advanced additive manufacturing processes, materials, and design methodologies for industrial applications.",
      courses: [
        {
          title: "Introduction to Additive Manufacturing Processes",
          duration: "4 weeks",
          skills: ["AM Fundamentals", "Process Selection", "Technology Overview"],
        },
        {
          title: "Material Extrusion",
          duration: "3 weeks",
          skills: ["FDM/FFF", "Material Science", "Process Parameters"],
        },
        {
          title: "Material Jetting and Stereolithography",
          duration: "4 weeks",
          skills: ["SLA", "PolyJet", "Photopolymers", "High Resolution Printing"],
        },
        {
          title: "Selective Laser Sintering and Metal Laser Powder Bed Fusion",
          duration: "5 weeks",
          skills: ["SLS", "DMLS", "SLM", "Metal AM", "Post-Processing"],
        },
        {
          title: "Design for Additive Manufacturing",
          duration: "4 weeks",
          skills: ["DFAM", "Topology Optimization", "Lattice Structures", "Support Design"],
        },
      ],
      certificateImages: [
        "/assets/additive-manufacturing-1.png",
        "/assets/additive-manufacturing-2.png",
        "/assets/additive-manufacturing-3.png",
        "/assets/additive-manufacturing-4.png",
        "/assets/additive-manufacturing-5.png",
      ],
    },
    {
      id: 2,
      title: "Digital Technologies and the Future of Manufacturing",
      issuer: "University of Michigan",
      mainImage: "/assets/digital-tech-manufacturing.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Intermediate",
      technologies: ["IIoT", "Digital Twins", "Industry 4.0", "Smart Manufacturing"],
      description:
        "Exploring cutting-edge digital technologies transforming modern manufacturing through IIoT, digital twins, and additive manufacturing integration.",
      courses: [
        {
          title: "Industrial Internet of Things (IIoT)",
          duration: "4 weeks",
          skills: ["Sensor Networks", "Data Acquisition", "Cloud Platforms", "Real-time Monitoring"],
        },
        {
          title: "Digital Twins",
          duration: "5 weeks",
          skills: ["Virtual Modeling", "Simulation", "Predictive Analytics", "Digital Thread"],
        },
        {
          title: "Additive Manufacturing in Digital Context",
          duration: "3 weeks",
          skills: ["AM Integration", "Digital Workflow", "Quality Assurance"],
        },
      ],
      certificateImages: ["/assets/digital-tech-1.png", "/assets/digital-tech-2.png", "/assets/digital-tech-3.png"],
    },
    {
      id: 3,
      title: "Rapid Prototyping Using 3D Printing",
      issuer: "Arizona State University",
      mainImage: "/assets/rapid-prototyping-3d.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Intermediate",
      technologies: ["FDM", "SLA", "Prototyping", "Design Thinking"],
      description:
        "Hands-on specialization focusing on practical applications of 3D printing for rapid prototyping and product development cycles.",
      courses: [
        {
          title: "Engineering and Product Design Processes",
          duration: "3 weeks",
          skills: ["Design Thinking", "Iterative Design", "User-Centered Design"],
        },
        {
          title: "Prototyping Methodologies",
          duration: "4 weeks",
          skills: ["Rapid Prototyping", "Validation Testing", "Feedback Integration"],
        },
        {
          title: "3D Printing Technology Deep Dive and Use Cases",
          duration: "5 weeks",
          skills: ["Technology Comparison", "Material Selection", "Case Studies", "Best Practices"],
        },
      ],
      certificateImages: [
        "/assets/rapid-prototyping-1.png",
        "/assets/rapid-prototyping-2.png",
        "/assets/rapid-prototyping-3.png",
      ],
    },
    {
      id: 4,
      title: "Rapid Prototyping and Tooling",
      issuer: "Arizona State University",
      mainImage: "/assets/rapid-prototyping-tooling.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "3 months",
      level: "Advanced",
      technologies: ["Electronics Integration", "Tooling", "Advanced Materials"],
      description:
        "Advanced techniques in rapid prototyping with focus on electronics integration and production tooling applications.",
      courses: [
        {
          title: "Using Rapid Prototyping in the Engineering Design Process",
          duration: "4 weeks",
          skills: ["Design Integration", "Workflow Optimization", "Quality Control"],
        },
        {
          title: "Adding Electronics to Rapid Prototypes",
          duration: "5 weeks",
          skills: ["Embedded Systems", "PCB Integration", "Sensor Implementation", "Wireless Connectivity"],
        },
        {
          title: "Rapid Prototyping Materials and Tooling",
          duration: "4 weeks",
          skills: ["Advanced Materials", "Mold Making", "Production Tooling", "Material Properties"],
        },
      ],
      certificateImages: [
        "/assets/prototyping-tooling-1.png",
        "/assets/prototyping-tooling-2.png",
        "/assets/prototyping-tooling-3.png",
      ],
    },
    {
      id: 5,
      title: "The Engineering of Structures Around Us",
      issuer: "Dartmouth College",
      mainImage: "/assets/engineering-structures.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "5 months",
      level: "Intermediate",
      technologies: ["Structural Analysis", "FEA", "Load Analysis", "Material Mechanics"],
      description:
        "Comprehensive structural engineering principles covering tension, compression, shear, and bending in real-world applications.",
      courses: [
        {
          title: "Engineering of Structures: Tension",
          duration: "3 weeks",
          skills: ["Tensile Analysis", "Material Strength", "Safety Factors"],
        },
        {
          title: "Engineering of Structures: Compression",
          duration: "3 weeks",
          skills: ["Compressive Loads", "Buckling Analysis", "Column Design"],
        },
        {
          title: "Engineering of Structures: Tension and Compression",
          duration: "4 weeks",
          skills: ["Combined Loading", "Stress Analysis", "Structural Optimization"],
        },
        {
          title: "Engineering of Structures: Shear and Bending",
          duration: "4 weeks",
          skills: ["Shear Stress", "Bending Moments", "Beam Design", "Deflection Analysis"],
        },
        {
          title: "Engineering of Structures: Response of Structures",
          duration: "4 weeks",
          skills: ["Dynamic Analysis", "Vibration", "Seismic Design", "Structural Response"],
        },
      ],
      certificateImages: [
        "/assets/structures-1.png",
        "/assets/structures-2.png",
        "/assets/structures-3.png",
        "/assets/structures-4.png",
        "/assets/structures-5.png",
      ],
    },
    {
      id: 6,
      title: "Digital Manufacturing & Design Technology",
      issuer: "University at Buffalo, The State University of New York",
      mainImage: "/assets/digital-manufacturing-design.png",
      category: "Coursera Specialization",
      date: "2024",
      duration: "9 months",
      level: "Advanced",
      technologies: ["Digital Thread", "MBSE", "Cybersecurity", "Intelligent Machining"],
      description:
        "Comprehensive digital manufacturing ecosystem covering design, implementation, cybersecurity, and advanced manufacturing systems.",
      courses: [
        { title: "Digital Manufacturing & Design", duration: "4 weeks", skills: ["Digital Transformation", "Manufacturing 4.0", "Digital Ecosystem"] },
        { title: "Digital Thread: Components", duration: "4 weeks", skills: ["Data Integration", "System Components", "Interoperability"] },
        { title: "Digital Thread: Implementation", duration: "5 weeks", skills: ["Implementation Strategy", "System Integration", "Change Management"] },
        { title: "Advanced Manufacturing Process Analysis", duration: "4 weeks", skills: ["Process Optimization", "Statistical Analysis", "Quality Engineering"] },
        { title: "Intelligent Machining", duration: "4 weeks", skills: ["Smart Machines", "Predictive Maintenance", "AI in Manufacturing"] },
        { title: "Advanced Manufacturing Enterprise", duration: "5 weeks", skills: ["Enterprise Systems", "Supply Chain", "Business Integration"] },
        { title: "Cyber Security in Manufacturing", duration: "4 weeks", skills: ["Industrial Security", "Network Protection", "Data Integrity"] },
        { title: "MBSE: Model-Based Systems Engineering", duration: "5 weeks", skills: ["Systems Modeling", "Requirements Engineering", "Model Validation"] },
        { title: "Roadmap to Success in Digital Manufacturing & Design", duration: "3 weeks", skills: ["Career Planning", "Industry Trends", "Implementation Roadmap"] },
      ],
      certificateImages: [
        "/assets/digital-mfg-1.png",
        "/assets/digital-mfg-2.png",
        "/assets/digital-mfg-3.png",
        "/assets/digital-mfg-4.png",
        "/assets/digital-mfg-5.png",
        "/assets/digital-mfg-6.png",
        "/assets/digital-mfg-7.png",
        "/assets/digital-mfg-8.png",
        "/assets/digital-mfg-9.png",
      ],
    },
  ];

  const achievements: AchievementItem[] = [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ];

  const openLightbox = (specialization: Specialization, index = 0) => {
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
    if (!selectedSpecialization) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedSpecialization.certificateImages.length);
  };

  const prevImage = () => {
    if (!selectedSpecialization) return;
    setCurrentImageIndex((prev) => (prev === 0 ? selectedSpecialization.certificateImages.length - 1 : prev - 1));
  };

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="container section-padding">
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={itemVariants} className="section-heading text-center mb-4">
          Achievements & <span className="gradient-text">Certifications</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto content-text">
          Professional certifications and achievements that demonstrate my expertise in mechanical engineering,
          CAD design, and continuous learning commitment.
        </motion.p>

        {/* Achievement Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="card text-center"
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
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="subsection-heading text-center mb-8 text-purple-400">Featured Certification</h3>

          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Certificate Image */} 
                <div className="relative w-full flex items-center justify-center overflow-hidden p-6">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto max-h-[500px] object-contain cursor-pointer rounded"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => {
                      if (typeof window !== "undefined") window.open(cert.image, "_blank");
                    }}
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
                        <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
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
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (typeof window !== "undefined") window.open(cert.image, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </motion.button>

                    <motion.button
                      className="btn btn-secondary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (typeof document !== "undefined") {
                          const link = document.createElement("a");
                          link.href = cert.image;
                          link.download = `${cert.title}.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }
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
          <h3 className="subsection-heading text-center mb-8 text-purple-400">Technical Specializations</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializations.map((specialization) => (
              <motion.div
                key={specialization.id}
                className="card"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Layers className="w-8 h-8 text-purple-400" />
                </div>

                <h4 className="text-lg font-bold text-white mb-2">{specialization.title}</h4>

                <p className="text-purple-400 font-medium text-sm mb-3">{specialization.issuer}</p>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{specialization.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
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

                <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    <span>{specialization.courses.length} courses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{specialization.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openLightbox(specialization)}
                  >
                    <ExternalLink className="w-3 h-3" />
                    View Certificates
                  </motion.button>

                  <motion.button
                    className="btn btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSpecialization(specialization)}
                  >
                    <Cogs className="w-3 h-3" />
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
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedSpecialization.title}</h3>
                    <p className="text-purple-400 text-sm">
                      Certificate {currentImageIndex + 1} of {selectedSpecialization.certificateImages.length}
                    </p>
                  </div>
                  <button onClick={closeLightbox} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="relative flex items-center justify-center p-8">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedSpecialization.certificateImages[currentImageIndex]}
                    alt={`Certificate ${currentImageIndex + 1}`}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />

                  {selectedSpecialization.certificateImages.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 p-2 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition-colors"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>
                    </>
                  )}
                </div>

                <div className="p-6 border-t border-gray-700">
                  <h4 className="font-semibold text-white mb-3">
                    {selectedSpecialization.courses[currentImageIndex]?.title ?? ""}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpecialization.courses[currentImageIndex]?.skills?.map((skill, index) => (
                      <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                        {skill}
                      </span>
                    )) ?? null}
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
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{selectedSpecialization.title}</h3>
                      <p className="text-purple-400 text-lg">{selectedSpecialization.issuer}</p>
                    </div>
                    <button onClick={() => setSelectedSpecialization(null)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                      <X className="w-6 h-6 text-gray-400" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Course Curriculum</h4>
                      <div className="space-y-3">
                        {selectedSpecialization.courses.map((course, index) => (
                          <div key={index} className="bg-gray-800/50 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium text-white">{course.title}</h5>
                              <span className="text-purple-400 text-sm bg-purple-500/20 px-2 py-1 rounded">{course.duration}</span>
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
                      <h4 className="text-lg font-semibold text-white mb-4">Specialization Details</h4>
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-purple-300 mb-2">Technologies Covered</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedSpecialization.technologies.map((tech, idx) => (
                              <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">{tech}</span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-purple-300 mb-1">Level</h5>
                            <p className="text-white">{selectedSpecialization.level}</p>
                          </div>
                          <div>
                            <h5 className="text-purple-300 mb-1">Duration</h5>
                            <p className="text-white">{selectedSpecialization.duration}</p>
                          </div>
                          <div>
                            <h5 className="text-purple-300 mb-1">Courses</h5>
                            <p className="text-white">{selectedSpecialization.courses.length}</p>
                          </div>
                          <div>
                            <h5 className="text-purple-300 mb-1">Completed</h5>
                            <p className="text-white">{selectedSpecialization.date}</p>
                          </div>
                        </div>

                        <motion.button
                          className="w-full btn btn-primary"
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

        {/* Additional Certifications Preview */}
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="subsection-heading text-white mb-4">Explore More Certifications</h3>
          <p className="text-gray-400 mb-6 content-text">Dive deeper into my technical expertise and professional development journey.</p>
          <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            View Complete Portfolio
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Achievements;
