import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, ChevronRight, Target, Wrench, Briefcase, Eye, X, Clock, Users, TrendingUp, Zap, Star } from 'lucide-react';
import 'react-vertical-timeline-component/style.min.css';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredExperience, setHoveredExperience] = useState(null);

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
      status: "completed",
      teamSize: 15,
      mentor: "Dr. Marine Engineer",
      achievements: [
        "Successfully completed 40+ hours of ANSYS training",
        "Analyzed 5+ marine energy components",
        "Achieved 95% accuracy in structural simulations",
        "Contributed to research publication draft"
      ],
      impact: "Enhanced understanding of marine renewable energy systems and advanced simulation techniques"
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
      status: "upcoming",
      teamSize: 8,
      mentor: "Senior Design Engineer",
      achievements: [
        "Expected to design 10+ forging components",
        "Target 20% efficiency improvement in processes",
        "Planned automation of 3+ manufacturing procedures",
        "Anticipated contribution to cost reduction initiatives"
      ],
      impact: "Will gain comprehensive understanding of automotive manufacturing and process optimization"
    }
  ];

  // Enhanced stats calculation
  const stats = [
    { 
      label: "Total Experience", 
      value: "3+ Months", 
      icon: Clock, 
      color: "purple",
      description: "Hands-on industry experience"
    },
    { 
      label: "Projects Completed", 
      value: "8+", 
      icon: Target, 
      color: "blue",
      description: "Engineering projects delivered"
    },
    { 
      label: "Skills Acquired", 
      value: "12+", 
      icon: Zap, 
      color: "green",
      description: "Technical competencies gained"
    },
    { 
      label: "Team Collaborations", 
      value: "23+", 
      icon: Users, 
      color: "orange",
      description: "Professional connections made"
    }
  ];

  return (
    <motion.div 
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 border-2 border-purple-500/10 rotate-45 rounded-xl"
          animate={{
            rotate: [45, 405],
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-500/10 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Enhanced Section Header */}
      <motion.div className="relative mb-12 text-center" variants={itemVariants}>
        <motion.div
          className="inline-block relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
            Professional Experience
          </h2>
          <motion.div
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
        <motion.p
          className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Journey through cutting-edge engineering internships and professional development
        </motion.p>
      </motion.div>

      {/* Enhanced Stats Dashboard */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6 text-center relative overflow-hidden group"
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                boxShadow: "0 20px 40px rgba(139, 92, 246, 0.15)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 relative z-10`}>
                <Icon className={`w-6 h-6 sm:w-8 sm:h-8 text-${stat.color}-400`} />
              </div>
              
              <motion.div
                className="text-2xl sm:text-3xl font-bold text-white mb-2 relative z-10"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.div>
              
              <div className="text-gray-300 font-medium text-sm sm:text-base mb-1 relative z-10">
                {stat.label}
              </div>
              
              <div className="text-gray-500 text-xs relative z-10">
                {stat.description}
              </div>

              {/* Hover effect particles */}
              <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                initial={false}
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-${stat.color}-400 rounded-full`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Enhanced Experience Timeline */}
      <div className="relative">
        {/* Animated Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 rounded-full opacity-30" />
        <motion.div
          className="absolute left-8 top-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-purple-500 rounded-full"
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Experience Cards */}
        <div className="space-y-8 sm:space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative"
              onHoverStart={() => setHoveredExperience(index)}
              onHoverEnd={() => setHoveredExperience(null)}
            >
              {/* Timeline Node */}
              <motion.div
                className="absolute left-6 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900 z-10"
                whileHover={{ scale: 1.5 }}
                animate={{
                  boxShadow: hoveredExperience === index 
                    ? "0 0 20px rgba(139, 92, 246, 0.6)" 
                    : "0 0 0px rgba(139, 92, 246, 0)"
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  animate={{
                    scale: hoveredExperience === index ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.6, repeat: hoveredExperience === index ? Infinity : 0 }}
                />
              </motion.div>

              {/* Enhanced Experience Card */}
              <motion.div
                className="ml-16 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.02, 
                  y: -8,
                  boxShadow: "0 25px 50px rgba(139, 92, 246, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Status Badge */}
                <motion.div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${
                    exp.status === 'completed' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}
                  whileHover={{ scale: 1.1 }}
                >
                  {exp.status === 'completed' ? '✅ Completed' : '🔄 Upcoming'}
                </motion.div>

                {/* Animated Background Pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  animate={{
                    backgroundPosition: hoveredExperience === index ? ['0% 0%', '100% 100%'] : ['0% 0%', '0% 0%'],
                  }}
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #8b5cf6 25%, transparent 25%, transparent 75%, #8b5cf6 75%)',
                    backgroundSize: '20px 20px',
                  }}
                  transition={{ duration: 2, repeat: hoveredExperience === index ? Infinity : 0 }}
                />

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4 lg:mb-0">
                    <motion.div
                      className="relative"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <img
                        src={exp.logo}
                        alt={`${exp.company} Logo`}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-3 border-purple-500/50 shadow-xl object-cover mx-auto sm:mx-0 bg-gray-800/50"
                      />
                      <motion.div
                        className="absolute -top-2 -right-2 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="text-lg">{exp.symbol}</span>
                      </motion.div>
                    </motion.div>

                    <div className="text-center sm:text-left">
                      <motion.h3 
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-400 mb-2 flex items-center gap-3 justify-center sm:justify-start"
                        whileHover={{ scale: 1.05 }}
                      >
                        <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                          <Briefcase className="w-4 h-4 text-purple-400" />
                        </div>
                        {exp.title}
                      </motion.h3>
                      
                      <h4 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white mb-3">{exp.company}</h4>
                      
                      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 text-sm text-gray-400">
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <MapPin className="w-4 h-4 text-purple-500" /> 
                          {exp.location}
                        </div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <Calendar className="w-4 h-4 text-purple-500" /> 
                          {exp.duration}
                        </div>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          <Building className="w-4 h-4 text-purple-500" /> 
                          {exp.type}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      onClick={exp.onCertificate}
                      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Award className="w-4 h-4" /> Certificate
                    </motion.button>
                    <motion.button
                      onClick={exp.onReport}
                      className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(75, 85, 99, 0.3)" }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-4 h-4" /> Report
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced Description */}
                <motion.div 
                  className="bg-gradient-to-r from-gray-700/30 to-gray-800/30 p-4 sm:p-6 rounded-xl mb-6 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <p className="text-gray-300 text-sm sm:text-base relative z-10">{exp.description}</p>
                </motion.div>

                {/* Enhanced Grid Layout */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Responsibilities & Achievements */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Key Responsibilities */}
                    <div>
                      <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <Target className="w-5 h-5 text-purple-500" /> 
                        Key Responsibilities
                      </h5>
                      <ul className="space-y-3">
                        {exp.responsibilities.map((item, idx) => (
                          <motion.li
                            key={idx}
                            className="flex gap-3 text-gray-300 text-sm sm:text-base p-3 bg-gray-700/20 rounded-xl border border-gray-600/30 group/item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx }}
                            whileHover={{ 
                              x: 8, 
                              backgroundColor: 'rgba(139, 92, 246, 0.1)',
                              borderColor: 'rgba(139, 92, 246, 0.3)'
                            }}
                          >
                            <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0 group-hover/item:text-purple-400 transition-colors" />
                            <span className="group-hover/item:text-white transition-colors">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <Star className="w-5 h-5 text-yellow-500" /> 
                        Key Achievements
                      </h5>
                      <ul className="space-y-3">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            className="flex gap-3 text-gray-300 text-sm sm:text-base p-3 bg-yellow-500/5 rounded-xl border border-yellow-500/20 group/achievement"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * idx + 0.3 }}
                            whileHover={{ 
                              x: 8, 
                              backgroundColor: 'rgba(234, 179, 8, 0.1)',
                              borderColor: 'rgba(234, 179, 8, 0.3)'
                            }}
                          >
                            <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0 group-hover/achievement:text-yellow-400 transition-colors" />
                            <span className="group-hover/achievement:text-white transition-colors">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Skills & Technologies */}
                    <div>
                      <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <Wrench className="w-5 h-5 text-purple-500" /> 
                        Skills & Technologies
                      </h5>
                      <div className="flex flex-wrap gap-3">
                        {exp.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm font-medium border border-purple-500/30 cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.05 * idx }}
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: 'rgba(139, 92, 246, 0.3)',
                              borderColor: 'rgba(139, 92, 246, 0.5)',
                              color: '#ffffff'
                            }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Team & Impact Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <motion.div 
                        className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h6 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Team Details
                        </h6>
                        <p className="text-gray-300 text-sm">Team Size: {exp.teamSize} members</p>
                        <p className="text-gray-300 text-sm">Mentor: {exp.mentor}</p>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-green-500/10 border border-green-500/20 rounded-xl p-4"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h6 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Impact
                        </h6>
                        <p className="text-gray-300 text-sm">{exp.impact}</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced Images Section */}
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                      <Eye className="w-5 h-5 text-purple-500" /> 
                      Experience Gallery
                    </h5>
                    {exp.images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className="relative group overflow-hidden rounded-xl border-2 border-purple-500/30 bg-black flex items-center justify-center cursor-pointer"
                        whileHover={{ scale: 1.05, borderColor: 'rgba(139, 92, 246, 0.6)' }}
                        transition={{ duration: 0.3 }}
                        onClick={() => setSelectedImage(image)}
                      >
                        <img 
                          src={image}
                          alt={`${exp.company} Experience ${idx + 1}`}
                          className="w-full h-48 sm:h-56 object-contain rounded-lg bg-black"
                        />
                        
                        {/* Enhanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between p-4">
                          <div className="text-white">
                            <p className="font-semibold text-sm">Experience Photo {idx + 1}</p>
                            <p className="text-xs text-gray-300">{exp.company}</p>
                          </div>
                          <motion.button
                            className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Eye className="w-4 h-4 text-white" />
                          </motion.button>
                        </div>

                        {/* Corner Badge */}
                        <div className="absolute top-3 left-3 bg-black/70 px-2 py-1 rounded-full text-xs text-white">
                          View {idx + 1}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Experience Summary */}
      <motion.div
        variants={itemVariants}
        className="mt-16 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-purple-500/20 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-10"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        <motion.h3 
          className="text-2xl sm:text-3xl font-bold text-center text-purple-400 mb-8 relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          Experience Highlights & Achievements
        </motion.h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center relative z-10">
          {[
            { 
              value: "2+", 
              label: "Months of Internship", 
              description: "Intensive hands-on experience",
              icon: Clock,
              color: "purple"
            },
            { 
              value: "12+", 
              label: "Technical Skills Gained", 
              description: "Advanced engineering competencies",
              icon: Zap,
              color: "blue"
            },
            { 
              value: "100%", 
              label: "Project Completion Rate", 
              description: "Consistent delivery excellence",
              icon: Target,
              color: "green"
            }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                className="p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 group"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 15px 30px rgba(139, 92, 246, 0.15)"
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={`w-16 h-16 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 text-${stat.color}-400`} />
                </div>
                <motion.div 
                  className="text-3xl font-bold text-purple-400 mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-white font-medium mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </motion.div>
            );
          })}
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
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <motion.img 
              src={selectedImage} 
              alt="Full View" 
              className="max-h-[90vh] w-auto rounded-xl shadow-2xl object-contain"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800/80 hover:bg-gray-700/80 p-3 rounded-full transition-colors backdrop-blur-sm border border-gray-600/50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Experience;