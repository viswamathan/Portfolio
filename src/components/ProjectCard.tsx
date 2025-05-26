import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Eye, Code } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: string[];
  image1: string;
  image2: string;
  report: string;
  simulations?: string[];
  onViewSimulation?: (simulations: string[]) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  problem,
  solution,
  impact,
  technologies,
  image1,
  image2,
  report,
  simulations,
  onViewSimulation
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700 hover:border-purple-500 transition-all duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <h3 className="text-2xl font-bold text-purple-400 mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>

        {/* Details Grid */}
        <div className="grid gap-4 mb-6">
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-300">Problem:</h4>
            <p className="text-gray-300 text-sm">{problem}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-300">Solution:</h4>
            <p className="text-gray-300 text-sm">{solution}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-purple-300">Impact:</h4>
            <p className="text-gray-300 text-sm">{impact}</p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="font-semibold text-purple-300 mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={image1}
            alt={`${title} - View 1`}
            className="w-full h-48 object-cover rounded-lg border-2 border-purple-500/30 hover:border-purple-500"
          />
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={image2}
            alt={`${title} - View 2`}
            className="w-full h-48 object-cover rounded-lg border-2 border-purple-500/30 hover:border-purple-500"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={report}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>View Report</span>
          </motion.a>
          
          {simulations && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewSimulation?.(simulations)}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>View Simulation</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;