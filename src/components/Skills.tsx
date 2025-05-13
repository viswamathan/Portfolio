import React from 'react';
import { motion } from 'framer-motion';
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
  Microscope
} from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Design Softwares", // Renamed from "Core Engineering"
      icon: Cog, // Updated to a single icon
      skills: [
        { 
          name: "SolidWorks", 
          percentage: 95, 
          highlight: "CSWP Certified",
          logo: "https://img.icons8.com/color/96/solidworks.png"
        },
        { 
          name: "AutoCAD", 
          percentage: 90, 
          highlight: "10+ Years Experience",
          logo: "https://img.icons8.com/color/96/autodesk-autocad.png"
        },
        { 
          name: "Fusion 360", 
          percentage: 85, 
          highlight: "Advanced User",
          logo: "https://img.icons8.com/color/96/autodesk-fusion-360.png"
        },
        { 
          name: "CATIA", 
          percentage: 80, 
          highlight: "Professional Level",
          logo: "https://img.icons8.com/color/96/catia.png"
        }
      ]
    },
    {
      title: "Analysis & Simulation",
      icon: Microscope, // Updated to a single icon
      skills: [
        { 
          name: "ANSYS", 
          percentage: 92, 
          highlight: "Certified Professional",
          logo: "https://media.glassdoor.com/sqll/6135/ansys-squarelogo-1582553427796.png"
        },
        { 
          name: "FEA", 
          percentage: 88, 
          highlight: "Static & Dynamic Analysis",
          logo: "https://www.particleincell.com/wp-content/uploads/2012/06/femcode-400x320.jpg"
        },
        { 
          name: "CFD", 
          percentage: 85, 
          highlight: "Flow & Thermal Analysis",
          logo: "https://tse2.mm.bing.net/th?id=OIP.I00XkuBCM-ceZBBk0k8_qgAAAA&pid=Api&P=0&h=180"
        },
        { 
          name: "Thermal Analysis", 
          percentage: 90, 
          highlight: "Expert Level",
          logo: "https://www.researchgate.net/publication/356178942/figure/fig4/AS:1089511765360640@1636771255804/Thermal-analysis-of-plain-rectangular-fin.png"
        }
      ]
    },
    {
      title: "Programming Languages",
      icon: Code2, // Retained as the single icon
      skills: [
        { 
          name: "Python", 
          percentage: 90, 
          highlight: "Engineering Automation & Data Analysis",
          logo: "https://img.icons8.com/color/96/python.png"
        },
        { 
          name: "C++", 
          percentage: 85, 
          highlight: "High-Performance Simulations",
          logo: "https://img.icons8.com/color/96/c-plus-plus-logo.png"
        },
        { 
          name: "MATLAB", 
          percentage: 80, 
          highlight: "Numerical Computing & Thermal Analysis",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Matlab_Logo.png"
        },
        { 
          name: "Java", 
          percentage: 75, 
          highlight: "Object-Oriented Design for Engineering Tools",
          logo: "https://img.icons8.com/color/96/java-coffee-cup-logo.png"
        }
      ]
    }
  ];

  const additionalSkills = [
    {
      icon: Workflow,
      title: "Project Management",
      items: [
        "Engineering Project Planning",
        "Resource Allocation for Mechanical Systems",
        "Risk Mitigation in Design & Manufacturing",
        "Timeline Optimization for Prototyping"
      ]
    },
    {
      icon: Users,
      title: "Soft Skills",
      items: ["Team Leadership", "Technical Communication", "Problem Solving", "Cross-functional Collaboration"]
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      items: ["Design Thinking", "Process Optimization", "Cost Reduction", "Quality Improvement"]
    },
    {
      icon: Microscope,
      title: "Research",
      items: ["Technical Documentation", "Data Analysis", "Experimental Design", "Literature Review"]
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Technical <span className="text-purple-500">Expertise</span>
      </motion.h2>

      {/* Main Skills Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {skillCategories.map((category, idx) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 p-4 rounded-lg hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <Icon className="text-purple-500 w-5 h-5" />
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ scale: 1.05 }}
                    className="group border-2 border-transparent hover:border-gradient-to-r hover:from-purple-500 hover:to-blue-500 rounded-lg p-3 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={skill.logo} 
                          alt={`${skill.name} logo`} 
                          className="w-10 h-10 object-contain rounded-md shadow-md group-hover:scale-110 transition-transform"
                        />
                        <span className="text-gray-300 text-sm font-bold">{skill.name}</span>
                      </div>
                      <span className="text-purple-400 text-xs">{skill.highlight}</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden relative group">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Skills Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid md:grid-cols-4 gap-6"
      >
        {additionalSkills.map((skillSet, idx) => {
          const Icon = skillSet.icon;
          return (
            <motion.div
              key={skillSet.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-gray-800/50 p-6 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Icon className="text-purple-500 w-5 h-5" />
                <h4 className="font-semibold">{skillSet.title}</h4>
              </div>
              <ul className="space-y-2">
                {skillSet.items.map((item) => (
                  <li key={item} className="text-gray-300 text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-purple-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Certifications and Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16"
      >
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Professional <span className="text-purple-500">Certifications</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-purple-500 w-5 h-5" />
              <h4 className="font-semibold">Technical Certifications</h4>
            </div>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong>Advanced Machining Process</strong>
                <br />
                <span className="text-sm text-gray-400">Enhanced skills in advanced machining techniques.</span>
              </li>
              <li className="text-gray-300">
                <strong>Solidworks Course for Beginners</strong>
                <br />
                <span className="text-sm text-gray-400">Mastered 3D modeling and simulation basics.</span>
              </li>
              <li className="text-gray-300">
                <strong>3D Model Creation with Autodesk Fusion 360</strong>
                <br />
                <span className="text-sm text-gray-400">Developed expertise in 2D/3D drafting and design.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <Cog className="text-purple-500 w-5 h-5" />
              <h4 className="font-semibold">Industry Standards</h4>
            </div>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong>Geometric Dimensioning and Tolerancing (GD&T) Mastery</strong>
                <br />
                <span className="text-sm text-gray-400">Mastered GD&T for precise engineering drawings and manufacturing.</span>
              </li>
              <li className="text-gray-300">
                <strong>Fundamentals of Material Science </strong>
                <br />
                <span className="text-sm text-gray-400">Gained foundational knowledge of material properties and behavior.</span>
              </li>
              <li className="text-gray-300">
                <strong>Using Rapid Prototyping in the Engineering Design Process</strong>
                <br />
                <span className="text-sm text-gray-400">Learned to integrate rapid prototyping for efficient product design and iteration.</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-800/50 p-6 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <LineChart className="text-purple-500 w-5 h-5" />
              <h4 className="font-semibold">Industrial 4.0 Standards</h4>
            </div>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <strong>Ai for Everyone </strong>
                <br />
                <span className="text-sm text-gray-400">Learned to use AI in mechanical engineering for automation and optimization.</span>
              </li>
              <li className="text-gray-300">
                <strong>Industrial Internet of Things (IIOT)</strong>
                <br />
                <span className="text-sm text-gray-400">Learned to apply IIoT for smarter manufacturing and enhanced system efficiency.</span>
              </li>
              <li className="text-gray-300">
                <strong>Cybersecurity for Everyone </strong>
                <br />
                <span className="text-sm text-gray-400">Learned how to secure industrial systems and machines from cyber threats.</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;