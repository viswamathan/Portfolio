import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut, 
  Search, Filter, SortAsc, Info, 
  ChevronLeft, ChevronRight, Play, Pause,
  RotateCcw, Sun, Moon, Grid3X3, Axis3D
} from "lucide-react";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [viewerMode, setViewerMode] = useState("solid");
  const [lightingMode, setLightingMode] = useState("studio");
  const [showGrid, setShowGrid] = useState(true);
  const [showAxis, setShowAxis] = useState(true);
  
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const isViewerInitialized = useRef(false);

  // ... (your cadModels, categories, filteredModels data remains the same)

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
      fileSize: "4.2 MB"
    },
    {
      id: 2,
      title: "Exhaust Manifold",
      description: "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance. Features smooth flow paths and minimized thermal stresses for durability.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Advanced",
      features: ["Surface Loft", "Shell", "Fillet", "Swept Boss"],
      image: "/3d Pictures/exhaust manifold.png",
      downloadUrl: "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
      modelPath: "/Models/Exhaust manifold.STL",
      views: 500,
      downloads: 25,
      fileSize: "6.7 MB"
    },
    {
      id: 3,
      title: "Knuckle Joint",
      description: "Robust knuckle joint designed for heavy load applications, ensuring secure connections while allowing limited angular movement. Suitable for linkages in structural and mechanical systems.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Revolve", "Extrude Cut", "Chamfer", "Assembly Mates"],
      image: "/3d Pictures/knuckle joint.png",
      downloadUrl: "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
      modelPath: "/Models/KNUCKLE JOINT.STL",
      views: 226,
      downloads: 10,
      fileSize: "3.1 MB"
    },
    {
      id: 4,
      title: "Universal Coupling",
      description: "Precision universal coupling enabling torque transmission between shafts at varying angles. Designed to minimize backlash and maintain smooth power delivery in dynamic conditions.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Beginner",
      features: ["Revolve", "Swept Cut", "Mirror", "Circular Pattern"],
      image: "/3d Pictures/universal coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
      modelPath: "/Models/UNIVERSAL COUPLING.STL",
      views: 189,
      downloads: 15,
      fileSize: "2.8 MB"
    },
    {
      id: 5,
      title: "Muff Coupling",
      description: "Simple and efficient muff coupling designed for rigid torque transmission between co-axial shafts. Features a hollow cylindrical sleeve with key and keyway for secure power transfer.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Basic",
      features: ["Extrude", "Hole Wizard", "Chamfer", "Section View"],
      image: "/3d Pictures/muff coupling.png",
      downloadUrl: "https://drive.google.com/file/d/1swp0ZzEw2iwtmelt6Dzu66cQZQu1cvqz/view?usp=sharing",
      modelPath: "/Models/MUFF COUPLING.STL",
      views: 189,
      downloads: 15,
      fileSize: "2.5 MB"
    },
    {
      id: 6,
      title: "Door Lock Mechanism",
      description: "Compact and reliable door lock mechanism featuring latch, spring, and handle components for secure and smooth operation.",
      software: "SolidWorks",
      category: "Assembly",
      complexity: "Basic",
      features: ["Assembly Mates", "Exploded View", "Motion Study", "Interference Detection"],
      image: "/3d Pictures/DOOR LOCK.png",
      downloadUrl: "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
      modelPath: "/Models/Door lock.STL",
      views: 312,
      downloads: 18,
      fileSize: "5.3 MB"
    },
    {
      id: 7,
      title: "Flanged Tee Pipe Fitting",
      description: "Industrial-grade flanged tee pipe fitting designed for fluid distribution systems. Features precise flanges for secure bolted connections and optimized internal geometry for minimal pressure loss.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Intermediate",
      features: ["Revolve", "Fillet", "Circular Pattern", "Hole Wizard"],
      image: "/3d Pictures/flanged tee pipe fitting.png",
      downloadUrl: "https://drive.google.com/file/d/1hdD_tgdv1UfKgLsE0bWNK6lnudQZs1i3/view?usp=sharing",
      modelPath: "/Models/Flanged Tee Pipe Fitting.STL",
      views: 278,
      downloads: 25,
      fileSize: "4.8 MB"
    },
    {
      id: 8,
      title: "Refrigeration Valves Assembly",
      description: "Precision-designed refrigeration valve assembly used for controlling refrigerant flow in HVAC and cooling systems. Includes service, expansion, and solenoid valves optimized for durability and leak-proof operation.",
      software: "SolidWorks",
      category: "Thermal Systems",
      complexity: "Basic",
      features: ["Assembly Mates", "Configurations", "Bill of Materials", "Exploded View"],
      image: "/3d Pictures/refrigeration valves.png",
      downloadUrl: "https://drive.google.com/file/d/1vwR_r4u5kM9mDazRRgwkHwoYjdYJW1US/view?usp=sharing",
      modelPath: "/Models/Refrigeration Valves.STL",
      views: 342,
      downloads: 27,
      fileSize: "7.2 MB"
    },
    {
      id: 9,
      title: "Connecting Rod (Without Cap)",
      description: "Lightweight connecting rod designed without cap for simplified design analysis and manufacturing demonstration. Optimized cross-section for strength-to-weight ratio and fatigue resistance.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Intermediate",
      features: ["Extrude", "Fillet", "Draft Analysis", "Section Properties"],
      image: "/3d Pictures/connecting rod.png",
      downloadUrl: "https://drive.google.com/file/d/1U4gchYO7Sgz-I0zRMdEkQbriGfLoLmSq/view?usp=sharing",
      modelPath: "/Models/Connecting Rod.STL",
      views: 297,
      downloads: 24,
      fileSize: "3.9 MB"
    },
    {
      id: 10,
      title: "Piston Head",
      description: "High-strength piston head designed for internal combustion engines. Optimized for heat dissipation, minimal friction, and maximum durability under high-pressure conditions.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["Revolve", "Extrude Cut", "Chamfer", "Circular Pattern"],
      image: "/3d Pictures/piston head.png",
      downloadUrl: "https://drive.google.com/file/d/1criIIkz-FtTGruJ2BdK6qApuULku8FCR/view?usp=drive_link",
      modelPath: "/Models/piston head.STL",
      views: 410,
      downloads: 32,
      fileSize: "4.5 MB"
    },
    {
      id: 11,
      title: "Crankshaft",
      description: "Precision crankshaft designed for efficient torque transmission and balanced rotation. Engineered for minimal vibration, maximum fatigue resistance, and high-performance automotive engines.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Basic",
      features: ["Revolve", "Extrude", "Mirror", "Circular Pattern"],
      image: "/3d Pictures/crankshaft.png",
      downloadUrl: "https://drive.google.com/file/d/1KLG7288kK596zJ48CpyFhCJMfTL7E5q5/view?usp=drive_link",
      modelPath: "/Models/crank shaft.STL",
      views: 365,
      downloads: 28,
      fileSize: "5.1 MB"
    },
    {
      id: 12,
      title: "Stuffing Box",
      description: "A sealing assembly designed to prevent fluid leakage around rotating shafts in pumps and valves. Modeled and assembled in SolidWorks with precise dimensional accuracy and material differentiation.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Extrude", "Revolve", "Assembly Mates", "Exploded View"],
      image: "/3d Pictures/stuffingbox.png",
      downloadUrl:"https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Stuffing Box.STL",
      views: 248,
      downloads: 19,
      fileSize: "6.3 MB"
    },
    {
      id: 13,
      title: "Servo-Driven Robotic Gripper",
      description: "An intelligent robotic gripper actuated by servo motors for precise object handling. Designed in SolidWorks with adjustable finger mechanisms, torque-based control, and lightweight aluminum structure for automation and pick-and-place applications.",
      software: "SolidWorks",
      category: "Robotics",
      complexity: "Advanced",
      features: ["Assembly Mates", "Motion Study", "Interference Check", "Exploded View"],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
      fileSize: "8.5 MB"
    },
    {
      id: 14,
      title: "Bevel Gear",
      description: "A precisely modeled straight bevel gear developed in Siemens NX with accurate tooth geometry and optimized surface finish. Designed using Revolve, Through Curve, Mirror, and Arc-based features to ensure efficient torque transmission, smooth meshing, and structural symmetry.",
      software: "Siemens NX",
      category: "Mechanical",
      complexity: "Intermediate",
      features: ["Revolve", "Through Curve", "Mirror Feature", "Synchronous Modeling"],
      image: "/3d Pictures/Bevel Gear.png",
      downloadUrl: "https://drive.google.com/file/d/1TtVjkl4h6yNqSFXxG0R2gVJ2xw3zNqvQ/view?usp=sharing",
      modelPath: "/Models/Bevel Gear.stl",
      views: 380,
      downloads: 18,
      fileSize: "4.2 MB"
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

  // Filter and sort models (same as before)
  const filteredModels = cadModels.filter(model => 
    (activeCategory === "All" || model.category === activeCategory) &&
    (searchQuery === "" || 
      model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.features.some(feature => 
        feature.toLowerCase().includes(searchQuery.toLowerCase())
      ))
  ).sort((a, b) => {
    switch(sortBy) {
      case "popularity":
        return b.views - a.views;
      case "downloads":
        return b.downloads - a.downloads;
      case "complexity":
        const complexityOrder = { "Basic": 0, "Beginner": 1, "Intermediate": 2, "Advanced": 3 };
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      case "newest":
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      default:
        return 0;
    }
  });

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Basic":
        return "bg-green-500/90 text-white border-green-600";
      case "Beginner":
        return "bg-blue-500/90 text-white border-blue-600";
      case "Intermediate":
        return "bg-yellow-500/90 text-white border-yellow-600";
      case "Advanced":
        return "bg-red-500/90 text-white border-red-600";
      default:
        return "bg-gray-500/90 text-white border-gray-600";
    }
  };

  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
    { label: "Downloads", value: cadModels.reduce((sum, model) => sum + model.downloads, 0), icon: Download, color: "blue" },
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
  ];

  // Cleanup function for Three.js resources
  const cleanupThreeJS = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }

    if (sceneRef.current) {
      // Three.js automatically handles scene cleanup when renderer is disposed
      sceneRef.current = null;
    }

    if (mountRef.current) {
      mountRef.current.innerHTML = "";
    }

    isViewerInitialized.current = false;
  }, []);

  // Initialize 3D Viewer with lazy loading
  const init3DViewer = useCallback(async () => {
    if (!previewModel || !mountRef.current || isViewerInitialized.current) return;

    try {
      setLoadingModel(true);
      
      // Dynamically import Three.js to reduce initial bundle size
      const [THREE, STLLoader, OrbitControls] = await Promise.all([
        import('three'),
        import('three/examples/jsm/loaders/STLLoader').then(module => module.STLLoader),
        import('three/examples/jsm/controls/OrbitControls').then(module => module.OrbitControls)
      ]);

      // Cleanup any existing instances
      cleanupThreeJS();

      // Initialize scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x1a1f36);
      sceneRef.current = scene;

      // Setup camera
      const viewerSize = Math.min(mountRef.current.clientWidth, mountRef.current.clientHeight);
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
      camera.position.set(15, 10, 15);

      // Setup renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(viewerSize, viewerSize);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      rendererRef.current = renderer;

      mountRef.current.appendChild(renderer.domElement);

      // Setup controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 2;
      controls.minDistance = 1;
      controls.maxDistance = 100;

      // Setup lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(50, 50, 50);
      directionalLight.castShadow = true;
      scene.add(directionalLight);

      // Load model
      const loader = new STLLoader();
      const modelPath = previewModel.modelPath;

      try {
        const geometry = await new Promise((resolve, reject) => {
          loader.load(modelPath, resolve, undefined, reject);
        });

        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();
        geometry.center();

        const material = new THREE.MeshPhysicalMaterial({
          color: 0x4f46e5,
          metalness: 0.7,
          roughness: 0.2,
          clearcoat: 0.8,
          clearcoatRoughness: 0.1,
          wireframe: viewerMode === "wireframe",
          transparent: viewerMode === "transparent",
          opacity: viewerMode === "transparent" ? 0.7 : 1.0
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const scale = 8 / geometry.boundingSphere.radius;
        mesh.scale.setScalar(scale);

        scene.add(mesh);

        // Position camera
        const maxDim = geometry.boundingSphere.radius * 2;
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * 1.5;

        camera.position.set(cameraZ, cameraZ * 0.7, cameraZ);
        controls.target.set(0, 0, 0);
        controls.update();

        setLoadingModel(false);
        isViewerInitialized.current = true;

      } catch (error) {
        console.error('Error loading model:', error);
        setLoadingModel(false);
        return;
      }

      // Animation loop
      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

    } catch (error) {
      console.error('Error initializing 3D viewer:', error);
      setLoadingModel(false);
    }
  }, [previewModel, autoRotate, viewerMode, cleanupThreeJS]);

  // Initialize viewer when previewModel changes
  useEffect(() => {
    if (previewModel) {
      init3DViewer();
    }

    return () => {
      // Cleanup when component unmounts or previewModel changes
      cleanupThreeJS();
    };
  }, [previewModel, init3DViewer, cleanupThreeJS]);

  // Handle viewer mode changes
  useEffect(() => {
    if (!sceneRef.current || !isViewerInitialized.current) return;

    sceneRef.current.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.wireframe = viewerMode === "wireframe";
        child.material.transparent = viewerMode === "transparent";
        child.material.opacity = viewerMode === "transparent" ? 0.7 : 1.0;
        child.material.needsUpdate = true;
      }
    });
  }, [viewerMode]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      
      const viewerSize = Math.min(mountRef.current.clientWidth, mountRef.current.clientHeight);
      rendererRef.current.setSize(viewerSize, viewerSize);
      cameraRef.current.aspect = 1;
      cameraRef.current.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simple viewer controls (placeholder functions)
  const zoomIn = () => {
    // Implementation would go here
    console.log('Zoom in');
  };

  const zoomOut = () => {
    // Implementation would go here
    console.log('Zoom out');
  };

  const resetCamera = () => {
    // Implementation would go here
    console.log('Reset camera');
  };

  const toggleAutoRotate = () => {
    setAutoRotate(!autoRotate);
  };

  const navigateModels = (direction) => {
    const currentIndex = filteredModels.findIndex(model => model.id === previewModel.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredModels.length;
    } else {
      newIndex = (currentIndex - 1 + filteredModels.length) % filteredModels.length;
    }
    
    setPreviewModel(filteredModels[newIndex]);
    setCurrentModelIndex(newIndex);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!previewModel) return;
      
      switch(e.key) {
        case 'Escape':
          setPreviewModel(null);
          break;
        case 'ArrowLeft':
          navigateModels('prev');
          break;
        case 'ArrowRight':
          navigateModels('next');
          break;
        case '+':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case 'r':
        case 'R':
          resetCamera();
          break;
        case ' ':
          toggleAutoRotate();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [previewModel, filteredModels]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          CAD Model{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Showcase
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our collection of precision-engineered 3D models for engineering, design, and manufacturing applications.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 sm:p-6 text-center border border-gray-700/50"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-${stat.color}-400`} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="pl-10 pr-8 py-2 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="downloads">Most Downloads</option>
              <option value="complexity">Complexity</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-12 flex flex-wrap justify-center gap-2 sm:gap-3">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all relative ${
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
      {filteredModels.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No models found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
          {filteredModels.map((model, i) => (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg"
            >
              {/* Model Card Content */}
              <div className="relative h-48 sm:h-64 overflow-hidden group">
                <div className="w-full h-full bg-gray-700 animate-pulse absolute inset-0" id={`skeleton-${model.id}`} />
                <img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                  onLoad={() => {
                    const skeleton = document.getElementById(`skeleton-${model.id}`);
                    if (skeleton) skeleton.style.display = "none";
                  }}
                  onError={() => {
                    const skeleton = document.getElementById(`skeleton-${model.id}`);
                    if (skeleton) skeleton.style.display = "none";
                  }}
                />
                {/* ... rest of card content */}
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-1">{model.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{model.description}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
                  {model.features.slice(0, 3).map((f, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs border border-purple-500/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => setPreviewImage(model)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm border border-green-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> Photo
                  </motion.button>
                  <motion.button
                    onClick={() => setPreviewModel(model)}
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm border border-purple-500/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Box className="w-3 h-3 sm:w-4 sm:h-4" /> 3D
                  </motion.button>
                  <a
                    href={model.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm border border-blue-500/30"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" /> Download
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* 3D Preview Modal */}
      <AnimatePresence>
        {previewModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewModel(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-700/50">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{previewModel.title}</h3>
                  <p className="text-gray-400 text-sm">{previewModel.category} • {previewModel.software}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowInfoPanel(!showInfoPanel)}
                    className={`p-2 rounded-lg border ${
                      showInfoPanel 
                        ? "bg-purple-600/70 border-purple-500/50 text-white" 
                        : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:text-white"
                    }`}
                  >
                    <Info className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setPreviewModel(null)}
                    className="p-2 text-gray-300 hover:text-white bg-gray-800/50 rounded-lg border border-gray-700/50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                <div className={`${showInfoPanel ? 'w-2/3' : 'w-full'} relative flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800`}>
                  {loadingModel && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-gray-800/80">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <span className="text-white text-lg">Loading 3D Model...</span>
                      </div>
                    </div>
                  )}
                  <div 
                    ref={mountRef} 
                    className="w-96 h-96 max-w-full max-h-full flex items-center justify-center"
                  />
                  
                  {/* Viewer Controls */}
                  <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                    <button
                      onClick={zoomIn}
                      className="p-2 bg-gray-800/70 backdrop-blur-sm text-white rounded-lg border border-gray-700/50 hover:bg-gray-700/70"
                      title="Zoom In [+]"
                    >
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button
                      onClick={zoomOut}
                      className="p-2 bg-gray-800/70 backdrop-blur-sm text-white rounded-lg border border-gray-700/50 hover:bg-gray-700/70"
                      title="Zoom Out [-]"
                    >
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button
                      onClick={resetCamera}
                      className="p-2 bg-gray-800/70 backdrop-blur-sm text-white rounded-lg border border-gray-700/50 hover:bg-gray-700/70"
                      title="Reset Camera [R]"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={toggleAutoRotate}
                      className={`p-2 backdrop-blur-sm text-white rounded-lg border ${
                        autoRotate 
                          ? "bg-green-600/70 border-green-500/50 hover:bg-green-700/70" 
                          : "bg-gray-800/70 border-gray-700/50 hover:bg-gray-700/70"
                      }`}
                      title={autoRotate ? "Pause Rotation [Space]" : "Auto Rotate [Space]"}
                    >
                      {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* View Mode Controls */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700/50 p-1 flex">
                      <button
                        onClick={() => setViewerMode("solid")}
                        className={`p-2 rounded-md ${
                          viewerMode === "solid" ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <Box className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewerMode("wireframe")}
                        className={`p-2 rounded-md ${
                          viewerMode === "wireframe" ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewerMode("transparent")}
                        className={`p-2 rounded-md ${
                          viewerMode === "transparent" ? "bg-purple-600 text-white" : "text-gray-300 hover:text-white"
                        }`}
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Navigation */}
                  {filteredModels.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateModels('prev')}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/70 backdrop-blur-sm text-white rounded-full border border-gray-700/50 hover:bg-gray-700/70"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => navigateModels('next')}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800/70 backdrop-blur-sm text-white rounded-full border border-gray-700/50 hover:bg-gray-700/70"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Info Panel */}
                {showInfoPanel && (
                  <motion.div 
                    initial={{ x: 300 }}
                    animate={{ x: 0 }}
                    exit={{ x: 300 }}
                    className="w-1/3 border-l border-gray-700/50 bg-gray-800/30 p-4 sm:p-6 overflow-y-auto"
                  >
                    <h4 className="text-lg font-bold text-white mb-4">Model Details</h4>
                    <div className="space-y-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-1">Description</h5>
                        <p className="text-sm text-gray-300">{previewModel.description}</p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-1">Features</h5>
                        <div className="flex flex-wrap gap-2">
                          {previewModel.features.map((f, idx) => (
                            <span key={idx} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs border border-purple-500/30">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">Complexity</h5>
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-2 ${getComplexityColor(previewModel.complexity)}`}>
                            {previewModel.complexity}
                          </span>
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-400 mb-1">File Size</h5>
                          <p className="text-sm text-gray-300">{previewModel.fileSize}</p>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-700/50">
                        <a
                          href={previewModel.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg text-sm font-medium"
                        >
                          <Download className="w-4 h-4" /> Download Model
                        </a>
                      </div>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-700/50">
                <div>
                  <h3 className="text-2xl font-bold text-white">{previewImage.title}</h3>
                  <p className="text-gray-400">{previewImage.category} • {previewImage.software}</p>
                </div>
                <button onClick={() => setPreviewImage(null)} className="p-2 text-gray-300 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden mb-6">
                  <img src={previewImage.image} alt={previewImage.title} className="w-full h-full object-contain" />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Description</h4>
                    <p className="text-gray-300">{previewImage.description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewImage.features.map((f, idx) => (
                        <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700/50">
                    <a
                      href={previewImage.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      <Download className="w-4 h-4" /> Download Model
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CADModels;
