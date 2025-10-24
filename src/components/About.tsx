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
  const [activeTab, setActiveTab] = useState("summary");
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
    scale: 1.03,
    transition: { type: "spring", stiffness: 300 },
  };

  // Enhanced Patent Data
  const patents = [
    {
      id: 1,
      img: "SOLAR DRYER MODAL.jpeg",
      title: "Modified Solar Dryer Integrated with Thermal Energy Storage with Concave fins",
      appNo: "202541021927",
      status: "Pending",
      type: "Utility Patent",
      category: "Renewable Energy",
      filingDate: "2024-03-15",
      inventors: ["Viswa M", "Co-inventor Name"],
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
      title: "Multi Purpose Knife",
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
        {/* Header */}
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
                    : patent.status === 'Pending'
                    ? 'bg-yellow-500/20 text-yellow-300'
                    : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {patent.status}
                </span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-300">
                  {patent.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="bg-black rounded-xl p-4 border border-gray-700">
                <img
                  src={patent.img}
                  alt={patent.title}
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
              <button
                onClick={patent.onView}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-5 h-5" />
                View Patent Documents
              </button>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Patent Information</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Application No:</span>
                    <span className="text-white font-mono">{patent.appNo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400">Filing Date:</span>
                    <span className="text-white">{patent.filingDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
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
                      <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
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

          {/* Description */}
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <h4 className="text-lg font-semibold text-purple-300 mb-2">Description</h4>
            <p className="text-gray-300 leading-relaxed">{patent.description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Exact same background as Hero */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
        {/* Same subtle animated background elements as Hero */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 py-20 max-w-7xl">
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

          {/* Intro Section */}
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

          {/* Two-column layout */}
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
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Tool className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Professional Summary</h3>
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
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Technical Focus</h3>
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
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Microscope className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Research Interests</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { title: "Renewable Energy Systems", desc: "Solar thermal, energy storage, and sustainable design" },
                    { title: "Advanced Materials", desc: "Composites, failure analysis, lightweight structures" },
                    { title: "AI in Engineering", desc: "Predictive maintenance, ML-driven optimization" },
                    { title: "Thermal Management", desc: "Heat transfer, cooling systems, HVAC design" },
                  ].map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      whileHover={{ x: 10 }} 
                      className="flex items-start gap-3"
                    >
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
              {/* Education */}
              <motion.div 
                whileHover={cardHover} 
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Education</h3>
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
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Award className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Key Achievements</h3>
                </div>
                <div className="space-y-3">
                  {[
                    "Certified SolidWorks Associate (CSWA)",
                    "NIOT Research Internship Completion",
                    "15+ Engineering Projects Completed",
                    "Advanced FEA & CFD Specialization",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Current Focus Areas */}
              <motion.div 
                whileHover={cardHover} 
                className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:shadow-purple-500/30 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Briefcase className="text-purple-400 w-6 h-6" />
                  <h3 className="text-xl font-semibold text-white">Current Focus Areas</h3>
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

          {/* ---------------- Enhanced Patent Section ---------------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-24 py-16 px-8 bg-gray-900/40 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-500/30"
          >
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 drop-shadow-md"
              >
                Patents & Innovations
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg max-w-2xl mx-auto"
              >
                Transforming innovative ideas into protected intellectual property with practical applications
              </motion.p>
            </div>

            {/* Patent Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
            >
              {[
                { label: "Total Patents", value: patents.length.toString(), icon: FileText },
                { label: "Approved", value: patents.filter(p => p.status === 'Approved').length.toString(), icon: Shield },
                { label: "Pending", value: patents.filter(p => p.status === 'Pending').length.toString(), icon: Calendar },
                { label: "Categories", value: [...new Set(patents.map(p => p.category))].length.toString(), icon: User },
              ].map((stat, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-purple-500/20"
                >
                  <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Patent Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {patents.map((patent, idx) => (
                <motion.div
                  key={patent.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group relative bg-gray-800/30 backdrop-blur-sm border border-purple-500/20 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:border-purple-400/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      patent.status === 'Approved' 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                        : patent.status === 'Pending'
                        ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {patent.status}
                    </span>
                  </div>

                  {/* Image Container */}
                  <div 
                    className="relative w-full h-48 bg-black cursor-pointer overflow-hidden"
                    onClick={() => setModalImage(patent.img)}
                  >
                    <img
                      src={patent.img}
                      alt={patent.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300">
                        {patent.type}
                      </span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300">
                        {patent.category}
                      </span>
                    </div>

                    <h4 className="font-semibold text-white text-lg mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {patent.title}
                    </h4>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-400">
                        <FileText className="w-4 h-4" />
                        <span className="font-mono">{patent.appNo}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span>Filed: {patent.filingDate}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {patent.description}
                    </p>

                    {/* Features Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {patent.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded">
                            {feature}
                          </span>
                        ))}
                        {patent.features.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded">
                            +{patent.features.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedPatent(patent)}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                      <button
                        onClick={patent.onView}
                        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                        title="View Documents"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <p className="text-gray-400 mb-6">Interested in collaborating on new innovations?</p>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/25">
                Discuss Innovation
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4"
          onClick={() => setModalImage(null)}
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={modalImage}
            alt="Patent View"
            className="max-h-[90%] max-w-[90%] rounded-2xl shadow-2xl border border-purple-500/30 object-contain"
          />
        </motion.div>
      )}

      {/* Patent Detail Modal */}
      {selectedPatent && (
        <PatentModal 
          patent={selectedPatent} 
          onClose={() => setSelectedPatent(null)} 
        />
      )}
    </div>
  );
};

export default About;
