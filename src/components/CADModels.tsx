import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut, 
  Search, Filter, Info, ChevronLeft, ChevronRight, 
  Play, Pause, Calendar, Share2, Check, AlertCircle
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Toast notification component (unchanged)
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md border bg-gray-900/80 border-gray-700/50 text-white"
    >
      {type === 'success' ? <Check className="w-5 h-5 text-green-400" /> : type === 'error' ? <AlertCircle className="w-5 h-5 text-red-400" /> : <Info className="w-5 h-5 text-blue-400" />}
      <span className="text-sm font-medium">{message}</span>
    </motion.div>
  );
};

// Global model cache to avoid reloading STL files
const modelCache = new Map();

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [autoRotate, setAutoRotate] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [toast, setToast] = useState(null);
  
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  // CAD Models data (same as your original full list - keep all 15 models)
  const cadModels = [
    {
      id: 1,
      title: "Pair of Spur Gears",
      description: "Precision-engineered spur gear pair with optimized module and pressure angle for smooth torque transmission and minimal vibration under varying loads.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Extrude", "Circular Pattern", "Mate Relations", "Helix and Sweep"],
      image: "/3d Pictures/gear profile.png",
      downloadUrl: "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
      modelPath: "/Models/Spur Gear profile.STL",
      views: 1247,
      downloads: 89,
      fileSize: "4.2 MB",
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "Exhaust Manifold",
      description: "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Advanced",
      features: ["Surface Loft", "Shell", "Fillet", "Swept Boss"],
      image: "/3d Pictures/exhaust manifold.png",
      downloadUrl: "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
      modelPath: "/Models/Exhaust manifold.STL",
      views: 500,
      downloads: 25,
      fileSize: "6.7 MB",
      lastUpdated: "2024-01-10"
    },
    {
      id: 3,
      title: "Knuckle Joint",
      description: "Robust knuckle joint designed for heavy load applications, ensuring secure connections while allowing limited angular movement.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Revolve", "Extrude Cut", "Chamfer", "Assembly Mates"],
      image: "/3d Pictures/knuckle joint.png",
      downloadUrl: "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
      modelPath: "/Models/KNUCKLE JOINT.STL",
      views: 226,
      downloads: 10,
      fileSize: "3.1 MB",
      lastUpdated: "2024-01-08"
    },
    {
      id: 4,
      title: "Universal Coupling",
      description: "Precision universal coupling enabling torque transmission between shafts at varying angles.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Beginner",
      features: ["Revolve", "Swept Cut", "Mirror", "Circular Pattern"],
      image: "/3d Pictures/universal coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
      modelPath: "/Models/UNIVERSAL COUPLING.STL",
      views: 189,
      downloads: 15,
      fileSize: "2.8 MB",
      lastUpdated: "2024-01-05"
    },
    {
      id: 5,
      title: "Muff Coupling",
      description: "Simple and efficient muff coupling designed for rigid torque transmission between co-axial shafts.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Basic",
      features: ["Extrude", "Hole Wizard", "Chamfer", "Section View"],
      image: "/3d Pictures/muff coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1swp0ZzEw2iwtmelt6Dzu66cQZQu1cvqz/view?usp=sharing",
      modelPath: "/Models/MUFF COUPLING.STL",
      views: 189,
      downloads: 15,
      fileSize: "2.5 MB",
      lastUpdated: "2024-01-03"
    },
    {
      id: 6,
      title: "Door Lock Mechanism",
      description: "Compact and reliable door lock mechanism featuring latch, spring, and handle components.",
      software: "SolidWorks",
      category: "Assembly",
      complexity: "Basic",
      features: ["Assembly Mates", "Exploded View", "Motion Study", "Interference Detection"],
      image: "/3d Pictures/DOOR LOCK.png",
      downloadUrl: "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
      modelPath: "/Models/Door lock.STL",
      views: 312,
      downloads: 18,
      fileSize: "5.3 MB",
      lastUpdated: "2023-12-28"
    },
    {
      id: 7,
      title: "Flanged Tee Pipe Fitting",
      description: "Industrial-grade flanged tee pipe fitting designed for fluid distribution systems.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Intermediate",
      features: ["Revolve", "Fillet", "Circular Pattern", "Hole Wizard"],
      image: "/3d Pictures/flanged tee pipe fitting.png",
      downloadUrl: "https://drive.google.com/file/d/1hdD_tgdv1UfKgLsE0bWNK6lnudQZs1i3/view?usp=sharing",
      modelPath: "/Models/Flanged Tee Pipe Fitting.STL",
      views: 278,
      downloads: 25,
      fileSize: "4.8 MB",
      lastUpdated: "2023-12-25"
    },
    {
      id: 8,
      title: "Refrigeration Valves Assembly",
      description: "Precision refrigeration valve assembly for controlling refrigerant flow in HVAC and cooling systems.",
      software: "SolidWorks",
      category: "Thermal Systems",
      complexity: "Basic",
      features: ["Assembly Mates", "Configurations", "Bill of Materials", "Exploded View"],
      image: "/3d Pictures/refrigeration valves.png",
      downloadUrl: "https://drive.google.com/file/d/1vwR_r4u5kM9mDazRRgwkHwoYjdYJW1US/view?usp=sharing",
      modelPath: "/Models/Refrigeration Valves.STL",
      views: 342,
      downloads: 27,
      fileSize: "7.2 MB",
      lastUpdated: "2023-12-20"
    },
    {
      id: 9,
      title: "Connecting Rod (Without Cap)",
      description: "Lightweight connecting rod designed without cap for simplified design analysis and manufacturing demonstration.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Intermediate",
      features: ["Extrude", "Fillet", "Draft Analysis", "Section Properties"],
      image: "/3d Pictures/connecting rod.png",
      downloadUrl: "https://drive.google.com/file/d/1U4gchYO7Sgz-I0zRMdEkQbriGfLoLmSq/view?usp=sharing",
      modelPath: "/Models/Connecting Rod.STL",
      views: 297,
      downloads: 24,
      fileSize: "3.9 MB",
      lastUpdated: "2023-12-18"
    },
    {
      id: 10,
      title: "Piston Head",
      description: "High-strength piston head designed for internal combustion engines, optimized for heat dissipation and minimal friction.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["Revolve", "Extrude Cut", "Chamfer", "Circular Pattern"],
      image: "/3d Pictures/piston head.png",
      downloadUrl: "https://drive.google.com/file/d/1criIIkz-FtTGruJ2BdK6qApuULku8FCR/view?usp=drive_link",
      modelPath: "/Models/piston head.STL",
      views: 410,
      downloads: 32,
      fileSize: "4.5 MB",
      lastUpdated: "2023-12-15"
    },
    {
      id: 11,
      title: "Crankshaft",
      description: "Precision crankshaft designed for efficient torque transmission and balanced rotation.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["Revolve", "Extrude", "Mirror", "Circular Pattern"],
      image: "/3d Pictures/crankshaft.png",
      downloadUrl: "https://drive.google.com/file/d/1KLG7288kK596zJ48CpyFhCJMfTL7E5q5/view?usp=drive_link",
      modelPath: "/Models/crank shaft.STL",
      views: 365,
      downloads: 28,
      fileSize: "5.1 MB",
      lastUpdated: "2023-12-12"
    },
    {
      id: 12,
      title: "Stuffing Box",
      description: "A sealing assembly designed to prevent fluid leakage around rotating shafts in pumps and valves.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Extrude", "Revolve", "Assembly Mates", "Exploded View"],
      image: "/3d Pictures/stuffingbox.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link", // Replace with actual link
      modelPath: "/Models/Stuffing Box.STL",
      views: 248,
      downloads: 19,
      fileSize: "6.3 MB",
      lastUpdated: "2023-12-10"
    },
    {
      id: 13,
      title: "Servo-Driven Robotic Gripper",
      description: "Intelligent robotic gripper actuated by servo motors for precise object handling in automation applications.",
      software: "SolidWorks",
      category: "Robotics",
      complexity: "Advanced",
      features: ["Assembly Mates", "Motion Study", "Interference Check", "Exploded View"],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
      fileSize: "8.5 MB",
      lastUpdated: "2023-12-08"
    },
    {
      id: 14,
      title: "Bevel Gear",
      description: "Precisely modeled straight bevel gear developed in Siemens NX with accurate tooth geometry.",
      software: "Siemens NX",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Revolve", "Through Curve", "Mirror Feature", "Synchronous Modeling"],
      image: "/3d Pictures/Bevel Gear.png",
      downloadUrl: "https://drive.google.com/file/d/1TtVjkl4h6yNqSFXxG0R2gVJ2xw3zNqvQ/view?usp=sharing",
      modelPath: "/Models/Bevel Gear.stl",
      views: 380,
      downloads: 18,
      fileSize: "4.2 MB",
      lastUpdated: "2023-12-05"
    },
    {
      id: 15,
      title: "Roller Support Assembly",
      description: "Fully-defined roller support assembly with precise constraints for smooth rotational motion and load-bearing representation.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Extrude Boss/Base", "Revolve", "Hole Wizard", "Assembly Mates", "Motion Study"],
      image: "/3d Pictures/Roller Support.png",
      downloadUrl: "https://drive.google.com/file/d/1ROLLER_SAMPLE_LINK/view?usp=sharing",
      modelPath: "/Models/Roller Support.STL",
      views: 975,
      downloads: 67,
      fileSize: "3.6 MB",
      lastUpdated: "2023-12-01"
    }
  ];

  const categories = [
    "All",
    "Assembly",
    "Mechanical Parts",
    "Automotive",
    "Industrial",
    "Thermal Systems",
    "Robotics",
  ];

  // Filter and sort
  const filteredModels = cadModels
    .filter(model => 
      (activeCategory === "All" || model.category === activeCategory) &&
      (searchQuery === "" || 
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "popularity": return b.views - a.views;
        case "downloads": return b.downloads - a.downloads;
        case "complexity": {
          const order = { "Basic": 0, "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
          return order[b.complexity] - order[a.complexity];
        }
        case "newest": return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        default: return 0;
      }
    });

  const getComplexityColor = (complexity) => {
    const map = {
      "Basic": "bg-green-500/20 text-green-400 border-green-500/30",
      "Beginner": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Intermediate": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      "Advanced": "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return map[complexity] || "bg-gray-500/20 text-gray-400";
  };

  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
    { label: "Downloads", value: cadModels.reduce((sum, m) => sum + m.downloads, 0), icon: Download, color: "blue" },
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
  ];

  // Enhanced 3D Viewer with white background and caching
  const init3DViewer = useCallback(() => {
    if (!previewModel || !mountRef.current) return;
    setLoadingModel(true);

    // Cleanup previous scene
    if (sceneRef.current) {
      while(sceneRef.current.children.length > 0) sceneRef.current.remove(sceneRef.current.children[0]);
    }
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const scene = new THREE.Scene();
    // WHITE BACKGROUND for better model visibility
    scene.background = new THREE.Color(0xffffff);
    sceneRef.current = scene;

    const container = mountRef.current;
    const size = container.clientWidth;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;
    controls.enableZoom = true;
    controls.zoomSpeed = 1.2;
    controls.enablePan = true;
    controlsRef.current = controls;

    // Lighting optimized for light background
    const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
    scene.add(ambientLight);
    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 10, 7);
    mainLight.castShadow = true;
    scene.add(mainLight);
    const fillLight = new THREE.DirectionalLight(0xffcc88, 0.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);
    const backLight = new THREE.PointLight(0x88aaff, 0.3);
    backLight.position.set(0, 0, -5);
    scene.add(backLight);
    // Additional fill from below
    const bottomLight = new THREE.PointLight(0xccaa88, 0.2);
    bottomLight.position.set(0, -5, 0);
    scene.add(bottomLight);

    const modelPath = previewModel.modelPath;
    // Check cache
    let geometry = modelCache.get(modelPath);
    if (geometry) {
      const material = new THREE.MeshStandardMaterial({
        color: 0x6d28d9,
        metalness: 0.7,
        roughness: 0.3
      });
      const mesh = new THREE.Mesh(geometry, material);
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const center = new THREE.Vector3();
      box.getCenter(center);
      mesh.position.sub(center);
      const sizeVec = new THREE.Vector3();
      box.getSize(sizeVec);
      const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
      const scale = 4 / maxDim;
      mesh.scale.setScalar(scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      setLoadingModel(false);
      const groupBox = new THREE.Box3().setFromObject(mesh);
      const groupSize = groupBox.getSize(new THREE.Vector3());
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(groupSize.length() / 2 / Math.tan(fov / 2));
      camera.position.set(0, 0, cameraZ * 1.2);
      controls.target.set(0, 0, 0);
      controls.update();
    } else {
      const loader = new STLLoader();
      const material = new THREE.MeshStandardMaterial({
        color: 0x6d28d9,
        metalness: 0.7,
        roughness: 0.3
      });
      loader.load(modelPath, (geo) => {
        modelCache.set(modelPath, geo);
        geometry = geo;
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);
        const sizeVec = new THREE.Vector3();
        box.getSize(sizeVec);
        const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z);
        const scale = 4 / maxDim;
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scale);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        const groupBox = new THREE.Box3().setFromObject(mesh);
        const groupSize = groupBox.getSize(new THREE.Vector3());
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(groupSize.length() / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 1.2);
        controls.target.set(0, 0, 0);
        controls.update();
        setLoadingModel(false);
      }, undefined, (error) => {
        console.error("STL load error:", error);
        setToast({ message: "Failed to load 3D model.", type: "error" });
        setLoadingModel(false);
      });
    }

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newSize = mountRef.current.clientWidth;
      renderer.setSize(newSize, newSize);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, [previewModel, autoRotate]);

  useEffect(() => {
    const cleanup = init3DViewer();
    return cleanup;
  }, [init3DViewer]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.multiplyScalar(0.8);
  };
  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.multiplyScalar(1.2);
  };
  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
    if (controlsRef.current) controlsRef.current.autoRotate = !autoRotate;
  };

  const navigateModels = (direction) => {
    const idx = filteredModels.findIndex(m => m.id === previewModel.id);
    let newIdx = direction === 'next' ? (idx + 1) % filteredModels.length : (idx - 1 + filteredModels.length) % filteredModels.length;
    setPreviewModel(filteredModels[newIdx]);
  };

  const copyShareLink = () => {
    const url = `${window.location.origin}?model=${previewModel.id}`;
    navigator.clipboard.writeText(url);
    setToast({ message: "Link copied to clipboard!", type: "success" });
  };

  const handleDownload = (url, title) => {
    window.open(url, "_blank");
    setToast({ message: `Opening download for ${title}`, type: "info" });
  };

  const handleKeyDown = useCallback((e) => {
    if (!previewModel) return;
    switch(e.key) {
      case 'Escape': setPreviewModel(null); setPreviewImage(null); break;
      case 'ArrowLeft': navigateModels('prev'); break;
      case 'ArrowRight': navigateModels('next'); break;
      case '+': zoomIn(); break;
      case '-': zoomOut(); break;
      case 'r': toggleAutoRotate(); break;
      default: break;
    }
  }, [previewModel, filteredModels]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 py-20">
      <div className="container mx-auto px-6">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-3 mb-6">
              <Box className="w-5 h-5 text-purple-400" />
              <span className="text-gray-300 text-sm font-medium">3D CAD Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              CAD Model{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Showcase</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore precision-engineered 3D models and mechanical designs created with professional CAD software.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-8 text-center border border-gray-700/30 hover:border-purple-500/20 transition-all group"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-purple-500/30">
                    <Icon className="w-7 h-7 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <h3 className="font-semibold text-white text-lg">{stat.label}</h3>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Search & Filter */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-col lg:flex-row gap-6 justify-between mb-8">
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search models by name, description, or features..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-12 pr-8 py-4 bg-gray-800/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                >
                  <option value="popularity">Most Popular</option>
                  <option value="downloads">Most Downloads</option>
                  <option value="complexity">Complexity</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
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
          </motion.div>

          {/* Models Grid */}
          <motion.div variants={itemVariants} className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 bg-gray-800/50 border border-gray-700/50 rounded-full px-6 py-3 mb-6">
                <Layers className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300 text-sm font-medium">Complete Collection</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                All <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">CAD Models</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">Browse our comprehensive collection of mechanical designs and assemblies.</p>
            </div>

            {filteredModels.length === 0 ? (
              <div className="text-center py-20">
                <Box className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No models found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredModels.map((model) => (
                  <motion.div
                    key={model.id}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-700/30 shadow-xl flex flex-col h-full transition-all duration-200 hover:shadow-purple-500/10"
                    whileHover={{ y: -5 }}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-purple-500/5 to-blue-500/5 overflow-hidden">
                      <img 
                        src={model.image} 
                        alt={model.title} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        <span className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white flex items-center gap-1"><Eye className="w-3 h-3" /> {model.views}</span>
                        <span className="bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs text-white flex items-center gap-1"><Download className="w-3 h-3" /> {model.downloads}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold border-2 ${getComplexityColor(model.complexity)}`}>{model.complexity}</span>
                      </div>
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-purple-600/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">{model.software}</span>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{model.title}</h3>
                      <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-1">{model.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-300"><Layers className="w-3 h-3 text-purple-400" /> {model.category}</div>
                        <div className="flex items-center gap-1 text-gray-300"><Box className="w-3 h-3 text-purple-400" /> {model.fileSize}</div>
                        <div className="flex items-center gap-1 text-gray-300"><Calendar className="w-3 h-3 text-purple-400" /> {new Date(model.lastUpdated).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1 text-gray-300"><Download className="w-3 h-3 text-purple-400" /> {model.downloads}</div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {model.features.slice(0, 3).map((f, i) => (
                          <span key={i} className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">{f}</span>
                        ))}
                        {model.features.length > 3 && <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">+{model.features.length-3}</span>}
                      </div>
                      <div className="flex gap-2 pt-3 border-t border-gray-700/50">
                        <button onClick={() => setPreviewModel(model)} className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 rounded-lg text-sm transition">3D View</button>
                        <button onClick={() => setPreviewImage(model)} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleDownload(model.downloadUrl, model.title)} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition"><Download className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Preview Modal */}
      <AnimatePresence>
        {previewModel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4"
            onClick={() => setPreviewModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-700/50">
                <div>
                  <h3 className="text-xl font-bold text-white">{previewModel.title}</h3>
                  <p className="text-sm text-gray-400">{previewModel.category} • {previewModel.software}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowInfoPanel(!showInfoPanel)} className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-lg"><Info className="w-5 h-5" /></button>
                  <button onClick={copyShareLink} className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-lg"><Share2 className="w-5 h-5" /></button>
                  <button onClick={() => setPreviewModel(null)} className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-lg"><X className="w-5 h-5" /></button>
                </div>
              </div>
              <div className="flex flex-1 overflow-hidden">
                <div className={`${showInfoPanel ? 'w-2/3' : 'w-full'} relative flex items-center justify-center bg-gray-800/30 min-h-[400px]`}>
                  {loadingModel && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                      <div className="text-center"><div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><span className="text-white">Loading 3D...</span></div>
                    </div>
                  )}
                  <div ref={mountRef} className="w-full max-w-[500px] aspect-square" />
                  <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    <button onClick={zoomIn} className="p-2 bg-black/50 backdrop-blur rounded-lg text-white"><ZoomIn className="w-5 h-5" /></button>
                    <button onClick={zoomOut} className="p-2 bg-black/50 backdrop-blur rounded-lg text-white"><ZoomOut className="w-5 h-5" /></button>
                    <button onClick={toggleAutoRotate} className={`p-2 backdrop-blur rounded-lg text-white ${autoRotate ? 'bg-green-600/70' : 'bg-black/50'}`}>{autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}</button>
                  </div>
                  {filteredModels.length > 1 && (
                    <>
                      <button onClick={() => navigateModels('prev')} className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full text-white"><ChevronLeft className="w-6 h-6" /></button>
                      <button onClick={() => navigateModels('next')} className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 backdrop-blur rounded-full text-white"><ChevronRight className="w-6 h-6" /></button>
                    </>
                  )}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-black/50 px-2 py-1 rounded">← → | +/- | R | Esc</div>
                </div>
                {showInfoPanel && (
                  <motion.div initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} className="w-1/3 border-l border-gray-700/50 bg-gray-800/30 p-5 overflow-y-auto">
                    <h4 className="font-bold text-white mb-3">Details</h4>
                    <div className="space-y-4 text-sm">
                      <div><p className="text-gray-300">{previewModel.description}</p></div>
                      <div><h5 className="font-medium text-gray-300">Features</h5><div className="flex flex-wrap gap-1 mt-1">{previewModel.features.map(f => <span key={f} className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-xs">{f}</span>)}</div></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div><span className="text-gray-400">Complexity:</span><span className={`ml-2 px-2 py-0.5 rounded text-xs border-2 inline-block mt-1 ${getComplexityColor(previewModel.complexity)}`}>{previewModel.complexity}</span></div>
                        <div><span className="text-gray-400">File Size:</span><div className="text-white">{previewModel.fileSize}</div></div>
                        <div><span className="text-gray-400">Views:</span><div className="text-white">{previewModel.views}</div></div>
                        <div><span className="text-gray-400">Downloads:</span><div className="text-white">{previewModel.downloads}</div></div>
                      </div>
                      <button onClick={() => handleDownload(previewModel.downloadUrl, previewModel.title)} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">Download Model</button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Image Preview Modal */}
      <AnimatePresence>
        {previewImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setPreviewImage(null)}>
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-gray-700/50">
                <h3 className="text-xl font-bold text-white">{previewImage.title}</h3>
                <button onClick={() => setPreviewImage(null)} className="p-1 rounded-full hover:bg-gray-800"><X className="w-6 h-6 text-white" /></button>
              </div>
              <div className="p-4"><img src={previewImage.image} alt={previewImage.title} className="w-full h-auto max-h-[60vh] object-contain rounded-lg bg-gray-800" loading="lazy" /></div>
              <div className="p-4 pt-0"><p className="text-gray-300">{previewImage.description}</p><button onClick={() => handleDownload(previewImage.downloadUrl, previewImage.title)} className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Download Model</button></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default CADModels;
