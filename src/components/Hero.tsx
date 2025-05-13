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
        className="relative z-10 text-center"
      >
        {/* Profile Image */}
        <motion.img
          src="/viswa.jpeg"
          alt="Profile"
          className="mx-auto mb-6 w-32 h-32 rounded-full border-4 border-purple-500 object-cover shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        />

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

        {/* Key Expertise Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-3xl mx-auto"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg">
            <Award className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Design</h3>
            <p className="text-sm text-gray-400">SOLIDWORKS, CATIA, AutoCAD</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg">
            <Code className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Analysis</h3>
            <p className="text-sm text-gray-400">ANSYS, FEA, CFD</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg">
            <Database className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Automation</h3>
            <p className="text-sm text-gray-400">Python, MATLAB, APIs</p>
          </div>
          <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg">
            <Cpu className="w-6 h-6 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold mb-1">Innovation</h3>
            <p className="text-sm text-gray-400">R&D, Optimization</p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 max-w-2xl mx-auto mb-8"
        >
          Mechanical engineer specializing in advanced CAD design, FEA/CFD analysis, and engineering automation. 
          Passionate about developing innovative solutions that bridge mechanical engineering with modern technology.
        </motion.p>

        {/* Professional Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center items-center space-x-4 mb-8"
        >
          <a
            href="https://github.com/johndoe"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700 transition-colors group"
          >
            <Github className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/viswa-m-91b544258/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700 transition-colors group"
          >
            <Linkedin className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
          </a>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <motion.a
            href="/VISWA M.pdf"
            target="_blank"
            className="bg-purple-600/80 backdrop-blur-sm hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-colors flex items-center gap-2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <FileText className="w-5 h-5" />
            <span>Download Portfolio</span>
          </motion.a>
          <motion.button
            onClick={scrollToContact}
            className="border border-purple-600/80 backdrop-blur-sm text-purple-400 hover:bg-purple-600/80 hover:text-white px-8 py-3 rounded-full transition-colors"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Animated background shapes */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </div>
  );
};

export default Hero;