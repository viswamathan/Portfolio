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
      features: ["3D Assembly Modeling", "Material Visualization", "Sectional & Isometric Views", "Mating Constraints"],
      image: "/3d Pictures/stuffingbox.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
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
      features: ["Servo-Driven Mechanism", "Adjustable Finger Design", "3D Parametric Modeling", "Motion Study Simulation"],
      image: "/3d Pictures/Robotic Gripper.png",
      downloadUrl: "https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Robotic Gripper.STL",
      views: 312,
      downloads: 27,
    },
  ];

  const categories = ["All", "Assembly", "Mechanical Parts", "Automotive", "Industrial", "Thermal Systems", "Robotics", "Aerospace"];

  const filteredModels = activeCategory === "All" ? cadModels : cadModels.filter((m) => m.category === activeCategory);

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

  // ---------- 3D Viewer ----------
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
          color: 0x8ec5fc,
          metalness: 0.5,
          roughness: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
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

  // ---------- Zoom Functions ----------
  const zoomIn = () => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, -0.5);
    }
  };

  const zoomOut = () => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const dir = new THREE.Vector3();
      camera.getWorldDirection(dir);
      camera.position.addScaledVector(dir, 0.5);
    }
  };

  // ---------- JSX ----------
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
              <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
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
            <div className="relative h-64 overflow-hidden group">
              <div className="w-full h-full bg-gray-700 animate-pulse absolute inset-0" id={`skeleton-${i}`} />
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onLoad={() => {
                  const skeleton = document.getElementById(`skeleton-${i}`);
                  if (skeleton) skeleton.style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-4">
                  <button
                    onClick={() => setPreviewModel(model)}
                    className="p-3 bg-purple-600/80 rounded-full text-white hover:bg-purple-700 transition"
                  >
                    <Eye size={22} />
                  </button>
                  <a
                    href={model.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600/80 rounded-full text-white hover:bg-blue-700 transition"
                  >
                    <Download size={22} />
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{model.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {model.features.map((f, idx) => (
                  <span key={idx} className="text-xs bg-gray-700/50 px-2 py-1 rounded-full text-gray-300 border border-gray-600/50">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex justify-between text-sm text-gray-400">
                <span>{model.software}</span>
                <span className={`px-3 py-1 rounded-full border text-xs ${getComplexityColor(model.complexity)}`}>
                  {model.complexity}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Preview Modal */}
      {previewModel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900/90 rounded-2xl p-6 w-full max-w-4xl border border-gray-700 relative">
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800"
            >
              <X size={20} />
            </button>

            <h3 className="text-2xl font-semibold text-white mb-4">{previewModel.title}</h3>

            <div ref={mountRef} className="w-full h-[400px] rounded-lg overflow-hidden border border-gray-700 bg-gray-800 flex items-center justify-center">
              {loadingModel && <p className="text-gray-400">Loading 3D Model...</p>}
            </div>

            {/* Zoom Controls */}
            <div className="flex justify-end gap-3 mt-4">
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
