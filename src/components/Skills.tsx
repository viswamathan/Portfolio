import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Ruler, 
  Cpu, 
  Code2, 
  BookOpen, 
  Cog, 
  Wrench,
  Brain,
  LineChart,
  Workflow,
  Users,
  Lightbulb,
  Microscope,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Target,
  Award
} from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [skillProgress, setSkillProgress] = useState({});
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Auto-rotate categories
  useEffect(() => {
    if (!isAutoRotating) return;
    
    const interval = setInterval(() => {
      setActiveCategory(prev => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const skillCategories = [
    {
      title: "Design Software Mastery",
      icon: Cog,
      color: "purple",
      description: "Professional CAD tools for mechanical design and engineering",
      skills: [
        { 
          name: "SolidWorks", 
          percentage: 50, 
          level: "Intermediate",
          experience: "2+ years",
          projects: 8,
          logo: "https://img.icons8.com/color/96/solidworks.png",
          specialties: ["3D Modeling", "Assembly Design", "Technical Drawings"]
        },
        { 
          name: "AutoCAD", 
          percentage: 75, 
          level: "Advanced",
          experience: "3+ years",
          projects: 12,
          logo: "https://img.icons8.com/color/96/autodesk-autocad.png",
          specialties: ["2D Drafting", "Technical Documentation", "Precision Drawing"]
        },
        { 
          name: "Fusion 360", 
          percentage: 25, 
          level: "Beginner",
          experience: "6 months",
          projects: 3,
          logo: "https://img.icons8.com/color/96/autodesk-fusion-360.png",
          specialties: ["Cloud-based Design", "Simulation", "Manufacturing"]
        },
        { 
          name: "CATIA", 
          percentage: 20, 
          level: "Beginner",
          experience: "4 months",
          projects: 2,
          logo: "https://img.icons8.com/color/96/catia.png",
          specialties: ["Surface Modeling", "Aerospace Design", "Complex Assemblies"]
        }
      ]
    },
    {
      title: "Analysis & Simulation",
      icon: Microscope,
      color: "blue",
      description: "Advanced engineering analysis and computational tools",
      skills: [
        { 
          name: "ANSYS", 
          percentage: 70, 
          level: "Advanced",
          experience: "2+ years",
          projects: 6,
          logo: "https://media.glassdoor.com/sqll/6135/ansys-squarelogo-1582553427796.png",
          specialties: ["Structural Analysis", "Thermal Analysis", "Modal Analysis"]
        },
        { 
          name: "FEA", 
          percentage: 65, 
          level: "Intermediate",
          experience: "1.5 years",
          projects: 5,
          logo: "https://www.particleincell.com/wp-content/uploads/2012/06/femcode-400x320.jpg",
          specialties: ["Static Analysis", "Dynamic Analysis", "Stress Optimization"]
        },
        { 
          name: "CFD", 
          percentage: 40, 
          level: "Intermediate",
          experience: "1 year",
          projects: 3,
          logo: "https://tse2.mm.bing.net/th?id=OIP.I00XkuBCM-ceZBBk0k8_qgAAAA&pid=Api&P=0&h=180",
          specialties: ["Flow Analysis", "Heat Transfer", "Fluid Dynamics"]
        },
        { 
          name: "Thermal Analysis", 
          percentage: 55, 
          level: "Intermediate",
          experience: "1 year",
          projects: 4,
          logo: "https://www.researchgate.net/publication/356178942/figure/fig4/AS:1089511765360640@1636771255804/Thermal-analysis-of-plain-rectangular-fin.png",
          specialties: ["Heat Transfer", "Temperature Distribution", "Cooling Systems"]
        }
      ]
    },
    {
      title: "Programming & Automation",
      icon: Code2,
      color: "green",
      description: "Programming languages for engineering automation and analysis",
      skills: [
        { 
          name: "Python", 
          percentage: 60, 
          level: "Intermediate",
          experience: "2 years",
          projects: 10,
          logo: "https://img.icons8.com/color/96/python.png",
          specialties: ["Data Analysis", "Automation Scripts", "Engineering Calculations"]
        },
        { 
          name: "C++", 
          percentage: 45, 
          level: "Intermediate",
          experience: "1.5 years",
          projects: 4,
          logo: "https://img.icons8.com/color/96/c-plus-plus-logo.png",
          specialties: ["Performance Computing", "Algorithm Development", "System Programming"]
        },
        { 
          name: "MATLAB", 
          percentage: 35, 
          level: "Beginner",
          experience: "8 months",
          projects: 3,
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png",
          specialties: ["Numerical Computing", "Signal Processing", "Control Systems"]
        },
        { 
          name: "Java", 
          percentage: 30, 
          level: "Beginner",
          experience: "6 months",
          projects: 2,
          logo: "https://img.icons8.com/color/96/java-coffee-cup-logo.png",
          specialties: ["Object-Oriented Programming", "Desktop Applications", "Engineering Tools"]
        }
      ]
    }
  ];

  const additionalSkills = [
    {
      icon: Workflow,
      title: "Project Management",
      color: "orange",
      items: [
        { name: "Engineering Project Planning", level: 85 },
        { name: "Resource Allocation", level: 75 },
        { name: "Risk Assessment", level: 70 },
        { name: "Timeline Optimization", level: 80 }
      ]
    },
    {
      icon: Users,
      title: "Collaboration Skills",
      color: "pink",
      items: [
        { name: "Team Leadership", level: 75 },
        { name: "Technical Communication", level: 85 },
        { name: "Cross-functional Work", level: 80 },
        { name: "Mentoring", level: 65 }
      ]
    },
    {
      icon: Lightbulb,
      title: "Innovation & Design",
      color: "yellow",
      items: [
        { name: "Design Thinking", level: 80 },
        { name: "Process Optimization", level: 75 },
        { name: "Creative Problem Solving", level: 85 },
        { name: "Sustainable Design", level: 70 }
      ]
    },
    {
      icon: Microscope,
      title: "Research & Analysis",
      color: "indigo",
      items: [
        { name: "Technical Documentation", level: 90 },
        { name: "Data Analysis", level: 80 },
        { name: "Experimental Design", level: 75 },
        { name: "Literature Review", level: 85 }
      ]
    }
  ];

  const certifications = [
    {
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes",
      year: "2024",
      credentialId: "C-L3G7SF84B9",
      skills: ["3D Modeling", "Assembly Design", "Technical Drawings"]
    },
    {
      title: "Advanced Machining Process",
      issuer: "Industry Certification",
      year: "2024",
      skills: ["Manufacturing", "Machining", "Process Optimization"]
    },
    {
      title: "AI for Everyone",
      issuer: "Coursera",
      year: "2024",
      skills: ["Artificial Intelligence", "Machine Learning", "Automation"]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30', gradient: 'from-purple-500 to-purple-600' },
      blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30', gradient: 'from-blue-500 to-blue-600' },
      green: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30', gradient: 'from-green-500 to-green-600' },
      orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30', gradient: 'from-orange-500 to-orange-600' },
      pink: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30', gradient: 'from-pink-500 to-pink-600' },
      yellow: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30', gradient: 'from-yellow-500 to-yellow-600' },
      indigo: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30', gradient: 'from-indigo-500 to-indigo-600' }
    };
    return colors[color] || colors.purple;
  };

  // Skill comparison data
  const skillComparison = {
    "SolidWorks": {
      industry: 85,
      personal: 50,
      projects: ["Gear Design", "Exhaust Manifold", "Solar Dryer"],
      timeSpent: "200+ hours"
    },
    "ANSYS": {
      industry: 90,
      personal: 70,
      projects: ["Sprocket Analysis", "Piston Head Study", "Thermal Analysis"],
      timeSpent: "150+ hours"
    },
    "Python": {
      industry: 75,
      personal: 60,
      projects: ["Petrol Management", "Engineering Calculator", "Data Analysis"],
      timeSpent: "300+ hours"
    },
    "AutoCAD": {
      industry: 80,
      personal: 75,
      projects: ["Technical Drawings", "2D Layouts", "Documentation"],
      timeSpent: "250+ hours"
    }
  };

  return (
    <div className="container mx-auto px-6 py-16">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl font-bold mb-4">
          Technical <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Expertise</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Comprehensive skill set spanning design, analysis, and automation with hands-on project experience
        </p>
        
        {/* New Feature Toggle */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setShowComparison(!showComparison)}
            className={`px-4 py-2 rounded-lg transition-all ${showComparison ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            {showComparison ? 'Hide' : 'Show'} Industry Comparison
          </button>
        </div>
        
        {/* Auto-rotation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <motion.button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isAutoRotating ? 'bg-green-500/20 text-green-400' : 'bg-gray-700 text-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isAutoRotating ? 'Pause' : 'Play'} Auto-rotation
          </motion.button>
          
          <motion.button
            onClick={() => setActiveCategory(0)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </motion.button>
        </div>
      </motion.div>

      {/* Skills Learning Path */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-16 bg-gradient-to-r from-gray-800/30 to-gray-900/30 rounded-2xl p-8 border border-gray-700/50"
      >
        <h3 className="text-2xl font-bold text-center text-purple-400 mb-8">Learning Journey Timeline</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { year: "2022", skills: ["AutoCAD", "Basic CAD"], color: "blue" },
            { year: "2023", skills: ["SolidWorks", "Python"], color: "green" },
            { year: "2024", skills: ["ANSYS", "FEA/CFD"], color: "purple" },
            { year: "2025", skills: ["Advanced Analysis", "AI Integration"], color: "orange" }
          ].map((period, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 bg-${period.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-${period.color}-500/30`}>
                <span className={`text-${period.color}-400 font-bold`}>{period.year}</span>
              </div>
              <div className="space-y-2">
                {period.skills.map((skill, idx) => (
                  <div key={idx} className={`bg-${period.color}-500/10 text-${period.color}-300 px-3 py-1 rounded-full text-sm`}>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Category Selector */}
      <div className="flex justify-center mb-12">
        <div className="flex bg-gray-800/50 p-2 rounded-2xl border border-gray-700/50">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            const colors = getColorClasses(category.color);
            return (
              <motion.button
                key={index}
                onClick={() => {
                  setActiveCategory(index);
                  setIsAutoRotating(false);
                }}
                className={`relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                  activeCategory === index 
                    ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg` 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium hidden sm:block">{category.title.split(' ')[0]}</span>
                {activeCategory === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Main Skills Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          {(() => {
            const category = skillCategories[activeCategory];
            const colors = getColorClasses(category.color);
            return (
              <div className={`bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-8 rounded-2xl border ${colors.border}`}>
                <div className="text-center mb-8">
                  <h3 className={`text-3xl font-bold ${colors.text} mb-2`}>{category.title}</h3>
                  <p className="text-gray-400">{category.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedSkill(skill)}
                      className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-gray-600/50 transition-all group"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      {/* Skill Header */}
                      <div className="flex items-center gap-4 mb-4">
                        <motion.img 
                          src={skill.logo} 
                          alt={`${skill.name} logo`} 
                          className="w-12 h-12 object-contain rounded-lg shadow-md"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        />
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-white">{skill.name}</h4>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}`}>
                              {skill.level}
                            </span>
                            <span className="text-gray-400 text-sm">{skill.experience}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${colors.text}`}>{skill.percentage}%</div>
                          <div className="text-xs text-gray-400">{skill.projects} projects</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.percentage}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full relative`}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Industry Comparison */}
                      {showComparison && skillComparison[skill.name] && (
                        <div className="mt-4 p-3 bg-gray-700/30 rounded-lg">
                          <div className="flex justify-between text-xs mb-2">
                            <span className="text-gray-400">Industry Standard</span>
                            <span className={colors.text}>{skillComparison[skill.name].industry}%</span>
                          </div>
                          <div className="h-2 bg-gray-600 rounded-full mb-2">
                            <div 
                              className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                              style={{ width: `${skillComparison[skill.name].industry}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-400">
                            Time Invested: {skillComparison[skill.name].timeSpent}
                          </div>
                        </div>
                      )}

                      {/* Specialties */}
                      <div>
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">Specialties:</h5>
                        <div className="flex flex-wrap gap-2">
                          {skill.specialties.map((specialty, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + idx * 0.05 + 0.7 }}
                              className={`px-2 py-1 rounded-full text-xs ${colors.bg} ${colors.text} border ${colors.border}`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {specialty}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </AnimatePresence>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <img src={selectedSkill.logo} alt={selectedSkill.name} className="w-12 h-12 rounded-lg" />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                    <p className="text-purple-400">{selectedSkill.level} Level</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="p-2 hover:bg-gray-800 rounded-full"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">Proficiency Breakdown</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-300">Current Level</span>
                        <span className="text-purple-400">{selectedSkill.percentage}%</span>
                      </div>
                      <div className="h-3 bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${selectedSkill.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">Experience Details</h4>
                  <p className="text-gray-300 mb-2">Experience: {selectedSkill.experience}</p>
                  <p className="text-gray-300">Projects Completed: {selectedSkill.projects}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-purple-400 mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkill.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Additional Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
      >
        {additionalSkills.map((skillSet, index) => {
          const Icon = skillSet.icon;
          const colors = getColorClasses(skillSet.color);
          return (
            <motion.div
              key={skillSet.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800/50 p-6 rounded-xl border ${colors.border} hover:border-opacity-50 transition-all group`}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 ${colors.bg} rounded-lg`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h4 className="font-semibold text-white">{skillSet.title}</h4>
              </div>
              <div className="space-y-3">
                {skillSet.items.map((item, idx) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-300 text-sm">{item.name}</span>
                      <span className={`text-xs ${colors.text} font-semibold`}>{item.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Certifications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-purple-400 mb-2 flex items-center justify-center gap-2">
            <Award className="w-6 h-6" />
            Professional Certifications
          </h3>
          <p className="text-gray-400">Industry-recognized credentials and achievements</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/30 transition-all group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-1">{cert.title}</h4>
                  <p className="text-purple-400 text-sm">{cert.issuer}</p>
                </div>
                <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs border border-green-500/30">
                  {cert.year}
                </span>
              </div>
              
              {cert.credentialId && (
                <div className="mb-4">
                  <span className="text-gray-400 text-xs">Credential ID: </span>
                  <span className="text-gray-300 text-xs font-mono">{cert.credentialId}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;