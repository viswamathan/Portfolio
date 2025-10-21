import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

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
      title: "Servo-Driven Robotic Gripper",
      description:
        "An intelligent robotic gripper actuated by servo motors for precise object handling. Designed in SolidWorks with adjustable finger mechanisms, torque-based control, and lightweight aluminum structure for automation and pick-and-place applications.",
      software: "SolidWorks",
      category: "Robotics",
      complexity: "Advanced",
      features: ["Servo-Driven Mechanism", "Adjustable Finger Design", "3D Parametric Modeling", "Motion Study Simulation"],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl:
        "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
    },
    // Add all other models here as needed...
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
    scene.background = new THREE.Color(0x111827);

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
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
          color: 0x00bfff,
          metalness: 0.5,
          roughness: 0.2,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);

        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(Math.max(size.x, size.y, size.z) / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

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
    return () => window.removeEventListener("resize", handleResize);
  }, [previewModel]);

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
              className="bg-gray-800/50 rounded-xl p-6 text-center border border-gray-700/50"
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
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50 shadow-lg"
          >
            <img
              src={model.image}
              alt={model.title}
              className="w-full h-72 object-cover cursor-pointer"
              onClick={() => setPreviewModel(model)}
            />
            <div className="p-6">
              <div
                className={`inline-block px-3 py-1 mb-3 text-xs font-semibold rounded-full border ${getComplexityColor(
                  model.complexity
                )}`}
              >
                {model.complexity}
              </div>
              <h3 className="text-xl font-bold mb-2">{model.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{model.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={model.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm font-medium hover:underline flex items-center gap-1"
                >
                  Download <Download className="w-4 h-4" />
                </a>
                <span className="text-gray-400 text-sm">
                  {model.views} Views | {model.downloads} Downloads
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Preview Modal */}
      {previewModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-gray-900 rounded-2xl w-full max-w-6xl h-[80vh] relative overflow-hidden">
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-red-600/30 hover:bg-red-600/50"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {loadingModel && (
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <p className="text-white text-lg">Loading 3D Model...</p>
              </div>
            )}

            <div ref={mountRef} className="w-full h-full"></div>

            {/* Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex gap-3">
              <button
                onClick={zoomIn}
                className="p-3 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 border border-green-500/30 flex items-center justify-center"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="p-3 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 border border-red-500/30 flex items-center justify-center"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
