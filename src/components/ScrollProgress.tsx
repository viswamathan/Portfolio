import React from 'react';
import { motion } from 'framer-motion';

interface ScrollProgressProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  activeSection,
  scrollToSection
}) => {
  const sections = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];

  return (
    <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 space-y-3 z-50">
      {sections.map((section, index) => (
        <motion.div
          key={section}
          className="relative group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 1 }}
        >
          <motion.button
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-125 shadow-lg shadow-purple-500/50'
                : 'bg-gray-600 hover:bg-purple-400 hover:scale-110'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
          
          {/* Tooltip */}
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            initial={{ x: 10, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
          >
            {section}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-800 rotate-45" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default ScrollProgress;