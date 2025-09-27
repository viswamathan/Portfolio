import React from 'react';
import { motion } from 'framer-motion';
import { PenTool as Tool, Cpu, BookOpen, Microscope, GraduationCap, Cog, Wrench, Zap, TrendingUp, Users, Award, Calendar, MapPin, Clock, ChevronRight, ExternalLink } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

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

  const cardHover = {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  };

  // Interactive tabs for different sections
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Tool },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'research', label: 'Research', icon: Microscope },
    { id: 'achievements', label: 'Achievements', icon: Award }
  ];

  // Enhanced education data with more details
  const educationData = [
    {
      title: "B.E in Mechanical Engineering",
      school: "Sri Krishna College of Technology",
      location: "Coimbatore, Tamil Nadu",
      date: "2022 - 2026",
      details: "CGPA: 7.35/10",
      status: "Current",
      level: "Bachelor's Degree",
      specialization: "Design & Manufacturing",
      keyProjects: ["Solar Dryer Design", "FEA Analysis", "CAD Automation"],
      relevantCourses: ["Machine Design", "Finite Element Analysis", "Fluid Mechanics", "Thermodynamics"],
      achievements: ["Dean's List", "Best Project Award", "Technical Paper Publication"]
    },
    {
      title: "Senior Secondary Education",
      school: "Alagar Public School",
      location: "Tuticorin, Tamil Nadu", 
      date: "2021 - 2022",
      details: "Percentage: 61%",
      extra: "Major: Mathematics, Physics, Chemistry and Computer Science",
      status: "Completed",
      level: "Higher Secondary",
      specialization: "Science Stream",
      keyProjects: ["Physics Lab Experiments", "Chemistry Research"],
      relevantCourses: ["Advanced Mathematics", "Physics", "Chemistry", "Computer Science"],
      achievements: ["Science Fair Winner", "Mathematics Olympiad Participant"]
    },
    {
      title: "Secondary Education", 
      school: "Amrita Vidyalayam",
      location: "Ramnad, Tamil Nadu",
      date: "2019 - 2020",
      details: "Percentage: 78%",
      status: "Completed",
      level: "Secondary",
      specialization: "General Studies",
      keyProjects: ["Science Projects", "Mathematics Competitions"],
      relevantCourses: ["Mathematics", "Science", "Social Studies", "Languages"],
      achievements: ["Academic Excellence Award", "Sports Champion"]
    }
  ];

  // Enhanced research interests with progress tracking
  const researchAreas = [
    {
      title: "Renewable Energy Systems",
      description: "Solar thermal systems, energy storage, efficiency optimization",
      progress: 85,
      publications: 1,
      projects: 2,
      icon: "🌞"
    },
    {
      title: "Advanced Materials",
      description: "Composite materials, material characterization, failure analysis", 
      progress: 70,
      publications: 0,
      projects: 3,
      icon: "🔬"
    },
    {
      title: "AI in Engineering",
      description: "Machine learning for design optimization, predictive maintenance",
      progress: 60,
      publications: 0,
      projects: 1,
      icon: "🤖"
    },
    {
      title: "Thermal Management",
      description: "Heat transfer optimization, cooling systems design",
      progress: 75,
      publications: 1,
      projects: 2,
      icon: "🌡️"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20 relative">
      <motion.div className="relative z-10">
        <motion.h2 
          {...fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

        {/* Interactive Tab Navigation */}
        <motion.div 
          {...fadeInUp}
          className="flex justify-center mb-12"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-full p-2 border border-gray-700/50">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'overview' && (
            <>
              <motion.div
                {...fadeInUp}
                className="text-white text-base sm:text-lg leading-relaxed max-w-4xl mx-auto relative mb-16"
              >
                <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 relative overflow-hidden">
                  <p className="text-center font-medium mb-4">
                    I am a Mechanical engineer with expertise in CAD design, FEA/CFD analysis, and engineering automation. My goal is to bridge the gap between traditional engineering and modern technology.
                  </p>
                  <p className="text-center font-medium">
                    With a strong foundation in mechanical principles and hands-on experience in simulation tools, I deliver solutions that drive efficiency and innovation.
                  </p>
                </div>
              </motion.div>

              <motion.div 
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Professional Summary */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={cardHover} 
                  className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
                  onHoverStart={() => setHoveredCard('summary')}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Tool className="text-purple-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-bold text-white">Professional Summary</h3>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    Mechanical engineer with expertise in CAD design, FEA, and CFD analysis. Passionate about leveraging Python for automation in engineering workflows. Proven track record in designing innovative solutions for complex engineering challenges.
                  </p>
                  
                  {/* Animated background pattern */}
                  {hoveredCard === 'summary' && (
                    <motion.div
                      className="absolute inset-0 opacity-5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.05 }}
                      style={{
                        backgroundImage: 'radial-gradient(circle, #8b5cf6 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                  )}
                </motion.div>

                {/* Technical Focus */}
                <motion.div 
                  variants={fadeInUp} 
                  whileHover={cardHover} 
                  className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
                  onHoverStart={() => setHoveredCard('technical')}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Cpu className="text-purple-500 w-5 h-5" />
                    <h3 className="text-lg sm:text-xl font-bold text-white">Technical Focus</h3>
                  </div>
                  <ul className="list-none space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {[
                      'Advanced CAD modeling and design optimization',
                      'Finite Element Analysis (FEA) for structural analysis',
                      'Computational Fluid Dynamics (CFD) simulations',
                      'Python automation for engineering workflows',
                      'Design for Manufacturing (DFM)'
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, color: '#a855f7' }}
                      >
                        <motion.span 
                          className="text-purple-500"
                          animate={{ rotate: hoveredCard === 'technical' ? 360 : 0 }}
                          transition={{ duration: 2, repeat: hoveredCard === 'technical' ? Infinity : 0 }}
                        >
                          •
                        </motion.span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            </>
          )}

          {activeTab === 'education' && (
            <div className="space-y-8">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Info */}
                    <div className="lg:col-span-2">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{edu.title}</h3>
                          <h4 className="text-purple-400 font-medium mb-1">{edu.school}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {edu.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {edu.date}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          edu.status === 'Current' 
                            ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Performance:</span>
                          <p className="text-white font-medium">{edu.details}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Specialization:</span>
                          <p className="text-white font-medium">{edu.specialization}</p>
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      {edu.keyProjects && (
                        <div>
                          <h5 className="text-sm font-semibold text-purple-300 mb-2">Key Projects</h5>
                          <div className="flex flex-wrap gap-1">
                            {edu.keyProjects.map((project, idx) => (
                              <span key={idx} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {edu.achievements && (
                        <div>
                          <h5 className="text-sm font-semibold text-green-300 mb-2">Achievements</h5>
                          <div className="space-y-1">
                            {edu.achievements.map((achievement, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                                <Award className="w-3 h-3 text-green-400" />
                                {achievement}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'research' && (
            <div className="grid md:grid-cols-2 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{area.icon}</span>
                    <h3 className="text-lg font-bold text-white">{area.title}</h3>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{area.description}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Research Progress</span>
                      <span>{area.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${area.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-lg font-bold text-purple-400">{area.publications}</div>
                      <div className="text-xs text-gray-400">Publications</div>
                    </div>
                    <div className="bg-gray-700/30 rounded-lg p-3">
                      <div className="text-lg font-bold text-blue-400">{area.projects}</div>
                      <div className="text-xs text-gray-400">Projects</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
              >
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Academic & Professional Achievements</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-800/30 rounded-lg p-6">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-2">7.35/10</div>
                    <div className="text-gray-400">Current CGPA</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-6">
                    <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-2">2</div>
                    <div className="text-gray-400">Patents Filed</div>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-6">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white mb-2">10+</div>
                    <div className="text-gray-400">Certifications</div>
                  </div>
                </div>
                
                <motion.button
                  className="mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 mx-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.href = '#achievements'}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Achievements
                </motion.button>
              </motion.div>
            </div>
          )}
        </motion.div>
        <motion.div
          {...fadeInUp}
          className="text-white text-base sm:text-lg leading-relaxed max-w-4xl mx-auto relative"
        >
          <div className="bg-gray-800/30 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 relative overflow-hidden">
            <p className="text-center font-medium mb-4">
              I am a Mechanical engineer with expertise in CAD design, FEA/CFD analysis, and engineering automation. My goal is to bridge the gap between traditional engineering and modern technology.
            </p>
            <p className="text-center font-medium">
              With a strong foundation in mechanical principles and hands-on experience in simulation tools, I deliver solutions that drive efficiency and innovation.
            </p>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid lg:grid-cols-2 gap-8 mt-16"
        >
          {/* Summary & Tech Focus */}
          <motion.div variants={fadeInUp} className="space-y-8">
            {/* Professional Summary */}
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Tool className="text-purple-500 w-5 h-5" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Professional Summary</h3>
              </div>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Mechanical engineer with expertise in CAD design, FEA, and CFD analysis. Passionate about leveraging Python for automation in engineering workflows. Proven track record in designing innovative solutions for complex engineering challenges.
              </p>
            </motion.div>

            {/* Technical Focus */}
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="text-purple-500 w-5 h-5" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Technical Focus</h3>
              </div>
              <ul className="list-none space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  Advanced CAD modeling and design optimization
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  Finite Element Analysis (FEA) for structural analysis
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  Computational Fluid Dynamics (CFD) simulations
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  Python automation for engineering workflows
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-500">•</span>
                  Design for Manufacturing (DFM)
                </li>
              </ul>
            </motion.div>

            {/* Research Interests */}
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <Microscope className="text-purple-500 w-5 h-5" />
                <h3 className="text-lg sm:text-xl font-bold text-white">Research Interests</h3>
              </div>
              <ul className="list-none space-y-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <div>
                    <strong className="text-white">Renewable Energy Systems:</strong> Solar thermal systems, energy storage, efficiency optimization
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <div>
                    <strong className="text-white">Advanced Materials:</strong> Composite materials, material characterization, failure analysis
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <div>
                    <strong className="text-white">AI in Engineering:</strong> Machine learning for design optimization, predictive maintenance
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <div>
                    <strong className="text-white">Thermal Management:</strong> Heat transfer optimization, cooling systems design
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div variants={fadeInUp}>
            <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <GraduationCap className="text-purple-500 w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Education</h3>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    title: "B.E in Mechanical Engineering",
                    school: "Sri Krishna College of Technology",
                    date: "2022 - 2026",
                    details: "CGPA: 7.35/10",
                    status: "Current",
                    level: "Bachelor's Degree"
                  },
                  {
                    title: "Senior Secondary Education",
                    school: "Alagar Public School, Tuticorin",
                    date: "2021 - 2022",
                    details: "Percentage: 61%",
                    extra: "Major: Mathematics, Physics, Chemistry and Computer Science",
                    status: "Completed",
                    level: "Higher Secondary"
                  },
                  {
                    title: "Secondary Education",
                    school: "Amrita Vidyalayam, Ramnad",
                    date: "2019 - 2020",
                    details: "Percentage: 78%",
                    status: "Completed",
                    level: "Secondary"
                  }
                ].map((edu, idx) => (
                  <motion.div
                    key={idx}
                    className="relative pl-8 pb-6 border-l-2 border-purple-500/30 last:border-l-0"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    whileHover={{ x: 5 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-600 rounded-full border-4 border-gray-800 flex items-center justify-center">
                      <GraduationCap className="w-3 h-3 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="bg-gray-700/30 p-4 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h4 className="font-bold text-white text-sm sm:text-base">{edu.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            edu.status === 'Current' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                              : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                          }`}>
                            {edu.status}
                          </span>
                        </div>
                      </div>
                      
                      <h5 className="text-purple-400 text-xs sm:text-sm font-medium mb-1">{edu.school}</h5>
                      <p className="text-gray-400 text-xs mb-2">{edu.level}</p>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-300">
                        <span className="font-medium">{edu.details}</span>
                        <span className="text-purple-300">{edu.date}</span>
                      </div>
                      
                      {edu.extra && (
                        <p className="text-gray-400 text-xs mt-2 italic">{edu.extra}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Publications & Patents */}
        <motion.div variants={fadeInUp} initial="initial" whileInView="whileInView" className="mt-16">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center text-white flex items-center justify-center gap-4">
            Publications & Patents
          </h3>
          <motion.div variants={staggerContainer} className="grid lg:grid-cols-2 gap-8">
            {/* Publications */}
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-purple-500">
                Publications
              </h4>
              <ul className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                <motion.li whileHover={{ x: 10 }} className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                  <span className="text-2xl">•</span>
                  <div>
                    <strong className="text-white">Title:</strong> "Modified Solar Dryer With Energy Storage System"<br />
                    <strong className="text-white">Journal:</strong> International Journal of Renewable Energy<br />
                    <strong className="text-white">Status:</strong> The study is presently in the validation phase ahead of submission.
                  </div>
                </motion.li>
              </ul>
            </motion.div>

            {/* Patents */}
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <h4 className="text-lg sm:text-xl font-bold mb-4 text-purple-500">
                Patents
              </h4>
              <ul className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                {[
                  {
                    title: "Multi Purpose Knife",
                    number: "IN2023456789",
                    status: "Granted",
                    symbol: "•"
                  },
                  {
                    title: "Modified Solar Dryer With Energy Storage System",
                    number: "IN2023123456",
                    status: "Pending",
                    symbol: "•"
                  }
                ].map((patent, idx) => (
                  <motion.li key={idx} whileHover={{ x: 10 }} className="flex items-start gap-3 p-4 bg-gray-700/30 rounded-lg">
                    <span className="text-2xl">{patent.symbol}</span>
                    <div>
                      <strong className="text-white">Title:</strong> {patent.title}<br />
                      <strong className="text-white">Patent Number:</strong> {patent.number}<br />
                      <strong className="text-white">Status:</strong> {patent.status}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
    </div>
  );
};

export default About;