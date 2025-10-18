import React from "react";
import { motion } from "framer-motion";
import { Cog, Wrench } from "lucide-react";

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

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      
      {/* Blueprint / CAD background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[200%] h-[200%] bg-[url('/blueprint-grid.svg')] bg-repeat opacity-10"
          animate={{ x: ["0%", "-50%"], y: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Gear Cluster */}
      <div className="relative z-10 flex items-center justify-center space-x-6 mb-10">
        <motion.div variants={gearVariants} animate="animate" custom={1}>
          <Cog className="w-20 h-20 text-purple-500 drop-shadow-lg" />
        </motion.div>
        <motion.div variants={gearVariants} animate="animate" custom={-1}>
          <Cog className="w-12 h-12 text-blue-400 drop-shadow-lg" />
        </motion.div>
        <motion.div variants={gearVariants} animate="animate" custom={1}>
          <Wrench className="w-14 h-14 text-green-400 drop-shadow-lg" />
        </motion.div>
      </div>

      {/* Pistons */}
      <div className="flex space-x-4 mb-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-24 bg-gray-700 rounded-xl relative overflow-hidden"
            variants={pistonVariants}
            animate="animate"
            style={{ transitionDelay: `${i * 0.2}s` }}
          >
            <motion.div className="w-full h-8 bg-gradient-to-t from-purple-500 to-blue-400 absolute bottom-0 rounded-xl" />
          </motion.div>
        ))}
      </div>

      {/* Engineer Text */}
      <motion.div variants={textVariants} initial="initial" animate="animate" className="text-center z-10">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-lg">
          VISWA M
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 tracking-wider">Mechanical Design Engineer</p>
      </motion.div>

      {/* Conveyor Belt Progress Bar */}
      <div className="w-64 h-4 bg-gray-700 rounded-full mt-8 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-0 left-0 w-6 h-6 bg-yellow-400 rounded-full shadow-md"
          animate={{ x: ["0%", "100%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Loading Description */}
      <motion.p
        className="mt-4 text-gray-400 text-lg"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Initializing Mechanical Systems...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
