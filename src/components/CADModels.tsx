import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Box, Download, Eye, Layers, Award, X } from "lucide-react";
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
      features: ["3D Assembly Modeling","Material Visualization","Sectional & Isometric Views","Mating Constraints"],
      image: "/3d Pictures/stuffingbox.png",
      downloadUrl:"https://drive.google.com/file/d/1YourDriveLinkHere/view?usp=drive_link",
      modelPath: "/Models/Stuffing Box.STL",
      views: 248,
      downloads: 19,
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

  // --- 3D Viewer with Realistic Lighting, Shadows, and Environment ---
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);

    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      2000
    );
    cameraRef.current = camera;
    camera.position.set(5, 5, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;
    controlsRef.current = controls;

    // Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(10, 10, 10);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-10, 5, 5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
    rimLight.position.set(0, 10, -10);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    // Ground
    const groundGeo = new THREE.PlaneGeometry(200, 200);
    const groundMat = new THREE.ShadowMaterial({ opacity: 0.3 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Load model
    const loader = new STLLoader();
    const meshes = [];
    loader.load(previewModel.modelPath, (geometry) => {
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      geometry.translate(-center.x, -center.y, -center.z);

      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 4 / maxDim;
      const material = new THREE.MeshPhysicalMaterial({
        color: 0x8888ff,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(scaleFactor);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      meshes.push(mesh);

      const groupBox = new THREE.Box3();
      meshes.forEach((m) => groupBox.expandByObject(m));
      const groupSize = groupBox.getSize(new THREE.Vector3());
      const groupMax = Math.max(groupSize.x, groupSize.y, groupSize.z);
      const fov = camera.fov * (Math.PI / 180);
      const cameraZ = Math.abs(groupMax / 2 / Math.tan(fov / 2));
      camera.position.set(0, groupMax / 4, cameraZ * 1.5);
      controls.target.set(0, 0, 0);
      controls.update();

      setTimeout(() => setLoadingModel(false), 500);
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

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, [previewModel]);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };

  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };

  return (
    <div className="container mx-auto px-6 py-20">
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
              <h3 className="text-xl font-bold">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center mb-10 gap-3">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              activeCategory === cat
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-800 text-gray-300 border-gray-700"
            } transition-all`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredModels.map((model, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-700/50 cursor-pointer"
            onClick={() => setPreviewModel(model)}
          >
            <img
              src={model.image}
              alt={model.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{model.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{model.software}</p>
              <span
                className={`px-2 py-1 rounded-full border text-xs font-medium ${getComplexityColor(
                  model.complexity
                )}`}
              >
                {model.complexity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Preview Modal */}
      {previewModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-11/12 md:w-4/5 lg:w-3/5 h-3/4 bg-gray-900 rounded-xl p-4"
          >
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-2">{previewModel.title}</h3>
            <p className="text-gray-400 mb-4">{previewModel.description}</p>

            <div className="absolute top-20 left-4 flex gap-2 z-50">
              <button
                onClick={zoomIn}
                className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/80"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="bg-gray-800/50 p-2 rounded-full hover:bg-gray-700/80"
              >
                <Box className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={mountRef}
              className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center"
            >
              {loadingModel && <p className="text-gray-400">Loading model...</p>}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
