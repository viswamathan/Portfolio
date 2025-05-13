import React from 'react';
import { motion } from 'framer-motion';
import { PenTool as Tool, Cpu, BookOpen, Microscope, GraduationCap } from 'lucide-react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const About = () => {
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

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2 
        {...fadeInUp}
        className="text-4xl font-bold mb-12 text-center"
      >
        About <span className="text-purple-500">Me</span>
      </motion.h2>

      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-3xl mx-auto"
      >
        <p className="text-center text-lg font-semibold mb-6">
          I am a <span className="text-purple-500">mechanical engineer</span> with expertise in <span className="text-blue-500">CAD design</span>, <span className="text-green-500">FEA/CFD analysis</span>, and <span className="text-yellow-500">engineering automation</span>. My goal is to bridge the gap between <span className="text-red-500">traditional engineering</span> and <span className="text-purple-500">modern technology</span>.
        </p>
        <p className="text-center text-lg">
          With a strong foundation in <span className="text-green-500">mechanical principles</span> and hands-on experience in <span className="text-blue-500">simulation tools</span>, I deliver <span className="text-yellow-500">high-quality results</span> that drive <span className="text-purple-500">efficiency</span> and <span className="text-red-500">innovation</span>.
        </p>
      </motion.div>

      <motion.div 
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        className="grid md:grid-cols-2 gap-8 mt-16"
      >
        {/* Summary & Tech Focus */}
        <motion.div
          variants={fadeInUp}
          className="space-y-8"
        >
          <motion.div 
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tool className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-semibold">Professional Summary</h3>
            </div>
            <p className="text-gray-300">
              Mechanical engineer with expertise in CAD design, FEA, and CFD analysis. 
              Passionate about leveraging Python for automation in engineering workflows. 
              Proven track record in designing innovative solutions for complex engineering challenges.
            </p>
          </motion.div>

          <motion.div 
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-semibold">Technical Focus</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Advanced CAD modeling and design optimization</li>
              <li>Finite Element Analysis (FEA) for structural analysis</li>
              <li>Computational Fluid Dynamics (CFD) simulations</li>
              <li>Python automation for engineering workflows</li>
              <li>Design for Manufacturing (DFM)</li>
            </ul>
          </motion.div>

          <motion.div 
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-semibold">Research Interests</h3>
            </div>
            <ul className="space-y-3">
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-400">Renewable Energy Systems</h4>
                  <p className="text-gray-300 text-sm">Solar thermal systems, energy storage, efficiency optimization</p>
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-400">Advanced Materials</h4>
                  <p className="text-gray-300 text-sm">Composite materials, material characterization, failure analysis</p>
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-400">AI in Engineering</h4>
                  <p className="text-gray-300 text-sm">Machine learning for design optimization, predictive maintenance</p>
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-purple-400">Thermal Management</h4>
                  <p className="text-gray-300 text-sm">Heat transfer optimization, cooling systems design</p>
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          variants={fadeInUp}
          className="education-timeline"
        >
          <motion.div 
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            
            <VerticalTimeline layout="1-column-left" lineColor="#6b21a8">
              <VerticalTimelineElement
                className="vertical-timeline-element"
                contentStyle={{ 
                  background: 'rgba(31, 41, 55, 0.5)', 
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
                date="2022 - 2026"
                iconStyle={{ background: '#7c3aed', color: '#fff' }}
                icon={<GraduationCap />}
                animate={true}
              >
                <h3 className="font-bold text-lg">B.E in Mechanical Engineering</h3>
                <h4 className="text-purple-400">Sri Krishna College of Technology</h4>
                <p className="text-gray-300 text-sm mt-2">CGPA: 7.35/10</p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element"
                contentStyle={{ 
                  background: 'rgba(31, 41, 55, 0.5)', 
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
                date="2021 - 2022"
                iconStyle={{ background: '#7c3aed', color: '#fff' }}
                icon={<GraduationCap />}
                animate={true}
              >
                <h3 className="font-bold text-lg">Senior Secondary Education</h3>
                <h4 className="text-purple-400">Alagar Public School,Tuticorin</h4>
                <p className="text-gray-300 text-sm mt-2">Percentage: 61%</p>
                <p className="text-gray-300 text-sm">Major: Mathematics, Physics, Chemistry and Computer Science</p>
              </VerticalTimelineElement>

              <VerticalTimelineElement
                className="vertical-timeline-element"
                contentStyle={{ 
                  background: 'rgba(31, 41, 55, 0.5)', 
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)'
                }}
                contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
                date="2019 - 2020"
                iconStyle={{ background: '#7c3aed', color: '#fff' }}
                icon={<GraduationCap />}
                animate={true}
              >
                <h3 className="font-bold text-lg">Secondary Education</h3>
                <h4 className="text-purple-400">Amrita Vidyalayam,Ramnad</h4>
                <p className="text-gray-300 text-sm mt-2">Percentage: 78%</p>
              </VerticalTimelineElement>
            </VerticalTimeline>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Publications and Patents */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="mt-16"
      >
        <h3 className="text-2xl font-semibold mb-8 text-center">
          Publications & <span className="text-purple-500">Patents</span>
        </h3>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Publications */}
          <motion.div 
            variants={fadeInUp}
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <h4 className="text-xl font-semibold mb-4 text-purple-500">Publications</h4>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <img 
                  src="https://img.icons8.com/color/48/book.png" 
                  alt="Publication Icon" 
                  className="w-6 h-6"
                />
                <div>
                  <strong>Title:</strong> "Optimization of Heat Transfer in Solar Thermal Systems"
                  <br />
                  <strong>Journal:</strong> International Journal of Renewable Energy
                  <br />
                  <strong>Year:</strong> 2023
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <img 
                  src="https://img.icons8.com/color/48/open-book.png" 
                  alt="Publication Icon" 
                  className="w-6 h-6"
                />
                <div>
                  <strong>Title:</strong> "CFD Analysis of Turbulent Flow in Heat Exchangers"
                  <br />
                  <strong>Journal:</strong> Journal of Mechanical Engineering Research
                  <br />
                  <strong>Year:</strong> 2022
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Patents */}
          <motion.div 
            variants={fadeInUp}
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <h4 className="text-xl font-semibold mb-4 text-purple-500">Patents</h4>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <img 
                  src="https://img.icons8.com/color/48/certificate.png" 
                  alt="Patent Icon" 
                  className="w-6 h-6"
                />
                <div>
                  <strong>Title:</strong> "Multi Purpose Knife "
                  <br />
                  <strong>Patent Number:</strong> IN2023456789
                  <br />
                  <strong>Status:</strong> Granted
                </div>
              </motion.li>
              <motion.li 
                whileHover={{ x: 10 }}
                className="flex items-start gap-3"
              >
                <img 
                  src="https://img.icons8.com/color/48/certificate.png" 
                  alt="Patent Icon" 
                  className="w-6 h-6"
                />
                <div>
                  <strong>Title:</strong> "Modified Solar Dryer With Energy Storage System"
                  <br />
                  <strong>Patent Number:</strong> IN2023123456
                  <br />
                  <strong>Status:</strong> Pending
                </div>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;