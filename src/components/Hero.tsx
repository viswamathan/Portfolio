import React from "react";
import { motion } from "framer-motion";
import { Cog, Wrench, Gauge, Factory, Cpu, Zap, Cogs, Microchip } from "lucide-react";

const LoadingScreen = () => {
  const gearVariants = {
    animate: (direction = 1) => ({
      rotate: direction * 360,
      transition: { 
        repeat: Infinity, 
        duration: direction === 1 ? 4 : 3, 
        ease: "linear" 
      }
    })
  };

  const pistonVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { 
        duration: 1.4, 
        repeat: Infinity, 
        ease: "easeInOut",
        repeatType: "reverse"
      }
    }
  };

  const gaugeVariants = {
    animate: {
      rotate: [0, 180, 0],
      transition: { 
        duration: 2.5, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  const conveyorVariants = {
    animate: {
      x: ["-100%", "100%"],
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        ease: "linear" 
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      } 
    }
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      
      {/* Advanced Technical Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Grid Pattern */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:64px_64px]"
          animate={{ 
            x: [0, -64], 
            y: [0, -64] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        
        {/* Floating Technical Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-blue-500/10"
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Cogs size={80} />
        </motion.div>
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 text-cyan-500/10"
          animate={{ 
            rotate: -360,
            scale: [1.2, 1, 1.2]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <Microchip size={60} />
        </motion.div>
      </div>

      {/* Main Engineering Assembly */}
      <div className="relative z-20 flex items-center justify-center space-x-12 mb-16">
        
        {/* Central Drive System */}
        <div className="relative">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-2 border-blue-500/30 rounded-full"
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ width: 140, height: 140, top: -10, left: -10 }}
          />
          
          {/* Primary Gear */}
          <motion.div 
            className="relative"
            variants={gearVariants} 
            animate="animate" 
            custom={1}
          >
            <Cog className="w-32 h-32 text-blue-500 drop-shadow-2xl" strokeWidth={1.5} />
            
            {/* Central Gauge */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              variants={gaugeVariants}
              animate="animate"
            >
              <Gauge className="w-12 h-12 text-yellow-400 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Secondary Systems */}
        <div className="flex flex-col space-y-8">
          {/* Precision Gear */}
          <motion.div 
            variants={gearVariants} 
            animate="animate" 
            custom={-1}
            className="text-purple-500 drop-shadow-lg"
          >
            <Cog className="w-20 h-20" strokeWidth={1.5} />
          </motion.div>

          {/* Tool System */}
          <motion.div 
            variants={gearVariants} 
            animate="animate" 
            custom={0.8}
            className="text-emerald-400 drop-shadow-lg"
          >
            <Wrench className="w-24 h-24" strokeWidth={1.5} />
          </motion.div>
        </div>

        {/* Automation System */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Factory className="w-16 h-16 text-orange-400 drop-shadow-lg" strokeWidth={1.5} />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Zap className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Advanced Hydraulic Simulation */}
      <div className="flex space-x-8 mb-12">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            {/* Fluid Reservoir */}
            <div className="w-10 h-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-lg mb-1" />
            
            {/* Cylinder Assembly */}
            <div className="relative">
              <div className="w-12 h-3 bg-gray-600 rounded-t-lg" />
              <motion.div
                className="w-14 h-28 bg-gradient-to-b from-gray-700 to-gray-800 rounded-lg relative overflow-hidden border-2 border-gray-600 shadow-inner"
                variants={pistonVariants}
                animate="animate"
                custom={i}
              >
                {/* Hydraulic Fluid */}
                <motion.div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-lg"
                  animate={{ height: ["60%", "80%", "60%"] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                />
                {/* Piston */}
                <div className="absolute bottom-0 w-full h-6 bg-gray-500 rounded-b-lg border-t border-gray-400" />
              </motion.div>
              <div className="w-16 h-4 bg-gray-600 rounded-b-lg mt-1" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Automated Production Line */}
      <div className="w-96 h-8 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg mt-8 relative overflow-hidden border-2 border-gray-600 shadow-lg">
        {/* Conveyor Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,100,100,0.1)_25%,rgba(100,100,100,0.1)_50%,transparent_50%,transparent_75%,rgba(100,100,100,0.1)_75%)] bg-[size:16px_16px]" />
        
        {/* Moving Components */}
        <motion.div
          className="absolute top-1 left-0 w-6 h-6 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded-sm shadow-lg"
          variants={conveyorVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-1 left-0 w-8 h-6 bg-gradient-to-r from-red-500 to-red-400 rounded-sm shadow-lg"
          variants={conveyorVariants}
          animate="animate"
          transition={{ delay: 0.3 }}
        />
        <motion.div
          className="absolute top-1 left-0 w-7 h-6 bg-gradient-to-r from-green-500 to-green-400 rounded-sm shadow-lg"
          variants={conveyorVariants}
          animate="animate"
          transition={{ delay: 0.6 }}
        />
      </div>

      {/* Professional Identity */}
      <motion.div 
        variants={textVariants} 
        initial="initial" 
        animate="animate" 
        className="text-center z-20 mt-12 space-y-4"
      >
        <motion.h1 
          className="text-6xl sm:text-7xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 drop-shadow-2xl tracking-tight"
          animate={{ 
            backgroundPosition: ["0%", "100%", "0%"] 
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity 
          }}
          style={{ 
            backgroundSize: "200% 100%" 
          }}
        >
          VISWA M
        </motion.h1>
        
        <div className="space-y-2">
          <motion.p 
            className="text-2xl sm:text-3xl text-gray-200 tracking-widest font-semibold"
            variants={pulseVariants}
            animate="animate"
          >
            MECHANICAL DESIGN ENGINEER
          </motion.p>
          <motion.p 
            className="text-lg text-cyan-300 italic font-light tracking-wide"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Precision Engineering & Innovative Solutions
          </motion.p>
        </div>
      </motion.div>

      {/* Advanced Progress Analytics */}
      <div className="w-80 h-4 bg-gray-800 rounded-full mt-10 relative overflow-hidden border border-gray-600 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-full relative overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "easeInOut" }}
        >
          {/* Scanning Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
        
        {/* Precision Markings */}
        <div className="absolute inset-0 flex justify-between items-center px-2">
          {[...Array(11)].map((_, i) => (
            <div key={i} className={`w-px h-2 ${i % 5 === 0 ? 'bg-gray-400 h-3' : 'bg-gray-600'}`} />
          ))}
        </div>
      </div>

      {/* Professional Credentials Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="flex justify-center space-x-8 text-xs text-gray-500 tracking-wider">
          <p>ISO 9001:2015 CERTIFIED</p>
          <p>•</p>
          <p>FEA & CFD ANALYSIS</p>
          <p>•</p>
          <p>GD&T EXPERT</p>
        </div>
        <div className="flex justify-center space-x-6 mt-2 text-xs text-gray-600">
          <p>SOLIDWORKS</p>
          <p>ANSYS</p>
          <p>AUTOCAD</p>
          <p>CATIA</p>
          <p>MATLAB</p>
        </div>
      </motion.div>

      {/* Ambient Light Effects */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
    </motion.div>
  );
};

export default LoadingScreen;
