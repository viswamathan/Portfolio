import React from "react";
import { motion } from "framer-motion";
import {
  PenTool as Tool,
  Cpu,
  BookOpen,
  Microscope,
  GraduationCap,
  Target,
  Zap,
  Award,
} from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 },
  };

  const cardHover = {
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 },
  };

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span>
      </motion.h2>

      {/* Intro - completely white text */}
      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20"
      >
        <p className="text-center text-lg font-semibold mb-6">
          I am a Mechanical Engineer passionate about merging traditional design
          principles with modern technology.
        </p>
        <p className="text-center text-lg">
          With expertise in CAD modeling, FEA/CFD simulations, and automation
          with Python, I create solutions that optimize performance, reduce
          complexity, and deliver real-world impact.
        </p>
      </motion.div>

      {/* Two-column content */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="whileInView"
        className="grid md:grid-cols-2 gap-10 mt-16"
      >
        {/* Summary & Technicals */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Professional Summary */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Tool className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Professional Summary</h3>
            </div>
            <p className="text-gray-300">
              Results-driven engineer with a strong foundation in mechanics and
              product design. Experienced in tackling multidisciplinary
              challenges and leveraging automation to enhance engineering
              workflows.
            </p>
          </motion.div>

          {/* Technical Focus */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Technical Focus</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>CAD design & design optimization</li>
              <li>FEA & CFD for real-world problem solving</li>
              <li>Engineering automation with Python</li>
              <li>Design for Manufacturing (DFM)</li>
              <li>System-level efficiency optimization</li>
            </ul>
          </motion.div>

          {/* Research Interests */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Research Interests</h3>
            </div>
            <ul className="space-y-4">
              {[
                {
                  title: "Renewable Energy Systems",
                  desc: "Solar thermal, energy storage, and sustainable design",
                },
                {
                  title: "Advanced Materials",
                  desc: "Composites, failure analysis, lightweight structures",
                },
                {
                  title: "AI in Engineering",
                  desc: "Predictive maintenance, ML-driven optimization",
                },
                {
                  title: "Thermal Management",
                  desc: "Heat transfer, cooling systems, HVAC design",
                },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-purple-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Education Timeline with logos */}
        <motion.div
          variants={fadeInUp}
          className="education-timeline flex flex-col"
        >
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>

            <VerticalTimeline layout="1-column-left" lineColor="#a855f7">
              {[
                {
                  date: "2022 - 2026",
                  title: "B.E Mechanical Engineering",
                  place: "Sri Krishna College of Technology",
                  details: "CGPA: 7.35/10",
                  logo: "https://tse4.mm.bing.net/th/id/OIP.geEJ2yhGJ7uxvhFGgJx8CwHaHE?pid=Api&P=0&h=180",
                },
                {
                  date: "2021 - 2022",
                  title: "Senior Secondary",
                  place: "Alagar Public School, Tuticorin",
                  details: "61% - MPCS (Maths, Physics, Chem, Comp. Sci.)",
                  logo: "https://tse3.mm.bing.net/th/id/OIP.KSj5rKEpwB-j7nYNzuxIxwHaHa?pid=Api&P=0&h=180",
                },
                {
                  date: "2019 - 2020",
                  title: "Secondary School",
                  place: "Amrita Vidyalayam, Ramnad",
                  details: "78%",
                  logo: "https://www.joonsquare.com/usermanage/image/business/amrita-vidyalayam-ahmedabad-5293/amrita-vidyalayam-ahmedabad-logo.png",
                },
              ].map((edu, idx) => (
                <VerticalTimelineElement
                  key={idx}
                  date={edu.date}
                  contentStyle={{
                    background: "rgba(31,41,55,0.7)",
                    color: "#fff",
                    borderRadius: "12px",
                    border: "1px solid rgba(139,92,246,0.3)",
                    position: "relative",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid rgba(139,92,246,0.3)",
                  }}
                  iconStyle={{ background: "#7c3aed", color: "#fff" }}
                  icon={<GraduationCap />}
                >
                  {/* Logo in top-right corner */}
                  <img
                    src={edu.logo}
                    alt="Logo"
                    className="absolute top-4 right-4 w-10 h-10 rounded-full border border-purple-400 shadow-md"
                  />
                  <h3 className="font-bold text-lg">{edu.title}</h3>
                  <h4 className="text-purple-300">{edu.place}</h4>
                  <p className="text-gray-300 text-sm mt-2">{edu.details}</p>
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
