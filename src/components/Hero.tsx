import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Award, Code, Database, Cpu, FileText, PenTool as Tool, Gauge } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

interface HeroProps {
  scrollToContact: () => void;
}

const Hero = ({ scrollToContact }: HeroProps) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900"
        animate={{
          background: [
            'linear-gradient(to bottom right, #4c1d95, #111827, #1e3a8a)',
            'linear-gradient(to bottom right, #1e3a8a, #111827, #4c1d95)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8"
      >
        {/* Profile Image - Increased size */}
        <motion.div
          className="relative mx-auto mb-8 w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-purple-500 overflow-hidden shadow-xl"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <img
            src="/viswa.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold mb-4"
        >
          Hi, I'm{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Viswa M
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl text-gray-300 mb-8 h-[60px]"
        >
          <TypeAnimation
            sequence={[
              'Mechanical Design Engineer',
              1000,
              'FEA & CFD Specialist',
              1000,
              'CAE Automation Expert',
              1000,
              'Product Development Engineer',
              1000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        {/* Key Expertise Areas - Enhanced with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-300"
          >
            <Award className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Design</h3>
            <p className="text-sm text-gray-400">SOLIDWORKS, CATIA, AutoCAD</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-300"
          >
            <Code className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Analysis</h3>
            <p className="text-sm text-gray-400">ANSYS, FEA, CFD</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-300"
          >
            <Database className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Automation</h3>
            <p className="text-sm text-gray-400">Python, MATLAB, APIs</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg transform transition-all duration-300"
          >
            <Cpu className="w-8 h-8 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Innovation</h3>
            <p className="text-sm text-gray-400">R&D, Optimization</p>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 max-w-3xl mx-auto mb-8 text-lg"
        >
          Mechanical engineer specializing in advanced CAD design, FEA/CFD analysis, and engineering automation. 
          Passionate about developing innovative solutions that bridge mechanical engineering with modern technology.
        </motion.p>

        {/* Professional Links - Enhanced with animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center space-x-6 mb-8"
        >
          <motion.a
            href="https://github.com/viswamathan"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-full hover:bg-gray-700 transition-colors group"
          >
            <Github className="w-7 h-7 text-white group-hover:text-purple-400 transition-colors" />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/viswa-m-91b544258/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-full hover:bg-gray-700 transition-colors group"
          >
            <Linkedin className="w-7 h-7 text-white group-hover:text-purple-400 transition-colors" />
          </motion.a>
        </motion.div>

        {/* Call to Action - Enhanced buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-6"
        >
          <motion.a
            href="/VISWA M.pdf"
            target="_blank"
            className="bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 text-white px-8 py-4 rounded-full transition-colors flex items-center gap-3 text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FileText className="w-6 h-6" />
            <span>Download Portfolio</span>
          </motion.a>
          <motion.button
            onClick={scrollToContact}
            className="border-2 border-purple-600/80 backdrop-blur-sm text-purple-400 hover:bg-purple-600/80 hover:text-white px-8 py-4 rounded-full transition-colors text-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Enhanced animated background shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
          rotate: [360, 180, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

export default Hero;