import React from 'react';
import { motion } from 'framer-motion';

const ParticleBackground = () => {
  // Reduced particle count and variety for performance
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 12 + 8,
    delay: Math.random() * 4,
    opacity: Math.random() * 0.5 + 0.2,
  }));

  // Fewer geometric shapes
  const geometricShapes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 15,
    rotation: Math.random() * 360,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
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
            y: [0, -30, 0],
            x: [0, Math.sin(particle.id) * 10, 0],
            opacity: [particle.opacity * 0.3, particle.opacity, particle.opacity * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Fewer Floating Geometric Shapes */}
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
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.25, 0.1],
            x: [0, Math.cos(index) * 15, 0],
            y: [0, Math.sin(index) * 15, 0],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {/* Different shapes based on index */}
          {index % 3 === 0 && (
            <div className="w-full h-full border-2 border-purple-500/20 rotate-45 rounded-lg" />
          )}
          {index % 3 === 1 && (
            <div className="w-full h-full border-2 border-blue-500/20 rounded-full" />
          )}
          {index % 3 === 2 && (
            <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-sm" />
          )}
        </motion.div>
      ))}

      {/* Large Background Elements (keep only 1 for less lag) */}
      <motion.div
        className="absolute top-10 left-10 w-32 h-32 border-2 border-purple-500/20 rotate-45 rounded-xl"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default ParticleBackground;
