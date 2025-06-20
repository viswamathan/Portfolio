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
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center"
      >
        About Me
      </motion.h2>

      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto"
      >
        <p className="text-center font-semibold mb-6">
          I am a Mechanical engineer with expertise in CAD design, FEA/CFD analysis, and engineering automation. My goal is to bridge the gap between traditional engineering and modern technology.
        </p>
        <p className="text-center font-semibold">
          With a strong foundation in mechanical principles and hands-on experience in simulation tools, I deliver solutions that drive efficiency and innovation.
        </p>
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
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tool className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Professional Summary</h3>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Mechanical engineer with expertise in CAD design, FEA, and CFD analysis. 
              Passionate about leveraging Python for automation in engineering workflows. 
              Proven track record in designing innovative solutions for complex engineering challenges.
            </p>
          </motion.div>

          {/* Technical Focus */}
          <motion.div
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Technical Focus</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-base leading-relaxed">
              <li>Advanced CAD modeling and design optimization</li>
              <li>Finite Element Analysis (FEA) for structural analysis</li>
              <li>Computational Fluid Dynamics (CFD) simulations</li>
              <li>Python automation for engineering workflows</li>
              <li>Design for Manufacturing (DFM)</li>
            </ul>
          </motion.div>

          {/* Research Interests */}
          <motion.div
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Research Interests</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2 text-base leading-relaxed">
              <li><strong className="text-white">Renewable Energy Systems:</strong> Solar thermal systems, energy storage, efficiency optimization</li>
              <li><strong className="text-white">Advanced Materials:</strong> Composite materials, material characterization, failure analysis</li>
              <li><strong className="text-white">AI in Engineering:</strong> Machine learning for design optimization, predictive maintenance</li>
              <li><strong className="text-white">Thermal Management:</strong> Heat transfer optimization, cooling systems design</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div variants={fadeInUp}>
          <motion.div 
            whileHover={cardHover}
            className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-500 w-6 h-6" />
              <h3 className="text-xl font-bold text-white">Education</h3>
            </div>

            <VerticalTimeline layout="1-column-left" lineColor="#6b21a8">
              {[
                {
                  title: "B.E in Mechanical Engineering",
                  school: "Sri Krishna College of Technology",
                  date: "2022 - 2026",
                  details: "CGPA: 7.35/10"
                },
                {
                  title: "Senior Secondary Education",
                  school: "Alagar Public School, Tuticorin",
                  date: "2021 - 2022",
                  details: "Percentage: 61%",
                  extra: "Major: Mathematics, Physics, Chemistry and Computer Science"
                },
                {
                  title: "Secondary Education",
                  school: "Amrita Vidyalayam, Ramnad",
                  date: "2019 - 2020",
                  details: "Percentage: 78%"
                }
              ].map((edu, idx) => (
                <VerticalTimelineElement
                  key={idx}
                  contentStyle={{ background: 'rgba(31, 41, 55, 0.5)', color: '#fff', backdropFilter: 'blur(10px)', boxShadow: '0 0 20px rgba(139, 92, 246, 0.1)' }}
                  contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
                  date={edu.date}
                  iconStyle={{ background: '#7c3aed', color: '#fff' }}
                  icon={<GraduationCap />}
                  animate={true}
                >
                  <h3 className="font-bold text-base">{edu.title}</h3>
                  <h4 className="text-purple-400 text-sm">{edu.school}</h4>
                  <p className="text-gray-300 text-sm mt-1">{edu.details}</p>
                  {edu.extra && <p className="text-gray-300 text-sm">{edu.extra}</p>}
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
