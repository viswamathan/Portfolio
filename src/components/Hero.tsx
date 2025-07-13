import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Github, Linkedin, FileText, Cog, Wrench, Zap } from 'lucide-react';
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
        <motion.div variants={itemVariants} className="mb-8">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative inline-block"
          >
            <motion.img
              src="/viswa.jpeg"
              alt="Viswa M - Mechanical Engineer"
              className="mx-auto mb-6 w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full object-cover shadow-2xl border-4 border-purple-500/50"
              whileHover={{ 
                scale: 1.1,
                boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)"
              }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            
            {/* Floating Mechanical Elements around Profile */}
            <motion.div
              className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Cog className="w-4 h-4 text-purple-400" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
              animate={{
                rotate: [360, 180, 0],
                scale: [1.2, 1, 1.2],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            >
              <Wrench className="w-4 h-4 text-blue-400" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Main Title */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="font-bold mb-4"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Hi, I'm{' '}
            </span>
            <motion.span 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Viswa M
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Animated Subtitle */}
        <motion.div 
          variants={itemVariants}
          className="mb-8 h-12 sm:h-14 flex items-center justify-center"
        >
          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 font-bold">
            <TypeAnimation
              sequence={[
                'Mechanical Design Engineer',
                2000,
                'FEA & CFD Specialist',
                2000,
                'CAE Automation Expert',
                2000,
                'Product Development Engineer',
                2000,
                'Innovation Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100"
            />
          </div>
        </motion.div>
        
        {/* Expertise Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto"
        >
          {[
            { icon: Cog, title: 'Design', desc: 'SolidWorks, CATIA' },
            { icon: Zap, title: 'Analysis', desc: 'ANSYS, FEA, CFD' },
            { icon: Wrench, title: 'Automation', desc: 'Python, MATLAB' },
            { icon: FileText, title: 'Innovation', desc: 'R&D, Optimization' }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-gray-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-purple-500/20 relative overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                borderColor: 'rgba(139, 92, 246, 0.5)'
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
              <h3 className="font-bold text-lg sm:text-xl mb-1">{item.title}</h3>
              <p className="text-base sm:text-lg text-gray-400 font-semibold">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-semibold"
        >
          Passionate mechanical engineer specializing in advanced CAD design, FEA/CFD analysis, 
          and engineering automation. I bridge traditional mechanical engineering with cutting-edge 
          technology to create innovative solutions.
        </motion.p>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-8 mb-12"
        >
          {[
            { icon: Github, href: "https://github.com/viswamathan", label: "GitHub" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/viswa-m-91b544258/", label: "LinkedIn" }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-800/50 backdrop-blur-sm p-4 rounded-full hover:bg-gray-700/50 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <social.icon className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"
                whileHover={{ scale: 1.1 }}
              />
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
            className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Download Portfolio</span>
          </motion.a>

          <motion.button
            onClick={scrollToContact}
            className="group relative border-2 border-purple-600/50 text-purple-400 hover:text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 backdrop-blur-sm hover:bg-purple-600/20 text-sm flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Let's Connect</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;