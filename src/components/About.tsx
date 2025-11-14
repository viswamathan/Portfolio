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
  Eye,
  Download,
  FileSearch,
  BarChart3,
  Clock,
  Users,
  Tag
} from "lucide-react";

const About = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [modalImage, setModalImage] = useState(null);
  const [selectedPatent, setSelectedPatent] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);

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

  // Enhanced Patent Data with Documents
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
      inventors: ["Your Name", "Co-inventor Name"],
      description: "A solar dryer integrating phase change material for enhanced thermal energy storage and efficiency improvement with innovative concave fin design for optimal heat transfer. This innovation represents a significant advancement in solar thermal technology for agricultural and industrial drying applications.",
      features: [
        "Phase Change Material (PCM) integration",
        "Concave fin heat exchanger design",
        "Modular construction for scalability",
        "IoT monitoring and control capability",
        "60% improved thermal efficiency",
        "Reduced drying time by 40%",
        "Energy storage for 24/7 operation"
      ],
      technicalSpecs: {
        efficiency: "60% improvement over conventional dryers",
        temperature: "45-75°C operating range",
        capacity: "50kg batch processing",
        material: "Food-grade stainless steel AISI 304",
        "energy storage": "8-10 hours thermal retention",
        "drying time": "4-6 hours for most agricultural products"
      },
      documents: [
        {
          name: "Patent Application",
          type: "PDF",
          size: "2.4 MB",
          url: "/patent-documents/solar-dryer-application.pdf",
          description: "Complete patent application with claims and abstract"
        },
        {
          name: "Technical Report",
          type: "PDF",
          size: "3.1 MB",
          url: "/patent-documents/solar-dryer-technical-report.pdf",
          description: "Detailed technical analysis and performance data"
        },
        {
          name: "CAD Designs",
          type: "ZIP",
          size: "5.2 MB",
          url: "/patent-documents/solar-dryer-cad.zip",
          description: "3D models and engineering drawings"
        },
        {
          name: "Test Results",
          type: "PDF",
          size: "1.8 MB",
          url: "/patent-documents/solar-dryer-tests.pdf",
          description: "Experimental data and validation results"
        }
      ],
      milestones: [
        { date: "2023-09-01", event: "Concept Development" },
        { date: "2023-11-15", event: "Prototype Testing" },
        { date: "2024-01-20", event: "Patent Research" },
        { date: "2024-03-15", event: "Application Filed" }
      ]
    },
    {
      id: 2,
      img: "Multi Purpose Knife.png",
      title: "Multi Purpose Kitchen Knife with Safety Features",
      appNo: "2024112346",
      status: "Approved",
      type: "Design Patent",
      category: "Kitchen Tools",
      filingDate: "2024-01-10",
      inventors: ["Your Name"],
      description: "Innovative multi-functional knife for cutting, peeling, and slicing, enhancing convenience and efficiency in the kitchen with ergonomic design and advanced safety features. Designed for both professional and home use.",
      features: [
        "7-in-1 multifunctional design",
        "Ergonomic non-slip handle",
        "Safety locking mechanism",
        "Dishwasher safe construction",
        "Food-grade certified materials",
        "Integrated measuring scales",
        "Magnetic storage capability"
      ],
      technicalSpecs: {
        material: "420 Stainless Steel with ceramic coating",
        weight: "150g ± 5g",
        dimensions: "18cm blade, 12cm handle",
        features: "Integrated peeler, slicer, chopper, measurer",
        "safety standards": "ISO 8442, FDA compliant",
        "blade hardness": "55-57 HRC"
      },
      documents: [
        {
          name: "Design Patent",
          type: "PDF",
          size: "1.8 MB",
          url: "/patent-documents/multi-knife-patent.pdf",
          description: "Granted design patent certificate"
        },
        {
          name: "Product Specifications",
          type: "PDF",
          size: "2.1 MB",
          url: "/patent-documents/multi-knife-specs.pdf",
          description: "Detailed product specifications and features"
        },
        {
          name: "Manufacturing Drawings",
          type: "DWG",
          size: "3.5 MB",
          url: "/patent-documents/multi-knife-drawings.dwg",
          description: "Technical manufacturing drawings"
        },
        {
          name: "User Testing Report",
          type: "PDF",
          size: "1.2 MB",
          url: "/patent-documents/multi-knife-testing.pdf",
          description: "User experience and safety testing results"
        }
      ],
      milestones: [
        { date: "2023-07-10", event: "Initial Concept" },
        { date: "2023-09-25", event: "Prototype Development" },
        { date: "2023-11-30", event: "User Testing" },
        { date: "2024-01-10", event: "Patent Filed" },
        { date: "2024-06-15", event: "Patent Approved" }
      ]
    }
  ];

  const DocumentModal = ({ document, onClose }) => (
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
        className="bg-gray-900 rounded-2xl max-w-2xl w-full border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{document.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  {document.type}
                </span>
                <span className="flex items-center gap-1">
                  <BarChart3 className="w-4 h-4" />
                  {document.size}
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
          <p className="text-gray-300 mb-6">{document.description}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.open(document.url, '_blank')}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <FileSearch className="w-5 h-5" />
              View Document
            </button>
            <button
              onClick={() => {
                // Simulate download
                const link = document.createElement('a');
                link.href = document.url;
                link.download = document.name;
                link.click();
              }}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

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
        className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-purple-500/30 sticky top-0 z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">{patent.title}</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {patent.type}
                </span>
                <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${
                  patent.status === 'Approved' 
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : patent.status === 'Pending'
                    ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                    : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                }`}>
                  {patent.status}
                </span>
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {patent.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors ml-4"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Basic Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Image Section */}
              <div className="bg-black rounded-xl p-4 border border-gray-700">
                <img
                  src={patent.img}
                  alt={patent.title}
                  className="w-full h-64 object-contain rounded-lg cursor-pointer"
                  onClick={() => setModalImage(patent.img)}
                />
                <button
                  onClick={() => setModalImage(patent.img)}
                  className="w-full mt-3 bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Enlarge Image
                </button>
              </div>

              {/* Quick Info */}
              <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Patent Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Tag className="w-4 h-4" />
                      Application No:
                    </span>
                    <span className="text-white font-mono text-sm">{patent.appNo}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Filing Date:
                    </span>
                    <span className="text-white">{patent.filingDate}</span>
                  </div>
                  <div className="flex justify-between items-start py-2">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Inventors:
                    </span>
                    <span className="text-white text-right text-sm">{patent.inventors.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Description</h4>
                <p className="text-gray-300 leading-relaxed">{patent.description}</p>
              </div>

              {/* Features & Specs Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Key Features */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Key Features</h4>
                  <div className="space-y-3">
                    {patent.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                  <h4 className="text-lg font-semibold text-purple-300 mb-3">Technical Specifications</h4>
                  <div className="space-y-3">
                    {Object.entries(patent.technicalSpecs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center py-1 border-b border-gray-700/50">
                        <span className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="text-white text-sm text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Patent Documents & Reports
                </h4>
                <div className="space-y-3">
                  {patent.documents.map((doc, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-purple-500/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-purple-400" />
                        <div>
                          <h5 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {doc.name}
                          </h5>
                          <p className="text-gray-400 text-sm">{doc.description}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">{doc.type}</span>
                            <span className="text-xs text-gray-500">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedDocument(doc)}
                          className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                          title="View Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(doc.url, '_blank')}
                          className="p-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Development Timeline */}
              <div className="bg-gray-800/30 rounded-xl p-5 border border-gray-700">
                <h4 className="text-lg font-semibold text-purple-300 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Development Timeline
                </h4>
                <div className="space-y-4">
                  {patent.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        {idx < patent.milestones.length - 1 && (
                          <div className="w-0.5 h-8 bg-purple-500/30 mt-1"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-white font-semibold">{milestone.event}</div>
                        <div className="text-gray-400 text-sm">{milestone.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl bg-gray-900">
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
                  <ChevronRight className="w-4 h-4 text-purple-400 flex-shrink-0" />
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

      {/* ---------------- Enhanced Professional Patent Section ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 py-16 px-8 bg-gradient-to-br from-gray-900/80 via-purple-900/20 to-gray-800/60 rounded-3xl shadow-2xl border border-purple-500/30 backdrop-blur-md"
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
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Transforming innovative ideas into protected intellectual property with practical applications. 
            Each patent includes comprehensive documentation, technical reports, and development insights.
          </motion.p>
        </div>

        {/* Patent Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {[
            { 
              label: "Total Patents", 
              value: patents.length.toString(), 
              icon: FileText,
              description: "Filed & Approved"
            },
            { 
              label: "Approved", 
              value: patents.filter(p => p.status === 'Approved').length.toString(), 
              icon: Shield,
              description: "Granted Patents"
            },
            { 
              label: "Pending", 
              value: patents.filter(p => p.status === 'Pending').length.toString(), 
              icon: Calendar,
              description: "Under Review"
            },
            { 
              label: "Categories", 
              value: [...new Set(patents.map(p => p.category))].length.toString(), 
              icon: Tag,
              description: "Technical Domains"
            },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center border border-purple-500/20 hover:border-purple-400/40 transition-all group"
            >
              <div className="bg-purple-500/10 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/20 transition-colors">
                <stat.icon className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 font-semibold mb-1">{stat.label}</div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Patent Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
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
              className="group relative bg-gray-900/70 border border-purple-500/20 rounded-2xl shadow-lg hover:shadow-purple-500/30 hover:border-purple-400/40 transition-all duration-300 overflow-hidden"
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
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {patent.type}
                  </span>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
                  <div className="flex items-center gap-2 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span>{patent.inventors.length} Inventor{patent.inventors.length > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {patent.description}
                </p>

                {/* Documents Preview */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Documents: {patent.documents.length} files</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {patent.documents.slice(0, 2).map((doc, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700">
                        {doc.name}
                      </span>
                    ))}
                    {patent.documents.length > 2 && (
                      <span className="px-2 py-1 text-xs bg-gray-800/50 text-gray-300 rounded border border-gray-700">
                        +{patent.documents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedPatent(patent)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <FileSearch className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => setSelectedDocument(patent.documents[0])}
                    className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    title="View Documents"
                  >
                    <Eye className="w-4 h-4" />
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
          className="text-center mt-12 pt-8 border-t border-gray-700/50"
        >
          <p className="text-gray-400 mb-6 text-lg">
            Interested in collaborating on new innovations or learning more about these patents?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-purple-500/25 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Request Technical Documentation
            </button>
            <button className="border border-purple-500 text-purple-400 hover:bg-purple-500/10 px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2">
              <Users className="w-5 h-5" />
              Discuss Collaboration
            </button>
          </div>
        </motion.div>
      </motion.div>

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

      {/* Document Modal */}
      {selectedDocument && (
        <DocumentModal 
          document={selectedDocument} 
          onClose={() => setSelectedDocument(null)} 
        />
      )}
    </div>
  );
};

export default About;
