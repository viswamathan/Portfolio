import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, Award, FileText, Star, ChevronRight } from 'lucide-react';

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
        {/* NIOT Internship */}
        <VerticalTimelineElement
          className="vertical-timeline-element group"
          contentStyle={{
            background: 'rgba(31, 41, 55, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(107, 33, 168, 0.2)',
            boxShadow: '0 4px 20px rgba(107, 33, 168, 0.1)',
            transition: 'all 0.3s ease',
            padding: '32px'
          }}
          contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
          date={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-purple-400 font-semibold text-sm sm:text-base"
            >
              June 2024 - July 2024
            </motion.div>
          }
          iconStyle={{ 
            background: '#7c3aed',
            boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.2)',
          }}
          icon={<Briefcase className="w-5 h-5" />}
        >
          <motion.div 
            className="relative flex flex-col lg:flex-row group-hover:scale-[1.02] transition-transform duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex-1 z-10">
              <motion.h3 
                className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Student Intern
              </motion.h3>
              <motion.h4 
                className="text-purple-400 mb-4 font-semibold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                National Institute Of Ocean Technology
              </motion.h4>
              <motion.ul 
                className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  'Trained in ANSYS Workbench with real-time simulation of marine energy components',
                  'Analyzed OTEC & LTDD beam structures for strength and efficiency',
                  'Optimized material performance through simulation and research'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div 
                className="mt-6 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleNIOTCertificate}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </motion.button>
                <motion.button
                  onClick={handleNIOTReport}
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" />
                  <span>Report</span>
                </motion.button>
              </motion.div>
            </div>

            <motion.div 
              className="relative flex flex-col items-end mt-8 lg:mt-0 lg:ml-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.img
                src="/NIOT_LOGO.png"
                alt="NIOT Logo"
                className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg mb-6 hover:border-purple-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="grid gap-4 w-full max-w-xs">
                <motion.div
                  className="relative group overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src="/NIOT IMAGE 1.jpg" 
                    alt="NIOT 1" 
                    className="w-full h-48 sm:h-56 object-cover rounded-lg border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="relative group overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src="/NIOT IMAGE 2.jpg" 
                    alt="NIOT 2" 
                    className="w-full h-48 sm:h-56 object-cover rounded-lg border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </VerticalTimelineElement>

        {/* Super Auto Forge Internship */}
        <VerticalTimelineElement
          className="vertical-timeline-element group"
          contentStyle={{
            background: 'rgba(31, 41, 55, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(107, 33, 168, 0.2)',
            boxShadow: '0 4px 20px rgba(107, 33, 168, 0.1)',
            transition: 'all 0.3s ease',
            padding: '32px'
          }}
          contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
          date={
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-purple-400 font-semibold text-sm sm:text-base"
            >
              May 2025 - July 2025
            </motion.div>
          }
          iconStyle={{ 
            background: '#7c3aed',
            boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.2)',
          }}
          icon={<Briefcase className="w-5 h-5" />}
        >
          <motion.div 
            className="relative flex flex-col lg:flex-row group-hover:scale-[1.02] transition-transform duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex-1 z-10">
              <motion.h3 
                className="text-lg sm:text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Design Engineer Intern
              </motion.h3>
              <motion.h4 
                className="text-purple-400 mb-4 font-semibold text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Super Auto Forge
              </motion.h4>
              <motion.ul 
                className="space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {[
                  'Assisted in Forging Stage Design & CAD Modeling',
                  'Analyzed Material Flow & Defect Prediction via Simulation',
                  'Optimized Process Parameters & Documented Process Sheets'
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <ChevronRight className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div 
                className="mt-6 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  onClick={handleUpcomingCertificate}
                  className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </motion.button>
                <motion.button
                  onClick={handleUpcomingReport}
                  className="flex items-center gap-2 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FileText className="w-4 h-4" />
                  <span>Report</span>
                </motion.button>
              </motion.div>
            </div>

            <motion.div 
              className="relative flex flex-col items-end mt-8 lg:mt-0 lg:ml-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.img
                src="/SUPERAUTOFORGE_LOGO.png"
                alt="SUPER AUTO FORGE Logo"
                className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg mb-6 hover:border-purple-400 transition-colors"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="grid gap-4 w-full max-w-xs">
                <motion.div
                  className="relative group overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src="/SAF 1.jpg" 
                    alt="SAF Photo 1" 
                    className="w-full h-48 sm:h-56 object-cover rounded-lg border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
                <motion.div
                  className="relative group overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  <img 
                    src="/SAF 2.jpg" 
                    alt="SAF Photo 2" 
                    className="w-full h-48 sm:h-56 object-cover rounded-lg border-2 border-purple-500/30 group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </motion.div>
  );
};

export default Experience;