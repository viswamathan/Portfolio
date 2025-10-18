import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool as Tool,
  Cpu,
  Microscope,
  GraduationCap,
  Award,
  ChevronRight,
  Briefcase,
  DownloadCloud,
  X,
} from "lucide-react";
import "react-vertical-timeline-component/style.min.css";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"summary" | "patents" | "timeline">(
    "summary"
  );
  const [modalImage, setModalImage] = useState<string | null>(null); // Lightbox

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  // Patent Data
  const patents = [
    {
      img: "SOLAR DRYER MODAL.jpeg",
      title: "Modified Solar Dryer Integrated with Thermal Energy Storage with Concave fins",
      appNo: "202541021927",
      status: "Pending",
      type: "Utility Patent",
      desc: "A solar dryer integrating phase change material for enhanced thermal energy storage and efficiency improvement.",
    },
    {
      img: "Multi Purpose Knife.png",
      title: "Multi Purpose Knife",
      appNo: "2024112346",
      status: "Approved",
      type: "Design Patent",
      desc: "Innovative multi-functional knife for cutting, peeling, and slicing, enhancing convenience and efficiency in the kitchen.",
    },
  ];

  // Example timeline (compact)
  const timeline = [
    { year: "2024", title: "NIOT Research Internship", desc: "Project: Thermal systems" },
    { year: "2023", title: "CSWA Certification", desc: "Certified SolidWorks Associate" },
    { year: "2022", title: "B.E Admission", desc: "Sri Krishna College of Technology" },
  ];

  // Skills example (for new "Skills & Tools" card)
  const skills = [
    { name: "SolidWorks", level: 90 },
    { name: "Python (automation)", level: 80 },
    { name: "FEA (Ansys)", level: 75 },
    { name: "CFD", level: 65 },
    { name: "MATLAB", level: 70 },
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        {...fadeInUp}
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
      >
        About{" "}
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Me
        </span>
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        {[
          { id: "summary", label: "Summary" },
          { id: "patents", label: "Patents" },
          { id: "timeline", label: "Timeline" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-4 py-2 rounded-full font-medium text-sm border ${
              activeTab === t.id
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white border-transparent shadow-lg"
                : "bg-gray-800/40 text-gray-300 border-purple-500/20"
            } transition-all`}
            aria-pressed={activeTab === t.id}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Intro Section */}
      {activeTab === "summary" && (
        <>
          <motion.div
            {...fadeInUp}
            className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-lg border border-purple-500/20 mb-12"
          >
            <p className="text-center text-lg font-semibold mb-4">
              I am a Mechanical Engineer passionate about merging traditional design
              principles with modern technology.
            </p>
            <p className="text-center text-base md:text-lg">
              With expertise in CAD modeling, FEA/CFD simulations, and automation
              with Python, I create solutions that optimize performance, reduce
              complexity, and deliver real-world impact.
            </p>

            <div className="flex items-center justify-center gap-4 mt-6">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-md shadow hover:scale-[1.01] transition"
                aria-label="Download Resume"
              >
                <DownloadCloud className="w-4 h-4" /> Resume
              </a>
            </div>
          </motion.div>

          {/* Two-column layout */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left Column */}
            <motion.div variants={fadeInUp} className="space-y-6">
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

              {/* Skills & Tools (new) */}
              <motion.div
                whileHover={cardHover}
                className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <PenTool className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold">Skills & Tools</h3>
                </div>
                <div className="space-y-3">
                  {skills.map((s) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm text-gray-300 mb-1">
                        <span>{s.name}</span>
                        <span>{s.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-800 rounded-full">
                        <div
                          className="h-2 rounded-full bg-purple-500"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={fadeInUp} className="space-y-6">
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

              {/* Current Focus Areas */}
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
        </>
      )}

      {/* Patents tab */}
      {activeTab === "patents" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 py-12 px-6 bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-3xl shadow-2xl border border-purple-500/30 backdrop-blur-md"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Patents & Innovations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {patents.map((patent, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group overflow-hidden bg-gray-900/70 border border-purple-500/20 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:border-purple-400/40 transition-all cursor-pointer"
                onClick={() => setModalImage(patent.img)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setModalImage(patent.img);
                }}
              >
                <div className="relative w-full h-48 overflow-hidden rounded-t-2xl bg-gray-800 flex items-center justify-center">
                  <img
                    src={patent.img}
                    alt={patent.title}
                    className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-purple-300 text-lg mb-2 group-hover:text-purple-400 transition-colors">
                    {patent.title}
                  </h4>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300">
                      {patent.type}
                    </span>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-300">
                      {patent.status}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3 text-sm text-gray-400">
                    <p>
                      <span className="text-gray-300 font-medium">Application No:</span>{" "}
                      {patent.appNo}
                    </p>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed">{patent.desc}</p>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-500/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            ))}
          </div>

          {modalImage && (
            <div
              className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
              onClick={() => setModalImage(null)}
              role="dialog"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setModalImage(null)}
                  className="absolute -top-4 -right-4 bg-gray-900/80 p-2 rounded-full border border-purple-500/20 text-white hover:bg-gray-800"
                  aria-label="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>

                <img
                  src={modalImage}
                  alt="Patent preview"
                  className="max-h-[85vh] max-w-[90vw] rounded-2xl shadow-2xl border border-purple-500/30 object-contain"
                />
              </motion.div>
            </div>
          )}
        </motion.div>
      )}

      {/* Timeline tab */}
      {activeTab === "timeline" && (
        <motion.div
          {...fadeInUp}
          className="mt-6 py-10 px-6 bg-gray-900/60 rounded-2xl border border-purple-500/20"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-white">Timeline</h3>
          <div className="space-y-4 max-w-3xl mx-auto">
            {timeline.map((t, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 text-center">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-medium">
                    {t.year}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white">{t.title}</h4>
                  <p className="text-gray-400 text-sm">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default About;
