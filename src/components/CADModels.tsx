import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Download,
  Eye,
  Layers,
  Award,
  X,
  ZoomIn,
  ZoomOut,
  Image,
  RotateCw,
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// NOTE: In a real app, this data would be moved to a separate file (e.g., data/cadModels.js)
const cadModelsData = [
  // ... (Data array remains the same)
  {
    title: "Pair of Spur Gears",
    description:
      "Precision-engineered spur gear pair with optimized module and pressure angle for smooth torque transmission and minimal vibration under varying loads.",
    software: "SolidWorks",
    category: "Mechanical Parts",
    complexity: "Intermediate",
    features: ["Parametric Design", "Gear Ratio Analysis", "Motion Study"],
    image: "/3d Pictures/gear profile.png",
    downloadUrl:
      "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
    modelPath: "/Models/Spur Gear profile.STL",
    views: 1247,
    downloads: 89,
  },
  {
    title: "Exhaust Manifold",
    description:
      "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance. Features smooth flow paths and minimized thermal stresses for durability.",
    software: "SolidWorks",
    category: "Automotive",
    complexity: "Advanced",
    features: ["Flow Simulation", "Thermal Analysis", "Parametric Design"],
    image: "/3d Pictures/exhaust manifold.png",
    downloadUrl:
      "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
    modelPath: "/Models/Exhaust manifold.STL",
    views: 500,
    downloads: 25,
  },
  {
    title: "Knuckle Joint",
    description:
      "Robust knuckle joint designed for heavy load applications, ensuring secure connections while allowing limited angular movement. Suitable for linkages in structural and mechanical systems.",
    software: "SolidWorks",
    category: "Mechanical Parts",
    complexity: "Intermediate",
    features: ["Parametric Design", "Stress Analysis", "Motion Study"],
    image: "/3d Pictures/knuckle joint.png",
    downloadUrl:
      "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
    modelPath: "/Models/KNUCKLE JOINT.STL",
    views: 226,
    downloads: 10,
  },
  {
    title: "Universal Coupling",
    description:
      "Precision universal coupling enabling torque transmission between shafts at varying angles. Designed to minimize backlash and maintain smooth power delivery in dynamic conditions.",
    software: "SolidWorks",
    category: "Industrial",
    complexity: "Beginner",
    features: ["Parametric Design", "Motion Study", "Torque Analysis"],
    image: "/3d Pictures/universal coupling.png",
    downloadUrl:
      "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
    modelPath: "/Models/UNIVERSAL COUPLING.STL",
    views: 189,
    downloads: 15,
  },
  {
    title: "Muff Coupling",
    description:
      "Simple and efficient muff coupling designed for rigid torque transmission between co-axial shafts. Features a hollow cylindrical sleeve with key and keyway for secure power transfer.",
    software: "SolidWorks",
    category: "Industrial",
    complexity: "Basic",
    features: ["Parametric Design", "Torque Analysis", "Stress Check"],
    image: "/3d Pictures/muff coupling.png",
    downloadUrl:
      "https://drive.google.com/file/d/1swp0ZzEw2iwtmelt6Dzu66cQZQu1cvqz/view?usp=sharing",
    modelPath: "/Models/MUFF COUPLING.STL",
    views: 189,
    downloads: 15,
  },
  {
    title: "Door Lock Mechanism",
    description:
      "Compact and reliable door lock mechanism featuring latch, spring, and handle components for secure and smooth operation.",
    software: "SolidWorks",
    category: "Assembly",
    complexity: "Basic",
    features: ["Assembly Modeling", "Motion Simulation", "Tolerance Analysis"],
    image: "/3d Pictures/DOOR LOCK.png",
    downloadUrl:
      "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
    modelPath: "/Models/Door lock.STL",
    views: 312,
    downloads: 18,
  },
  {
    title: "Flanged Tee Pipe Fitting",
    description:
      "Industrial-grade flanged tee pipe fitting designed for fluid distribution systems. Features precise flanges for secure bolted connections and optimized internal geometry for minimal pressure loss.",
    software: "SolidWorks",
    category: "Industrial",
    complexity: "Intermediate",
    features: ["Parametric Design", "Flow Optimization", "Assembly Ready"],
    image: "/3d Pictures/flanged tee pipe fitting.png",
    downloadUrl:
      "https://drive.google.com/file/d/1hdD_tgdv1UfKgLsE0bWNK6lnudQZs1i3/view?usp=sharing",
    modelPath: "/Models/Flanged Tee Pipe Fitting.STL",
    views: 278,
    downloads: 25,
  },
  {
    title: "Refrigeration Valves Assembly",
    description:
      "Precision-designed refrigeration valve assembly used for controlling refrigerant flow in HVAC and cooling systems. Includes service, expansion, and solenoid valves optimized for durability and leak-proof operation.",
    software: "SolidWorks",
    category: "Thermal Systems",
    complexity: "Basic",
    features: ["Parametric Design", "Flow Simulation", "Thermal Analysis"],
    image: "/3d Pictures/refrigeration valves.png",
    downloadUrl:
      "https://drive.google.com/file/d/1vwR_r4u5kM9mDazRRgwkHwoYjdYJW1US/view?usp=sharing",
    modelPath: "/Models/Refrigeration Valves.STL",
    views: 342,
    downloads: 27,
  },
  {
    title: "Connecting Rod (Without Cap)",
    description:
      "Lightweight connecting rod designed without cap for simplified design analysis and manufacturing demonstration. Optimized cross-section for strength-to-weight ratio and fatigue resistance.",
    software: "SolidWorks",
    category: "Automotive",
    complexity: "Intermediate",
    features: ["3D Modeling", "FEA Simulation", "Mass Optimization"],
    image: "/3d Pictures/connecting rod.png",
    downloadUrl:
      "https://drive.google.com/file/d/1U4gchYO7Sgz-I0zRMdEkQbriGfLoLmSq/view?usp=sharing",
    modelPath: "/Models/Connecting Rod.STL",
    views: 297,
    downloads: 24,
  },
  {
    title: "Piston Head",
    description:
      "High-strength piston head designed for internal combustion engines. Optimized for heat dissipation, minimal friction, and maximum durability under high-pressure conditions.",
    software: "SolidWorks",
    category: "Automotive",
    complexity: "Basic",
    features: ["3D Modeling", "FEA Analysis", "Thermal Simulation"],
    image: "/3d Pictures/piston head.png",
    downloadUrl:
      "https://drive.google.com/file/d/1criIIkz-FtTGruJ2BdK6qApuULku8FCR/view?usp=drive_link",
    modelPath: "/Models/piston head.STL",
    views: 410,
    downloads: 32,
  },
  {
    title: "Crankshaft",
    description:
      "Precision crankshaft designed for efficient torque transmission and balanced rotation. Engineered for minimal vibration, maximum fatigue resistance, and high-performance automotive engines.",
    software: "SolidWorks",
    category: "Automotive",
    complexity: "Basic",
    features: ["Parametric Design", "Stress Analysis", "Motion Study"],
    image: "/3d Pictures/crankshaft.png",
    downloadUrl:
      "https://drive.google.com/file/d/1KLG7288kK596zJ48CpyFhCJMfTL7E5q5/view?usp=drive_link",
    modelPath: "/Models/crank shaft.STL",
    views: 365,
    downloads: 28,
  },
  {
    title: "Stuffing Box",
    description:
      "A sealing assembly designed to prevent fluid leakage around rotating shafts in pumps and valves. Modeled and assembled in SolidWorks with precise dimensional accuracy and material differentiation.",
    software: "SolidWorks",
    category: "Mechanical Parts",
    complexity: "Intermediate",
    features: [
      "3D Assembly Modeling",
      "Material Visualization",
      "Sectional & Isometric Views",
      "Mating Constraints",
    ],
    image: "/3d Pictures/stuffingbox.png",
    downloadUrl:
      "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
    modelPath: "/Models/Stuffing Box.STL",
    views: 248,
    downloads: 19,
  },
  {
    title: "Servo-Driven Robotic Gripper",
    description:
      "An intelligent robotic gripper actuated by servo motors for precise object handling. Designed in SolidWorks with adjustable finger mechanisms, torque-based control, and lightweight aluminum structure for automation and pick-and-place applications.",
    software: "SolidWorks",
    category: "Robotics",
    complexity: "Advanced",
    features: [
      "Servo-Driven Mechanism",
      "Adjustable Finger Design",
      "3D Parametric Modeling",
      "Motion Study Simulation",
    ],
    image: "/3d Pictures/Robotic Gripper.png",
    downloadUrl:
      "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
    modelPath: "/Models/Robotic Gripper.STL",
    views: 312,
    downloads: 27,
  },
];

const categories = [
  "All",
  "Assembly",
  "Mechanical Parts",
  "Automotive",
  "Industrial",
  "Thermal Systems",
  "Robotics",
  "Aerospace",
];

const getComplexityColor = (complexity) => {
  switch (complexity) {
    case "Beginner":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Intermediate":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Advanced":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);

  const cadModels = cadModelsData;

  const filteredModels = useMemo(
    () =>
      activeCategory === "All"
        ? cadModels
        : cadModels.filter((m) => m.category === activeCategory),
    [activeCategory, cadModels]
  );

  // --- Dynamic Stats Calculation ---
  const totalDownloads = cadModels.reduce((sum, model) => sum + model.downloads, 0);

  const formatDownloads = (count) => {
    return count > 999 ? `${(count / 1000).toFixed(1)}K+` : count.toString();
  };

  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
    { label: "Downloads", value: formatDownloads(totalDownloads), icon: Download, color: "blue" }, // Dynamic Value
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
  ];

  // --- 3D Viewer Logic (FIXED Cleanup and Dependencies) ---
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = isRotating; // Uses state
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(50, 50, 50);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const loader = new STLLoader();
    const modelPaths = previewModel.modelPaths || [previewModel.modelPath];
    const meshes = [];
    let loadedCount = 0;

    modelPaths.forEach((path, index) => {
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(`hsl(${(index * 60) % 360}, 80%, 60%)`),
        metalness: 0.5,
        roughness: 0.2,
      });

      loader.load(
        path,
        (geometry) => {
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

            setTimeout(() => setLoadingModel(false), 500);
          }
        },
        undefined,
        () => setLoadingModel(false)
      );
    });

    const animate = () => {
      requestAnimationFrame(animate);
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

    // FIX: Three.js Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      controls.dispose();
      // Remove canvas element from DOM
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
    // FIX: Added isRotating to dependencies
  }, [previewModel, isRotating]);

  // --- Zoom Functions ---
  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };

  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };

  // --- Rotation Toggle Function ---
  const toggleRotation = () => {
    setIsRotating((prev) => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = !prev;
      }
      return !prev;
    });
  };

  // --- Modal Handlers ---
  const openModelPreview = (model) => {
    setPreviewImage(null);
    setPreviewModel(model);
    setIsRotating(true);
  };

  const openImagePreview = (model) => {
    setPreviewModel(null);
    setPreviewImage(model);
  };

  const closeModal = () => {
    setPreviewModel(null);
    setPreviewImage(null);
  };

  // --- Reusable Modal Component ---
  const Modal = ({ children, title, description, onClose }) => (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 relative border border-purple-800/50 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full bg-gray-800/70 hover:bg-gray-700 z-50"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-extrabold text-white mb-2 border-b border-gray-700/50 pb-2">
          {title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        {children}
        
      </motion.div>
    </div>
  );

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-4 text-center"
      >
        CAD Model{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Showcase
        </span>
      </motion.h2>

      {/* Stats (Uses Dynamic Downloads) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700/50"
            >
              <div
                className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                {/* NOTE: Static class for text color is safer for Tailwind JIT */}
                <Icon className={`w-6 h-6 ${stat.color === 'purple' ? 'text-purple-400' : stat.color === 'blue' ? 'text-blue-400' : stat.color === 'green' ? 'text-green-400' : 'text-orange-400'}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all relative ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredModels.map((model, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-xl backdrop-blur-sm"
          >
            {/* Image with loading placeholder */}
            <div className="relative h-64 overflow-hidden group">
              <div
                className="w-full h-full bg-gray-700 animate-pulse absolute inset-0"
                id={`skeleton-${i}`}
              />

              <img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                onLoad={() => {
                  const skeleton = document.getElementById(`skeleton-${i}`);
                  if (skeleton) skeleton.style.display = "none";
                }}
                onError={() => {
                  const skeleton = document.getElementById(`skeleton-${i}`);
                  if (skeleton) skeleton.style.display = "none";
                }}
              />

              {/* Status Tags */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1 font-semibold">
                  <Eye className="w-3 h-3 text-white/80" /> {model.views}
                </span>
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1 font-semibold">
                  <Download className="w-3 h-3 text-white/80" /> {model.downloads}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <span
                  className={`px-3 py-1 rounded-full text-xs border font-semibold ${getComplexityColor(
                    model.complexity
                  )}`}
                >
                  {model.complexity}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 z-20">
                <span className="bg-purple-600/80 px-3 py-1 rounded-full text-xs text-white font-semibold shadow-md">
                  {model.software}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-extrabold text-white mb-1">{model.title}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>
              
              {/* Features Display */}
              <div className="flex flex-wrap gap-2 mb-6">
                {model.features.slice(0, 3).map((f, idx) => (
                  <span
                    key={idx}
                    className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-xl text-xs border border-purple-500/30 font-medium hover:bg-purple-500/30 transition-colors"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {/* View Photo Button */}
                <motion.button
                  onClick={() => openImagePreview(model)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-3 rounded-lg text-sm border border-green-500/30 font-semibold transition-all"
                >
                  <Image className="w-4 h-4" /> Photo
                </motion.button>
                {/* 3D Preview Button */}
                <motion.button
                  onClick={() => openModelPreview(model)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm border border-purple-500/30 font-semibold transition-all"
                >
                  <Eye className="w-4 h-4" /> 3D View
                </motion.button>
                {/* Download Button */}
                <a
                  href={model.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-lg text-sm border border-blue-500/30 font-semibold transition-all"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {/* 3D Preview Modal (Enhanced Viewer) */}
        {previewModel && (
          <Modal
            title={previewModel.title}
            description={previewModel.description}
            onClose={closeModal}
          >
            <div className="relative w-full h-[60vh] bg-gray-800 rounded-lg shadow-inner">
              {loadingModel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-gray-800/80 backdrop-blur-sm">
                  <RotateCw className="w-8 h-8 text-white animate-spin mb-3" />
                  <span className="text-white text-lg font-medium">Loading 3D Model...</span>
                  <span className="text-gray-400 text-sm mt-1">
                    (Use mouse to pan/zoom/rotate when loaded)
                  </span>
                </div>
              )}
              {/* This is where the Three.js canvas is rendered */}
              <div ref={mountRef} className="w-full h-full rounded-lg" />
            </div>

            {/* Control Panel (Enhanced) */}
            <div className="flex justify-between items-center gap-3 mt-4">
               {/* FIX: Added Instruction on manual control */}
              <p className="text-gray-400 text-xs font-medium max-w-sm">
                **Manual Control:** Click & Drag (Rotate), Right Click & Drag or Two Fingers (Pan), Scroll (Zoom).
              </p>

              <div className="flex gap-3">
                {/* Rotation Toggle Button */}
                <button
                  onClick={toggleRotation}
                  className={`p-3 rounded-lg border transition-colors`}
                  // Added explicit color classes for safety
                  style={{
                    backgroundColor: isRotating ? 'rgba(147, 51, 234, 0.2)' : 'rgba(75, 85, 99, 0.2)',
                    borderColor: isRotating ? 'rgba(147, 51, 234, 0.3)' : 'rgba(75, 85, 99, 0.3)',
                    color: isRotating ? 'rgb(192, 132, 252)' : 'rgb(156, 163, 175)',
                  }}
                  aria-label={isRotating ? "Disable Auto-Rotation" : "Enable Auto-Rotation"}
                  title={isRotating ? "Auto-Rotation ON" : "Auto-Rotation OFF"}
                >
                  <RotateCw className={`w-5 h-5 ${isRotating ? "animate-spin-slow" : ""}`} />
                </button>
                {/* Zoom Buttons (Icon Buttons) */}
                <button
                  onClick={zoomIn}
                  className="p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 border border-green-500/30 transition-colors"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={zoomOut}
                  className="p-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 border border-red-500/30 transition-colors"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Modal>
        )}

        {/* Image Viewer Modal (Enhanced Viewer) */}
        {previewImage && (
          <Modal
            title={previewImage.title}
            description={previewImage.description}
            onClose={closeModal}
          >
             {/* FIX: Improved Image Viewer styling for better display flexibility */}
            <div className="w-full h-auto max-h-[80vh] bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center p-2 shadow-2xl">
              <img
                src={previewImage.image}
                alt={previewImage.title}
                className="max-h-full max-w-full object-contain rounded-lg transition-transform duration-300 hover:scale-[1.01]"
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CADModels;
