import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import { Github, Linkedin, FileText, Cog, Wrench, Zap, Cpu, Rocket } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useState, useRef } from 'react';

interface HeroProps {
  scrollToContact: () => void;
  navigateToPage?: (page: 'portfolio' | 'cad-models' | 'achievements') => void;
}

// Premium 3D Mechanical Elements
const MechanicalElements = () => {
  return (
    <group>
      {/* Floating Gear System */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 1, -2]} rotation={[0.5, 0.5, 0]}>
          <torusGeometry args={[0.8, 0.2, 16, 32]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            metalness={0.8} 
            roughness={0.2}
            emissive="#4c1d95"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Engineering Piston */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[-2, -1, -1]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.3, 1.5, 32]} />
            <meshStandardMaterial 
              color="#06b6d4" 
              metalness={0.7} 
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.9, 0]}>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial 
              color="#3b82f6" 
              metalness={0.6} 
              roughness={0.4}
            />
          </mesh>
        </group>
      </Float>

      {/* CAD Wireframe Cube */}
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <mesh position={[1, -2, -3]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial 
            color="#10b981"
            wireframe
            transparent
            opacity={0.6}
            emissive="#065f46"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollToContact, navigateToPage }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handlePlaySound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.1;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/mechanical-ambient.mp3" type="audio/mpeg" />
      </audio>

      {/* Premium 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} color="#8b5cf6" />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3b82f6" />
            <spotLight position={[0, 5, 0]} intensity={0.5} color="#06b6d4" angle={0.3} />
            
            <MechanicalElements />
            
            <Environment preset="city" />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              enableRotate={true} 
              autoRotate 
              autoRotateSpeed={0.8}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        {/* Premium Profile Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <motion.div
            variants={floatingVariants}
            animate="animate"
            className="relative inline-block"
          >
            <div className="relative">
              <motion.img
                src="/viswa.jpeg"
                alt="Viswa M - Mechanical Engineer"
                className="mx-auto mb-6 w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 rounded-full object-cover shadow-2xl border-4 border-purple-500/70 backdrop-blur-sm"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.8)",
                  borderColor: "rgba(139, 92, 246, 0.9)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
              
              {/* Animated Badge */}
              <motion.div
                className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-3 h-3 inline mr-1" />
                ENGINEER
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/50 shadow-lg"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Cog className="w-5 h-5 text-purple-300" />
              </motion.div>
              
              <motion.div
                className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/50 shadow-lg"
                animate={{
                  rotate: [360, 180, 0],
                  scale: [1.2, 1, 1.2],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Wrench className="w-5 h-5 text-blue-300" />
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 w-10 h-10 bg-gradient-to-br from-cyan-500/30 to-emerald-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/50 shadow-lg"
                animate={{
                  rotate: [0, -180, -360],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
              >
                <Zap className="w-5 h-5 text-cyan-300" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Premium Title Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <motion.h1 
            className="font-bold mb-4 tracking-tight"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-light">
              Hi, I'm{' '}
            </span>
            <motion.span 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 font-medium"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Viswa M
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Enhanced Animated Subtitle */}
        <motion.div 
          variants={itemVariants}
          className="mb-12 h-16 sm:h-20 flex items-center justify-center relative"
        >
          <div className="relative">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-200 font-medium tracking-wide">
              <TypeAnimation
                sequence={[
                  'Mechanical Design Engineer',
                  2500,
                  'FEA & CFD Specialist',
                  2500,
                  'CAE Automation Expert',
                  2500,
                  'Product Development Lead',
                  2500,
                  'Innovation Catalyst',
                  2500,
                ]}
                wrapper="span"
                speed={65}
                repeat={Infinity}
                className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-100"
              />
            </div>
            
            {/* Sound Control */}
            <motion.button
              onClick={handlePlaySound}
              className="absolute -right-12 top-1/2 -translate-y-1/2 p-3 bg-gray-800/40 backdrop-blur-sm rounded-full hover:bg-gray-700/60 transition-all duration-300 border border-gray-600/50"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMuted ? (
                <Zap className="w-5 h-5 text-gray-400" />
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Zap className="w-5 h-5 text-purple-400" />
                </motion.div>
              )}
            </motion.button>
          </div>
        </motion.div>
        
        {/* Premium Expertise Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 max-w-5xl mx-auto"
        >
          {[
            { 
              icon: Cog, 
              title: 'CAD Design', 
              desc: 'SolidWorks, CATIA',
              gradient: 'from-purple-500/20 to-purple-600/20',
              border: 'border-purple-500/30'
            },
            { 
              icon: Zap, 
              title: 'FEA/CFD', 
              desc: 'ANSYS, Simulation',
              gradient: 'from-blue-500/20 to-blue-600/20',
              border: 'border-blue-500/30'
            },
            { 
              icon: Cpu, 
              title: 'Automation', 
              desc: 'Python, MATLAB',
              gradient: 'from-cyan-500/20 to-cyan-600/20',
              border: 'border-cyan-500/30'
            },
            { 
              icon: Rocket, 
              title: 'Innovation', 
              desc: 'R&D, Optimization',
              gradient: 'from-emerald-500/20 to-emerald-600/20',
              border: 'border-emerald-500/30'
            }
          ].map((item, index) => (
            <motion.div
              key={item.title}
              className={`bg-gradient-to-br ${item.gradient} backdrop-blur-lg p-8 rounded-2xl border ${item.border} relative overflow-hidden group cursor-pointer shadow-2xl`}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={false}
                transition={{ duration: 0.6 }}
                style={{
                  background: `linear-gradient(45deg, transparent 30%, ${item.border.split('-')[1]}-500/10 50%, transparent 70%)`,
                  backgroundSize: '200% 200%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 200%'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              <motion.div
                className="relative z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <item.icon className="w-10 h-10 mb-4 mx-auto text-white" />
              </motion.div>
              
              <h3 className="font-bold text-xl mb-2 text-white relative z-10">{item.title}</h3>
              <p className="text-gray-200 font-medium text-lg relative z-10">{item.desc}</p>

              {/* Hover Effect */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl"
                initial={false}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-300 text-xl sm:text-2xl max-w-4xl mx-auto mb-16 leading-relaxed font-light tracking-wide bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl"
        >
          <span className="text-purple-300 font-medium">Visionary mechanical engineer</span> specializing in 
          advanced CAD design, computational analysis, and engineering automation. Bridging traditional 
          mechanical excellence with cutting-edge digital innovation to create transformative solutions 
          for complex engineering challenges.
        </motion.p>

        {/* Premium Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center items-center space-x-8 mb-16"
        >
          {[
            { 
              icon: Github, 
              href: "https://github.com/viswamathan", 
              label: "GitHub",
              color: "hover:text-purple-300"
            },
            { 
              icon: Linkedin, 
              href: "https://www.linkedin.com/in/viswa-m-91b544258/", 
              label: "LinkedIn",
              color: "hover:text-blue-300"
            },
            { 
              icon: FileText, 
              href: "/VISWA M RESUME.pdf", 
              label: "Resume",
              color: "hover:text-emerald-300"
            }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-gray-800/40 backdrop-blur-sm p-5 rounded-2xl hover:bg-gray-700/60 transition-all duration-500 border border-gray-600/50 ${social.color}`}
              whileHover={{ 
                scale: 1.15, 
                y: -8,
                rotate: [0, -5, 5, 0]
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0 0 0 0px rgba(139, 92, 246, 0)",
                  "0 0 0 3px rgba(139, 92, 246, 0.4)",
                  "0 0 0 0px rgba(139, 92, 246, 0)"
                ]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                delay: index * 1.5,
                ease: "easeInOut"
              }}
            >
              <social.icon className="w-7 h-7 text-white transition-colors duration-300" />
              
              {/* Tooltip */}
              <motion.div
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-gray-600/50"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
              >
                {social.label}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-t border-gray-600/50"></div>
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Premium Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-center items-center space-y-6 sm:space-y-0 sm:space-x-8"
        >
          <motion.a
            href="/VISWA M RESUME.pdf"
            target="_blank"
            className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3 shadow-2xl hover:shadow-3xl text-lg min-w-[240px] justify-center"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              background: ["linear-gradient(45deg, #7c3aed, #4f46e5, #3730a3)", "linear-gradient(45deg, #3730a3, #7c3aed, #4f46e5)", "linear-gradient(45deg, #4f46e5, #3730a3, #7c3aed)"]
            }}
            whileTap={{ scale: 0.95 }}
            animate={{
              backgroundSize: ['200% 200%', '200% 200%', '200% 200%'],
            }}
            transition={{ 
              background: { duration: 3, repeat: Infinity },
              scale: { type: "spring", stiffness: 400, damping: 25 }
            }}
          >
            <FileText className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Download Portfolio</span>
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-500"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.a>

          <motion.button
            onClick={() => navigateToPage && navigateToPage('cad-models')}
            className="group relative bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 flex items-center gap-3 shadow-2xl hover:shadow-3xl text-lg min-w-[240px] justify-center"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Cog className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            <span>Explore CAD Gallery</span>
          </motion.button>

          <motion.button
            onClick={scrollToContact}
            className="group relative border-2 border-purple-400/50 text-purple-300 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-500 backdrop-blur-lg hover:bg-purple-600/20 text-lg min-w-[240px] justify-center hover:border-purple-300/70 shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              y: -3,
              borderColor: "rgba(192, 132, 252, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              <Rocket className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Start Collaboration
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
