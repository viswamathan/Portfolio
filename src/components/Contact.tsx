import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Heart, MessageCircle, User, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear status when user starts typing
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await submitContactForm({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });

      setSubmitStatus({
        type: 'success',
        message: result.message || 'Thank you for your message! I\'ll get back to you soon.'
      });
      
      // Reset form
      setFormData({ name: "", email: "", message: "" });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
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
        {/* Contact Form */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/50 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-sm border border-gray-700/50"
        >
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl sm:text-2xl font-bold text-purple-500">Send Message</h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Messages */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`p-4 rounded-lg text-sm flex items-center gap-2 ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                    : 'bg-red-500/20 border border-red-500/50 text-red-400'
                }`}
              >
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{submitStatus.message}</span>
              </motion.div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your email address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:bg-gray-700/70 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell me about your project or inquiry..."
                rows={5}
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          variants={itemVariants}
          className="space-y-8"
        >
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
              <motion.a
                href="https://github.com/viswamathan"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-700/50 p-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex-1 text-center border border-gray-600/50 hover:border-purple-500/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</p>
              </motion.a>
              
              <motion.a
                href="https://www.linkedin.com/in/viswa-m-91b544258/"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gray-700/50 p-4 rounded-xl hover:bg-gray-600/50 transition-all duration-300 flex-1 text-center border border-gray-600/50 hover:border-purple-500/50"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-8 h-8 text-white group-hover:text-purple-400 transition-colors mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</p>
              </motion.a>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gray-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm border border-gray-700/50">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-purple-500">Why Work With Me?</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">2+</div>
                <div className="text-xs text-gray-300">Years Experience</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">5+</div>
                <div className="text-xs text-gray-300">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">24h</div>
                <div className="text-xs text-gray-300">Response Time</div>
              </div>
              <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
                <div className="text-xs text-gray-300">Client Satisfaction</div>
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
          <motion.div
            className="flex items-center justify-center gap-2 text-gray-400"
            whileHover={{ scale: 1.05 }}
          >
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>by Viswa M</span>
          </motion.div>
          
          <div className="text-sm text-gray-500 space-y-2">
            <p>© {new Date().getFullYear()} Viswa M. All rights reserved.</p>
            <p>Mechanical Design Engineer | FEA & CFD Specialist | Innovation Enthusiast</p>
            <div className="flex items-center justify-center gap-4 text-xs">
              <span>Built with React, TypeScript & Framer Motion</span>
              <span>•</span>
              <span>Designed for Excellence</span>
            </div>
          </div>

          <motion.div
            className="flex items-center justify-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.a
              href="mailto:viswamathanagopal@gmail.com"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.1 }}
            >
              Email
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="https://www.linkedin.com/in/viswa-m-91b544258/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.1 }}
            >
              LinkedIn
            </motion.a>
            <span className="text-gray-600">•</span>
            <motion.a
              href="https://github.com/viswamathan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              whileHover={{ scale: 1.1 }}
            >
              GitHub
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}