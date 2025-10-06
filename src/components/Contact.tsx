import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Github, Linkedin, Heart, MessageCircle, Send, CheckCircle, Calendar, Globe, Award } from "lucide-react";

export default function Contact() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [availability, setAvailability] = useState('available');
  const [responseTime, setResponseTime] = useState('24 hours');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      // Set availability based on time (IST timezone)
      const hour = now.getHours();
      if (hour >= 9 && hour <= 18) {
        setAvailability('available');
        setResponseTime('2-4 hours');
      } else if (hour >= 19 && hour <= 22) {
        setAvailability('busy');
        setResponseTime('6-8 hours');
      } else {
        setAvailability('away');
        setResponseTime('12-24 hours');
      }
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getAvailabilityColor = () => {
    switch (availability) {
      case 'available': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'busy': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'away': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const quickFacts = [
    { icon: Globe, label: "Timezone", value: "IST (UTC+5:30)" },
    { icon: Calendar, label: "Best Time", value: "9 AM - 6 PM IST" },
    { icon: Award, label: "Response Rate", value: "98% within 24h" },
    { icon: CheckCircle, label: "Projects Status", value: "Available for new work" }
  ];

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

      {/* Real-time Availability Status */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mb-12"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getAvailabilityColor()}`}>
              <div className={`w-3 h-3 rounded-full ${availability === 'available' ? 'bg-green-500' : availability === 'busy' ? 'bg-yellow-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="capitalize font-medium">{availability}</span>
            </div>
            <div className="text-gray-400 text-sm">
              {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true })} IST
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">Expected response time: <span className="text-purple-400 font-medium">{responseTime}</span></p>
          </div>
        </div>
      </motion.div>

      {/* Quick Facts */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {quickFacts.map((fact, index) => {
          const Icon = fact.icon;
          return (
            <div key={index} className="bg-gray-800/30 p-4 rounded-xl text-center border border-gray-700/50">
              <Icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
              <div className="text-xs text-gray-400 mb-1">{fact.label}</div>
              <div className="text-sm font-semibold text-white">{fact.value}</div>
            </div>
          );
        })}
      </motion.div>

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
          
          {/* Form Footer */}
          <div className="mt-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <div className="flex items-center gap-2 text-purple-400 text-sm">
              <Send className="w-4 h-4" />
              <span>Your message will be received instantly</span>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
              <CheckCircle className="w-4 h-4" />
              <span>I personally respond to every inquiry</span>
            </div>
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
                  <h4 className="font-semibold text-white mb-1">Current Response Time</h4>
                  <p className="text-gray-300 text-sm">{responseTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-500">Connect With Me</h3>
            
            {/* Social Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-purple-400">50+</div>
                <div className="text-xs text-gray-400">GitHub Commits</div>
              </div>
              <div className="text-center p-3 bg-gray-700/30 rounded-lg">
                <div className="text-lg font-bold text-blue-400">200+</div>
                <div className="text-xs text-gray-400">LinkedIn Connections</div>
              </div>
            </div>
            
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
          
          {/* Collaboration Preferences */}
          <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-500">Collaboration Interests</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Mechanical Design Projects</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">FEA/CFD Analysis Work</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Engineering Automation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Research Collaborations</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm">Internship Opportunities</span>
              </div>
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