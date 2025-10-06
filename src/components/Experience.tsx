import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Building, Award, FileText, Briefcase, Eye, X } from 'lucide-react';

const Experience = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNIOTCertificate = () => {
    window.open('/NIOT INTERNSHIP CERTIFICATE.png', '_blank');
  };

  const handleNIOTReport = () => {
    window.open('/INTERNSHIP REPORT.pdf', '_blank');
  };

  const handleUpcomingCertificate = () => {
    window.open('/SAF CERTIFICATE.pdf', '_blank');
  };

  const handleUpcomingReport = () => {
    window.open('/SAF INTERNSHIP REPORT.pdf', '_blank');
  };

  const experiences = [
    {
      title: "Student Intern",
      company: "National Institute Of Ocean Technology",
      location: "Chennai, Tamil Nadu",
      duration: "June 2024 - July 2024",
      type: "Research Internship",
      status: "Completed",
      logo: "/NIOT_LOGO.png",
      images: ["/NIOT IMAGE 1.jpg", "/NIOT IMAGE 2.jpg"],
      description: "Specialized training in marine energy systems and advanced simulation techniques with focus on OTEC & LTDD systems.",
      responsibilities: [
        "Trained in ANSYS Workbench with real-time simulation of marine energy components",
        "Analyzed OTEC & LTDD beam structures for strength and efficiency optimization",
        "Optimized material performance through comprehensive simulation and research methodologies",
        "Conducted structural analysis of marine components under various load conditions"
      ],
      skills: ["ANSYS Workbench", "FEA", "Marine Engineering", "Structural Analysis", "Research Methodology", "OTEC Systems"],
      onCertificate: handleNIOTCertificate,
      onReport: handleNIOTReport,
    },
    {
      title: "Design Engineer Intern",
      company: "Super Auto Forge",
      location: "Coimbatore, Tamil Nadu",
      duration: "May 2025 - July 2025",
      type: "Industrial Internship",
      status: "Upcoming",
      logo: "/SUPERAUTOFORGE_LOGO.png",
      images: ["/SAF 1.jpg", "/SAF 2.jpg"],
      description: "Hands-on experience in automotive forging processes and manufacturing optimization with advanced CAD modeling.",
      responsibilities: [
        "Assisted in Forging Stage Design & advanced CAD Modeling techniques",
        "Analyzed Material Flow & Defect Prediction via sophisticated simulation tools",
        "Optimized Process Parameters & documented comprehensive process sheets",
        "Developed standardized manufacturing procedures for improved efficiency"
      ],
      skills: ["CAD Design", "Forging Processes", "Material Flow Analysis", "Process Optimization", "Manufacturing", "Quality Control"],
      onCertificate: handleUpcomingCertificate,
      onReport: handleUpcomingReport,
    }
  ];

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-4">
          Professional <span className="text-purple-500">Experience</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Hands-on experience in marine engineering and automotive manufacturing, 
          developing expertise in advanced simulation and design optimization.
        </p>
      </motion.div>

      {/* Experience Cards */}
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 p-8 border-b border-gray-700/50">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left: Company Info */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/50 bg-gray-800">
                    <img
                      src={exp.logo}
                      alt={`${exp.company} Logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                    <h4 className="text-xl text-purple-400 font-semibold mb-3">{exp.company}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        <span>{exp.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-purple-500" />
                        <span>{exp.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Status & Actions */}
                <div className="flex flex-col items-end gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    exp.status === 'Completed' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                      : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {exp.status}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={exp.onCertificate}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <Award className="w-4 h-4" />
                      Certificate
                    </button>
                    <button
                      onClick={exp.onReport}
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <p className="text-gray-300 text-lg leading-relaxed">{exp.description}</p>
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Responsibilities */}
                <div className="lg:col-span-2">
                  <h5 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-500" />
                    Key Responsibilities
                  </h5>
                  <div className="space-y-3">
                    {exp.responsibilities.map((item, idx) => (
                      <div key={idx} className="flex gap-3 p-4 bg-gray-700/30 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{item}</p>
                      </div>
                    ))}
                  </div>

                  {/* Skills Gained */}
                  <div className="mt-6">
                    <h5 className="text-lg font-bold text-white mb-4">Skills & Technologies</h5>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <h5 className="text-lg font-bold text-white mb-4">Experience Gallery</h5>
                  {exp.images.map((image, idx) => (
                    <div
                      key={idx}
                      className="relative group overflow-hidden rounded-xl border border-purple-500/30 bg-black"
                    >
                      <img 
                        src={image}
                        alt={`${exp.company} Experience ${idx + 1}`}
                        className="w-full h-48 object-contain rounded-lg bg-black cursor-pointer"
                        onClick={() => setSelectedImage(image)}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setSelectedImage(image)}
                          className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Summary */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 border border-purple-500/20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-center text-purple-400 mb-8">Experience Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-400">2+</div>
            <div className="text-gray-300">Months of Internship</div>
            <div className="text-sm text-gray-400">Hands-on Industry Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-400">12+</div>
            <div className="text-gray-300">Technical Skills Gained</div>
            <div className="text-sm text-gray-400">Advanced Engineering Tools</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-purple-400">100%</div>
            <div className="text-gray-300">Project Completion Rate</div>
            <div className="text-sm text-gray-400">Successful Deliverables</div>
          </div>
        </div>
      </motion.div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img 
              src={selectedImage} 
              alt="Full View" 
              className="max-h-[90vh] w-auto rounded-lg shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-800/80 p-3 rounded-full hover:bg-gray-700 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;