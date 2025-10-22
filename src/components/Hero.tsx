import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Github, Linkedin, FileText, Cog, Wrench, Zap, Award, Code2 } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useState } from 'react';

interface HeroProps {
  scrollToContact: () => void;
  navigateToPage?: (page: 'portfolio' | 'cad-models' | 'achievements') => void;
}

// Professional Engineering Model Component
const EngineeringModel = () => {
  return (
    <Canvas camera={{ position: [4, 2, 4], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <spotLight position={[0, 10, 0]} intensity={0.5} />
      
      {/* Abstract Engineering Geometry */}
      <mesh rotation={[0, Math.PI / 4, 0]} position={[0, 0, 0]}>
        <torusGeometry args={[1.2, 0.3, 16, 100]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          metalness={0.8}
          roughness={0.2}
          emissive="#4c1d95"
          emissiveIntensity={0.1}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.8, 1, 0.5, 32]} />
        <meshStandardMaterial 
          color="#3b82f6"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
      />
      <Environment preset="city" />
    </Canvas>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollToContact, navigateToPage }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      window.open('/VISWA M.pdf', '_blank');
      setIsDownloading(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 40%)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Text Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-left"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/30 mb-8"
          >
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-gray-300">Mechanical Engineering Specialist</span>
          </motion.div>

          {/* Main Title */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.h1 
              className="font-bold mb-4 leading-tight"
            >
              <span className="text-4xl sm:text-5xl md:text-6xl text-white block">
                Hi, I'm{' '}
              </span>
              <motion.span 
                className="text-4xl sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 block"
              >
                Viswa M
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated Subtitle */}
          <motion.div 
            variants={itemVariants}
            className="mb-8 h-16 flex items-center"
          >
            <div className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-semibold">
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
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-white"
              />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Specializing in advanced CAD design, FEA/CFD analysis, and engineering automation. 
            I combine traditional mechanical engineering expertise with cutting-edge technology 
            to deliver innovative solutions and optimized product development.
          </motion.p>

          {/* Core Expertise */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { icon: Cog, title: 'CAD Design', desc: 'SolidWorks, CATIA' },
              { icon: Zap, title: 'CAE Analysis', desc: 'ANSYS, FEA/CFD' },
              { icon: Code2, title: 'Automation', desc: 'Python, MATLAB' },
              { icon: Wrench, title: 'Prototyping', desc: 'R&D, Testing' }
            ].map((item) => (
              <motion.div
                key={item.title}
                className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <item.icon className="w-6 h-6 text-purple-400 mb-2" />
                <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <motion.button
              onClick={handleDownload}
              disabled={isDownloading}
              className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{isDownloading ? 'Downloading...' : 'Download Portfolio'}</span>
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              className="group relative border-2 border-purple-500/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm hover:bg-purple-600/20 flex items-center justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Start Conversation</span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            <span className="text-gray-400 text-sm font-medium">Connect with me:</span>
            <div className="flex gap-3">
              {[
                { icon: Github, href: "https://github.com/viswamathan", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/viswa-m-91b544258/", label: "LinkedIn" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/50 backdrop-blur-sm p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column - 3D Model */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="hidden lg:block relative h-[600px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800/50 to-purple-900/30 backdrop-blur-sm border border-gray-700/50"
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400">Loading engineering model...</div>
            </div>
          }>
            <EngineeringModel />
          </Suspense>
          
          {/* Model Label */}
          <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-600/50">
            <span className="text-xs text-gray-300 font-medium">Engineering Model</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
