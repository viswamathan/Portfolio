import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Heart, MessageCircle } from "lucide-react";

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      className="container mx-auto px-6 py-20"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-center"
      >
        Get in Touch
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-center text-gray-400 text-base sm:text-lg mb-12 max-w-2xl mx-auto"
      >
        Ready to collaborate on your next engineering project? Let's discuss how we can bring your ideas to life with innovative mechanical design solutions.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Google Form Embed */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-purple-500">Send Message</h3>
          </div>

          <div className="w-full h-[600px]">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLScJ4v4PwRRMO3Jg2RIt_tCk2h3jAcuiAksGiLtxmql4AN2hYQ/viewform?embedded=true"
              width="100%"
              height="100%"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="rounded-lg"
            >
              Loading…
            </iframe>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div variants={itemVariants} className="space-y-8">
          {/* Contact Details */}
          <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-500">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>viswamathanagopal@gmail.com</p>
                    <p>viswamathan2k4@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Phone</h4>
                  <p className="text-gray-300 text-sm">+91 63699 05438</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Location</h4>
                  <p className="text-gray-300 text-sm">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Response Time</h4>
                  <p className="text-gray-300 text-sm">Usually within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-500">Connect With Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/viswamathan"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-700/50 p-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex-1 text-center border border-gray-600/50 hover:border-purple-500/50"
              >
                <Github className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</p>
              </a>

              <a
                href="https://www.linkedin.com/in/viswa-m-91b544258/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-700/50 p-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex-1 text-center border border-gray-600/50 hover:border-purple-500/50"
              >
                <Linkedin className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</p>
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Copyright Section */}
      <motion.div
        variants={itemVariants}
        className="mt-20 pt-8 border-t border-gray-700/50"
      >
        <div className="text-center space-y-4">
          <motion.div className="flex items-center justify-center gap-2 text-gray-400" whileHover={{ scale: 1.05 }}>
            <span>Made with</span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by Viswa M</span>
          </motion.div>

          <div className="text-sm text-gray-500 space-y-2">
            <p>© {new Date().getFullYear()} Viswa M. All rights reserved.</p>
            <p>Mechanical Design Engineer | FEA & CFD Specialist | Innovation Enthusiast</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span>Built with React & Framer Motion</span>
              <span>•</span>
              <span>Designed for Excellence</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
