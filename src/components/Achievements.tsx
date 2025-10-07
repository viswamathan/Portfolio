import React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, CheckCircle, ExternalLink, Download, Star, Trophy, Medal } from 'lucide-react';

const Achievements = () => {
  const certificates = [
    {
      id: 1,
      title: "Certified SolidWorks Associate (CSWA)",
      issuer: "Dassault Systèmes SolidWorks Corporation",
      date: "2024",
      description:
        "Professional certification demonstrating proficiency in SolidWorks 3D CAD software, including part modeling, assembly creation, and drawing generation.",
      image: "VISWA CSWA.png", // make sure this file is inside your public folder
      skills: [
        "3D Modeling",
        "Assembly Design",
        "Technical Drawings",
        "Part Configuration",
        "Design Validation",
      ],
      credentialId: "C-L3G7SF84B9",
      category: "Professional Certification",
      level: "Associate",
      validUntil: "Lifetime",
      highlights: [
        "Demonstrated proficiency in 3D part modeling",
        "Mastered assembly creation and constraints",
        "Skilled in creating technical drawings and annotations",
        "Validated understanding of design intent and best practices",
      ],
    },
  ];

  const achievements = [
    { icon: Trophy, title: "Academic Excellence", count: "7.50/10", description: "CGPA in Mechanical Engineering" },
    { icon: Medal, title: "Patents Filed", count: "2", description: "Innovation in mechanical design" },
    { icon: Star, title: "Certifications", count: "10+", description: "Professional and technical certifications" },
    { icon: Award, title: "Projects Completed", count: "5+", description: "Engineering and research projects" },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
          Achievements & <span className="text-purple-500">Certifications</span>
        </motion.h2>

        <motion.p variants={itemVariants} className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-3xl mx-auto">
          Professional certifications and achievements that demonstrate my expertise in mechanical engineering,
          CAD design, and continuous learning commitment.
        </motion.p>

        {/* Achievement Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-purple-400 mb-2">{achievement.count}</div>
                <h3 className="font-semibold text-white mb-1">{achievement.title}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Featured Certificate */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-400">
            Featured Certification
          </h3>

          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Certificate Image */}
                <div className="relative w-full flex items-center justify-center overflow-hidden">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto max-h-[500px] object-contain cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => window.open(cert.image, "_blank")}
                  />
                </div>

                {/* Certificate Details */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-2">{cert.title}</h4>
                      <p className="text-purple-400 font-medium">{cert.issuer}</p>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 rounded-full text-xs border bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle className="w-3 h-3 inline mr-1" />
                        Certified
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{cert.description}</p>

                  {/* Certificate Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">Issue Date</h5>
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span>{cert.date}</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">Level</h5>
                      <span className="text-gray-300">{cert.level}</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">Credential ID</h5>
                      <span className="text-gray-300 font-mono text-sm">{cert.credentialId}</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300 mb-2">Valid Until</h5>
                      <span className="text-gray-300">{cert.validUntil}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-purple-300 mb-3">Skills Validated</h5>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="mb-6">
                    <h5 className="font-semibold text-purple-300 mb-3">Key Highlights</h5>
                    <ul className="space-y-2">
                      {cert.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* View Certificate */}
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => window.open(cert.image, "_blank")}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Certificate
                    </motion.button>

                    {/* Download Certificate */}
                    <motion.button
                      className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = cert.image;
                        link.download = `${cert.title}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Certifications Preview */}
        <motion.div variants={itemVariants} className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">More Certifications</h3>
          <p className="text-gray-400 mb-6">
            View my complete certification portfolio including technical courses, 
            industry standards, and professional development achievements.
          </p>
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Certifications
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Achievements;
