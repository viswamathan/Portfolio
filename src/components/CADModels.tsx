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
  Paintbrush,
  Sun,
  Moon,
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const [bgColor, setBgColor] = useState(0x111827);
  const [modelColor, setModelColor] = useState("#4F46E5");
  const mountRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);

  // your existing cadModels[] and categories[] go here (unchanged)
  // shortened for brevity in this snippet
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

  const filteredModels =
    activeCategory === "All"
      ? cadModels
      : cadModels.filter((m) => m.category === activeCategory);

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

  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
    { label: "Downloads", value: "2.5K+", icon: Download, color: "blue" },
    { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
    { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
  ];

  // --- 3D Viewer with Auto-Centering and Scaling ---
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
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
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2;
    controlsRef.current = controls;

    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(50, 50, 50);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

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

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 5 / maxDim;

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(modelColor),
          metalness: 0.6,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);

        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
        camera.lookAt(0, 0, 0);

        setLoadingModel(false);
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
      renderer.dispose();
      scene.clear();
    };
  }, [previewModel, modelColor, bgColor]);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };

  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };

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

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700/50 backdrop-blur-sm"
            >
              <div
                className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}
              >
                <Icon className={`w-6 h-6 text-${stat.color}-400`} />
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

      {/* Models Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredModels.map((model, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg"
          >
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
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{model.description}</p>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPreviewModel(model)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm border border-purple-500/30"
                >
                  <Eye className="w-4 h-4" /> Preview
                </motion.button>
                <a
                  href={model.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-lg text-sm border border-blue-500/30"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Preview Modal */}
      <AnimatePresence>
        {previewModel && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-5xl w-full p-6 relative shadow-2xl border border-gray-700/50"
            >
              <button
                onClick={() => setPreviewModel(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {previewModel.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{previewModel.description}</p>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={zoomIn}
                      className="px-3 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-600/30 flex items-center gap-2"
                    >
                      <ZoomIn size={18} /> Zoom In
                    </button>
                    <button
                      onClick={zoomOut}
                      className="px-3 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-600/30 flex items-center gap-2"
                    >
                      <ZoomOut size={18} /> Zoom Out
                    </button>
                    <button
                      onClick={() => setBgColor(bgColor === 0x111827 ? 0xffffff : 0x111827)}
                      className="px-3 py-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-600/30 flex items-center gap-2"
                    >
                      {bgColor === 0x111827 ? <Sun size={18} /> : <Moon size={18} />} BG
                    </button>
                    <label className="flex items-center gap-2 bg-purple-600/20 text-purple-400 px-3 py-2 rounded-lg border border-purple-500/30 hover:bg-purple-600/30 cursor-pointer">
                      <Paintbrush size={18} />
                      <input
                        type="color"
                        value={modelColor}
                        onChange={(e) => setModelColor(e.target.value)}
                        className="w-6 h-6 border-none bg-transparent cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="relative w-full h-96 bg-gray-800 rounded-lg overflow-hidden">
                    {loadingModel && (
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <Box className="text-purple-400 w-10 h-10" />
                        </motion.div>
                        <span className="text-white ml-3">Loading 3D Model...</span>
                      </div>
                    )}
                    <div ref={mountRef} className="w-full h-full rounded-lg" />
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
