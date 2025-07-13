import React from 'react';
import { motion } from 'framer-motion';
import { PenTool as Tool, Cpu, BookOpen, Microscope, GraduationCap, Cog, Wrench, Zap } from 'lucide-react';
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
    <div className="container mx-auto px-6 py-20 relative">
      <motion.div className="relative z-10">
        <motion.h2 
          {...fadeInUp}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center"
        >
          About Me
        </motion.h2>

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
            <motion.div 
              whileHover={cardHover} 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/20 relative overflow-hidden border border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                  <GraduationCap className="text-purple-500 w-4 h-4" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Education</h3>
              </div>
              <VerticalTimeline layout="1-column-left" lineColor="#6b21a8">
                {[
                  {
                    title: "B.E in Mechanical Engineering",
                    school: "Sri Krishna College of Technology",
                    date: "2022 - 2026",
                    details: "CGPA: 7.35/10",
                    symbol: " 🎓 "
                  },
                  {
                    title: "Senior Secondary Education",
                    school: "Alagar Public School, Tuticorin",
                    date: "2021 - 2022",
                    details: "Percentage: 61%",
                    extra: "Major: Mathematics, Physics, Chemistry and Computer Science",
                    symbol: " 🎓 "
                  },
                  {
                    title: "Secondary Education",
                    school: "Amrita Vidyalayam, Ramnad",
                    date: "2019 - 2020",
                    details: "Percentage: 78%",
                    symbol: " 🎓 "
                  }
                ].map((edu, idx) => (
                  <VerticalTimelineElement
                    key={idx}
                    contentStyle={{ 
                      background: 'rgba(31, 41, 55, 0.5)', 
                      color: '#fff', 
                      backdropFilter: 'blur(10px)', 
                      boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)',
                      border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}
                    contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
                    date={edu.date}
                    iconStyle={{ background: '#7c3aed', color: '#fff', fontSize: '1.2rem' }}
                    icon={<span>{edu.symbol}</span>}
                  >
                    <h3 className="font-bold text-sm sm:text-base flex items-center gap-2">
                      <span>{edu.symbol}</span>
                      {edu.title}
                    </h3>
                    <h4 className="text-purple-400 text-xs sm:text-sm">{edu.school}</h4>
                    <p className="text-gray-300 text-xs sm:text-sm mt-1">{edu.details}</p>
                    {edu.extra && <p className="text-gray-300 text-xs sm:text-sm">{edu.extra}</p>}
                  </VerticalTimelineElement>
                ))}
              </VerticalTimeline>
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
      </motion.div>
    </div>
  );
};

export default About;