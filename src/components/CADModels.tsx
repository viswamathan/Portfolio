import React, { useState, useEffect, useRef } from "react";
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
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("None");
  const [previewModel, setPreviewModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  const cadModels = [
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
        "Optimized exhaust manifold designed for efficient gas flow, reduced backpressure, and improved engine performance.",
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
  ];

  const categories = [
    "All",
    "Assembly",
    "Mechanical Parts",
    "Automotive",
    "Industrial",
    "Thermal Systems",
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

  // --- Filtering and Sorting ---
  const filteredModels = cadModels
    .filter(
      (m) =>
        (activeCategory === "All" || m.category === activeCategory) &&
        (m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.features.some((f) =>
            f.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    )
    .sort((a, b) => {
      if (sortBy === "Views") return b.views - a.views;
      if (sortBy === "Downloads") return b.downloads - a.downloads;
      if (sortBy === "Complexity")
        return a.complexity.localeCompare(b.complexity);
      return 0;
    });

  // --- 3D Viewer Setup ---
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    // Clean previous scene
    if (rendererRef.current) {
      rendererRef.current.dispose();
      mountRef.current.innerHTML = "";
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
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
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    const lights = [
      new THREE.DirectionalLight(0xffffff, 1),
      new THREE.DirectionalLight(0xffffff, 0.6),
    ];
    lights[0].position.set(50, 50, 50);
    lights[1].position.set(-50, -50, -50);
    scene.add(...lights, new THREE.AmbientLight(0xffffff, 0.6));

    const loader = new STLLoader();
    loader.load(
      previewModel.modelPath,
      (geometry) => {
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        geometry.translate(-center.x, -center.y, -center.z);

        const material = new THREE.MeshStandardMaterial({
          color: 0x6699ff,
          metalness: 0.6,
          roughness: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 5 / maxDim;
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);

        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2.5);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        setTimeout(() => setLoadingModel(false), 600);
      },
      undefined,
      () => setLoadingModel(false)
    );

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [previewModel]);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };
  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };
  const resetView = () => {
    if (controlsRef.current) controlsRef.current.reset();
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center"
      >
        CAD Model{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Showcase
        </span>
      </motion.h2>

      {/* Search and Sort */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <div className="flex items-center bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700/50">
          <Search className="text-gray-400 w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search models..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-gray-200 outline-none"
          />
        </div>
        <div className="flex items-center bg-gray-800/60 px-4 py-2 rounded-lg border border-gray-700/50">
          <Filter className="text-gray-400 w-4 h-4 mr-2" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-gray-200 outline-none"
          >
            <option>None</option>
            <option>Views</option>
            <option>Downloads</option>
            <option>Complexity</option>
          </select>
        </div>
      </div>

      {/* Category Filter */}
      <div className="sticky top-4 z-20 flex flex-wrap justify-center gap-3 mb-12 bg-gray-900/70 p-4 rounded-xl backdrop-blur-md">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                : "bg-gray-800/40 text-gray-300 hover:bg-gray-700/50"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* Model Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
          {filteredModels.map((model, i) => (
            <motion.div
              key={i}
              layout
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 border border-gray-700/50 rounded-2xl shadow-lg overflow-hidden backdrop-blur-md"
            >
              <div className="relative h-56 group">
                <img
                  src={model.image}
                  alt={model.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Eye className="w-3 h-3" /> {model.views}
                  </span>
                  <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Download className="w-3 h-3" /> {model.downloads}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-1">{model.title}</h3>
                <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                  {model.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {model.features.slice(0, 2).map((f, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30"
                    >
                      {f}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={() => setPreviewModel(model)}
                    className="flex-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-500/30 px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1"
                  >
                    <Eye className="w-4 h-4" /> Preview
                  </motion.button>
                  <a
                    href={model.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 3D Preview Modal */}
      <AnimatePresence>
        {previewModel && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gray-900 rounded-2xl max-w-5xl w-full p-6 relative shadow-2xl"
            >
              <button
                onClick={() => setPreviewModel(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <h3 className="text-2xl font-bold text-white mb-2">
                {previewModel.title}
              </h3>
              <p className="text-gray-400 mb-4">{previewModel.description}</p>

              <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                {loadingModel && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/40 backdrop-blur-sm">
                    <span className="text-white animate-pulse text-lg">
                      Loading 3D Model...
                    </span>
                  </div>
                )}
                <div ref={mountRef} className="w-full h-full" />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={zoomIn}
                  className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-600/30"
                >
                  <ZoomIn className="inline-block mr-1 w-4 h-4" /> Zoom In
                </button>
                <button
                  onClick={zoomOut}
                  className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-600/30"
                >
                  <ZoomOut className="inline-block mr-1 w-4 h-4" /> Zoom Out
                </button>
                <button
                  onClick={resetView}
                  className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30"
                >
                  <RefreshCw className="inline-block mr-1 w-4 h-4" /> Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CADModels;
