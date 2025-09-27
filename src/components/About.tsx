import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Target, 
  Lightbulb, 
  Rocket, 
  Brain, 
  Heart,
  Code,
  Wrench,
  Award,
  TrendingUp,
  Users,
  Globe,
  Clock,
  Star,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useState, useEffect } from 'react';

const About = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMetric, setCurrentMetric] = useState(0);

  // Auto-rotate story sections
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetric(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  // Interactive story sections
  const storyData = [
    {
      title: "The Spark",
      icon: Lightbulb,
      content: "My engineering journey began with curiosity about how things work. From dismantling toys to understanding complex mechanisms, I discovered my passion for mechanical systems and design innovation.",
      highlight: "Curiosity-Driven Learning",
      color: "yellow"
    },
    {
      title: "The Growth",
      icon: TrendingUp,
      content: "Through rigorous academic training and hands-on projects, I developed expertise in CAD design, FEA analysis, and engineering automation. Each challenge became a stepping stone to mastery.",
      highlight: "Skill Development",
      color: "blue"
    },
    {
      title: "The Vision",
      icon: Rocket,
      content: "Today, I combine traditional mechanical engineering with cutting-edge technology to create solutions that matter. My goal is to innovate at the intersection of design and technology.",
      highlight: "Future-Focused Innovation",
      color: "purple"
    }
  ];

  // Dynamic metrics with real-time updates
  const metrics = [
    { label: "Projects Completed", value: 15, icon: Target, suffix: "+" },
    { label: "Design Hours", value: 1200, icon: Clock, suffix: "+" },
    { label: "Technologies Mastered", value: 8, icon: Code, suffix: "" },
    { label: "Certifications Earned", value: 10, icon: Award, suffix: "+" }
  ];

  // Core values with interactive elements
  const coreValues = [
    {
      title: "Innovation First",
      description: "Constantly pushing boundaries to create breakthrough solutions",
      icon: Lightbulb,
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Precision Engineering",
      description: "Meticulous attention to detail in every design and analysis",
      icon: Target,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Collaborative Spirit",
      description: "Building bridges between disciplines for holistic solutions",
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Continuous Learning",
      description: "Embracing new technologies and methodologies for growth",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    }
  ];

  // Technical expertise with proficiency levels
  const technicalExpertise = [
    { category: "CAD Design", skills: ["SolidWorks", "AutoCAD", "Fusion 360", "CATIA"], proficiency: 85 },
    { category: "Analysis", skills: ["ANSYS", "FEA", "CFD", "Thermal Analysis"], proficiency: 75 },
    { category: "Programming", skills: ["Python", "MATLAB", "C++", "Java"], proficiency: 70 },
    { category: "Manufacturing", skills: ["DFM", "GD&T", "Quality Control", "Process Optimization"], proficiency: 80 }
  ];

  return (
    <div className="container mx-auto px-6 py-20 relative">
      <motion.div className="relative z-10">
        {/* Dynamic Header */}
        <motion.div 
          {...fadeInUp}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: 'linear-gradient(45deg, #8b5cf6, #3b82f6, #10b981, #f59e0b)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Engineering Excellence
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Where mechanical precision meets digital innovation
          </motion.p>
        </motion.div>

        {/* Interactive Story Timeline */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-purple-400">My Engineering Journey</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
            
            {storyData.map((story, index) => {
              const Icon = story.icon;
              return (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  {/* Content Card */}
                  <motion.div 
                    className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveStory(index)}
                  >
                    <div className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      activeStory === index 
                        ? `border-${story.color}-500 shadow-lg shadow-${story.color}-500/20` 
                        : 'border-gray-700 hover:border-gray-600'
                    }`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`p-3 rounded-full bg-${story.color}-500/20`}>
                          <Icon className={`w-6 h-6 text-${story.color}-400`} />
                        </div>
                        <h4 className="text-xl font-bold text-white">{story.title}</h4>
                      </div>
                      <p className="text-gray-300 mb-4">{story.content}</p>
                      <div className={`inline-block px-3 py-1 rounded-full bg-${story.color}-500/20 text-${story.color}-400 text-sm font-medium`}>
                        {story.highlight}
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Timeline Node */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-gray-800 z-10"
                    style={{ backgroundColor: activeStory === index ? `var(--${story.color}-500)` : '#6b7280' }}
                    animate={{ 
                      scale: activeStory === index ? 1.5 : 1,
                      boxShadow: activeStory === index ? `0 0 20px var(--${story.color}-500)` : 'none'
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Metrics Dashboard */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-blue-400">Impact Metrics</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  className={`bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 text-center relative overflow-hidden ${
                    currentMetric === index ? 'border-purple-500 shadow-lg shadow-purple-500/20' : ''
                  }`}
                  whileHover={{ scale: 1.05, y: -5 }}
                  animate={{
                    borderColor: currentMetric === index ? '#8b5cf6' : '#374151',
                  }}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-4 ${currentMetric === index ? 'text-purple-400' : 'text-gray-400'}`} />
                  <motion.div 
                    className="text-3xl font-bold text-white mb-2"
                    animate={{ scale: currentMetric === index ? 1.1 : 1 }}
                  >
                    {metric.value}{metric.suffix}
                  </motion.div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  
                  {/* Animated background */}
                  {currentMetric === index && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-green-400">Core Values</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-transparent relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {/* Gradient Border on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-4 rounded-full bg-gradient-to-r ${value.color} bg-opacity-20`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-white">{value.title}</h4>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Technical Expertise with Progress Bars */}
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center mb-12 text-orange-400">Technical Expertise</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {technicalExpertise.map((area, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-bold text-white">{area.category}</h4>
                  <span className="text-purple-400 font-bold">{area.proficiency}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${area.proficiency}%` }}
                    transition={{ duration: 1.5, delay: index * 0.3 }}
                  />
                </div>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {area.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (index * 0.2) + (skillIndex * 0.1) }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(139, 92, 246, 0.3)' }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Personal Mission Statement */}
        <motion.div
          {...fadeInUp}
          className="text-center bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 rounded-2xl p-12 border border-purple-500/20 relative overflow-hidden"
        >
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: 'radial-gradient(circle, #8b5cf6 2px, transparent 2px)',
              backgroundSize: '50px 50px',
            }}
          />
          
          <div className="relative z-10">
            <motion.div
              className="flex justify-center mb-6"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-12 h-12 text-red-500" />
            </motion.div>
            
            <h3 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              My Mission
            </h3>
            
            <motion.p 
              className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              To bridge the gap between traditional mechanical engineering and cutting-edge technology, 
              creating innovative solutions that drive efficiency, sustainability, and human progress. 
              Every design, every analysis, every line of code is crafted with precision and purpose.
            </motion.p>
            
            <motion.div 
              className="flex justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Rocket className="w-5 h-5" />
                Let's Innovate Together
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;