import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, ChevronRight, Target, Wrench, Briefcase } from 'lucide-react';
import 'react-vertical-timeline-component/style.min.css';

const Experience = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
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
      symbol: "🌊"
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
      symbol: "🔨"
    }
  ];

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Section Header */}
      <motion.div className="relative mb-12 sm:mb-16" variants={itemVariants}>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Professional Experience
        </h2>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
      </motion.div>

      {/* Experience Cards */}
      <div className="space-y-8 sm:space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/30 relative overflow-hidden"
            whileHover={{ scale: 1.01, y: -5 }}
          >
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6 lg:mb-0">
                <motion.img
                  src={exp.logo}
                  alt={`${exp.company} Logo`}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-purple-500/50 shadow-lg object-cover mx-auto sm:mx-0 bg-gray-800/50"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-2 flex items-center gap-3 justify-center sm:justify-start">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <Briefcase className="w-4 h-4 text-purple-400" />
                    </div>
                    {exp.title}
                  </h3>
                  <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3">{exp.company}</h4>
                  <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-xs sm:text-sm text-gray-400">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-500" /> {exp.location}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-purple-500" /> {exp.duration}</div>
                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-purple-500" /> {exp.type}</div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={exp.onCertificate}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-4 h-4" /> Certificate
                </motion.button>
                <motion.button
                  onClick={exp.onReport}
                  className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg text-sm shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" /> Report
                </motion.button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-gray-700/30 p-4 sm:p-6 rounded-xl mb-6 sm:mb-8 relative">
              <p className="text-gray-300 text-sm sm:text-base">{exp.description}</p>
            </div>

            {/* Grid Section */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Responsibilities */}
              <div className="lg:col-span-2">
                <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-500" /> Key Responsibilities
                </h5>
                <ul className="space-y-3">
                  {exp.responsibilities.map((item, idx) => (
                    <motion.li
                      key={idx}
                      className="flex gap-3 text-gray-300 text-sm sm:text-base p-3 bg-gray-700/20 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}
                    >
                      <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* Skills */}
                <div className="mt-6">
                  <h5 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-purple-500" /> Skills & Technologies
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, idx) => (
                      <motion.span
                        key={idx}
                        className="bg-purple-500/20 text-purple-300 px-3 py-1.5 rounded-full text-xs font-medium border border-purple-500/30"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * idx }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4">
                {exp.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group overflow-hidden rounded-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={image}
                      alt={`${exp.company} Experience ${idx + 1}`}
                      className="w-full h-40 sm:h-48 object-cover rounded-xl border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-white text-sm font-medium flex items-center gap-2">
                        {exp.company} - Experience {idx + 1}
                      </p>
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
        variants={itemVariants}
        className="mt-12 sm:mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-6 sm:p-8 border border-purple-500/20 relative overflow-hidden"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-center text-purple-400 mb-6">
          Experience Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <motion.div className="space-y-2 p-4 bg-gray-800/30 rounded-xl" whileHover={{ scale: 1.05 }}>
            <div className="text-2xl font-bold text-purple-400">2+</div>
            <div className="text-sm text-gray-300">Months of Internship</div>
          </motion.div>
          <motion.div className="space-y-2 p-4 bg-gray-800/30 rounded-xl" whileHover={{ scale: 1.05 }}>
            <div className="text-2xl font-bold text-purple-400">5+</div>
            <div className="text-sm text-gray-300">Technical Skills Gained</div>
          </motion.div>
          <motion.div className="space-y-2 p-4 bg-gray-800/30 rounded-xl" whileHover={{ scale: 1.05 }}>
            <div className="text-2xl font-bold text-purple-400">100%</div>
            <div className="text-sm text-gray-300">Project Completion Rate</div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;
