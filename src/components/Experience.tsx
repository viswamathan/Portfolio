import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, ChevronRight, Target, Wrench, Briefcase, Eye, X, Clock, Users, TrendingUp } from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeExperience, setActiveExperience] = useState(0);

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
      status: "completed",
      teamSize: "8 members",
      mentor: "Dr. Marine Engineer",
      impact: "Improved structural efficiency by 15%"
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
      onCertificate: handleUpcomingCertificate,
      onReport: handleUpcomingReport,
      status: "upcoming",
      teamSize: "12 members",
      mentor: "Senior Design Engineer",
      impact: "Expected 20% process optimization"
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Unique Header with Interactive Timeline */}
      <div className="text-center mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Professional Journey
        </motion.h2>
        
        {/* Interactive Timeline Navigation */}
        <div className="flex justify-center items-center mb-8">
          <div className="relative flex items-center">
            {experiences.map((_, index) => (
              <React.Fragment key={index}>
                <motion.button
                  onClick={() => setActiveExperience(index)}
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                    activeExperience === index 
                      ? 'bg-purple-500 border-purple-500 scale-125' 
                      : 'bg-transparent border-gray-400 hover:border-purple-400'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
                {index < experiences.length - 1 && (
                  <div className={`w-24 h-0.5 mx-2 transition-colors duration-300 ${
                    activeExperience > index ? 'bg-purple-500' : 'bg-gray-400'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Cards with Unique Layout */}
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex flex-col lg:flex-row items-center gap-8 ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}
            onHoverStart={() => setActiveExperience(index)}
          >
            {/* Content Side */}
            <div className="flex-1 space-y-6">
              {/* Header Card */}
              <motion.div 
                className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-6 rounded-2xl border border-gray-700/50"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <motion.img
                    src={exp.logo}
                    alt={`${exp.company} Logo`}
                    className="w-16 h-16 rounded-full border-2 border-purple-500/50 object-cover"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-purple-400">{exp.title}</h3>
                    <h4 className="text-xl font-semibold text-white">{exp.company}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {exp.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> {exp.duration}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${
                        exp.status === 'completed' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {exp.status === 'completed' ? 'Completed' : 'Upcoming'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{exp.description}</p>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{exp.teamSize}</div>
                    <div className="text-xs text-gray-400">Team Size</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <Target className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">{exp.skills.length}</div>
                    <div className="text-xs text-gray-400">Skills</div>
                  </div>
                  <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-semibold text-white">High</div>
                    <div className="text-xs text-gray-400">Impact</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={exp.onCertificate}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Award className="w-4 h-4" /> Certificate
                  </motion.button>
                  <motion.button
                    onClick={exp.onReport}
                    className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FileText className="w-4 h-4" /> Report
                  </motion.button>
                </div>
              </motion.div>

              {/* Responsibilities & Skills */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50"
                  whileHover={{ borderColor: 'rgba(139, 92, 246, 0.5)' }}
                >
                  <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-500" /> Key Responsibilities
                  </h5>
                  <ul className="space-y-3">
                    {exp.responsibilities.map((item, idx) => (
                      <motion.li
                        key={idx}
                        className="flex gap-3 text-gray-300 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div 
                  className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50"
                  whileHover={{ borderColor: 'rgba(59, 130, 246, 0.5)' }}
                >
                  <h5 className="font-bold text-white mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-500" /> Technologies & Skills
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * idx }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Images Side */}
            <div className="flex-1 max-w-md">
              <div className="grid grid-cols-1 gap-4">
                {exp.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group overflow-hidden rounded-xl border-2 border-gray-700/50 hover:border-purple-500/50 transition-colors"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img 
                      src={image}
                      alt={`${exp.company} Experience ${idx + 1}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => setSelectedImage(image)}
                        className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-xs text-white">
                      {exp.company} - View {idx + 1}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20">
          <h3 className="text-2xl font-bold text-purple-400 mb-6">Experience Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">2+</div>
              <div className="text-gray-300">Months Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
              <div className="text-gray-300">Skills Acquired</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">2</div>
              <div className="text-gray-300">Major Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">100%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative max-w-4xl w-full h-full flex items-center justify-center p-4">
            <img 
              src={selectedImage} 
              alt="Full View" 
              className="max-h-[90vh] w-auto rounded-lg shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800/70 p-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;