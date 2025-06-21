import React from 'react';
import { motion } from 'framer-motion';
import { Cog, Cpu, Wrench } from 'lucide-react';

const LoadingScreen = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const iconVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.8
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: "100%",
      transition: {
        duration: 2.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        {/* Animated Icons */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          <motion.div
            variants={iconVariants}
            animate="animate"
            className="relative"
          >
            <Cog className="w-12 h-12 text-purple-500" />
            <motion.div
              className="absolute inset-0 border-2 border-purple-500/30 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            animate="animate"
            style={{ animationDelay: '0.5s' }}
            className="relative"
          >
            <Cpu className="w-12 h-12 text-blue-500" />
            <motion.div
              className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
          
          <motion.div
            variants={iconVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
            className="relative"
          >
            <Wrench className="w-12 h-12 text-green-500" />
            <motion.div
              className="absolute inset-0 border-2 border-green-500/30 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            VISWA M
          </h1>
          <p className="text-xl text-gray-300">Mechanical Design Engineer</p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mx-auto">
          <motion.div
            variants={progressVariants}
            initial="initial"
            animate="animate"
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          />
        </div>

        {/* Loading Text Animation */}
        <motion.p
          className="mt-4 text-gray-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing Engineering Portfolio...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
