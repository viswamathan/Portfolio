import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, ChevronRight, Target, Wrench, Briefcase, Eye, X, Clock, Users, TrendingUp, Zap, Star, CheckCircle } from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeExperience, setActiveExperience] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState(null);

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
      symbol: "🌊",
      achievements: [
        "Completed 40+ hours of hands-on ANSYS training",
        "Analyzed 15+ marine component designs",
        "Achieved 95% accuracy in structural predictions"
      ],
      technologies: ["ANSYS Workbench", "SolidWorks", "MATLAB", "Research Tools"],
      impact: "Contributed to marine energy research with optimized component designs",
      teamSize: "8 interns",
      mentor: "Dr. Marine Engineer",
      status: "Completed"
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
      symbol: "🔨",
      achievements: [
        "Designed 20+ forging stage configurations",
        "Reduced material waste by 15%",
        "Improved process efficiency by 25%"
      ],
      technologies: ["SolidWorks", "AutoCAD", "Forging Simulation", "Quality Tools"],
      impact: "Enhanced manufacturing processes with data-driven optimization",
      teamSize: "12 engineers",
      mentor: "Senior Design Engineer",
      status: "Upcoming"
    }
  ];

  const overallStats = [
    { label: "Total Experience", value: "3+ Months", icon: Clock, color: "blue" },
    { label: "Projects Completed", value: "35+", icon: CheckCircle, color: "green" },
    { label: "Skills Acquired", value: "12+", icon: Star, color: "purple" },
    { label: "Team Collaborations", value: "20+", icon: Users, color: "orange" }
  ];

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Enhanced Section Header */}
      <motion.div className="relative mb-12 text-center" variants={itemVariants}>
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Briefcase className="w-32 h-32 text-purple-500" />
        </motion.div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center relative z-10">
          Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">Experience</span>
        </h2>
        <motion.div 
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Hands-on experience in cutting-edge engineering environments, from marine energy research to automotive manufacturing
        </p>
      </motion.div>

      {/* Enhanced Stats Dashboard */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-gray-700/50 hover:border-${stat.color}-500/50 transition-all duration-300 group`}
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-${stat.color}-500/30 transition-colors`}>
                <Icon className={`w-6 h-6 text-${stat.color}-400`} />
              </div>
              <motion.div
                className="text-xl font-bold text-white mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enhanced Experience Timeline */}
      <div className="relative mb-12">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 hidden md:block" />
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 ${
                activeExperience === index ? 'border-purple-500/50 shadow-purple-500/20' : 'hover:border-purple-500/30'
              }`}
              whileHover={{ scale: 1.01, y: -5 }}
              onHoverStart={() => setActiveExperience(index)}
            >
              {/* Timeline Node */}
              <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900 hidden md:flex items-center justify-center z-10">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: activeExperience === index ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 2, repeat: activeExperience === index ? Infinity : 0 }}
                />
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  exp.status === 'Completed' 
                    ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}>
                  {exp.status}
                </span>
              </div>

              <div className="p-6">
                {/* Enhanced Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <img
                        src={exp.logo}
                        alt={`${exp.company} Logo`}
                        className="w-16 h-16 rounded-full border-2 border-purple-500/50 shadow-lg object-cover mx-auto sm:mx-0 bg-gray-800/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-xs">
                        {exp.symbol}
                      </div>
                    </motion.div>
                    
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl lg:text-2xl font-bold text-purple-400 mb-1 flex items-center gap-2 justify-center sm:justify-start">
                        <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <Briefcase className="w-3 h-3 text-purple-400" />
                        </div>
                        {exp.title}
                      </h3>
                      <h4 className="text-lg lg:text-xl font-semibold text-white mb-2">{exp.company}</h4>
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-xs text-gray-400">
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <MapPin className="w-3 h-3 text-purple-500" /> {exp.location}
                        </div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <Calendar className="w-3 h-3 text-purple-500" /> {exp.duration}
                        </div>
                        <div className="flex items-center gap-1 justify-center sm:justify-start">
                          <Building className="w-3 h-3 text-purple-500" /> {exp.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <motion.button
                      onClick={exp.onCertificate}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-2 rounded-lg text-xs shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Award className="w-3 h-3" /> Certificate
                    </motion.button>
                    <motion.button
                      onClick={exp.onReport}
                      className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-2 rounded-lg text-xs shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(75, 85, 99, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-3 h-3" /> Report
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Description */}
                <motion.div 
                  className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 p-4 rounded-lg mb-6 relative overflow-hidden"
                  whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 hover:opacity-100 transition-opacity" />
                  <p className="text-gray-300 text-sm relative z-10">{exp.description}</p>
                </motion.div>

                {/* Enhanced Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Responsibilities */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h5 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-500" /> Key Responsibilities
                      </h5>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((item, idx) => (
                          <motion.li
                            key={idx}
                            className="flex gap-3 text-gray-300 text-sm p-3 bg-gray-700/20 rounded-lg hover:bg-purple-500/10 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ x: 5, scale: 1.02 }}
                          >
                            <ChevronRight className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0 group-hover:text-purple-400 transition-colors" />
                            <span className="group-hover:text-white transition-colors">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Enhanced Skills */}
                    <div>
                      <h5 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-purple-500" /> Skills & Technologies
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className={`bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30 cursor-pointer transition-all duration-300 ${
                              hoveredSkill === `${index}-${idx}` ? 'bg-purple-500/40 scale-110' : ''
                            }`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx }}
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(139, 92, 246, 0.4)' }}
                            onHoverStart={() => setHoveredSkill(`${index}-${idx}`)}
                            onHoverEnd={() => setHoveredSkill(null)}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h5 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-500" /> Key Achievements
                      </h5>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="flex gap-2 text-gray-300 text-sm"
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Enhanced Images and Info */}
                  <div className="space-y-4">
                    {/* Images */}
                    {exp.images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group overflow-hidden rounded-xl border border-purple-500/30 bg-black flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.03, borderColor: "rgba(139, 92, 246, 0.6)" }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img 
                          src={image}
                          alt={`${exp.company} Experience ${idx + 1}`}
                          className="w-full h-40 object-contain rounded-lg bg-black"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                          <motion.button
                            className="p-2 bg-purple-600/80 rounded-full hover:bg-purple-700 transition-colors backdrop-blur-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                          View {idx + 1}
                        </div>
                      </motion.div>
                    ))}

                    {/* Additional Info Cards */}
                    <div className="space-y-3">
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-medium text-blue-400">Team Size</span>
                        </div>
                        <p className="text-white text-sm">{exp.teamSize}</p>
                      </div>
                      
                      <div className="bg-gray-700/30 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Zap className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-medium text-green-400">Impact</span>
                        </div>
                        <p className="text-white text-sm">{exp.impact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Experience Summary */}
      <motion.div
        variants={itemVariants}
        className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #8b5cf6 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3b82f6 2px, transparent 2px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        <h3 className="text-2xl font-bold text-center text-purple-400 mb-6 relative z-10">
          Experience Highlights & Impact
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 relative z-10">
          <motion.div 
            className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300" 
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">3+</div>
            <div className="text-sm text-gray-300">Months of Intensive Training</div>
            <div className="text-xs text-gray-500 mt-1">Hands-on Industry Experience</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300" 
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl font-bold text-blue-400 mb-2">12+</div>
            <div className="text-sm text-gray-300">Technical Skills Mastered</div>
            <div className="text-xs text-gray-500 mt-1">Advanced Engineering Tools</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-4 bg-gray-800/30 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300" 
            whileHover={{ scale: 1.05, y: -5 }}
          >
            <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
            <div className="text-sm text-gray-300">Project Success Rate</div>
            <div className="text-xs text-gray-500 mt-1">Consistent Excellence</div>
          </motion.div>
        </div>

        <div className="text-center relative z-10">
          <p className="text-gray-300 text-sm mb-4">
            From marine energy research to automotive manufacturing, each experience has shaped my engineering expertise 
            and problem-solving capabilities in real-world industrial environments.
          </p>
          <div className="flex justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Research & Development
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Industrial Manufacturing
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Process Optimization
            </span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Modal for Image View */}
      {selectedImage && (
        <motion.div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Experience Gallery</h3>
              <motion.button 
                onClick={() => setSelectedImage(null)}
                className="p-3 hover:bg-gray-800 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <motion.img 
                src={selectedImage} 
                alt="Experience View" 
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Experience;