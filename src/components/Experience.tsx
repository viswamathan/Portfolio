import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Github, Linkedin, FileText } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';

interface HeroProps {
  scrollToContact: () => void;
}

const AnimatedSphere = () => {
  return (
    <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={1.5}
          roughness={0.4}
        />
      </Sphere>
    </Float>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollToContact }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-sm sm:text-base md:text-lg lg:text-xl font-medium">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Profile Section */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative inline-block"
          >
            <motion.img
              src="/viswa.jpeg"
              alt="Viswa M - Mechanical Engineer"
              className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover shadow-2xl border-4 border-purple-500/50"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6 bg-purple-500/30 rounded-full blur-sm"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div
              className="absolute -bottom-3 -left-3 w-4 h-4 bg-blue-500/30 rounded-full blur-sm"
              animate={{ scale: [1.5, 1, 1.5], opacity: [0.8, 0.3, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.h1 className="font-semibold mb-2" whileHover={{ scale: 1.02 }}>
            <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Hi, I'm </span>
            <motion.span 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Viswa M
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div variants={itemVariants} className="mb-6 h-10 flex items-center justify-center">
          <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-medium">
            <TypeAnimation
              sequence={[
                'Mechanical Design Engineer', 2000,
                'FEA & CFD Specialist', 2000,
                'CAE Automation Expert', 2000,
                'Product Development Engineer', 2000,
                'Innovation Enthusiast', 2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100"
            />
          </div>
        </motion.div>

        {/* Expertise Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-4xl mx-auto">
          {[
            { icon: '🎯', title: 'Design', desc: 'SolidWorks, CATIA' },
            { icon: '🔬', title: 'Analysis', desc: 'ANSYS, FEA, CFD' },
            { icon: '⚡', title: 'Automation', desc: 'Python, MATLAB' },
            { icon: '💡', title: 'Innovation', desc: 'R&D, Optimization' }
          ].map((item) => (
            <motion.div
              key={item.title}
              className="bg-gray-800/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-purple-500/20"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'rgba(139, 92, 246, 0.5)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-xl sm:text-2xl mb-1 font-bold">{item.icon}</div>
              <h3 className="font-bold text-sm sm:text-base mb-1">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p variants={itemVariants} className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-normal font-medium">
          Passionate mechanical engineer specializing in advanced CAD design, FEA/CFD analysis, and engineering automation. I bridge traditional mechanical engineering with cutting-edge technology to create innovative solutions.
        </motion.p>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex justify-center items-center space-x-6 mb-10">
          {[
            { icon: Github, href: "https://github.com/viswamathan", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/viswa-m-91b544258/", label: "LinkedIn" }
          ].map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-800/50 backdrop-blur-sm p-3 rounded-full hover:bg-gray-700/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-5 h-5 text-white group-hover:text-purple-400 transition-colors" />
            </motion.a>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <motion.a
            href="/VISWA M.pdf"
            target="_blank"
            className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Download Portfolio</span>
          </motion.a>

          <motion.button
            onClick={scrollToContact}
            className="group relative border-2 border-purple-600/50 text-purple-400 hover:text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm hover:bg-purple-600/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
