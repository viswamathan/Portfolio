import React from 'react';
import { motion } from 'framer-motion';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Briefcase, Award, FileText, Star } from 'lucide-react';

const Experience = () => {
  const handleNIOTCertificate = () => {
    window.open('/NIOT INTERNSHIP CERTIFICATE.png', '_blank');
  };

  const handleNIOTReport = () => {
    window.open('/INTERNSHIP REPORT.pdf', '_blank');
  };

  const handleUpcomingCertificate = () => {
    window.open('/UPCOMING_INTERNSHIP_CERTIFICATE.pdf', '_blank');
  };

  const handleUpcomingReport = () => {
    window.open('/UPCOMING_INTERNSHIP_REPORT.pdf', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Professional <span className="text-purple-500">Experience</span>
      </motion.h2>

      <VerticalTimeline lineColor="#6b21a8">
                {/* NIOT Internship */}
        <VerticalTimelineElement
          className="vertical-timeline-element hover:scale-105 transition-transform duration-300"
          contentStyle={{
            background: 'rgba(31, 41, 55, 0.5)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            fontSize: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
          date="June 2024 - July 2024"
          iconStyle={{ background: '#7c3aed', color: '#fff' }}
          icon={<Briefcase />}
        >
          <div className="relative flex flex-col md:flex-row">
            {/* Left Side: Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Student Intern</h3>
              <h4 className="text-purple-400 mb-3">National Institute Of Ocean Technology</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Trained in ANSYS Workbench with real-time simulation of marine energy components</li>
                <li>• Analyzed OTEC & LTDD beam structures for strength and efficiency</li>
                <li>• Optimized material performance through simulation and research</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleNIOTCertificate}
                  className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </button>
                <button
                  onClick={handleNIOTReport}
                  className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>

            {/* Right Side: Photos */}
            <div className="relative flex flex-col items-end mt-4 md:mt-0 md:ml-6">
              <img
                src="/NIOT_LOGO.png"
                alt="NIOT Logo"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md mb-4"
              />
              <div className="flex flex-col gap-3">
                <img 
                  src="/NIOT IMAGE 1.jpg" 
                  alt="Internship Photo 1" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
                <img 
                  src="/NIOT IMAGE 2.jpg" 
                  alt="Internship Photo 2" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          </div>
        </VerticalTimelineElement>

        {/* Upcoming Internship */}
        <VerticalTimelineElement
          className="vertical-timeline-element hover:scale-105 transition-transform duration-300"
          contentStyle={{
            background: 'rgba(31, 41, 55, 0.5)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
            fontSize: '1rem',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          contentArrowStyle={{ borderRight: '7px solid rgba(31, 41, 55, 0.5)' }}
          date="May 2025 - July 2025"
          iconStyle={{ background: '#7c3aed', color: '#fff' }}
          icon={<Briefcase />}
        >
          <div className="relative flex flex-col md:flex-row">
            {/* Left Side: Details */}
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2">Design Engineer Intern</h3>
              <h4 className="text-purple-400 mb-3">Super Auto Forge</h4>
              <ul className="space-y-1 text-gray-300">
                <li>• Expected to work on advanced thermal energy systems</li>
                <li>• Role will involve CFD/FEA analysis and optimization</li>
                <li>• Focus on sustainable energy solutions</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleUpcomingCertificate}
                  className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>Certificate</span>
                </button>
                <button
                  onClick={handleUpcomingReport}
                  className="flex items-center gap-2 bg-purple-500 text-white px-3 py-1.5 rounded hover:bg-purple-600 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>

            {/* Right Side: Photos */}
            <div className="relative flex flex-col items-end mt-4 md:mt-0 md:ml-6">
              <img
                src="/UPCOMING_LOGO.png"
                alt="Upcoming Internship Logo"
                className="w-12 h-12 rounded-full border-2 border-white shadow-md mb-4"
              />
              <div className="flex flex-col gap-3">
                <img 
                  src="/.jpg" 
                  alt="Upcoming Internship Photo 1" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
                <img 
                  src="/.jpg" 
                  alt="Upcoming Internship Photo 2" 
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
                />
              </div>
            </div>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default Experience;