import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, Briefcase, Eye, X } from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  const experiences = [
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
      company: "Super Auto Forge,Pvt.Ltd",
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
      onCertificate: handleUpcomingCertificate,
      onReport: handleUpcomingReport,
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Professional <span className="text-purple-500">Experience</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Hands-on experience in marine engineering and automotive manufacturing, 
          developing expertise in advanced simulation and design optimization.
        </p>
      </motion.div>

      {/* Experience Cards */}
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 border-b border-gray-700/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left: Company Info */}
                <div className="flex items-start gap-6 flex-1 min-w-0">
                  <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-purple-500/50 bg-gray-800 flex-shrink-0 shadow-lg">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} Logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 truncate">{exp.title}</h3>
                    <h4 className="text-xl text-purple-400 font-semibold mb-3 truncate">{exp.company}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <MapPin className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Building className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <span className="truncate">{exp.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex flex-col items-end gap-4 flex-shrink-0">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    exp.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {exp.status}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={exp.onCertificate}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg hover:shadow-purple-500/25"
                    >
                      <Award className="w-4 h-4" />
                      Certificate
                    </button>
                    <button
                      onClick={exp.onReport}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg"
                    >
                      <FileText className="w-4 h-4" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                  {exp.description}
                </p>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Left Column - Responsibilities & Skills */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Responsibilities */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-purple-500" />
                      Key Responsibilities
                    </h5>
                    <div className="space-y-3">
                      {exp.responsibilities.map((item, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-gray-600/20 rounded-lg hover:bg-gray-600/30 transition-colors">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300 leading-relaxed">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills Gained */}
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30">
                    <h5 className="text-lg font-bold text-white mb-4">Skills & Technologies</h5>
                    <div className="flex flex-wrap gap-3">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30 hover:bg-purple-500/30 transition-colors shadow-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Images */}
                <div className="space-y-6">
                  <div className="bg-gray-700/30 rounded-xl p-6 border border-gray-600/30 h-full">
                    <h5 className="text-lg font-bold text-white mb-4 text-center">Experience Gallery</h5>
                    <div className="grid grid-cols-1 gap-4">
                      {exp.images.map((image, idx) => (
                        <motion.div
                          key={idx}
                          className="relative group overflow-hidden rounded-xl border-2 border-purple-500/30 bg-black shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="aspect-video bg-black flex items-center justify-center">
                            <img 
                              src={image}
                              alt={`${exp.company} Experience ${idx + 1}`}
                              className="w-full h-full object-contain rounded-lg cursor-pointer max-h-64"
                              onClick={() => setSelectedImage(image)}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                            <button
                              onClick={() => setSelectedImage(image)}
                              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                            >
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                          </div>
                          <div className="absolute top-3 right-3 bg-black/70 rounded-full px-3 py-1 text-xs text-white font-medium">
                            {idx + 1}/{exp.images.length}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Summary */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-center text-purple-400 mb-8">Experience Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">2+</div>
            <div className="text-gray-300 font-medium">Months of Internship</div>
            <div className="text-sm text-gray-400">Hands-on Industry Experience</div>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">12+</div>
            <div className="text-gray-300 font-medium">Technical Skills Gained</div>
            <div className="text-sm text-gray-400">Advanced Engineering Tools</div>
          </div>
          <div className="space-y-2 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
            <div className="text-3xl font-bold text-purple-400">100%</div>
            <div className="text-gray-300 font-medium">Project Completion Rate</div>
            <div className="text-sm text-gray-400">Successful Deliverables</div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
            <motion.img 
              src={selectedImage} 
              alt="Full View" 
              className="max-h-[85vh] max-w-full rounded-2xl shadow-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800/80 p-3 rounded-full hover:bg-gray-700 transition-colors backdrop-blur-sm border border-gray-600/50"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 rounded-full px-4 py-2 text-sm text-white backdrop-blur-sm">
              Click anywhere to close
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Experience;
