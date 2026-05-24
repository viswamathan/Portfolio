import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, CheckCircle, ExternalLink, Download, Star, Trophy, Medal, X, ChevronLeft, ChevronRight, Book, Layers, Clock, Users, GraduationCap, Eye } from 'lucide-react';

const Achievements = () => {
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);
  const [coursesModalOpen, setCoursesModalOpen] = useState(false);
  const scriptLoadedRef = useRef(false);

  // Load Credly embed script once
  useEffect(() => {
    if (scriptLoadedRef.current) return;

    const loadCredlyBadge = () => {
      const existingScript = document.querySelector('script[src="//cdn.credly.com/assets/utilities/embed.js"]');
      if (existingScript) {
        if (window.Credly && window.Credly.renderBadges) {
          window.Credly.renderBadges();
        }
        scriptLoadedRef.current = true;
        return;
      }

      const script = document.createElement('script');
      script.src = '//cdn.credly.com/assets/utilities/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.Credly && window.Credly.renderBadges) {
          window.Credly.renderBadges();
        }
        scriptLoadedRef.current = true;
      };
      script.onerror = () => {
        console.error('Failed to load Credly embed script');
      };
      document.body.appendChild(script);
    };

    loadCredlyBadge();
  }, []);

  const certificates = [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description: "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "/Certifications/VISWA CSWA.png",
      skills: ["3D Modeling", "Assembly Design", "Technical Drawings", "Part Configuration", "Design Validation"],
      credentialId: "C-L3G7SF84B9",
      category: "Professional Certification",
      level: "Associate",
      validUntil: "Lifetime",
      badgeId: "114960fc-c628-4096-bd5e-98ce7e0af975",
      highlights: [
        "Demonstrated proficiency in 3D part modeling",
        "Mastered assembly creation and constraints",
        "Skilled in creating technical drawings and annotations",
        "Validated understanding of design intent and best practices",
      ],
    },
    {
      id: 2,
      title: "SOLIDWORKS Additive Manufacturing Associate",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2026",
      description: "Certification validating expertise in additive manufacturing workflows, 3D printing technologies, and design for additive manufacturing using SOLIDWORKS tools. Demonstrates proficiency in preparing models for various AM processes.",
      image: "/Certifications/SW_Additive_Associate.png", // Replace with actual image path
      skills: ["Additive Manufacturing", "3D Printing", "Design for AM", "SOLIDWORKS", "SLA", "SLS", "FDM", "Material Jetting"],
      credentialId: "C-YZQNWC3M7U",
      category: "Professional Certification",
      level: "Associate",
      validUntil: "Lifetime",
      badgeId: "98e2bdcf-628c-424d-af53-2275c16629f0",
      highlights: [
        "Mastered AM workflow integration with SOLIDWORKS",
        "Proficient in part orientation and support generation",
        "Skilled in selecting appropriate AM technologies",
        "Validated understanding of DFAM principles",
      ],
    },
  ];

  const specializations = [
    // ... (unchanged, same as before)
    {
      id: 1,
      title: "Additive Manufacturing Specialization",
      issuer: "Arizona State University (Coursera)",
      date: "2024",
      description: "Comprehensive specialization covering additive manufacturing processes, materials, and design principles for advanced manufacturing applications. Mastered various AM technologies including material extrusion, jetting, and laser-based processes.",
      specializationImage: '/Certifications/Additive Manufacturing.png',
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
          skills: ["AM Fundamentals", "Process Selection", "Technology Overview", "Manufacturing Processes"]
        },
        {
          id: 2,
          title: "Material Extrusion",
          issuer: "Arizona State University",
          image: '/Certifications/Additive Manufacturing 2.png',
          skills: ["FDM/FFF", "Material Properties", "Process Parameters", "Extrusion Technology"]
        },
        {
          id: 3,
          title: "Material Jetting and Stereolithography",
          issuer: "Arizona State University",
          image: '/Certifications/Additive Manufacturing 3.png',
          skills: ["SLA", "Material Jetting", "High-Resolution Printing", "Photopolymerization"]
        },
        {
          id: 4,
          title: "Selective Laser Sintering and Metal Laser Powder Bed Fusion",
          issuer: "Arizona State University",
          image: '/Certifications/Additive Manufacturing 4.png',
          skills: ["SLS", "LPBF", "Metal AM", "Post-Processing", "Laser Technology"]
        },
        {
          id: 5,
          title: "Design for Additive Manufacturing",
          issuer: "Arizona State University",
          image: '/Certifications/Additive Manufacturing 5.png',
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
      specializationImage: "/Certifications/Digital Technologies and the future of manufacturing.png",
      category: "Coursera Specialization",
      level: "Intermediate",
      courses: 3,
      duration: "3 months",
      skills: ["IIoT", "Digital Twins", "Smart Manufacturing", "Industry 4.0", "Data Analytics", "Automation"],
      credentialId: "SP-L3G7SF84B2",
      courseCertificates: [
        {
          id: 1,
          title: "Industrial Internet of Things (IIoT)",
          issuer: "University of Michigan",
          image: '/Certifications/Digital Technologies and the future of manufacturing 1.png',
          skills: ["IoT Sensors", "Data Analytics", "Connectivity", "Industrial Automation"]
        },
        {
          id: 2,
          title: "Digital Twins",
          issuer: "University of Michigan",
          image: '/Certifications/Digital Technologies and the future of manufacturing 2.png',
          skills: ["Virtual Modeling", "Simulation", "Real-time Monitoring", "Digital Replication"]
        },
        {
          id: 3,
          title: "Additive Manufacturing",
          issuer: "University of Michigan",
          image: '/Certifications/Digital Technologies and the future of manufacturing 3.png',
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
      specializationImage: "/Certifications/Rapid Prototyping Using 3d Printing.png",
      category: "Coursera Specialization",
      level: "Intermediate",
      courses: 3,
      duration: "3 months",
      skills: ["3D Printing", "Prototyping", "Product Design", "CAD", "Iterative Design", "Product Development"],
      credentialId: "SP-L3G7SF84B3",
      courseCertificates: [
        {
          id: 1,
          title: "Engineering and Product Design Processes",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping Using 3d Printing 1.png',
          skills: ["Design Thinking", "Product Development", "Iterative Design", "Engineering Methodology"]
        },
        {
          id: 2,
          title: "Prototyping",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping Using 3d Printing 2.png',
          skills: ["Prototype Development", "Testing", "Validation", "Design Validation"]
        },
        {
          id: 3,
          title: "3D Printing Technology Deep Dive and Use Cases",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping Using 3d Printing 3.png',
          skills: ["Technology Comparison", "Use Cases", "Best Practices", "Industry Applications"]
        }
      ]
    },
    {
      id: 4,
      title: "Rapid Prototyping and Tooling",
      issuer: "Arizona State University (Coursera)",
      date: "2024",
      description: "Comprehensive training in advanced rapid prototyping techniques including electronics integration, material science, and tooling applications for modern manufacturing.",
      specializationImage: "/Certifications/Rapid Prototyping and Tooling.png",
      category: "Coursera Specialization",
      level: "Advanced",
      courses: 3,
      duration: "3 months",
      skills: ["Rapid Tooling", "Electronics Integration", "Material Science", "Advanced Prototyping", "Manufacturing"],
      credentialId: "SP-L3G7SF84B4",
      courseCertificates: [
        {
          id: 1,
          title: "Using Rapid Prototyping in the Engineering Design Process",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping and Tooling 1.png',
          skills: ["Design Integration", "Workflow Optimization", "Efficiency", "Engineering Design"]
        },
        {
          id: 2,
          title: "Adding Electronics to Rapid Prototypes",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping and Tooling 2.png',
          skills: ["Embedded Systems", "Circuit Design", "Integration", "Electronics Prototyping"]
        },
        {
          id: 3,
          title: "Rapid Prototyping Materials and Tooling",
          issuer: "Arizona State University",
          image: '/Certifications/Rapid Prototyping and Tooling 3.png',
          skills: ["Material Selection", "Tooling Design", "Manufacturing", "Material Properties"]
        }
      ]
    },
    {
      id: 5,
      title: "The Engineering of Structures Around Us",
      issuer: "Dartmouth College (Coursera)",
      date: "2024",
      description: "Fundamental principles of structural engineering covering tension, compression, shear, and bending analysis with practical applications in modern structural design.",
      specializationImage: "/Certifications/The Engineering of Structures Around Us.png",
      category: "Coursera Specialization",
      level: "Intermediate",
      courses: 5,
      duration: "5 months",
      skills: ["Structural Analysis", "Tension/Compression", "Shear Forces", "Bending Moments", "Structural Design"],
      credentialId: "SP-L3G7SF84B5",
      courseCertificates: [
        {
          id: 1,
          title: "Engineering of Structures: Tension",
          issuer: "Dartmouth College",
          image: '/Certifications/The Engineering of Structures Around Us 1.png',
          skills: ["Tension Analysis", "Cable Structures", "Material Strength", "Structural Tension"]
        },
        {
          id: 2,
          title: "Engineering of Structures: Compression",
          issuer: "Dartmouth College",
          image: '/Certifications/The Engineering of Structures Around Us 2.png',
          skills: ["Compression Members", "Column Design", "Buckling Analysis", "Structural Compression"]
        },
        {
          id: 3,
          title: "Engineering of Structures: Tension and Compression",
          issuer: "Dartmouth College",
          image: '/Certifications/The Engineering of Structures Around Us 3.png',
          skills: ["Combined Loading", "Structural Elements", "Load Analysis", "Mixed Forces"]
        },
        {
          id: 4,
          title: "Engineering of Structures: Shear and Bending",
          issuer: "Dartmouth College",
          image: '/Certifications/The Engineering of Structures Around Us 4.png',
          skills: ["Shear Stress", "Bending Moments", "Beam Design", "Structural Shear"]
        },
        {
          id: 5,
          title: "Engineering of Structures: Response of Structures",
          issuer: "Dartmouth College",
          image: '/Certifications/The Engineering of Structures Around Us 5.png',
          skills: ["Structural Response", "Dynamic Analysis", "Performance Evaluation", "Structural Behavior"]
        }
      ]
    },
    {
      id: 6,
      title: "Digital Manufacturing & Design Technology",
      issuer: "University at Buffalo & The State University of New York (Coursera)",
      date: "2024",
      description: "Comprehensive program covering digital manufacturing technologies, Industry 4.0 implementation, smart factory systems, and advanced manufacturing enterprise management.",
      specializationImage: "/Certifications/Digital Manufacturing & Design Technology.png",
      category: "Coursera Specialization",
      level: "Advanced",
      courses: 9,
      duration: "6 months",
      skills: ["Digital Thread", "IIoT", "Digital Twins", "Cyber Security", "MBSE", "Smart Manufacturing"],
      credentialId: "SP-L3G7SF84B6",
      courseCertificates: [
        {
          id: 1,
          title: "Digital Manufacturing & Design",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 1.png',
          skills: ["Digital Transformation", "Smart Factory", "Industry 4.0", "Manufacturing Design"]
        },
        {
          id: 2,
          title: "Digital Thread: Components",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 2.png',
          skills: ["Data Integration", "System Components", "Digital Infrastructure", "Thread Components"]
        },
        {
          id: 3,
          title: "Digital Thread: Implementation",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 3.png',
          skills: ["Implementation Strategy", "Deployment", "System Integration", "Thread Implementation"]
        },
        {
          id: 4,
          title: "Advanced Manufacturing Process Analysis",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 4.png',
          skills: ["Process Optimization", "Data Analytics", "Quality Control", "Manufacturing Analysis"]
        },
        {
          id: 5,
          title: "Intelligent Machining",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 5.png',
          skills: ["Smart Machining", "AI in Manufacturing", "Predictive Maintenance", "Intelligent Systems"]
        },
        {
          id: 6,
          title: "Advanced Manufacturing Enterprise",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 6.png',
          skills: ["Enterprise Systems", "Supply Chain", "Business Integration", "Manufacturing Enterprise"]
        },
        {
          id: 7,
          title: "Cyber Security in Manufacturing",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 7.png',
          skills: ["Security Protocols", "Data Protection", "Risk Management", "Manufacturing Security"]
        },
        {
          id: 8,
          title: "MBSE: Model-Based Systems Engineering",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 8.png',
          skills: ["Systems Modeling", "MBSE Methodology", "Digital Engineering", "Model-Based Systems"]
        },
        {
          id: 9,
          title: "Roadmap to Success in Digital Manufacturing & Design",
          issuer: "University at Buffalo",
          image: '/Certifications/Digital Manufacturing & Design Technology 9.png',
          skills: ["Career Planning", "Industry Trends", "Professional Development", "Success Strategies"]
        }
      ]
    }
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "7.62/10", description: "CGPA in Mechanical Engineering" },
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

  const openCoursesModal = (specialization) => {
    setSelectedSpecialization(specialization);
    setCoursesModalOpen(true);
  };

  const closeCoursesModal = () => {
    setCoursesModalOpen(false);
    setSelectedSpecialization(null);
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

  // Image error handler
  const handleImageError = (e) => {
    console.error('Image failed to load:', e.target.src);
    e.target.src = 'https://via.placeholder.com/600x400/1f2937/9ca3af?text=Certificate+Image';
    e.target.alt = 'Certificate image not available';
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

          {/* Featured Certifications */}
          <motion.div variants={itemVariants} className="mb-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-3">Featured Certifications</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">Industry Recognized</p>
                <p className="text-purple-400 font-semibold">Professional Standards</p>
              </div>
            </div>

            <div className="space-y-8">
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  variants={cardVariants}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/30 shadow-2xl"
                  whileHover="hover"
                >
                  <div className="grid xl:grid-cols-2 gap-0">
                    {/* Certificate Image and Badge Area */}
                    <div className="relative p-12 flex flex-col items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                      {/* Certificate Image */}
                      <div className="relative group cursor-pointer">
                        <motion.img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full max-w-md h-auto object-contain rounded-xl shadow-2xl"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4 }}
                          onError={handleImageError}
                        />
                      </div>
                      
                      {/* Credly Badge - Directly under the image, white background, no extra tile */}
                      <div className="flex justify-center mt-8">
                        <div 
                          data-iframe-width="150" 
                          data-iframe-height="270" 
                          data-share-badge-id={cert.badgeId}
                          data-share-badge-host="https://www.credly.com"
                        ></div>
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
            </div>
          </motion.div>

          {/* University Specializations */}
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
            
            <div className="space-y-8">
              {specializations.map((specialization) => (
                <motion.div
                  key={specialization.id}
                  variants={cardVariants}
                  className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/30 shadow-2xl"
                  whileHover="hover"
                >
                  <div className="grid xl:grid-cols-2 gap-0">
                    {/* Specialization Image */}
                    <div className="relative p-8 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                      <div className="relative w-full">
                        <motion.img
                          src={specialization.specializationImage}
                          alt={specialization.title}
                          className="w-full max-w-lg h-auto object-contain rounded-xl shadow-2xl"
                          whileHover={{ scale: 1.03 }}
                          transition={{ duration: 0.4 }}
                          onError={handleImageError}
                        />
                      </div>
                    </div>

                    {/* Specialization Details */}
                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{specialization.title}</h3>
                          <p className="text-purple-400 font-semibold text-lg">{specialization.issuer}</p>
                        </div>
                        <div className="text-right">
                          <div className="px-3 py-1 rounded-full border bg-green-500/20 text-green-400 border-green-500/30 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 text-lg mb-6 leading-relaxed">{specialization.description}</p>

                      {/* Specialization Info Grid */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Completion Date</h5>
                            <div className="flex items-center gap-3 text-gray-300">
                              <Calendar className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">{specialization.date}</span>
                          </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Level</h5>
                            <span className="text-gray-300 font-medium bg-gray-700/50 px-3 py-1 rounded-lg text-sm">{specialization.level}</span>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Duration</h5>
                            <div className="flex items-center gap-3 text-gray-300">
                              <Clock className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">{specialization.duration}</span>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Courses</h5>
                            <div className="flex items-center gap-3 text-gray-300">
                              <Book className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">{specialization.courses} Modules</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="mb-6">
                        <h5 className="font-semibold text-purple-300 mb-3 text-sm uppercase tracking-wide">Core Competencies</h5>
                        <div className="flex flex-wrap gap-2">
                          {specialization.skills.slice(0, 6).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-lg text-sm border border-purple-500/30 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <motion.button
                          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-semibold flex-1 justify-center"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => openCoursesModal(specialization)}
                        >
                          <Book className="w-4 h-4" />
                          View All Courses
                        </motion.button>

                        <motion.button
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-300 font-semibold"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => window.open(specialization.specializationImage, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </motion.button>

                        <motion.button
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-xl transition-all duration-300 font-semibold"
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
                          <Download className="w-4 h-4" />
                        </motion.button>
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
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-8 border-b border-gray-700/50 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedSpecialization.title}</h3>
                  <p className="text-purple-400 font-semibold">{selectedSpecialization.issuer}</p>
                </div>
                <motion.button
                  onClick={closeCoursesModal}
                  className="p-3 hover:bg-gray-800 rounded-xl transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-gray-400" />
                </motion.button>
              </div>

              {/* Courses Grid */}
              <div className="p-8 max-h-[70vh] overflow-y-auto">
                <div className="space-y-6">
                  {selectedSpecialization.courseCertificates.map((course, index) => (
                    <motion.div
                      key={course.id}
                      className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/30 shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                    >
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Course Image */}
                        <div className="relative p-6 flex items-center justify-center bg-gradient-to-br from-purple-500/5 to-blue-500/5">
                          <div className="relative w-full">
                            <motion.img
                              src={course.image}
                              alt={course.title}
                              className="w-full h-48 object-contain rounded-lg shadow-lg"
                              whileHover={{ scale: 1.03 }}
                              transition={{ duration: 0.3 }}
                              onError={handleImageError}
                            />
                          </div>
                        </div>

                        {/* Course Details */}
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                              <p className="text-blue-400 font-medium text-sm">{course.issuer}</p>
                            </div>
                            <div className="text-right">
                              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                                Course {index + 1}
                              </div>
                            </div>
                          </div>

                          {/* Skills */}
                          <div className="mb-4">
                            <h5 className="font-semibold text-purple-300 mb-2 text-sm uppercase tracking-wide">Skills Gained</h5>
                            <div className="flex flex-wrap gap-2">
                              {course.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-lg text-xs border border-purple-500/30 font-medium"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3">
                            <motion.button
                              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex-1 justify-center"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => openLightbox(selectedSpecialization, index)}
                            >
                              <Eye className="w-4 h-4" />
                              Preview
                            </motion.button>
                            
                            <motion.button
                              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => window.open(course.image, "_blank")}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
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
                              <Download className="w-4 h-4" />
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
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && selectedSpecialization && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-purple-500/20 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
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
              <div className="flex items-center justify-center p-8 max-h-[65vh] overflow-auto bg-gray-800/30">
                <motion.img
                  key={currentCertIndex}
                  src={selectedSpecialization.courseCertificates[currentCertIndex].image}
                  alt={selectedSpecialization.courseCertificates[currentCertIndex].title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  onError={handleImageError}
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
