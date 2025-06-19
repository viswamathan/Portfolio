import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  // Increased particle count and variety
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8,
    opacity: Math.random() * 0.6 + 0.2,
  }));

  // Floating geometric shapes
  const geometricShapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 40 + 20,
    rotation: Math.random() * 360,
    duration: Math.random() * 30 + 20,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/20" />
      
      {/* Animated Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, rgba(139, 92, 246, ${particle.opacity}) 0%, rgba(59, 130, 246, ${particle.opacity * 0.5}) 50%, transparent 100%)`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.sin(particle.id) * 20, 0],
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Enhanced Floating Geometric Shapes */}
      {geometricShapes.map((shape, index) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, Math.cos(index) * 30, 0],
            y: [0, Math.sin(index) * 30, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {/* Different shapes based on index */}
          {index % 4 === 0 && (
            <div className="w-full h-full border-2 border-purple-500/20 rotate-45 rounded-lg" />
          )}
          {index % 4 === 1 && (
            <div className="w-full h-full border-2 border-blue-500/20 rounded-full" />
          )}
          {index % 4 === 2 && (
            <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-sm" />
          )}
          {index % 4 === 3 && (
            <div className="w-full h-full border-2 border-green-500/20 transform rotate-45">
              <div className="w-full h-full border border-green-500/10 rotate-45" />
            </div>
          )}
        </motion.div>
      ))}

      {/* Large Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 border-2 border-purple-500/20 rotate-45 rounded-xl"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 border-2 border-blue-500/20 rounded-full"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-500/15 to-blue-500/15 rounded-full blur-md"
        animate={{
          x: [0, 150, 0],
          y: [0, -80, 0],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-20 h-20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="w-full h-full border border-purple-500/20 rounded-lg transform rotate-12">
          <div className="w-full h-full border border-blue-500/15 rounded-lg transform -rotate-12" />
        </div>
      </motion.div>

      {/* Ambient light effects */}
      <motion.div
        className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default ParticleBackground;