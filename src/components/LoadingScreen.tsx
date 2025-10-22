import React from "react";
import { motion } from "framer-motion";
import { Cog, Wrench, Gauge } from "lucide-react";

const LoadingScreen = () => {
  const gearVariants = {
    animate: {
      rotate: 360,
      transition: { 
        repeat: Infinity, 
        duration: 3, 
        ease: "linear" 
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Main Mechanical Elements */}
      <div className="relative flex items-center justify-center space-x-8 mb-12">
        {/* Central Gear */}
        <motion.div 
          variants={gearVariants} 
          animate="animate"
        >
          <Cog className="w-20 h-20 text-blue-500" />
        </motion.div>

        {/* Secondary Tools */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Wrench className="w-16 h-16 text-green-400" />
        </motion.div>

        {/* Gauge */}
        <motion.div
          animate={{ rotate: [0, 90, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Gauge className="w-14 h-14 text-yellow-400" />
        </motion.div>
      </div>

      {/* Title */}
      <motion.div className="text-center space-y-4">
        <motion.h1 
          className="text-4xl font-bold text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          VISWA M
        </motion.h1>
        
        <motion.p 
          className="text-lg text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Mechanical Design Engineer
        </motion.p>
      </motion.div>

      {/* Simple Progress Bar */}
      <motion.div 
        className="w-64 h-2 bg-gray-700 rounded-full mt-8 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full bg-blue-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Simple Footer */}
      <motion.div
        className="absolute bottom-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-sm text-gray-500">Loading...</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
