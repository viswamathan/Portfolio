import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool as Tool,
  Cpu,
  Microscope,
  GraduationCap,
  Award,
  ChevronRight,
  Briefcase
} from "lucide-react";
import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [modalImage, setModalImage] = useState(null); // For lightbox

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

  // Patent data
  const patents = [
    {
      img: "SOLAR DRYER MODAL.jpeg",
      title: "Modified Solar Dryer Integrated with Thermal Energy Storage with Concave fins",
      appNo: "202541021927",
      status: "Pending",
      type: "Utility Patent",
      desc: "A solar dryer integrating phase change material for enhanced thermal energy storage."
    },
    {
      img: "Multi Purpose Knife.png",
      title: "Multi Purpose Knife",
      appNo: "2024112346",
      status: "Approved",
      type: "Design Patent",
      desc: "Innovative knife designed for multiple functions including cutting, peeling, and slicing, enhancing convenience and efficiency in the kitchen."
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        About{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Me
        </span>
      </motion.h2>

      {/* Intro */}
      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20 mb-16"
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
        {/* Left Column */}
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
                { title: "AI in Engineering", desc: "Predictive maintenance, ML-driven optimization" },
                { title: "Thermal Management", desc: "Heat transfer, cooling systems, HVAC design" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold text-purple-300">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Right Column */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Education */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">B.E Mechanical Engineering</h4>
                <p className="text-purple-300 text-sm">Sri Krishna College of Technology</p>
                <p className="text-gray-400 text-sm">2022 - 2026 | CGPA: 7.50/10</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Senior Secondary</h4>
                <p className="text-purple-300 text-sm">Alagar Public School, Tuticorin</p>
                <p className="text-gray-400 text-sm">2021 - 2022 | 61% - MPCS</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Secondary School</h4>
                <p className="text-purple-300 text-sm">Amrita Vidyalayam, Ramnad</p>
                <p className="text-gray-400 text-sm">2019 - 2020 | 78%</p>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Key Achievements</h3>
            </div>
            <div className="space-y-3">
              {[
                "Certified SolidWorks Associate (CSWA)",
                "NIOT Research Internship Completion",
                "15+ Engineering Projects Completed",
                "Advanced FEA & CFD Specialization",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Projects */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Current Focus Areas</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-300 mb-1">Solar Dryer Development</h4>
                <p className="text-gray-400 text-sm">Thermal energy storage integration with PCM</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-1">FEA Optimization</h4>
                <p className="text-gray-400 text-sm">Advanced structural analysis techniques</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-300 mb-1">Automation Scripts</h4>
                <p className="text-gray-400 text-sm">Python-based engineering calculations</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---------------- Patent Section ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 py-12 px-6 bg-gray-800/80 rounded-3xl shadow-xl border border-purple-500/30"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Patents
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {patents.map((patent, idx) => (
            <motion.div
              key={idx}
              whileHover={cardHover}
              className="bg-gray-900/70 rounded-2xl p-6 border border-purple-500/20 shadow-lg cursor-pointer"
              onClick={() => setModalImage(patent.img)}
            >
              <div className="w-full h-40 flex justify-center items-center mb-4 bg-gray-800 rounded-lg">
                <img
                  src={patent.img}
                  alt={patent.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <h4 className="font-semibold text-purple-300 mb-2">{patent.title}</h4>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                  {patent.type}
                </span>
                <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                  {patent.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{patent.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Full View"
            className="max-h-[90%] max-w-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default About;
