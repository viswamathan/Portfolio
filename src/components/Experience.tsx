import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, Briefcase, Eye, X } from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Internship handlers (same as before)
  const handleNIOTCertificate = () => {
    window.open('/NIOT INTERNSHIP CERTIFICATE.png', '_blank');
  };
  const handleNIOTReport = () => {
    window.open('/INTERNSHIP REPORT.pdf', '_blank');
  };
  const handleSAFCertificate = () => {
    window.open('/SAF CERTIFICATE.pdf', '_blank');
  };
  const handleSAFReport = () => {
    window.open('/SAF INTERNSHIP REPORT.pdf', '_blank');
  };

  // Professional experience (no buttons)
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

  // Simple mount animation - no scroll triggers
  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Helper to render a card without whileInView (uses initial + animate)
  const ExperienceCard = ({ exp, showButtons = true, index }) => (
    <motion.div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl will-change-transform"
      initial={{ opacity: 0, y: 30 }}
      animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ transform: 'translateZ(0)' }} // Force GPU
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 border-b border-gray-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-6 flex-1 min-w-0">
            <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-500/50 bg-gray-800 flex-shrink-0 shadow-lg">
              {exp.logo ? (
                <img
                  src={exp.logo}
                  alt={`${exp.company} Logo`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/80?text=Logo';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-purple-900/40 text-purple-400">
                  <Building className="w-8 h-8" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-bold text-white mb-2 truncate">{exp.title}</h3>
              <h4 className="text-xl text-purple-400 font-semibold mb-3 truncate">{exp.company}</h4>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>{exp.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>{exp.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-purple-500" />
                  <span>{exp.type}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-4 flex-shrink-0">
            <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
              exp.status === 'Current' 
                ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' 
                : 'bg-green-500/20 text-green-400 border-green-500/30'
            }`}>
              {exp.status}
            </div>
            {showButtons && (
              <div className="flex gap-3">
                <button onClick={exp.onCertificate} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg">
                  <Award className="w-4 h-4" />
                  Certificate
                </button>
                <button onClick={exp.onReport} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg">
                  <FileText className="w-4 h-4" />
                  Report
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">{exp.description}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-500" />
                Key Responsibilities
              </h5>
              <div className="space-y-3">
                {exp.responsibilities.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-gray-600/20 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
              <h5 className="text-lg font-bold text-white mb-4">Skills & Technologies</h5>
              <div className="flex flex-wrap gap-3">
                {exp.skills.map((skill, idx) => (
                  <span key={idx} className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 h-full">
              <h5 className="text-lg font-bold text-white mb-4 text-center">Experience Gallery</h5>
              {exp.images && exp.images.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {exp.images.map((image, idx) => (
                    <div key={idx} className="relative group overflow-hidden rounded-xl border-2 border-purple-500/30 bg-black shadow-lg">
                      <div className="aspect-video bg-black flex items-center justify-center">
                        <img 
                          src={image}
                          alt={`${exp.company} Experience ${idx + 1}`}
                          className="w-full h-full object-contain rounded-lg cursor-pointer max-h-64"
                          loading="lazy"
                          onClick={() => setSelectedImage(image)}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                        <button onClick={() => setSelectedImage(image)} className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors">
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-800/50 rounded-full p-4 mb-3">
                    <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">Gallery images will be added soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div ref={sectionRef} className="container mx-auto px-6 py-20 max-w-7xl bg-gray-900">
      {/* Section Header - no scroll animation, just mount */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Professional <span className="text-purple-500">Experience</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Full-time engineering role combined with research internships in marine and automotive domains,
          developing expertise in product design, simulation, and manufacturing optimization.
        </p>
      </motion.div>

      {/* Professional Experience */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">Professional Experience</h3>
        <ExperienceCard exp={professionalExperience} showButtons={false} index={0} />
      </div>

      {/* Internships */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 border-l-4 border-purple-500 pl-4">Internships</h3>
        <div className="space-y-12">
          {internships.map((intern, idx) => (
            <ExperienceCard key={idx} exp={intern} showButtons={true} index={idx + 1} />
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-center text-purple-400 mb-8">Experience Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">Ongoing</div>
            <div className="text-gray-300 font-medium">Graduate Engineer Trainee</div>
            <div className="text-sm text-gray-400">Full-time Professional Role</div>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">15+</div>
            <div className="text-gray-300 font-medium">Technical Skills Gained</div>
            <div className="text-sm text-gray-400">CAD, FEA, PLM & Manufacturing</div>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">2</div>
            <div className="text-gray-300 font-medium">Completed Internships</div>
            <div className="text-sm text-gray-400">Marine & Automotive Domains</div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
            <img src={selectedImage} alt="Full View" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
            <button className="absolute top-4 right-4 bg-gray-800/80 p-3 rounded-full hover:bg-gray-700">
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;
