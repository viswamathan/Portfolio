import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add form submission logic here (e.g., emailjs or API call)
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 3000); // Hide message after 3 seconds
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold mb-12 text-center"
      >
        Get in <span className="text-purple-500">Touch</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-800/50 p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-semibold mb-6 text-purple-500">Contact Form</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-green-500 text-sm mb-4"
              >
                Message sent successfully!
              </motion.div>
            )}
            <div>
              <label className="block text-sm mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-400"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-400"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 rounded px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none hover:ring-2 hover:ring-purple-400"
                placeholder="Your Message"
                rows={5}
              />
            </div>
            <motion.button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-500">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-purple-500" />
                <span>viswamathanagopal@gmail.com</span>
                <span>,viswamathan2k4@gmail.com</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-purple-500" />
                <span>+91 63699 05438</span>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-purple-500" />
                <span>Coimbatore, India</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-500">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors hover:ring-2 hover:ring-purple-400"
              >
                <Github className="w-6 h-6 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/viswa-m-91b544258/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 transition-colors hover:ring-2 hover:ring-purple-400"
              >
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 text-purple-500">Location</h3>
            <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
              Map Placeholder
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}