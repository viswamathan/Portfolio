import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Download,
  Eye,
  Layers,
  Award,
  X,
  ZoomIn,
  ZoomOut,
  Image as ImageIcon,
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
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
  ];

  const filteredModels =
    activeCategory === "All"
      ? cadModels
      : cadModels.filter((m) => m.category === activeCategory);

  const getComplexityColor = (complexity) => {
    switch (complexity) {
      case "Beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced":
        return "bg-red-100 text-red-800 border-red-200";
      case "Basic":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredFeatures = (features) => features.slice(0, 4);

  const stats = [
    { label: "Total Models", value: cadModels.length, icon: Box },
    { label: "Downloads", value: "2.5K+", icon: Download },
    { label: "Categories", value: categories.length - 1, icon: Layers },
    { label: "Design Hours", value: "1000+", icon: Award },
  ];

  // --- 3D Viewer effect ---
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
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
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
          color: 0x7f7fff,
          metalness: 0.5,
          roughness: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);

        const groupBox = new THREE.Box3().setFromObject(mesh);
        const groupSize = groupBox.getSize(new THREE.Vector3());
        const groupMax = Math.max(groupSize.x, groupSize.y, groupSize.z);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(groupMax / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        setTimeout(() => setLoadingModel(false), 500);
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
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
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
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-white mb-10 text-center">
        CAD Models Gallery
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 p-5 rounded-xl border border-gray-700 hover:shadow-xl transition duration-300"
          >
            <stat.icon className="w-8 h-8 text-white" />
            <div>
              <p className="text-white text-lg font-bold">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
              activeCategory === cat
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((model) => (
          <motion.div
            key={model.title}
            className="bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={model.image}
              alt={model.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-white mb-3">
                {model.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{model.description}</p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {filteredFeatures(model.features).map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* Complexity & Software */}
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`text-xs px-3 py-1 border rounded-full font-semibold ${getComplexityColor(
                    model.complexity
                  )} shadow-sm`}
                >
                  {model.complexity}
                </span>
                <span className="text-gray-400 text-sm font-semibold">
                  {model.software}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mb-4 gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setPreviewImage(model.image)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-semibold transition"
                  >
                    <ImageIcon className="w-5 h-5" /> Photo
                  </button>
                  <button
                    onClick={() => setPreviewModel(model)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold transition"
                  >
                    <Eye className="w-5 h-5" /> 3D Model
                  </button>
                </div>
                <a
                  href={model.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-white font-semibold transition"
                >
                  <Download className="w-5 h-5" /> Download
                </a>
              </div>

              {/* Views & Downloads */}
              <div className="flex justify-between items-center text-gray-300 text-sm mt-2">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {model.views}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="w-4 h-4" /> {model.downloads}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Preview Modal */}
      {previewModel && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-gray-900 w-full max-w-5xl h-[700px] rounded-lg p-4">
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-3 right-3 text-white p-2"
            >
              <X />
            </button>
            <div ref={mountRef} className="w-full h-full rounded"></div>
            <div className="absolute bottom-5 left-5 flex gap-3">
              <button
                onClick={zoomIn}
                className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-1"
              >
                <ZoomIn /> Zoom In
              </button>
              <button
                onClick={zoomOut}
                className="px-4 py-2 bg-blue-600 rounded-lg text-white flex items-center gap-1"
              >
                <ZoomOut /> Zoom Out
              </button>
            </div>
            {loadingModel && (
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-lg">
                Loading Model...
              </p>
            )}
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative bg-gray-900 w-full max-w-3xl rounded-lg p-4">
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 text-white p-2"
            >
              <X />
            </button>
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
