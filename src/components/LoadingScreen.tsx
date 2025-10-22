import React from "react";
import { motion } from "framer-motion";
import { Cog, Wrench, Gauge, Factory } from "lucide-react";

const LoadingScreen = () => {
  const gearVariants = {
    animate: (direction = 1) => ({
      rotate: direction * 360,
      transition: { repeat: Infinity, duration: 3, ease: "linear" }
    })
  };

  const pistonVariants = {
    animate: {
      y: [0, -25, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const gaugeVariants = {
    animate: {
      rotate: [0, 120, 0],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const conveyorVariants = {
    animate: {
      x: ["0%", "100%"],
      transition: { duration: 2, repeat: Infinity, ease: "linear" }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      
      {/* Technical Drawing Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-[200%] bg-[url('/blueprint-grid.svg')] bg-repeat opacity-10"
          animate={{ x: ["0%", "-50%"], y: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Dimension Lines */}
        <div className="absolute top-20 left-10 w-32 h-px bg-blue-500 opacity-20" />
        <div className="absolute top-20 left-10 w-px h-8 bg-blue-500 opacity-20" />
        <div className="absolute top-28 left-42 w-px h-8 bg-blue-500 opacity-20" />
      </div>

      {/* Main Gear Assembly */}
      <div className="relative z-10 flex items-center justify-center space-x-8 mb-12">
        {/* Large Drive Gear */}
        <motion.div 
          className="relative"
          variants={gearVariants} 
          animate="animate" 
          custom={1}
        >
          <Cog className="w-24 h-24 text-blue-500 drop-shadow-lg" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            variants={gaugeVariants}
            animate="animate"
          >
            <Gauge className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Medium Gear */}
        <motion.div variants={gearVariants} animate="animate" custom={-1}>
          <Cog className="w-16 h-16 text-purple-500 drop-shadow-lg" />
        </motion.div>

        {/* Tool Gear */}
        <motion.div variants={gearVariants} animate="animate" custom={1}>
          <Wrench className="w-20 h-20 text-green-400 drop-shadow-lg" />
        </motion.div>

        {/* Factory Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Factory className="w-14 h-14 text-orange-400 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Hydraulic System */}
      <div className="flex space-x-6 mb-10">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
          >
            {/* Cylinder */}
            <div className="w-8 h-2 bg-gray-600 rounded-t-lg" />
            <motion.div
              className="w-10 h-24 bg-gray-700 rounded-lg relative overflow-hidden border-2 border-gray-600"
              variants={pistonVariants}
              animate="animate"
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              {/* Piston Rod */}
              <motion.div className="w-full h-8 bg-gradient-to-t from-blue-500 to-cyan-400 absolute bottom-0 rounded-lg" />
            </motion.div>
            {/* Base */}
            <div className="w-14 h-4 bg-gray-600 rounded-b-lg" />
          </motion.div>
        ))}
      </div>

      {/* Conveyor Belt with Parts */}
      <div className="w-80 h-6 bg-gray-700 rounded-lg mt-6 relative overflow-hidden border-2 border-gray-600">
        {/* Conveyor Belt Texture */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 opacity-30" />
        
        {/* Moving Parts on Conveyor */}
        <motion.div
          className="absolute top-1 left-0 w-4 h-4 bg-yellow-400 rounded-sm"
          variants={conveyorVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-1 left-8 w-6 h-4 bg-red-400 rounded-sm"
          variants={conveyorVariants}
          animate="animate"
          style={{ animationDelay: "0.5s" }}
        />
        <motion.div
          className="absolute top-1 left-16 w-5 h-4 bg-green-400 rounded-sm"
          variants={conveyorVariants}
          animate="animate"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Engineer Identity */}
      <motion.div 
        variants={textVariants} 
        initial="initial" 
        animate="animate" 
        className="text-center z-10 mt-8"
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 drop-shadow-lg tracking-tight">
          VISWA M
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 tracking-wider font-medium mb-2">
          Mechanical Design Engineer
        </p>
        <p className="text-lg text-gray-400 italic">
          Precision Engineering & Innovation
        </p>
      </motion.div>

      {/* Technical Progress Indicator */}
      <div className="w-72 h-3 bg-gray-700 rounded-full mt-8 relative overflow-hidden border border-gray-600">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
        {/* Calibration Marks */}
        <div className="absolute inset-0 flex justify-between px-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-px h-3 bg-gray-500" />
          ))}
        </div>
      </div>

      {/* System Status Messages */}
      <motion.div className="mt-6 text-center">
        <motion.p
          className="text-gray-300 text-lg font-medium"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Calibrating Hydraulic Systems...
        </motion.p>
        <motion.p
          className="text-gray-400 text-sm mt-2"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        >
          Initializing CNC Protocols • Loading CAD Modules • Testing Assembly Lines
        </motion.p>
      </motion.div>

      {/* Technical Specifications Footer */}
      <motion.div
        className="absolute bottom-6 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-gray-500 tracking-wide">
          ISO 9001:2015 • GD&T Standards • SolidWorks • ANSYS • AutoCAD
        </p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
