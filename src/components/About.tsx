import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PenTool as Tool,
  Cpu,
  Microscope,
  GraduationCap,
  Award,
  ChevronRight,
  Briefcase,
  FileText,
  Calendar,
  User,
  Shield,
  ExternalLink,
  X,
  Eye
} from "lucide-react";

const About = () => {
  const [modalImage, setModalImage] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);

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
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 },
  };

  // Professional Patent Data (names fixed)
  const patents = [
    {
      id: 1,
      img: "SOLAR DRYER MODAL.jpeg",
      title: "Modified Solar Dryer Integrated with Thermal Energy Storage with Concave Fins",
      appNo: "202541021927",
      status: "Pending",
      type: "Utility Patent",
      category: "Renewable Energy",
      filingDate: "2024-03-15",
      inventors: ["Viswa M", "Dr. S. Kumar"],
      description: "A solar dryer integrating phase change material for enhanced thermal energy storage and efficiency improvement with innovative concave fin design for optimal heat transfer.",
      features: [
        "Phase Change Material (PCM) integration",
        "Concave fin heat exchanger design",
        "Modular construction",
        "IoT monitoring capability",
        "60% improved efficiency"
      ],
      technicalSpecs: {
        efficiency: "60% improvement",
        temperature: "45-75°C operating range",
        capacity: "50kg batch processing",
        material: "Food-grade stainless steel"
      },
      onView: () => window.open('/patent-documents/solar-dryer.pdf', '_blank')
    },
    {
      id: 2,
      img: "Multi Purpose Knife.png",
      title: "Multi‑Purpose Knife",
      appNo: "2024112346",
      status: "Approved",
      type: "Design Patent",
      category: "Kitchen Tools",
      filingDate: "2024-01-10",
      inventors: ["Viswa M"],
      description: "Innovative multi-functional knife for cutting, peeling, and slicing, enhancing convenience and efficiency in the kitchen with ergonomic design and safety features.",
      features: [
        "7-in-1 functionality",
        "Ergonomic handle design",
        "Safety locking mechanism",
        "Dishwasher safe",
        "Food-grade materials"
      ],
      technicalSpecs: {
        material: "420 Stainless Steel",
        weight: "150g",
        dimensions: "18cm total length",
        features: "Integrated peeler, slicer, chopper"
      },
      onView: () => window.open('/patent-documents/multi-knife.pdf', '_blank')
    }
  ];

  const PatentModal = ({ patent, onClose }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/30">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{patent.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-300">
                  {patent.type}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  patent.status === 'Approved' 
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-yellow-500/20 text-yellow-300'
                }`}>
                  {patent.status}
                </span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-300">
                  {patent.category}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="bg-black rounded-xl p-4 border border-gray-700">
                <img src={patent.img} alt={patent.title} className="w-full h-64 object-contain rounded-lg" />
              </div>
              <button
                onClick={patent.onView}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-5 h-5" />
                View Patent Documents
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Patent Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Application No:</span>
                    <span className="text-white font-mono">{patent.appNo}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Filing Date:</span>
                    <span className="text-white">{patent.filingDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700">
                    <span className="text-gray-400">Inventors:</span>
                    <span className="text-white text-right">{patent.inventors.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Features</h4>
                <div className="space-y-2">
                  {patent.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Technical Specifications</h4>
                <div className="bg-gray-800/50 rounded-lg p-4">
                  {Object.entries(patent.technicalSpecs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-1">
                      <span className="text-gray-400 capitalize">{key}:</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-purple-300 mb-2">Description</h4>
            <p className="text-gray-300 leading-relaxed">{patent.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl bg-gray-900">
      {/* Heading */}
      <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-bold mb-12 text-center">
        About <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Me</span>
      </motion.h2>

      {/* Intro Section – Updated */}
      <motion.div
        {...fadeInUp}
        className="text-white text-lg leading-relaxed max-w-4xl mx-auto bg-gray-900/40 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-purple-500/20 mb-16"
      >
        <p className="text-center text-lg font-semibold mb-6">
          I am a Mechanical Engineer currently working as a <span className="text-purple-400">Graduate Engineer Trainee – Design</span> at Shanthi Gears Limited (Murugappa Group), specializing in worm gearbox design and product development.
        </p>
        <p className="text-center text-lg">
          With expertise in CAD (SolidWorks, NX, Creo), FEA/CFD simulations, PLM/ERP systems, and engineering automation, I create robust, manufacturable designs that deliver real-world impact.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid md:grid-cols-2 gap-10 mt-16">
        {/* Left Column */}
        <motion.div variants={fadeInUp} className="space-y-8">
          {/* Professional Summary – Updated */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Tool className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Professional Summary</h3>
            </div>
            <p className="text-gray-300">
              Graduate Engineer Trainee at Shanthi Gears Limited with hands-on experience in worm gearbox design, CAD modeling, engineering analysis, PLM systems, and cross-functional collaboration. Passionate about product development, manufacturing optimization, and innovative engineering solutions.
            </p>
          </motion.div>

          {/* Technical Focus – Updated with gearbox design */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Technical Focus</h3>
            </div>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Worm gearbox design & product development</li>
              <li>CAD (SolidWorks, NX, Creo) & assembly validation</li>
              <li>FEA & structural analysis (ANSYS Workbench)</li>
              <li>PLM/ERP systems (Oracle ERP, SLGPDM)</li>
              <li>Engineering documentation & BOM management</li>
              <li>Design for Manufacturing (DFM) & process optimization</li>
            </ul>
          </motion.div>

          {/* Research Interests – unchanged but relevant */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Microscope className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Research Interests</h3>
            </div>
            <ul className="space-y-4">
              {[
                { title: "Renewable Energy Systems", desc: "Solar thermal, energy storage, sustainable design" },
                { title: "Advanced Materials", desc: "Composites, failure analysis, lightweight structures" },
                { title: "AI in Engineering", desc: "Predictive maintenance, ML-driven optimization" },
                { title: "Thermal Management", desc: "Heat transfer, cooling systems, HVAC design" },
              ].map((item, idx) => (
                <motion.li key={idx} whileHover={{ x: 10 }} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
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
          {/* Education – CGPA corrected */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">B.E Mechanical Engineering</h4>
                <p className="text-purple-300 text-sm">Sri Krishna College of Technology, Coimbatore</p>
                <p className="text-gray-400 text-sm">2022 – 2026 | CGPA: 7.62/10</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Senior Secondary (XII)</h4>
                <p className="text-purple-300 text-sm">Alagar Public School, Tuticorin (CBSE)</p>
                <p className="text-gray-400 text-sm">2021 – 2022 | 60.6%</p>
              </div>
              <div className="border-l-2 border-purple-500/30 pl-4">
                <h4 className="font-semibold text-white">Secondary School (X)</h4>
                <p className="text-purple-300 text-sm">Amrita Vidyalayam, Ramnad (CBSE)</p>
                <p className="text-gray-400 text-sm">2019 – 2020 | 77.6%</p>
              </div>
            </div>
          </motion.div>

          {/* Achievements – Added current role */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Award className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Key Achievements</h3>
            </div>
            <div className="space-y-3">
              {[
                "Graduate Engineer Trainee at Shanthi Gears Limited (Murugappa Group)",
                "Certified SolidWorks Associate (CSWA)",
                "Design Patent Granted – Multi‑Purpose Knife",
                "Utility Patent Filed – Solar Dryer with PCM",
                "15+ Engineering Projects Completed",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Focus Areas – Updated to reflect new role */}
          <motion.div whileHover={cardHover} className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-purple-400 w-6 h-6" />
              <h3 className="text-xl font-semibold">Current Focus Areas</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-purple-500/10 p-3 rounded-lg border border-purple-500/20">
                <h4 className="font-semibold text-purple-300 mb-1">Worm Gearbox Design</h4>
                <p className="text-gray-400 text-sm">CAD modeling, assembly validation, engineering drawings</p>
              </div>
              <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <h4 className="font-semibold text-blue-300 mb-1">PLM & ERP Implementation</h4>
                <p className="text-gray-400 text-sm">BOM management, design revisions using Oracle ERP & SLGPDM</p>
              </div>
              <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                <h4 className="font-semibold text-green-300 mb-1">Manufacturing Support</h4>
                <p className="text-gray-400 text-sm">Process optimization, defect resolution, cross-functional collaboration</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Professional Patent Section – Redesigned */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 py-16 px-6 md:px-12 bg-gradient-to-br from-gray-900/90 via-purple-900/10 to-gray-800/70 rounded-3xl shadow-2xl border border-purple-500/30 backdrop-blur-sm"
      >
        <div className="text-center mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400"
          >
            Patents & Intellectual Property
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Protecting innovation through granted and pending patents
          </motion.p>
        </div>

        {/* Patent Stats Cards - Professional */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16"
        >
          {[
            { label: "Total Patents", value: patents.length, icon: FileText },
            { label: "Approved", value: patents.filter(p => p.status === 'Approved').length, icon: Shield },
            { label: "Pending", value: patents.filter(p => p.status === 'Pending').length, icon: Calendar },
            { label: "Categories", value: new Set(patents.map(p => p.category)).size, icon: User },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.03, y: -3 }}
              className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-5 text-center border border-gray-700 hover:border-purple-500/40 transition-all"
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patent Grid - Clean & Professional */}
        <div className="grid lg:grid-cols-2 gap-8">
          {patents.map((patent, idx) => (
            <motion.div
              key={patent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 shadow-lg"
            >
              {/* Image Banner */}
              <div 
                className="relative h-52 bg-black/60 cursor-pointer overflow-hidden"
                onClick={() => setModalImage(patent.img)}
              >
                <img
                  src={patent.img}
                  alt={patent.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    <Eye className="w-4 h-4" /> Click to enlarge
                  </span>
                </div>
                {/* Status Pill */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
                    patent.status === 'Approved' 
                      ? 'bg-green-500/90 text-white'
                      : 'bg-yellow-500/90 text-black'
                  }`}>
                    {patent.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {patent.type}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {patent.category}
                  </span>
                </div>

                <h4 className="font-bold text-xl text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition">
                  {patent.title}
                </h4>

                <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    <span className="font-mono text-xs">{patent.appNo}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-xs">{patent.filingDate}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {patent.description}
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPatent(patent)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" /> Details
                  </button>
                  <button
                    onClick={patent.onView}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition text-sm font-medium flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Docs
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Image Modal */}
      {modalImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={modalImage}
            alt="Full view"
            className="max-h-[85vh] max-w-[90vw] rounded-xl shadow-2xl border border-purple-500/30 object-contain"
          />
          <button className="absolute top-5 right-5 bg-black/50 p-2 rounded-full" onClick={() => setModalImage(null)}>
            <X className="w-6 h-6 text-white" />
          </button>
        </motion.div>
      )}

      {/* Patent Detail Modal */}
      {selectedPatent && (
        <PatentModal patent={selectedPatent} onClose={() => setSelectedPatent(null)} />
      )}
    </div>
  );
};

export default About;
