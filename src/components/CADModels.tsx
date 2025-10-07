import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
      modelPath: "/Models/Spur_Gears.stl",
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
      modelPath: "/Models/Exhaust_Manifold.stl",
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
      modelPath: "/Models/Knuckle_Joint.stl",
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
      modelPath: "/Models/Universal_Coupling.stl",
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
      modelPath: "/Models/Muff_Coupling.stl",
      views: 189,
      downloads: 15,
    },
    {
      title: "Door Lock Mechanism",
      description: "Compact and reliable door lock mechanism featuring latch, spring, and handle components...",
      software: "SolidWorks",category: "Assembly",
      complexity: "Basic",
      features: ["Assembly Modeling", "Motion Simulation", "Tolerance Analysis"],
      image: "/3d Pictures/DOOR LOCK.png",
      downloadUrl: "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
      modelPaths: [
        "/Models/Door lock mechanism base.STL",
        "/Models/Door lock mechanism lock.STL"
      ],
      views: 312,
      downloads: 22
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
      downloads: 18,
    },
    {
      title: "Refrigeration Valves Assembly",
      description:
        "Precision-designed refrigeration valve assembly used for controlling refrigerant flow in HVAC and cooling systems. Includes service, expansion, and solenoid valves optimized for durability, leak-proof operation, and ease of maintenance.",
      software: "SolidWorks",
      category: "Thermal Systems",
      complexity: "Basic",
      features: ["Parametric Design", "Flow Simulation", "Thermal Analysis"],
      image: "/3d Pictures/refrigeration valves.png",
      downloadUrl:
        "https://drive.google.com/file/d/1vwR_r4u5kM9mDazRRgwkHwoYjdYJW1US/view?usp=sharing",
      modelPath: "/Models/Refrigeration_Valves_Assembly.stl",
      views: 342,
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
      case "Expert":
        return "bg-red-500/20 text-red-400 border-red-500/30";
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

  // 3D Viewer
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

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

    const light2 = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light2);

    const loader = new STLLoader();
    loader.load(previewModel.modelPath, (geometry) => {
      const material = new THREE.MeshStandardMaterial({ color: 0x7c3aed, metalness: 0.5, roughness: 0.2 });
      const mesh = new THREE.Mesh(geometry, material);
      geometry.center();

      const boundingBox = new THREE.Box3().setFromObject(mesh);
      const size = boundingBox.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
      camera.position.set(0, 0, cameraZ * 1.5);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      scene.add(mesh);
    });

    const animate = function () {
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
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {model.views}
                </span>
                <span className="bg-black/50 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  {model.downloads}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getComplexityColor(
                    model.complexity
                  )}`}
                >
                  {model.complexity}
                </span>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-purple-600/80 px-3 py-1 rounded-full text-xs text-white">
                  {model.software}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{model.description}</p>

              {/* Features */}
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

              {/* Buttons */}
              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPreviewModel(model)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm border border-purple-500/30"
                >
                  <Eye className="w-4 h-4" /> View 3D Model
                </motion.button>

                <motion.button
                  onClick={() => setPreviewImage(model.image)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-3 rounded-lg text-sm border border-blue-500/30"
                >
                  <Eye className="w-4 h-4" /> View Image
                </motion.button>

                <motion.a
                  href={model.downloadUrl}
                  download
                  className="flex-1 flex items-center justify-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-4 py-3 rounded-lg text-sm border border-gray-600/50"
                >
                  <Download className="w-4 h-4" /> STEP
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Viewer Modal */}
      {previewModel && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-[80vw] h-[80vh] bg-gray-900 rounded-xl p-4">
            <button
              className="absolute top-2 right-2 text-white p-2 hover:bg-gray-700 rounded-full"
              onClick={() => setPreviewModel(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <div
              ref={mountRef}
              className="w-full h-full"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                className="p-2 bg-gray-700/70 rounded-full hover:bg-gray-600/70 text-white"
                onClick={zoomIn}
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                className="p-2 bg-gray-700/70 rounded-full hover:bg-gray-600/70 text-white"
                onClick={zoomOut}
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="relative w-[80vw] h-[80vh] bg-gray-900 rounded-xl flex items-center justify-center">
            <button
              className="absolute top-2 right-2 text-white p-2 hover:bg-gray-700 rounded-full z-10"
              onClick={() => setPreviewImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CADModels;
