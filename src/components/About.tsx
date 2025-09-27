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
  Lightbulb,
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

      {/* Intro */}
      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20"
      >
        <p className="text-center text-lg font-semibold mb-6">
          I am a <span className="text-purple-400">Mechanical Engineer</span>{" "}
          passionate about merging{" "}
          <span className="text-blue-400">traditional design principles</span>{" "}
          with <span className="text-pink-400">modern technology</span>.
        </p>
        <p className="text-center text-lg">
          With expertise in{" "}
          <span className="text-yellow-400">CAD modeling</span>,{" "}
          <span className="text-green-400">FEA/CFD simulations</span>, and{" "}
          <span className="text-red-400">automation with Python</span>, I create
          solutions that optimize{" "}
          <span className="text-purple-400">performance</span>, reduce{" "}
          <span className="text-blue-400">complexity</span>, and deliver{" "}
          <span className="text-yellow-400">real-world impact</span>.
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

        {/* Education Timeline */}
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
                },
                {
                  date: "2021 - 2022",
                  title: "Senior Secondary",
                  place: "Alagar Public School, Tuticorin",
                  details: "61% - MPCS (Maths, Physics, Chem, Comp. Sci.)",
                },
                {
                  date: "2019 - 2020",
                  title: "Secondary School",
                  place: "Amrita Vidyalayam, Ramnad",
                  details: "78%",
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
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid rgba(139,92,246,0.3)",
                  }}
                  iconStyle={{ background: "#7c3aed", color: "#fff" }}
                  icon={<GraduationCap />}
                >
                  <h3 className="font-bold text-lg">{edu.title}</h3>
                  <h4 className="text-purple-300">{edu.place}</h4>
                  <p className="text-gray-300 text-sm mt-2">{edu.details}</p>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Publications & Patents */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="mt-20"
      >
        <h3 className="text-3xl font-bold mb-10 text-center">
          Publications & <span className="text-purple-400">Patents</span>
        </h3>
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          className="grid md:grid-cols-2 gap-10"
        >
          {/* Publications */}
          <motion.div
            variants={fadeInUp}
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <h4 className="text-xl font-semibold mb-4 text-purple-400">
              Publications
            </h4>
            <ul className="space-y-4">
              <motion.li whileHover={{ x: 10 }} className="flex gap-3">
                <img
                  src="https://img.icons8.com/color/48/book.png"
                  alt="Publication Icon"
                  className="w-6 h-6"
                />
                <div>
                  <strong>Optimization of Heat Transfer in Solar Systems</strong>
                  <br />
                  <span className="text-gray-400">
                    Intl. Journal of Renewable Energy, 2023
                  </span>
                </div>
              </motion.li>
            </ul>
          </motion.div>

          {/* Patents */}
          <motion.div
            variants={fadeInUp}
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <h4 className="text-xl font-semibold mb-4 text-purple-400">
              Patents
            </h4>
            <ul className="space-y-4">
              {[
                {
                  title: "Multi-Purpose Knife",
                  number: "IN2023456789",
                  status: "Granted",
                },
                {
                  title: "Modified Solar Dryer with Energy Storage",
                  number: "IN2023123456",
                  status: "Pending",
                },
              ].map((p, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex gap-3"
                >
                  <img
                    src="https://img.icons8.com/color/48/certificate.png"
                    alt="Patent Icon"
                    className="w-6 h-6"
                  />
                  <div>
                    <strong>{p.title}</strong>
                    <br />
                    <span className="text-gray-400">#{p.number}</span> —{" "}
                    <span
                      className={`${
                        p.status === "Granted"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Quick Achievements */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="whileInView"
        className="mt-20"
      >
        <h3 className="text-3xl font-bold mb-10 text-center">
          At a <span className="text-purple-400">Glance</span>
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Target className="w-8 h-8 text-purple-400" />,
              title: "10+ Projects",
              desc: "CAD, FEA, and CFD case studies",
            },
            {
              icon: <Zap className="w-8 h-8 text-yellow-400" />,
              title: "Automation",
              desc: "Python-based engineering tools",
            },
            {
              icon: <Award className="w-8 h-8 text-green-400" />,
              title: "Innovation",
              desc: "Patents & Research contributions",
            },
          ].map((a, idx) => (
            <motion.div
              key={idx}
              whileHover={cardHover}
              className="p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/50 rounded-2xl text-center border border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="flex justify-center mb-4">{a.icon}</div>
              <h4 className="text-xl font-semibold mb-2">{a.title}</h4>
              <p className="text-gray-400 text-sm">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
