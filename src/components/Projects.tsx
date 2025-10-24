import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Code,
  Layers,
  TrendingUp,
  X,
  Cog,
  Cpu,
  Github,
  Eye,
  ZoomIn,
  Play,
  FileText,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Users,
  Target,
  Award,
  Sparkles,
  Star,
  Heart,
  Download,
  Share2,
  Maximize2,
  Minimize2,
  RotateCcw,
  Terminal,
  Zap,
  BookOpen,
  FolderOpen,
  Copy,
  Check,
  Upload,
  Trash2,
} from 'lucide-react';

/* ----------------------------- Python Compiler Modal ---------------------------- */

interface PythonCompilerProps {
  isOpen: boolean;
  onClose: () => void;
  initialCode?: string;
  projectTitle?: string;
  codeDescription?: string;
}

const PythonCompiler: React.FC<PythonCompilerProps> = ({ 
  isOpen, 
  onClose, 
  initialCode = '',
  projectTitle = '',
  codeDescription = ''
}) => {
  const [compilerState, setCompilerState] = useState({
    code: initialCode || `# Welcome to the Python Compiler!
# This compiler supports all major Python libraries

print("🚀 Running ${projectTitle || 'Project'} Code")
print("This is a frontend demo - code execution simulated")`,
    output: '',
    isRunning: false,
    isFullscreen: false,
    currentFile: 'main.py',
    files: {
      'main.py': initialCode || `# Welcome to the Python Compiler!
# This compiler supports all major Python libraries

print("🚀 Running ${projectTitle || 'Project'} Code")
print("This is a frontend demo - code execution simulated")`
    }
  });

  const [copied, setCopied] = useState(false);

  const supportedLibraries = [
    { name: 'numpy', category: 'Scientific Computing', description: 'Array operations and linear algebra' },
    { name: 'pandas', category: 'Data Analysis', description: 'Data manipulation and analysis' },
    { name: 'matplotlib', category: 'Visualization', description: '2D plotting and visualization' },
    { name: 'scikit-learn', category: 'Machine Learning', description: 'ML algorithms and tools' },
    { name: 'requests', category: 'Web', description: 'HTTP requests and APIs' },
    { name: 'tensorflow', category: 'Deep Learning', description: 'Neural networks and deep learning' },
    { name: 'opencv-python', category: 'Computer Vision', description: 'Image and video processing' },
    { name: 'flask', category: 'Web Framework', description: 'Lightweight web applications' }
  ];

  const handleRunCode = async () => {
    setCompilerState(prev => ({ ...prev, isRunning: true, output: '🚀 Running code...' }));
    
    setTimeout(() => {
      const output = simulatePythonExecution(compilerState.code, projectTitle);
      setCompilerState(prev => ({ ...prev, output, isRunning: false }));
    }, 2000);
  };

  const simulatePythonExecution = (code: string, title: string): string => {
    if (code.includes('petrol') || code.includes('fuel') || code.includes('inventory')) {
      return `🏭 PETROL MANAGEMENT SYSTEM - EXECUTION RESULTS

✅ Database initialized successfully
✅ Inventory tables created
✅ Sample data populated

📊 OPERATIONS COMPLETED:
• Added 10,000L Petrol at ₹98.5/L
• Added 15,000L Diesel at ₹89.2/L
• Processed sale: 45.5L Petrol - ₹4,481.75
• Processed sale: 32.8L Diesel - ₹2,925.76
• Processed sale: 28.3L Petrol - ₹2,787.55

💰 FINANCIAL SUMMARY:
Total Revenue: ₹10,195.06
Inventory Value: ₹2,345,800.00

📈 VISUALIZATION: Sales trend chart generated
🎉 System operational - All modules working correctly

💡 This demo shows the core functionality. Full system includes:
   - Real-time inventory tracking
   - Automated reporting
   - User authentication
   - Data visualization`;
    }
    
    if (code.includes('plt.show()') || code.includes('matplotlib')) {
      return `📊 VISUALIZATION GENERATED SUCCESSFULLY!

✅ Matplotlib plot rendered
✅ Data processed correctly
✅ Chart displayed in output window

📈 Chart Details:
• Type: Line plot with markers
• Data Points: 30 days of sales data
• Features: Grid, labels, professional styling

🎉 Code executed without errors
All libraries imported successfully

Output:
🚀 Running ${title} Code
📈 Sales visualization ready!
💰 Revenue tracking operational`;
    }
    
    return `✅ CODE EXECUTION COMPLETED!

🎉 Script ran successfully
📝 Output generated
🔧 All dependencies resolved

CONSOLE OUTPUT:
🚀 Running ${title} Code
This is a frontend demo - code execution simulated

💡 Available libraries: numpy, pandas, matplotlib, scikit-learn, and more!
🔧 For real execution, connect to a Python backend service.`;
  };

  const handleSaveCode = () => {
    const blob = new Blob([compilerState.code], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = compilerState.currentFile;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(compilerState.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 ${
        compilerState.isFullscreen ? '' : 'backdrop-blur-sm'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-purple-500/20 shadow-2xl overflow-hidden ${
          compilerState.isFullscreen ? 'w-full h-full' : 'max-w-7xl w-full max-h-[95vh]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md p-6 border-b border-purple-500/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Python Compiler - {projectTitle}
                  </h3>
                  <p className="text-gray-400 text-sm">{codeDescription || 'Run and test Python code with all major libraries'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/30">
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Online</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCompilerState(prev => ({ ...prev, isFullscreen: !prev.isFullscreen }))}
                className="p-3 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl transition-all border border-blue-500/30"
              >
                {compilerState.isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-blue-400" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-400" />
                )}
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30"
              >
                <X className="w-5 h-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[calc(95vh-140px)]">
          {/* Sidebar */}
          <div className="lg:w-80 bg-gray-800/30 border-r border-purple-500/20 flex flex-col">
            {/* Project Info */}
            {codeDescription && (
              <div className="p-4 border-b border-gray-700/50">
                <h4 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Code Description
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{codeDescription}</p>
              </div>
            )}

            {/* Supported Libraries */}
            <div className="flex-1 p-4 overflow-y-auto">
              <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Supported Libraries
              </h4>
              <div className="space-y-2">
                {supportedLibraries.map((lib, index) => (
                  <motion.div
                    key={lib.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/50 hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-white font-medium text-sm">{lib.name}</span>
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        {lib.category}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">{lib.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col border-b border-gray-700/50">
              <div className="flex justify-between items-center p-4 bg-gray-800/20 border-b border-gray-700/50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-400" />
                    <span className="text-white font-medium">{compilerState.currentFile}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-green-400 text-xs">Ready</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 hover:bg-gray-700/80 rounded-lg transition-all border border-gray-600/50 text-gray-300 hover:text-white text-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/40 rounded-lg transition-all border border-green-500/30 text-green-300 hover:text-green-200 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4">
                <textarea
                  value={compilerState.code}
                  onChange={(e) => setCompilerState(prev => ({ ...prev, code: e.target.value }))}
                  className="w-full h-full bg-gray-800/50 text-gray-100 font-mono text-sm rounded-lg p-4 border border-gray-600/50 focus:border-purple-500/50 focus:outline-none resize-none scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
                  spellCheck="false"
                  placeholder="# Enter your Python code here..."
                />
              </div>
            </div>

            {/* Output Panel */}
            <div className="h-48 flex flex-col">
              <div className="flex justify-between items-center p-4 bg-gray-800/20 border-b border-gray-700/50">
                <h4 className="text-lg font-semibold text-green-400 flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Output
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRunCode}
                    disabled={compilerState.isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all text-sm font-medium shadow-lg hover:shadow-green-500/25 disabled:shadow-none"
                  >
                    {compilerState.isRunning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Running...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Run Code
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setCompilerState(prev => ({ ...prev, output: '' }))}
                    className="p-2 bg-red-600/20 hover:bg-red-600/40 rounded-lg transition-all border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="flex-1 p-4 bg-black/20 overflow-y-auto">
                <pre className="text-green-300 font-mono text-sm whitespace-pre-wrap">
                  {compilerState.output || '👆 Click "Run Code" to execute your Python script'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ----------------------------- Enhanced Modal Components ---------------------------- */

type SimulationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  simulations: string[];
  title?: string;
};

const SimulationModal: React.FC<SimulationModalProps> = ({ isOpen, onClose, simulations, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden border border-purple-500/20 shadow-2xl">
        <div className="sticky top-0 bg-gray-900/80 backdrop-blur-md p-6 flex justify-between items-center border-b border-purple-500/20">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title || 'Simulation View'}
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              {currentIndex + 1} of {simulations.length}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentIndex(prev => prev === 0 ? simulations.length - 1 : prev - 1)}
                className="p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-full transition-all border border-purple-500/30"
              >
                <ChevronLeft className="w-5 h-5 text-purple-400" />
              </button>
              <button 
                onClick={() => setCurrentIndex(prev => prev === simulations.length - 1 ? 0 : prev + 1)}
                className="p-3 bg-purple-600/20 hover:bg-purple-600/40 rounded-full transition-all border border-purple-500/30"
              >
                <ChevronRight className="w-5 h-5 text-purple-400" />
              </button>
            </div>
            <button 
              onClick={onClose} 
              className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-full transition-all border border-red-500/30 group"
            >
              <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="p-8 flex items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <img
                src={simulations[currentIndex]}
                alt={`Simulation ${currentIndex + 1}`}
                className="max-w-full max-h-[60vh] rounded-xl border-2 border-purple-500/30 shadow-2xl"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnails */}
        {simulations.length > 1 && (
          <div className="p-6 border-t border-purple-500/20 bg-gray-900/50">
            <div className="flex justify-center gap-3">
              {simulations.map((sim, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    currentIndex === index 
                      ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/25' 
                      : 'border-gray-600 hover:border-purple-400/50 hover:scale-105'
                  }`}
                >
                  <img src={sim} alt={`Thumb ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title?: string;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, image, title }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-t-2xl backdrop-blur-md border-b border-purple-500/30">
          {title && (
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {title}
            </h3>
          )}
          <button 
            onClick={onClose} 
            className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
          >
            <X className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-b-2xl p-8">
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={image} 
            alt="Project View" 
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border-2 border-purple-500/20" 
          />
        </div>
      </div>
    </motion.div>
  );
};

type ProjectGalleryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: any | null;
};

const ProjectGalleryModal: React.FC<ProjectGalleryModalProps> = ({ isOpen, onClose, project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen || !project) return null;

  const images = [project.image1, project.image2].filter(Boolean) as string[];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black/95 z-50 ${isFullscreen ? '' : 'p-4 flex items-center justify-center'}`}
      onClick={onClose}
    >
      <div
        className={`relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 shadow-2xl ${
          isFullscreen ? 'w-full h-full' : 'max-w-7xl w-full max-h-[95vh] rounded-3xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-900/40 to-pink-900/40 backdrop-blur-md p-6 border-b border-purple-500/20 z-10">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {project.title}
              </h3>
              {project.technologies && (
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string, idx: number) => (
                    <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={toggleFullscreen}
                className="p-3 bg-blue-600/20 hover:bg-blue-600/40 rounded-xl transition-all border border-blue-500/30 group"
              >
                {isFullscreen ? (
                  <Minimize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Maximize2 className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                )}
              </button>
              <button 
                onClick={onClose} 
                className="p-3 bg-red-600/20 hover:bg-red-600/40 rounded-xl transition-all border border-red-500/30 group"
              >
                <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="flex flex-col lg:flex-row h-[calc(95vh-140px)]">
          {/* Enhanced Image Viewer */}
          <div className="flex-1 flex flex-col p-6">
            <div className="flex-1 flex items-center justify-center relative bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                    </div>
                  )}
                  <img
                    src={images[currentImageIndex]}
                    alt={`${project.title} - View ${currentImageIndex + 1}`}
                    className={`max-w-full max-h-[50vh] object-contain rounded-xl shadow-2xl border-2 border-purple-500/30 transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                  
                  {/* Enhanced Navigation Arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                      >
                        <ChevronLeft className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-black/60 hover:bg-black/80 rounded-full transition-all border border-purple-500/30 group"
                      >
                        <ChevronRight className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded-full text-sm text-white border border-purple-500/30">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Enhanced Thumbnails */}
            {images.length > 1 && (
              <div className="mt-6">
                <div className="flex justify-center gap-4">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentImageIndex(index);
                        setImageLoaded(false);
                      }}
                      className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 group ${
                        currentImageIndex === index 
                          ? 'border-purple-500 scale-110 shadow-lg shadow-purple-500/25' 
                          : 'border-gray-600 hover:border-purple-400/50 hover:scale-105'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      <div className={`absolute inset-0 bg-purple-500/20 transition-opacity ${
                        currentImageIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Project Info Sidebar */}
          <div className="lg:w-96 bg-gradient-to-b from-gray-900/80 to-gray-800/80 backdrop-blur-md border-l border-purple-500/20 p-6 overflow-y-auto">
            <div className="space-y-6">
              {/* Project Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20 text-center">
                  <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2024</div>
                  <div className="text-xs text-purple-300">Completed</div>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 text-center">
                  <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{project.technologies?.length || 0}</div>
                  <div className="text-xs text-blue-300">Technologies</div>
                </div>
              </div>

              {/* Project Description */}
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Project Overview
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Enhanced Details */}
              {project.problem && (
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    Challenge
                  </h5>
                  <p className="text-gray-300 text-sm">{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20">
                  <h5 className="font-semibold text-blue-400 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                    Solution
                  </h5>
                  <p className="text-gray-300 text-sm">{project.solution}</p>
                </div>
              )}

              {project.impact && (
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <h5 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Impact
                  </h5>
                  <p className="text-gray-300 text-sm">{project.impact}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4">
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-gray-700/50 hover:bg-gray-700/80 text-white px-4 py-3 rounded-xl transition-all border border-gray-600/50"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Source Code</span>
                  </motion.a>
                )}

                {project.report && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.report}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 px-4 py-3 rounded-xl transition-all border border-purple-500/30"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Download Report</span>
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* --------------------------- Premium Project Card -------------------------- */

const PremiumProjectCard: React.FC<{
  project: any;
  onViewGallery: (project: any) => void;
  onViewImage: (image: string, title?: string) => void;
  onViewSimulation: (sims: string[], title?: string) => void;
  onRunPythonCode: (code: string, title: string, description?: string) => void;
}> = ({ project, onViewGallery, onViewImage, onViewSimulation, onRunPythonCode }) => {
  const images = [project.image1, project.image2].filter(Boolean) as string[];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col h-full"
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header with Gradient */}
      <div className="relative p-6 pb-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {project.title}
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">{project.description}</p>
          </div>
          <motion.button
            onClick={() => onViewGallery(project)}
            className="p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/40 hover:to-pink-600/40 rounded-xl transition-all duration-300 border border-purple-500/30 flex-shrink-0 ml-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomIn className="w-5 h-5 text-purple-400" />
          </motion.button>
        </div>

        {/* Tech Stack */}
        {project.technologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech: string, index: number) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 px-3 py-1 rounded-full text-xs border border-purple-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 4 && (
              <span className="bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full text-xs border border-gray-600/50">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="relative p-6 pt-0 flex-1 flex flex-col">
        {/* Feature Highlights */}
        <div className="space-y-3 mb-6 flex-1">
          {project.problem && (
            <motion.div 
              className="flex items-start gap-3 text-sm"
              whileHover={{ x: 4 }}
            >
              <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-red-400 font-medium">Challenge: </span>
                <span className="text-gray-400">{project.problem}</span>
              </div>
            </motion.div>
          )}
          
          {project.impact && (
            <motion.div 
              className="flex items-start gap-3 text-sm"
              whileHover={{ x: 4 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <span className="text-green-400 font-medium">Impact: </span>
                <span className="text-gray-400">{project.impact}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Enhanced Image Gallery */}
        {images.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Project Visuals
              </h4>
              <span className="text-gray-500 text-xs">{images.length} images</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="relative group/image rounded-xl overflow-hidden border-2 border-purple-500/30 hover:border-purple-500 cursor-pointer"
                  onClick={() => onViewImage(img, project.title)}
                >
                  <img 
                    src={img} 
                    alt={`${project.title} - View ${idx + 1}`} 
                    className="w-full h-32 object-cover transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white backdrop-blur-sm">
                      View {idx + 1}
                    </div>
                    <div className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        <div className="mt-auto">
          <div className="flex flex-wrap gap-3">
            {project.report && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.report}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-purple-500/25"
              >
                <FileText className="w-4 h-4" />
                <span>Report</span>
              </motion.a>
            )}

            {/* NEW: Run Python Code Button */}
            {project.pythonCode && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRunPythonCode(project.pythonCode, project.title, project.codeDescription)}
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-green-500/25"
              >
                <Terminal className="w-4 h-4" />
                <span>Run Code</span>
              </motion.button>
            )}

            {project.simulations && (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onViewSimulation(project.simulations, project.title)}
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-blue-500/25"
              >
                <Play className="w-4 h-4" />
                <span>Simulation</span>
              </motion.button>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-gray-500/25"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </motion.a>
            )}

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewGallery(project)}
              className="flex items-center justify-center gap-2 flex-1 min-w-[140px] bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-pink-500/25"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Gallery</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-purple-500/20 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};

/* ----------------------------- Project Data -------------------------------- */

const projectCategories = {
  mechanical: {
    icon: Cog,
    title: 'Mechanical Engineering',
    intro: 'Advanced mechanical engineering projects showcasing design optimization, structural analysis, and innovative solutions using cutting-edge simulation tools.',
    projects: [
      {
        title: 'Flat Sprocket Analysis',
        description: 'Comprehensive structural analysis and optimization of a flat sprocket using advanced FEA techniques to enhance durability and performance.',
        problem: 'Traditional sprocket designs showing premature wear and structural weaknesses under high loads in industrial applications.',
        solution: 'Implemented optimized geometry and material distribution through FEA-driven design iterations and stress analysis.',
        impact: '40% increase in durability and 25% reduction in material usage while maintaining performance standards.',
        technologies: ['SolidWorks', 'ANSYS', 'Finite Element Analysis', 'Material Science', 'Structural Optimization'],
        image1: '/images/SPROCKET STRESS.jpg',
        image2: '/images/SPROCKET DEFORM.jpg',
        report: '/reports/Structural Failure Analysis and Optimization of a Flat Sprocket Using Finite Element Analysis.pdf',
        simulations: ['/simulations/deform.gif', '/simulations/stress.gif'],
      },
      {
        title: 'Piston Head Optimization',
        description: 'Advanced thermal and structural FEA simulation of piston head to identify hotspots and optimize for durability and material efficiency.',
        problem: 'Piston head faces extreme thermal and pressure cycles causing fatigue and deformation in high-performance engines.',
        solution: 'Conducted integrated thermal-structural FEA to analyze temperature distribution and stress concentrations.',
        impact: 'Achieved 40% durability improvement and 25% material reduction through optimized design parameters.',
        technologies: ['ANSYS Mechanical', 'SolidWorks', 'Thermal Analysis', 'FEA', 'Computational Fluid Dynamics'],
        image1: '/images/PISTON 1.png',
        image2: '/images/PISTON 2.png',
        report: '/reports/Thermo-Structural Analysis of Piston Head Using ANSYS Mechanical.pdf',
        simulations: ['/simulations/head deform.gif', '/simulations/head stress.gif', '/simulations/head temparature.gif'],
      },
    ],
  },
  software: {
    icon: Code,
    title: 'Software Development',
    intro: 'Innovative software solutions and applications built with modern technologies to solve real-world problems efficiently.',
    projects: [
      {
        title: 'Petrol Management System',
        description: 'Comprehensive fuel management solution for petrol stations with real-time inventory tracking, sales monitoring, and automated reporting.',
        problem: 'Manual fuel tracking leading to inventory discrepancies, sales errors, and inefficient reporting in petrol stations.',
        solution: 'Developed an integrated management system with automated tracking, real-time analytics, and comprehensive reporting.',
        impact: 'Improved inventory accuracy by 95%, reduced manual errors by 80%, and enhanced operational efficiency.',
        technologies: ['Python', 'MySQL', 'Tkinter', 'Matplotlib', 'Pandas', 'NumPy'],
        githubUrl: 'https://github.com/viswamathan/PETROL-MANAGEMENT-PROJECT-USING-PYTHON-AND-SQL',
        image1: 'https://tse1.mm.bing.net/th/id/OIP.MiI4dSBh7VjBXlCSkD6uDwHaD5?pid=Api&P=0&h=180',
        image2: 'https://tse1.mm.bing.net/th/id/OIP.cjsy2jUvC0aT29PsC8kRRAHaEK?pid=Api&P=0&h=180',
        report: '/reports/automation-report.pdf',
        // NEW: Python Code Integration
        pythonCode: `# Petrol Management System - Core Functionality
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta
import sqlite3

class PetrolManagement:
    def __init__(self):
        self.initialize_database()
        
    def initialize_database(self):
        """Initialize SQLite database for petrol management"""
        self.conn = sqlite3.connect('petrol_station.db')
        self.cursor = self.conn.cursor()
        
        # Create tables
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS inventory (
                id INTEGER PRIMARY KEY,
                fuel_type TEXT,
                quantity_liters REAL,
                price_per_liter REAL,
                last_updated TIMESTAMP
            )
        ''')
        
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS sales (
                id INTEGER PRIMARY KEY,
                fuel_type TEXT,
                quantity_liters REAL,
                total_amount REAL,
                sale_date TIMESTAMP
            )
        ''')
        self.conn.commit()
        
    def add_fuel_stock(self, fuel_type, quantity, price):
        """Add fuel stock to inventory"""
        self.cursor.execute('''
            INSERT INTO inventory (fuel_type, quantity_liters, price_per_liter, last_updated)
            VALUES (?, ?, ?, ?)
        ''', (fuel_type, quantity, price, datetime.now()))
        self.conn.commit()
        print(f"✅ Added {quantity}L of {fuel_type} at ₹{price}/L")
        
    def sell_fuel(self, fuel_type, quantity):
        """Process fuel sale"""
        # Check inventory
        self.cursor.execute('SELECT quantity_liters, price_per_liter FROM inventory WHERE fuel_type = ?', (fuel_type,))
        result = self.cursor.fetchone()
        
        if result and result[0] >= quantity:
            remaining = result[0] - quantity
            total_amount = quantity * result[1]
            
            # Update inventory
            self.cursor.execute('UPDATE inventory SET quantity_liters = ? WHERE fuel_type = ?', (remaining, fuel_type))
            
            # Record sale
            self.cursor.execute('''
                INSERT INTO sales (fuel_type, quantity_liters, total_amount, sale_date)
                VALUES (?, ?, ?, ?)
            ''', (fuel_type, quantity, total_amount, datetime.now()))
            
            self.conn.commit()
            print(f"✅ Sold {quantity}L of {fuel_type} for ₹{total_amount:.2f}")
            return total_amount
        else:
            print(f"❌ Insufficient {fuel_type} in inventory")
            return 0
            
    def generate_sales_report(self, days=7):
        """Generate sales report for the last N days"""
        start_date = datetime.now() - timedelta(days=days)
        
        self.cursor.execute('''
            SELECT fuel_type, SUM(quantity_liters), SUM(total_amount)
            FROM sales 
            WHERE sale_date >= ?
            GROUP BY fuel_type
        ''', (start_date,))
        
        sales_data = self.cursor.fetchall()
        
        print(f"\\n📊 SALES REPORT - Last {days} Days")
        print("=" * 40)
        total_revenue = 0
        
        for fuel_type, total_liters, total_amount in sales_data:
            print(f"{fuel_type}: {total_liters:.1f}L - ₹{total_amount:.2f}")
            total_revenue += total_amount
            
        print(f"\\n💰 Total Revenue: ₹{total_revenue:.2f}")
        return sales_data
        
    def plot_sales_trend(self):
        """Plot sales trend using matplotlib"""
        self.cursor.execute('''
            SELECT DATE(sale_date), SUM(total_amount)
            FROM sales 
            GROUP BY DATE(sale_date)
            ORDER BY DATE(sale_date)
            LIMIT 30
        ''')
        
        trend_data = self.cursor.fetchall()
        
        if trend_data:
            dates = [row[0] for row in trend_data]
            amounts = [row[1] for row in trend_data]
            
            plt.figure(figsize=(12, 6))
            plt.plot(dates, amounts, marker='o', linewidth=2, markersize=6)
            plt.title('Petrol Station - Daily Sales Trend', fontsize=14, fontweight='bold')
            plt.xlabel('Date')
            plt.ylabel('Daily Revenue (₹)')
            plt.grid(True, alpha=0.3)
            plt.xticks(rotation=45)
            plt.tight_layout()
            plt.show()
            
            print("📈 Sales trend chart generated!")
        else:
            print("No sales data available for trend analysis")

# Demo the petrol management system
if __name__ == "__main__":
    print("🚀 Starting Petrol Management System Demo...")
    
    # Create management system instance
    mgmt = PetrolManagement()
    
    # Add initial stock
    mgmt.add_fuel_stock("Petrol", 10000, 98.5)
    mgmt.add_fuel_stock("Diesel", 15000, 89.2)
    
    # Simulate some sales
    mgmt.sell_fuel("Petrol", 45.5)
    mgmt.sell_fuel("Diesel", 32.8)
    mgmt.sell_fuel("Petrol", 28.3)
    
    # Generate reports
    mgmt.generate_sales_report(7)
    
    # Show sales trend (if enough data)
    print("\\n📈 Generating sales trend visualization...")
    mgmt.plot_sales_trend()
    
    print("\\n🎉 Petrol Management System demo completed!")`,
        codeDescription: 'Core functionality of the Petrol Management System including inventory management, sales processing, and reporting features with data visualization.'
      },
    ],
  },
  hybrid: {
    icon: Cpu,
    title: 'Hybrid Systems',
    intro: 'Advanced systems combining mechanical engineering with smart automation and control systems for innovative solutions.',
    projects: [
      {
        title: 'Modified Solar Dryer with Thermal Storage',
        description: 'Innovative solar dryer prototype enhanced with copper fins and PCM for efficient, continuous food dehydration with thermal energy storage.',
        problem: 'Traditional solar dryers suffer from inconsistent performance, heat loss, and dependency on direct sunlight.',
        solution: 'Integrated copper fins for enhanced heat transfer and paraffin wax PCM for continuous thermal energy storage.',
        impact: '30-40% faster drying, 11°C higher temperature maintenance, and consistent performance in varying weather.',
        technologies: ['SolidWorks', 'Copper Fins', 'Phase Change Material', 'Thermal Analysis', 'Forced Convection'],
        image1: 'SOLAR DRYER PROTOTYPE.jpeg',
        image2: 'SOLAR DRYER MODAL.jpeg',
        report: '/reports/Modified Solar Dryer Report.pdf',
      },
    ],
  },
};

/* ------------------------------- Main Page --------------------------------- */

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'mechanical' | 'software' | 'hybrid'>('mechanical');
  const [modalSimulations, setModalSimulations] = useState<{simulations: string[], title?: string} | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ image: string; title?: string } | null>(null);
  const [galleryProject, setGalleryProject] = useState<any | null>(null);
  const [pythonCompiler, setPythonCompiler] = useState<{
    isOpen: boolean;
    code: string;
    title: string;
    description?: string;
  }>({
    isOpen: false,
    code: '',
    title: '',
    description: ''
  });

  const handleViewSimulation = (simulations: string[], title?: string) => setModalSimulations({simulations, title});
  const closeSimulationModal = () => setModalSimulations(null);

  const openLightbox = (image: string, title?: string) => setLightboxImage({ image, title });
  const closeLightbox = () => setLightboxImage(null);

  const openGallery = (project: any) => setGalleryProject(project);
  const closeGallery = () => setGalleryProject(null);

  // NEW: Handle Python code execution
  const handleRunPythonCode = (code: string, title: string, description?: string) => {
    setPythonCompiler({
      isOpen: true,
      code,
      title,
      description
    });
  };

  const closePythonCompiler = () => {
    setPythonCompiler({
      isOpen: false,
      code: '',
      title: '',
      description: ''
    });
  };

  const categoryButtonStyle = (isActive: boolean) => 
    `flex items-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg ${
      isActive 
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/25' 
        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/80 hover:text-white shadow-lg hover:shadow-purple-500/10'
    }`;

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Explore my portfolio of innovative engineering solutions and software development projects
          </p>
        </motion.div>

        {/* Enhanced Category Navigation */}
        <motion.div 
          className="flex justify-center mb-16 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(projectCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={key}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(key as any)}
                className={categoryButtonStyle(activeCategory === key)}
              >
                <Icon className="w-6 h-6" />
                <span>{category.title}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Category Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-300 mb-16 max-w-4xl mx-auto text-lg leading-relaxed bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
        >
          {projectCategories[activeCategory].intro}
        </motion.p>

        {/* Projects Grid */}
        <motion.div 
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-2"
          layout
        >
          {projectCategories[activeCategory].projects.map((project, index) => (
            <PremiumProjectCard
              key={index}
              project={project}
              onViewGallery={openGallery}
              onViewImage={openLightbox}
              onViewSimulation={handleViewSimulation}
              onRunPythonCode={handleRunPythonCode}
            />
          ))}
        </motion.div>

        {/* Enhanced Modals */}
        <SimulationModal 
          isOpen={!!modalSimulations} 
          onClose={closeSimulationModal} 
          simulations={modalSimulations?.simulations || []}
          title={modalSimulations?.title ? `${modalSimulations.title} - Simulations` : undefined}
        />

        <ImageModal
          isOpen={!!lightboxImage}
          onClose={closeLightbox}
          image={lightboxImage?.image || ''}
          title={lightboxImage?.title}
        />

        <ProjectGalleryModal 
          isOpen={!!galleryProject} 
          onClose={closeGallery} 
          project={galleryProject} 
        />

        {/* NEW: Python Compiler Modal */}
        <PythonCompiler
          isOpen={pythonCompiler.isOpen}
          onClose={closePythonCompiler}
          initialCode={pythonCompiler.code}
          projectTitle={pythonCompiler.title}
          codeDescription={pythonCompiler.description}
        />
      </div>
    </div>
  );
};

export default Projects;
