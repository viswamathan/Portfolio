import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, FileText, Cog, Wrench, Zap, Download, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  scrollToContact: () => void;
  navigateToPage?: (page: 'portfolio' | 'cad-models' | 'achievements') => void;
}

// 3D Animated Sphere for Mechanical Vibe
const AnimatedSphere = () => (
  <Float speed={1.4} rotationIntensity={1} floatIntensity={2}>
    <Sphere args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial color="#8b5cf6" distort={0.3} speed={1.5} roughness={0.4} />
    </Sphere>
  </Float>
);

// Typing Animation with optional voice
const VoiceTypingAnimation = () => {
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
    <div className="relative flex items-center justify-center">
      <TypeAnimation
        sequence={[
          'Mechanical Design Engineer', 2000, () => speakText('Mechanical Design Engineer'),
          'FEA & CFD Specialist', 2000, () => speakText('FEA and CFD Specialist'),
          'CAE Automation Expert', 2000, () => speakText('CAE Automation Expert'),
          'Product Development Engineer', 2000, () => speakText('Product Development Engineer'),
          'Innovation Enthusiast', 2000, () => speakText('Innovation Enthusiast'),
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
        className="text-gray-300 text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-100"
      />
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className="absolute -right-12 p-2 bg-gray-800/50 rounded-full hover:bg-gray-700/50 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-gray-400" /> : <Volume2 className="w-4 h-4 text-purple-400" />}
      </motion.button>
    </div>
  );
};

// Interactive Skill Card
const InteractiveSkillCard = ({ icon: Icon, title, desc }: any) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      className="bg-gray-800/30 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-purple-500/20 relative overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.1)', borderColor: 'rgba(139, 92, 246, 0.5)' }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
    >
      <motion.div
        animate={{ rotate: hover ? [0, 360] : 0 }}
        transition={{ duration: 1 }}
      >
        <Icon className="w-8 h-8 text-purple-500 mb-3 mx-auto" />
      </motion.div>
      <h3 className="font-bold text-lg sm:text-xl mb-1">{title}</h3>
      <p className="text-base sm:text-lg text-gray-400 font-semibold">{desc}</p>
      {hover && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: 1 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

const Hero: React.FC<HeroProps> = ({ scrollToContact, navigateToPage }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      
      {/* 3D Background Sphere */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} enablePan={false} enableRotate autoRotate autoRotateSpeed={0.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Profile Image with Mechanical Floating Gears */}
        <div className="mb-8 relative inline-block">
          <motion.img
            src="/viswa.jpeg"
            alt="Viswa M - Mechanical Engineer"
            className="mx-auto w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover shadow-2xl border-4 border-purple-500/50"
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(139, 92, 246, 0.6)" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <motion.div className="absolute -top-4 -right-4 w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30"
            animate={{ rotate: [0, 180, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Cog className="w-5 h-5 text-purple-400" />
          </motion.div>
          <motion.div className="absolute -bottom-4 -left-4 w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30"
            animate={{ rotate: [360, 180, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          >
            <Wrench className="w-5 h-5 text-blue-400" />
          </motion.div>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4">
          Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 animate-gradient">Viswa M</span>
        </h1>

        {/* Animated Subtitle */}
        <VoiceTypingAnimation />

        {/* Expertise Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
          {[
            { icon: Cog, title: 'Design', desc: 'SolidWorks, CATIA' },
            { icon: Zap, title: 'Analysis', desc: 'ANSYS, FEA, CFD' },
            { icon: Wrench, title: 'Automation', desc: 'Python, MATLAB' },
            { icon: FileText, title: 'Innovation', desc: 'R&D, Optimization' }
          ].map((item, idx) => (
            <InteractiveSkillCard key={idx} {...item} />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-semibold">
          Passionate mechanical engineer specializing in advanced CAD design, FEA/CFD analysis, and engineering automation. I bridge traditional mechanical engineering with cutting-edge technology to create innovative solutions.
        </p>

        {/* Social Links */}
        <div className="flex justify-center items-center space-x-8 mb-12">
          {[
            { icon: Github, href: "https://github.com/viswamathan" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/viswa-m-91b544258/" }
          ].map((social, idx) => (
            <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="group relative bg-gray-800/50 backdrop-blur-sm p-4 rounded-full hover:bg-gray-700/50 transition-all duration-300">
              <social.icon className="w-6 h-6 text-white group-hover:text-purple-400 transition-colors" />
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
          <a href="/VISWA M.pdf" target="_blank" className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <FileText className="w-4 h-4 group-hover:rotate-12 transition-transform" /> Download Portfolio
          </a>
          <button onClick={() => navigateToPage?.('cad-models')} className="group bg-gradient-to-r from-green-600 to-teal-600 text-white px-5 py-2.5 rounded-full font-medium flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300">
            <Cog className="w-4 h-4 group-hover:rotate-12 transition-transform" /> View CAD Models
          </button>
          <button onClick={scrollToContact} className="group border-2 border-purple-600/50 text-purple-400 hover:text-white px-5 py-2.5 rounded-full font-medium transition-all duration-300 backdrop-blur-sm hover:bg-purple-600/20 flex items-center gap-2">
            Let's Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
