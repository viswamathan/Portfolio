import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { Github, Linkedin, FileText, Cog, Wrench, Zap, Download, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { useState, useEffect } from 'react';

interface HeroProps {
  scrollToContact: () => void;
  navigateToPage?: (page: 'portfolio' | 'cad-models' | 'achievements') => void;
}

// Real-time typing effect with voice synthesis
const VoiceTypingAnimation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const speakText = (text: string) => {
    if (!isMuted && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="relative">
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-300 font-bold">
        <TypeAnimation
          sequence={[
            'Mechanical Design Engineer',
            2000,
            () => speakText('Mechanical Design Engineer'),
            'FEA & CFD Specialist',
            2000,
            () => speakText('FEA and CFD Specialist'),
            'CAE Automation Expert',
            2000,
            () => speakText('CAE Automation Expert'),
            'Product Development Engineer',
            2000,
            () => speakText('Product Development Engineer'),
            'Innovation Enthusiast',
            2000,
            () => speakText('Innovation Enthusiast'),
          ]}
          wrapper="span"
          speed={50}
          repeat={Infinity}
          className="bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100"
        />
      </div>
      
      {/* Voice Control */}
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
      </motion.button>
    </div>
  );
};

// Interactive skill cards with real-time data
const InteractiveSkillCard = ({ icon: Icon, title, desc, index }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  return (
    <motion.div
      className="bg-gray-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-purple-500/20 relative overflow-hidden cursor-pointer"
      whileHover={{ 
        scale: 1.05,
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderColor: 'rgba(139, 92, 246, 0.5)'
      }}
      transition={{ type: "spring", stiffness: 300 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setClickCount(prev => prev + 1)}
    >
      {/* Interactive background pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : ['0% 0%', '0% 0%'],
        }}
        style={{
          backgroundImage: 'linear-gradient(45deg, #8b5cf6 25%, transparent 25%, transparent 75%, #8b5cf6 75%)',
          backgroundSize: '20px 20px',
        }}
        transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
      />
      
      <motion.div
        animate={{ rotate: isHovered ? [0, 360] : 0 }}
        transition={{ duration: 1 }}
      >
        <Icon className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
      </motion.div>
      
      <h3 className="font-bold text-lg sm:text-xl mb-1">{title}</h3>
      <p className="text-base sm:text-lg text-gray-400 font-semibold">{desc}</p>
      
      {/* Interaction counter */}
      {clickCount > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full"
        >
          {clickCount}
        </motion.div>
      )}
      
      {/* Hover effect particles */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollToContact, navigateToPage }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

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

  // Enhanced download with progress simulation
  const handleDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          // Actual download
          window.open('/VISWA M.pdf', '_blank');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient instead of 3D sphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        {/* Subtle animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
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
              className="mx-auto mb-6 w-40 h-40 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full object-cover shadow-2xl border-4 border-purple-500/50"
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
            href="/VISWA M RESUME.pdf"
            target="_blank"
            className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>Download Portfolio</span>
          </motion.a>

          <motion.button
            onClick={() => navigateToPage && navigateToPage('cad-models')}
            className="group relative bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Cog className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span>View CAD Models</span>
          </motion.button>

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
