import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, Award, FileText, Star, ChevronRight, MapPin, Calendar, Users, Target } from 'lucide-react';

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
      description: "Specialized training in marine energy systems and advanced simulation techniques",
      responsibilities: [
        "Trained in ANSYS Workbench with real-time simulation of marine energy components",
        "Analyzed OTEC & LTDD beam structures for strength and efficiency optimization",
        "Optimized material performance through comprehensive simulation and research methodologies"
      ],
      achievements: [
        "Successfully completed advanced FEA training program",
        "Contributed to marine energy research projects",
        "Gained expertise in ocean thermal energy conversion systems"
      ],
      skills: ["ANSYS Workbench", "FEA", "Marine Engineering", "Structural Analysis", "Research Methodology"],
      onCertificate: handleNIOTCertificate,
      onReport: handleNIOTReport
    },
    {
      title: "Design Engineer Intern",
      company: "Super Auto Forge",
      location: "Coimbatore, Tamil Nadu",
      duration: "May 2025 - July 2025",
      type: "Industrial Internship",
      logo: "/SUPERAUTOFORGE_LOGO.png",
      images: ["/SAF 1.jpg", "/SAF 2.jpg"],
      description: "Hands-on experience in automotive forging processes and manufacturing optimization",
      responsibilities: [
        "Assisted in Forging Stage Design & advanced CAD Modeling techniques",
        "Analyzed Material Flow & Defect Prediction via sophisticated simulation tools",
        "Optimized Process Parameters & documented comprehensive process sheets"
      ],
      achievements: [
        "Improved forging process efficiency by 15%",
        "Reduced material waste through optimized design",
        "Developed standardized process documentation"
      ],
      skills: ["CAD Design", "Forging Processes", "Material Flow Analysis", "Process Optimization", "Manufacturing"],
      onCertificate: handleUpcomingCertificate,
      onReport: handleUpcomingReport
    }
  ];

  return (
    <motion.div 
      className="container mx-auto px-6 py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div 
        className="relative mb-16"
        variants={itemVariants}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center">
          Professional Experience
        </h2>
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" />
      </motion.div>

      <VerticalTimeline lineColor="#6b21a8">
        {experiences.map((exp, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element group"
            contentStyle={{
              background: 'rgba(31, 41, 55, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(107, 33, 168, 0.2)',
              boxShadow: '0 4px 20px rgba(107, 33, 168, 0.1)',
              transition: 'all 0.3s ease',
              padding: '40px',
              borderRadius: '16px'
            }}
            contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
            date={
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-purple-400 font-semibold text-sm sm:text-base"
              >
                {exp.duration}
              </motion.div>
            }
            iconStyle={{ 
              background: '#7c3aed',
              boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.2)',
            }}
            icon={<Briefcase className="w-5 h-5" />}
          >
            <motion.div 
              className="relative group-hover:scale-[1.01] transition-transform duration-300"
              whileHover={{ scale: 1.005 }}
            >
              {/* Header Section */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div className="flex-1">
                  <motion.h3 
                    className="text-xl sm:text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {exp.title}
                  </motion.h3>
                  <motion.h4 
                    className="text-purple-400 mb-3 font-semibold text-base sm:text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {exp.company}
                  </motion.h4>
                  
                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{exp.type}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                </div>

                <motion.img
                  src={exp.logo}
                  alt={`${exp.company} Logo`}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-2 border-purple-500 shadow-lg hover:border-purple-400 transition-colors ml-auto lg:ml-6 mb-4 lg:mb-0"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Content Grid */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Responsibilities & Achievements */}
                <div className="space-y-6">
                  {/* Key Responsibilities */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h5 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-500" />
                      Key Responsibilities
                    </h5>
                    <ul className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {exp.responsibilities.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                          <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Key Achievements */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <h5 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {exp.achievements.map((item, idx) => (
                        <motion.li 
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                        >
                          <Star className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Skills Gained */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <h5 className="text-lg font-bold text-white mb-3">Skills Gained</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <motion.span
                          key={idx}
                          className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.9 + idx * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div 
                    className="flex gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                  >
                    <motion.button
                      onClick={exp.onCertificate}
                      className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Award className="w-4 h-4" />
                      <span>Certificate</span>
                    </motion.button>
                    <motion.button
                      onClick={exp.onReport}
                      className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>Report</span>
                    </motion.button>
                  </motion.div>
                </div>

                {/* Right Column - Images */}
                <motion.div 
                  className="space-y-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
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
                        className="w-full h-56 sm:h-64 object-cover rounded-xl border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-sm font-medium">
                          {exp.company} - Experience {idx + 1}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </motion.div>
  );
};

export default Experience;