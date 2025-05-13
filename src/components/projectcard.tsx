import React from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image1: string;
  image2: string;
  report: string;
  problem: string;
  solution: string;
  impact: string;
  model?: string;
}

export default function ProjectCard({ title, description, image1, image2, report, problem, solution, impact, model }: ProjectCardProps) {
  return (
    <div className="relative flex flex-col md:flex-row bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Left Side: Details */}
      <div className="flex-1 space-y-4">
        <h3 className="text-lg font-bold text-purple-400">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm">
          <li>
            <strong>Problem:</strong> {problem}
          </li>
          <li>
            <strong>Solution:</strong> {solution}
          </li>
          <li>
            <strong>Impact:</strong> {impact}
          </li>
        </ul>
        <div className="mt-4 flex gap-3">
          <a
            href={report}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            View Report
          </a>
          {model && (
            <a
              href={`/modelviewer?model=${encodeURIComponent(model)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              View Model
            </a>
          )}
        </div>
      </div>

      {/* Right Side: Images */}
      <div className="flex-1 grid grid-rows-2 gap-2 mt-4 md:mt-0 md:ml-6">
        <img
          src={image1}
          alt={`${title} Image 1`}
          className="w-full h-40 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
        />
        <img
          src={image2}
          alt={`${title} Image 2`}
          className="w-full h-40 object-cover rounded-lg border-2 border-purple-500 hover:shadow-lg transition-shadow"
        />
      </div>
    </div>
  );
}
