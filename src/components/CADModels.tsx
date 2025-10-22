import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut, 
  Search, Filter, SortAsc, Info, Clock, FileText, Users,
  ChevronLeft, ChevronRight, Play, Pause, Share2, Bookmark,
  Cpu, Zap, Settings, Factory, Car, Robot, Thermometer
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [bookmarkedModels, setBookmarkedModels] = useState(new Set());
  
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);

  const categoryIcons = {
    "Mechanical Parts": Settings,
    "Automotive": Car,
    "Industrial": Factory,
    "Assembly": Cpu,
    "Thermal Systems": Thermometer,
    "Robotics": Robot,
    "Aerospace": Zap
  };

  const cadModels = [
    {
      id: 1,
      title: "Pair of Spur Gears",
      description: "Precision-engineered spur gear pair with optimized module and pressure angle for smooth torque transmission and minimal vibration under varying loads.",
      software: "SolidWorks",
      category: "Mechanical Parts",
      complexity: "Intermediate",
      features: ["Parametric Design", "Gear Ratio Analysis", "Motion Study", "FEA Ready"],
      image: "/3d Pictures/gear profile.png",
      downloadUrl: "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
      modelPath: "/Models/Spur Gear profile.STL",
      views: 1247,
      downloads: 89,
      fileSize: "4.2 MB",
      lastUpdated: "2023-10-15",
      designTime: "12 hours",
      triangles: "45K",
      materials: ["Steel", "Alloy"],
      tags: ["Transmission", "Mechanical", "Precision"]
    },
    {
      id: 2,
      title: "Exhaust Manifold",
      description: "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance. Features smooth flow paths and minimized thermal stresses.",
      software: "SolidWorks",
      category: "Automotive",
      complexity: "Advanced",
      features: ["Flow Simulation", "Thermal Analysis", "Parametric Design", "CFD Ready"],
      image: "/3d Pictures/exhaust manifold.png",
      downloadUrl: "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
      modelPath: "/Models/Exhaust manifold.STL",
      views: 500,
      downloads: 25,
      fileSize: "6.7 MB",
      lastUpdated: "2023-09-22",
      designTime: "18 hours",
      triangles: "78K",
      materials: ["Stainless Steel", "Cast Iron"],
      tags: ["Automotive", "Performance", "Thermal"]
    },
    {
      id: 3,
      title: "Robotic Gripper Assembly",
      description: "Advanced servo-driven robotic gripper with adjustable finger mechanisms for precise object handling in industrial automation applications.",
      software: "SolidWorks",
      category: "Robotics",
      complexity: "Advanced",
      features: ["Servo Mechanism", "Motion Study", "Assembly Modeling", "Force Analysis"],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
      fileSize: "8.5 MB",
      lastUpdated: "2023-11-30",
      designTime: "24 hours",
      triangles: "92K",
      materials: ["Aluminum", "Plastic", "Steel"],
      tags: ["Automation", "Robotics", "Precision"]
    },
    {
      id: 4,
      title: "Turbofan Engine Blade",
      description: "High-performance turbofan engine blade designed for optimal aerodynamic efficiency and structural integrity under extreme conditions.",
      software: "CATIA",
      category: "Aerospace",
      complexity: "Expert",
      features: ["Aerodynamic Analysis", "Thermal Simulation", "Composite Materials", "FEA Optimized"],
      image: "/3d Pictures/turbofan-blade.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Turbofan Blade.STL",
      views: 890,
      downloads: 67,
      fileSize: "12.3 MB",
      lastUpdated: "2023-11-15",
      designTime: "32 hours",
      triangles: "156K",
      materials: ["Titanium Alloy", "Composite"],
      tags: ["Aerospace", "High-Performance", "Aerodynamic"]
    },
    {
      id: 5,
      title: "Hydraulic Cylinder Assembly",
      description: "Complete hydraulic cylinder assembly with precision-machined components for heavy-duty industrial applications.",
      software: "SolidWorks",
      category: "Industrial",
      complexity: "Intermediate",
      features: ["Fluid Dynamics", "Pressure Analysis", "Assembly Modeling", "Tolerance Stack"],
      image: "/3d Pictures/hydraulic-cylinder.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Hydraulic Cylinder.STL",
      views: 423,
      downloads: 38,
      fileSize: "7.8 MB",
      lastUpdated: "2023-10-28",
      designTime: "16 hours",
      triangles: "68K",
      materials: ["Chromed Steel", "Brass", "Rubber"],
      tags: ["Hydraulic", "Industrial", "Heavy-Duty"]
    }
  ];

  const categories = [
    "All",
    "Mechanical Parts",
    "Automotive",
    "Industrial",
    "Assembly",
    "Thermal Systems",
    "Robotics",
    "Aerospace",
  ];

  // Filter and sort models
  const filteredModels = cadModels
    .filter(model => 
      (activeCategory === "All" || model.category === activeCategory) &&
      (searchQuery === "" || 
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        model.tags.some(tag => 
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        ))
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "popularity":
          return b.views - a.views;
        case "downloads":
          return b.downloads - a.downloads;
        case "complexity":
          const complexityOrder = { "Basic": 0, "Intermediate": 1, "Advanced": 2, "Expert": 3 };
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
        return "from-green-500 to-emerald-500";
      case "Intermediate":
        return "from-blue-500 to-cyan-500";
      case "Advanced":
        return "from-purple-500 to-pink-500";
      case "Expert":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getComplexityBg = (complexity) => {
    switch (complexity) {
      case "Basic":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30";
      case "Intermediate":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30";
      case "Advanced":
        return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30";
      case "Expert":
        return "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30";
      default:
        return "bg-gradient-to-r from-gray-500/20 to-gray-600/20 border-gray-500/30";
    }
  };

  const stats = [
    { label: "Premium Models", value: cadModels.length, icon: Box, color: "from-purple-500 to-pink-500" },
    { label: "Total Downloads", value: cadModels.reduce((sum, model) => sum + model.downloads, 0), icon: Download, color: "from-blue-500 to-cyan-500" },
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "from-green-500 to-emerald-500" },
    { label: "Design Hours", value: cadModels.reduce((sum, model) => sum + parseInt(model.designTime), 0) + "+", icon: Award, color: "from-orange-500 to-red-500" },
  ];

  const toggleBookmark = (modelId) => {
    const newBookmarks = new Set(bookmarkedModels);
    if (newBookmarks.has(modelId)) {
      newBookmarks.delete(modelId);
    } else {
      newBookmarks.add(modelId);
    }
    setBookmarkedModels(newBookmarks);
  };

  // Enhanced 3D Viewer
  const init3DViewer = useCallback(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    // Clean up previous scene
    if (sceneRef.current) {
      while(sceneRef.current.children.length > 0) { 
        sceneRef.current.remove(sceneRef.current.children[0]); 
      }
    }

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    sceneRef.current = scene;

    const viewerSize = Math.min(mountRef.current.clientWidth, mountRef.current.clientHeight);
    
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(viewerSize, viewerSize);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 2;
    controls.minDistance = 1;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // Premium lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(50, 50, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-50, 50, -50);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, -50, -50);
    scene.add(rimLight);

    const loader = new STLLoader();
    const modelPaths = previewModel.modelPaths || [previewModel.modelPath];

    const loadModel = (path) => {
      return new Promise((resolve, reject) => {
        loader.load(
          path,
          (geometry) => {
            geometry.computeVertexNormals();
            geometry.computeBoundingBox();
            
            const box = geometry.boundingBox;
            const center = new THREE.Vector3();
            box.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);

            const material = new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(0x3b82f6),
              metalness: 0.8,
              roughness: 0.2,
              clearcoat: 1.0,
              clearcoatRoughness: 0.1,
              reflectivity: 1.0,
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            scene.add(mesh);
            resolve(mesh);
          },
          undefined,
          reject
        );
      });
    };

    Promise.all(modelPaths.map(loadModel))
      .then((meshes) => {
        const groupBox = new THREE.Box3();
        meshes.forEach((m) => groupBox.expandByObject(m));
        
        const groupSize = groupBox.getSize(new THREE.Vector3());
        const groupMax = Math.max(groupSize.x, groupSize.y, groupSize.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(groupMax / 2 / Math.tan(fov / 2));
        
        camera.position.set(0, groupMax * 0.1, cameraZ * 1.8);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        controls.update();

        setLoadingModel(false);
      })
      .catch(error => {
        console.error("Error loading models:", error);
        setLoadingModel(false);
      });

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const viewerSize = Math.min(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setSize(viewerSize, viewerSize);
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [previewModel, autoRotate]);

  useEffect(() => {
    const cleanup = init3DViewer();
    return cleanup;
  }, [init3DViewer]);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
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
    const currentIndex = filteredModels.findIndex(model => model.id === previewModel.id);
    let newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredModels.length
      : (currentIndex - 1 + filteredModels.length) % filteredModels.length;
    
    setPreviewModel(filteredModels[newIndex]);
    setCurrentModelIndex(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">Premium CAD Collection</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Engineering
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover our curated collection of high-precision 3D models designed for professional 
            engineering applications and advanced manufacturing processes.
          </p>
        </motion.div>

        {/* Premium Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search models by name, features, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="pl-12 pr-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none backdrop-blur-sm"
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
          <div className="flex flex-wrap gap-3 mt-6">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] || Layers;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all relative backdrop-blur-sm ${
                    activeCategory === cat
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                  {cat}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Premium Models Grid */}
        {filteredModels.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-400 text-xl mb-2">No models found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {filteredModels.map((model, i) => {
              const CategoryIcon = categoryIcons[model.category] || Settings;
              return (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02, y: -8 }}
                  className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl"
                >
                  {/* Premium Image Header */}
                  <div className="relative h-60 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                      src={model.image}
                      alt={model.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Premium Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
                      <span className="bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3 h-3" /> {model.views.toLocaleString()}
                      </span>
                      <span className="bg-gradient-to-r from-green-500/90 to-emerald-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-lg">
                        <Download className="w-3 h-3" /> {model.downloads}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 items-end">
                      <span className={`px-3 py-1.5 rounded-full text-xs text-white font-medium border backdrop-blur-sm ${getComplexityBg(model.complexity)}`}>
                        {model.complexity}
                      </span>
                      <button
                        onClick={() => toggleBookmark(model.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-all ${
                          bookmarkedModels.has(model.id)
                            ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                            : "bg-white/10 text-gray-300 border-white/20 hover:bg-white/20"
                        } border`}
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarkedModels.has(model.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                      <div className="bg-gradient-to-r from-purple-500/90 to-pink-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs text-white font-medium flex items-center gap-1.5 shadow-lg">
                        <CategoryIcon className="w-3 h-3" />
                        {model.software}
                      </div>
                    </div>
                  </div>

                  {/* Premium Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white line-clamp-1 flex-1">{model.title}</h3>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2 leading-relaxed">{model.description}</p>
                    
                    {/* Technical Specs */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <FileText className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Size</div>
                        <div className="text-sm text-white font-medium">{model.fileSize}</div>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <Cpu className="w-4 h-4 text-green-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Triangles</div>
                        <div className="text-sm text-white font-medium">{model.triangles}</div>
                      </div>
                      <div className="text-center p-2 bg-white/5 rounded-lg">
                        <Clock className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                        <div className="text-xs text-gray-400">Design Time</div>
                        <div className="text-sm text-white font-medium">{model.designTime}</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {model.features.slice(0, 2).map((f, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 px-3 py-1.5 rounded-full text-xs border border-blue-500/30 backdrop-blur-sm"
                        >
                          {f}
                        </span>
                      ))}
                      {model.features.length > 2 && (
                        <span className="bg-white/10 text-gray-300 px-3 py-1.5 rounded-full text-xs border border-white/10 backdrop-blur-sm">
                          +{model.features.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => setPreviewImage(model)}
                        className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-medium border border-white/10 backdrop-blur-sm transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Eye className="w-4 h-4" /> Preview
                      </motion.button>
                      <motion.button
                        onClick={() => setPreviewModel(model)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Box className="w-4 h-4" /> 3D View
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Premium 3D Viewer Modal */}
        <AnimatePresence>
          {previewModel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewModel(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Premium Header */}
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-8 bg-gradient-to-b ${getComplexityColor(previewModel.complexity)} rounded-full`} />
                    <div>
                      <h3 className="text-2xl font-bold text-white">{previewModel.title}</h3>
                      <p className="text-gray-400 flex items-center gap-2">
                        <span>{previewModel.category}</span>
                        <span>•</span>
                        <span>{previewModel.software}</span>
                        <span>•</span>
                        <span>{previewModel.triangles} triangles</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowInfoPanel(!showInfoPanel)}
                      className="p-3 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
                      title="Model Information"
                    >
                      <Info className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setPreviewModel(null)}
                      className="p-3 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* 3D Viewer */}
                  <div className={`${showInfoPanel ? 'w-2/3' : 'w-full'} relative flex items-center justify-center p-8`}>
                    {loadingModel && (
                      <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/80 rounded-2xl">
                        <div className="text-center">
                          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                          <span className="text-white text-lg font-medium">Loading Premium Model...</span>
                        </div>
                      </div>
                    )}
                    <div 
                      ref={mountRef} 
                      className="w-96 h-96 max-w-full max-h-full flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-2xl"
                    />
                    
                    {/* Premium Controls */}
                    <div className="absolute bottom-6 left-6 flex gap-3">
                      <button
                        onClick={zoomIn}
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-5 h-5" />
                      </button>
                      <button
                        onClick={zoomOut}
                        className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-5 h-5" />
                      </button>
                      <button
                        onClick={toggleAutoRotate}
                        className={`p-3 backdrop-blur-sm text-white rounded-xl border transition-all duration-300 shadow-lg ${
                          autoRotate 
                            ? "bg-green-500/20 hover:bg-green-500/30 border-green-500/30" 
                            : "bg-white/10 hover:bg-white/20 border-white/10"
                        }`}
                        title={autoRotate ? "Pause Rotation" : "Auto Rotate"}
                      >
                        {autoRotate ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Navigation */}
                    {filteredModels.length > 1 && (
                      <>
                        <button
                          onClick={() => navigateModels('prev')}
                          className="absolute left-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => navigateModels('next')}
                          className="absolute right-6 top-1/2 transform -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Premium Info Panel */}
                  {showInfoPanel && (
                    <motion.div 
                      initial={{ x: 300 }}
                      animate={{ x: 0 }}
                      exit={{ x: 300 }}
                      className="w-1/3 border-l border-white/10 bg-white/5 backdrop-blur-sm p-6 overflow-y-auto"
                    >
                      <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="flex gap-3">
                          <a
                            href={previewModel.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 transition-all duration-300"
                          >
                            <Download className="w-4 h-4" /> Download
                          </a>
                          <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-all duration-300">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toggleBookmark(previewModel.id)}
                            className={`p-3 rounded-xl border transition-all duration-300 ${
                              bookmarkedModels.has(previewModel.id)
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-white/10 hover:bg-white/20 text-white border-white/10"
                            }`}
                          >
                            <Bookmark className={`w-4 h-4 ${bookmarkedModels.has(previewModel.id) ? "fill-current" : ""}`} />
                          </button>
                        </div>

                        {/* Technical Specifications */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                          <div>
                            <div className="text-sm text-gray-400 mb-1">File Size</div>
                            <div className="text-white font-medium">{previewModel.fileSize}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Design Time</div>
                            <div className="text-white font-medium">{previewModel.designTime}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Triangles</div>
                            <div className="text-white font-medium">{previewModel.triangles}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Last Updated</div>
                            <div className="text-white font-medium">{new Date(previewModel.lastUpdated).toLocaleDateString()}</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Key Features</h4>
                          <div className="space-y-2">
                            {previewModel.features.map((f, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                <span className="text-sm text-gray-300">{f}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Materials */}
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Materials</h4>
                          <div className="flex flex-wrap gap-2">
                            {previewModel.materials.map((material, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-white/10 text-gray-300 rounded-full text-xs border border-white/10"
                              >
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        <div>
                          <h4 className="text-lg font-bold text-white mb-3">Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {previewModel.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
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
              className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setPreviewImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center p-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{previewImage.title}</h3>
                    <p className="text-gray-400">{previewImage.category} • {previewImage.software}</p>
                  </div>
                  <button
                    onClick={() => setPreviewImage(null)}
                    className="p-3 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-auto p-8">
                  <div className="relative w-full h-96 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl overflow-hidden border border-white/10 mb-6">
                    <img
                      src={previewImage.image}
                      alt={previewImage.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">Design Overview</h4>
                      <p className="text-gray-300 leading-relaxed">{previewImage.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">Technical Features</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {previewImage.features.map((f, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            <span className="text-gray-300">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-white/10">
                      <a
                        href={previewImage.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-4 rounded-xl text-sm font-medium shadow-lg shadow-blue-500/25 transition-all duration-300"
                      >
                        <Download className="w-5 h-5" /> Download CAD Model
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CADModels;
