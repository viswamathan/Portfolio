import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  PenTool as Tool,
  Cpu,
  BookOpen,
  Microscope,
  GraduationCap,
  Target,
  Zap,
  Award,
  ChevronRight,
  MapPin,
  Calendar,
  User,
  Briefcase
} from "lucide-react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const About = () => {
  const [activeTab, setActiveTab] = useState('summary');

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

  const personalInfo = {
    location: "Coimbatore, Tamil Nadu, India",
    age: "20 years",
    languages: ["Tamil", "English"],
    interests: ["Renewable Energy", "AI in Engineering", "Sustainable Design"],
    currentFocus: "Advanced FEA & CFD Analysis"
  };

  const quickStats = [
    { label: "Years of Study", value: "3+", icon: BookOpen },
    { label: "Projects Completed", value: "15+", icon: Target },
    { label: "Technologies Mastered", value: "10+", icon: Cpu },
    { label: "Certifications", value: "5+", icon: Award }
  ];
  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-12 text-center"
      >
        About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span>
      </motion.h2>

      {/* Quick Stats Bar */}
      <motion.div
        {...fadeInUp}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800/30 p-4 rounded-xl text-center border border-purple-500/20">
              <Icon className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Interactive Tabs */}
      <motion.div
        {...fadeInUp}
        className="flex justify-center mb-8"
      >
        <div className="bg-gray-800/50 p-2 rounded-xl border border-gray-700/50">
          {[
            { id: 'summary', label: 'Summary', icon: User },
            { id: 'personal', label: 'Personal', icon: MapPin },
            { id: 'education', label: 'Education', icon: GraduationCap }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </motion.div>
      {/* Intro - completely white text */}
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        {activeTab === 'summary' && (
          <div className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20">
            <p className="text-center text-lg font-semibold mb-6">
              I am a Mechanical Engineer passionate about merging traditional design
              principles with modern technology.
            </p>
            <p className="text-center text-lg">
              With expertise in CAD modeling, FEA/CFD simulations, and automation
              with Python, I create solutions that optimize performance, reduce
              complexity, and deliver real-world impact.
            </p>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Personal Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-white">{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-white">{personalInfo.age}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-purple-400" />
                    <span className="text-white">Languages: {personalInfo.languages.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Current Focus</h3>
                <p className="text-white mb-4">{personalInfo.currentFocus}</p>
                <h4 className="font-semibold text-purple-300 mb-2">Research Interests:</h4>
                <div className="flex flex-wrap gap-2">
                  {personalInfo.interests.map((interest, index) => (
                    <span key={index} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto">
            <VerticalTimeline layout="1-column-left" lineColor="#a855f7">
              {[
                {
                  date: "2022 - 2026",
                  title: "B.E Mechanical Engineering",
                  place: "Sri Krishna College of Technology",
                  details: "CGPA: 7.50/10",
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
          </div>
        )}
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

        {/* Achievement Highlights */}
        <motion.div
          variants={fadeInUp}
          className="space-y-8"
        >
          {/* Key Achievements */}
          <motion.div
            whileHover={cardHover}
            className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Key Achievements</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Certified SolidWorks Associate (CSWA)</span>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">NIOT Research Internship Completion</span>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">15+ Engineering Projects Completed</span>
              </div>
              <div className="flex items-center gap-3">
                <ChevronRight className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Advanced FEA & CFD Specialization</span>
              </div>
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
    </div>
  );
};

export default About;
