import React from "react";
import { motion } from "framer-motion";
import { Cog, Wrench, Cpu } from "lucide-react";

const LoadingScreen = () => {
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.8 } }
  };

  const gearVariants = {
    animate: (direction = 1) => ({
      rotate: direction * 360,
      transition: { repeat: Infinity, duration: 2, ease: "linear" }
    })
  };

  const pistonVariants = {
    animate: {
      y: [0, -20, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[url('/blueprint-grid.svg')] bg-repeat opacity-10" />

      {/* Animated Gears */}
      <div className="relative z-10 flex space-x-8 mb-10">
        <motion.div variants={gearVariants} animate="animate" custom={1}>
          <Cog className="w-16 h-16 text-purple-500" />
        </motion.div>
        <motion.div variants={gearVariants} animate="animate" custom={-1}>
          <Cog className="w-12 h-12 text-blue-500" />
        </motion.div>
        <motion.div variants={gearVariants} animate="animate" custom={1}>
          <Wrench className="w-12 h-12 text-green-500" />
        </motion.div>
      </div>

      {/* Piston Animation */}
      <motion.div
        className="w-8 h-20 bg-gray-700 rounded-xl mb-8 relative overflow-hidden"
        variants={pistonVariants}
        animate="animate"
      >
        <motion.div className="w-full h-8 bg-gradient-to-t from-purple-500 to-blue-500 rounded-xl absolute bottom-0" />
      </motion.div>

      {/* Text */}
      <motion.div className="text-center z-10">
        <h1 className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          VISWA M
        </h1>
        <p className="text-xl text-gray-300 mb-4">Mechanical Design Engineer</p>
      </motion.div>

      {/* Progress Bar as Conveyor Belt */}
      <div className="w-64 h-3 bg-gray-700 rounded-full relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 bg-yellow-400 rounded-full"
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <motion.p
        className="mt-4 text-gray-400"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Initializing Mechanical Systems...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
