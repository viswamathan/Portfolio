import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut, 
  Search, RefreshCw, Grid3x3 
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CAD Models Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Reusable Stat Card Component
const StatCard = ({ stat }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/30 transition-colors"
    >
      <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 text-${stat.color}-400`} />
      </div>
      <div className="text-2xl font-bold text-white mb-1">{stat.value.toLocaleString()}</div>
      <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
      <div className="text-gray-500 text-xs">{stat.description}</div>
    </motion.div>
  );
};

// Reusable Model Card Component
const ModelCard = ({ model, onViewPhoto, onView3D }) => {
  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Beginner": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Intermediate": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Advanced": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg hover:border-purple-500/30 transition-colors"
    >
      {/* Image Thumbnail */}
      <div className="relative h-64 overflow-hidden group">
        <img
          src={model.image}
          alt={model.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute top-4 left-4 flex gap-2 z-20">
          <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
            <Eye className="w-3 h-3" /> {model.views}
          </span>
          <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
            <Download className="w-3 h-3" /> {model.downloads}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-20">
          <span className={`px-3 py-1 rounded-full text-xs border ${getComplexityColor(model.complexity)}`}>
            {model.complexity}
          </span>
        </div>
        <div className="absolute bottom-4 left-4 z-20">
          <span className="bg-purple-600/80 px-3 py-1 rounded-full text-xs text-white">
            {model.software}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {model.features.map((f, idx) => (
            <span
              key={idx}
              className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
            >
              {f}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <motion.button
            onClick={() => onViewPhoto(model)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm border border-green-500/30"
          >
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View Photo</span>
          </motion.button>
          <motion.button
            onClick={() => onView3D(model)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm border border-purple-500/30"
          >
            <Box className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">3D View</span>
          </motion.button>
          <a
            href={model.downloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-sm border border-blue-500/30 transition-colors"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const CADModels = () => {
  // State variables
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("views");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  // CAD Models Data
  const cadModels = [
    {
      title: "Pair of Spur Gears",
      description: "Precision-engineered spur gear pair with optimized module and pressure angle for smooth torque transmission and minimal vibration under varying loads.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Parametric Design", "Gear Ratio Analysis", "Motion Study"],
      image: "/3d Pictures/gear profile.png",
      downloadUrl: "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
      modelPath: "/Models/Spur Gear profile.STL",
      views: 1247,
      downloads: 89,
    },
    {
      title: "Exhaust Manifold",
      description: "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance. Features smooth flow paths and minimized thermal stresses for durability.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Advanced",
      features: ["Flow Simulation", "Thermal Analysis", "Parametric Design"],
      image: "/3d Pictures/exhaust manifold.png",
      downloadUrl: "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
      modelPath: "/Models/Exhaust manifold.STL",
      views: 500,
      downloads: 25,
    },
    {
      title: "Knuckle Joint",
      description: "Robust knuckle joint designed for heavy load applications, ensuring secure connections while allowing limited angular movement. Suitable for linkages in structural and mechanical systems.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Parametric Design", "Stress Analysis", "Motion Study"],
      image: "/3d Pictures/knuckle joint.png",
      downloadUrl: "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
      modelPath: "/Models/KNUCKLE JOINT.STL",
      views: 226,
      downloads: 10,
    },
    {
      title: "Universal Coupling",
      description: "Precision universal coupling enabling torque transmission between shafts at varying angles. Designed to minimize backlash and maintain smooth power delivery in dynamic conditions.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Beginner",
      features: ["Parametric Design", "Motion Study", "Torque Analysis"],
      image: "/3d Pictures/universal coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
      modelPath: "/Models/UNIVERSAL COUPLING.STL",
      views: 189,
      downloads: 15,
    },
    {
      title: "Muff Coupling",
      description: "Simple and efficient muff coupling designed for rigid torque transmission between co-axial shafts. Features a hollow cylindrical sleeve with key and keyway for secure power transfer.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Basic",
      features: ["Parametric Design", "Torque Analysis", "Stress Check"],
      image: "/3d Pictures/muff coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1swp0ZzEw2iwtmelt6Dzu66cQZQu1cvqz/view?usp=sharing",
      modelPath: "/Models/MUFF COUPLING.STL",
      views: 189,
      downloads: 15,
    },
    {
      title: "Door Lock Mechanism",
      description: "Compact and reliable door lock mechanism featuring latch, spring, and handle components for secure and smooth operation.",
      software: "SolidWorks",
      category: "Assembly",
      complexity: "Basic",
      features: ["Assembly Modeling", "Motion Simulation", "Tolerance Analysis"],
      image: "/3d Pictures/DOOR LOCK.png",
      downloadUrl: "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
      modelPath: "/Models/Door lock.STL",
      views: 312,
      downloads: 18,
    },
    {
      title: "Flanged Tee Pipe Fitting",
      description: "Industrial-grade flanged tee pipe fitting designed for fluid distribution systems. Features precise flanges for secure bolted connections and optimized internal geometry for minimal pressure loss.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Intermediate",
      features: ["Parametric Design", "Flow Optimization", "Assembly Ready"],
      image: "/3d Pictures/flanged tee pipe fitting.png",
      downloadUrl: "https://drive.google.com/file/d/1hdD_tgdv1UfKgLsE0bWNK6lnudQZs1i3/view?usp=sharing",
      modelPath: "/Models/Flanged Tee Pipe Fitting.STL",
      views: 278,
      downloads: 25,
    },
    {
      title: "Refrigeration Valves Assembly",
      description: "Precision-designed refrigeration valve assembly used for controlling refrigerant flow in HVAC and cooling systems. Includes service, expansion, and solenoid valves optimized for durability and leak-proof operation.",
      software: "SolidWorks",
      category: "Thermal Systems",
      complexity: "Basic",
      features: ["Parametric Design", "Flow Simulation", "Thermal Analysis"],
      image: "/3d Pictures/refrigeration valves.png",
      downloadUrl: "https://drive.google.com/file/d/1vwR_r4u5kM9mDazRRgwkHwoYjdYJW1US/view?usp=sharing",
      modelPath: "/Models/Refrigeration Valves.STL",
      views: 342,
      downloads: 27,
    },
    {
      title: "Connecting Rod (Without Cap)",
      description: "Lightweight connecting rod designed without cap for simplified design analysis and manufacturing demonstration. Optimized cross-section for strength-to-weight ratio and fatigue resistance.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Intermediate",
      features: ["3D Modeling", "FEA Simulation", "Mass Optimization"],
      image: "/3d Pictures/connecting rod.png",
      downloadUrl: "https://drive.google.com/file/d/1U4gchYO7Sgz-I0zRMdEkQbriGfLoLmSq/view?usp=sharing",
      modelPath: "/Models/Connecting Rod.STL",
      views: 297,
      downloads: 24,
    },
    {
      title: "Piston Head",
      description: "High-strength piston head designed for internal combustion engines. Optimized for heat dissipation, minimal friction, and maximum durability under high-pressure conditions.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["3D Modeling", "FEA Analysis", "Thermal Simulation"],
      image: "/3d Pictures/piston head.png",
      downloadUrl: "https://drive.google.com/file/d/1criIIkz-FtTGruJ2BdK6qApuULku8FCR/view?usp=drive_link",
      modelPath: "/Models/piston head.STL",
      views: 410,
      downloads: 32,
    },
    {
      title: "Crankshaft",
      description: "Precision crankshaft designed for efficient torque transmission and balanced rotation. Engineered for minimal vibration, maximum fatigue resistance, and high-performance automotive engines.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["Parametric Design", "Stress Analysis", "Motion Study"],
      image: "/3d Pictures/crankshaft.png",
      downloadUrl: "https://drive.google.com/file/d/1KLG7288kK596zJ48CpyFhCJMfTL7E5q5/view?usp=drive_link",
      modelPath: "/Models/crank shaft.STL",
      views: 365,
      downloads: 28,
    },
    {
      title: "Stuffing Box",
      description: "A sealing assembly designed to prevent fluid leakage around rotating shafts in pumps and valves. Modeled and assembled in SolidWorks with precise dimensional accuracy and material differentiation.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["3D Assembly Modeling","Material Visualization","Sectional & Isometric Views","Mating Constraints"],
      image: "/3d Pictures/stuffingbox.png",
      downloadUrl:"https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Stuffing Box.STL",
      views: 248,
      downloads: 19,
    },
    {
      title: "Servo-Driven Robotic Gripper",
      description: "An intelligent robotic gripper actuated by servo motors for precise object handling. Designed in SolidWorks with adjustable finger mechanisms, torque-based control, and lightweight aluminum structure for automation and pick-and-place applications.",
      software: "SolidWorks",
      category: "Robotics",
      complexity: "Advanced",
      features: [
        "Servo-Driven Mechanism",
        "Adjustable Finger Design",
        "3D Parametric Modeling",
        "Motion Study Simulation"
      ],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
    },
  ];

  const categories = [
    "All", "Assembly", "Mechanical Parts", "Automotive", 
    "Industrial", "Thermal Systems", "Robotics", "Aerospace",
  ];

  const sortOptions = [
    { value: 'views', label: 'Most Viewed' },
    { value: 'downloads', label: 'Most Downloaded' },
    { value: 'title', label: 'Alphabetical' },
    { value: 'complexity', label: 'Complexity' }
  ];

  // Enhanced stats with real calculations
  const stats = [
    { 
      label: "Total Models", 
      value: cadModels.length, 
      icon: Box, 
      color: "purple",
      description: "CAD designs"
    },
    { 
      label: "Total Downloads", 
      value: cadModels.reduce((sum, model) => sum + model.downloads, 0), 
      icon: Download, 
      color: "blue",
      description: "All time"
    },
    { 
      label: "Total Views", 
      value: cadModels.reduce((sum, model) => sum + model.views, 0), 
      icon: Eye, 
      color: "green",
      description: "Model previews"
    },
    { 
      label: "Categories", 
      value: categories.length - 1, 
      icon: Layers, 
      color: "orange",
      description: "Different domains"
    }
  ];

  // Enhanced filter and sort logic
  const filteredAndSortedModels = cadModels
    .filter(model => {
      const matchesCategory = activeCategory === "All" || model.category === activeCategory;
      const matchesSearch = searchTerm === "" || 
        model.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.features.some(f => f.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'complexity':
          const complexityOrder = { 'Basic': 1, 'Beginner': 2, 'Intermediate': 3, 'Advanced': 4 };
          return complexityOrder[b.complexity] - complexityOrder[a.complexity];
        default:
          return 0;
      }
    });

  // Event handlers
  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
  }, []);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };

  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };

  // Enhanced 3D Viewer with better controls
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(50, 50, 50);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-50, -50, -50);
    scene.add(directionalLight2);

    const loader = new STLLoader();
    const modelPaths = previewModel.modelPaths || [previewModel.modelPath];
    const meshes = [];
    let loadedCount = 0;

    modelPaths.forEach((path, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${(index * 60) % 360}, 80%, 60%)`),
        metalness: 0.5,
        roughness: 0.2,
        wireframe: wireframe
      });

      loader.load(
        path,
        (geometry) => {
          geometry.computeVertexNormals();
          geometry.computeBoundingBox();
          
          const box = geometry.boundingBox;
          const size = new THREE.Vector3();
          box.getSize(size);
          const center = new THREE.Vector3();
          box.getCenter(center);

          geometry.translate(-center.x, -center.y, -center.z);

          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 5 / maxDim;
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.setScalar(scaleFactor);

          scene.add(mesh);
          meshes.push(mesh);

          loadedCount++;
          if (loadedCount === modelPaths.length) {
            const groupBox = new THREE.Box3();
            meshes.forEach((m) => groupBox.expandByObject(m));
            const groupSize = groupBox.getSize(new THREE.Vector3());
            const groupMax = Math.max(groupSize.x, groupSize.y, groupSize.z);
            const fov = camera.fov * (Math.PI / 180);
            const cameraZ = Math.abs(groupMax / 2 / Math.tan(fov / 2));
            camera.position.set(0, 0, cameraZ * 2);
            camera.lookAt(new THREE.Vector3(0, 0, 0));

            controls.update();
            setTimeout(() => setLoadingModel(false), 500);
          }
        },
        (progress) => {
          // Progress tracking can be added here
        },
        (error) => {
          console.error('Error loading model:', error);
          setLoadingModel(false);
        }
      );
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.autoRotate = autoRotate;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [previewModel, autoRotate, wireframe]);

  // Performance monitoring
  useEffect(() => {
    const startTime = performance.now();
    return () => {
      const endTime = performance.now();
      console.log(`CADModels component rendered in ${endTime - startTime}ms`);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-4 text-center"
        >
          CAD Model{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Showcase
          </span>
        </motion.h2>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} />
          ))}
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search models, features, descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                  aria-label="Search models"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                aria-label="Sort models by"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-gray-400 text-sm mb-4">
            Showing {filteredAndSortedModels.length} of {cadModels.length} models
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 sm:mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all relative ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Models Grid */}
        {filteredAndSortedModels.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">No models found matching your criteria</div>
            <button
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
              className="px-6 py-3 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16">
            {filteredAndSortedModels.map((model, i) => (
              <ModelCard
                key={`${model.title}-${i}`}
                model={model}
                onViewPhoto={setPreviewImage}
                onView3D={setPreviewModel}
              />
            ))}
          </div>
        )}

        {/* 3D Preview Modal */}
        {previewModel && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 relative">
                <button
                  onClick={() => setPreviewModel(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white z-10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{previewModel.title}</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{previewModel.description}</p>

                <div className="relative w-full h-64 sm:h-96 bg-gray-800 rounded-lg">
                  {loadingModel && (
                    <div 
                      className="absolute inset-0 flex items-center justify-center z-10 bg-gray-800/50"
                      role="status"
                      aria-label="Loading 3D model"
                    >
                      <div className="text-white text-lg flex items-center gap-3">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
                        Loading 3D Model...
                      </div>
                    </div>
                  )}
                  
                  {/* 3D Controls */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    <button
                      onClick={() => setAutoRotate(!autoRotate)}
                      className={`p-2 rounded-lg ${
                        autoRotate ? 'bg-green-500/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                      } border border-current/30 transition-colors`}
                      title="Auto Rotate"
                      aria-label={autoRotate ? "Disable auto rotate" : "Enable auto rotate"}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setWireframe(!wireframe)}
                      className={`p-2 rounded-lg ${
                        wireframe ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-600/20 text-gray-400'
                      } border border-current/30 transition-colors`}
                      title="Toggle Wireframe"
                      aria-label={wireframe ? "Disable wireframe" : "Enable wireframe"}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>
                  </div>

                  <div ref={mountRef} className="w-full h-full rounded-lg" />
                </div>

                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
                  <button
                    onClick={zoomOut}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 border border-red-500/30 transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="w-4 h-4" /> 
                    <span className="hidden sm:inline">Zoom Out</span>
                  </button>
                  <button
                    onClick={zoomIn}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 border border-green-500/30 transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="w-4 h-4" /> 
                    <span className="hidden sm:inline">Zoom In</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Image Preview Modal */}
        {previewImage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 relative">
                <button
                  onClick={() => setPreviewImage(null)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-white z-10 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{previewImage.title}</h3>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">{previewImage.description}</p>

                <div className="relative w-full h-64 sm:h-96 bg-gray-800 rounded-lg overflow-hidden">
                  <img
                    src={previewImage.image}
                    alt={previewImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {previewImage.features.map((f, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default CADModels;
