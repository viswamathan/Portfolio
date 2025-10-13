import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
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
} from "lucide-react";
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
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const meshesRef = useRef([]);

  // ✅ Pre-cache STL models
  const stlCache = useMemo(() => new Map(), []);

  // Model Data (Static)
  const cadModels = useMemo(
    () => [
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
      },
      {
        title: "Exhaust Manifold",
        description:
          "Optimized exhaust manifold designed for efficient gas flow and reduced backpressure.",
        software: "SolidWorks",
        category: "Automotive",
        complexity: "Advanced",
        image: "/3d Pictures/exhaust manifold.png",
        downloadUrl:
          "https://drive.google.com/file/d/1gSdm1ro2u_3ZhIzegXzAI3INK1gj24mp/view?usp=sharing",
        modelPath: "/Models/Exhaust manifold.STL",
      },
      {
        title: "Knuckle Joint",
        description:
          "Robust knuckle joint for heavy load applications allowing angular movement.",
        software: "SolidWorks",
        category: "Mechanical Parts",
        complexity: "Intermediate",
        image: "/3d Pictures/knuckle joint.png",
        downloadUrl:
          "https://drive.google.com/file/d/1Hh5q3akmigDoskDe_LOv58-YAJ3TAzuu/view?usp=sharing",
        modelPath: "/Models/KNUCKLE JOINT.STL",
      },
      {
        title: "Universal Coupling",
        description:
          "Coupling enabling torque transmission between shafts at varying angles.",
        software: "SolidWorks",
        category: "Industrial",
        complexity: "Beginner",
        image: "/3d Pictures/universal coupling.png",
        downloadUrl:
          "https://drive.google.com/file/d/1hztYGQrBMjPsVBhAbwLdsVCVdrLDunm8/view?usp=sharing",
        modelPath: "/Models/UNIVERSAL COUPLING.STL",
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

    ],
    []
  );

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

  const filteredModels = useMemo(
    () =>
      activeCategory === "All"
        ? cadModels
        : cadModels.filter((m) => m.category === activeCategory),
    [activeCategory, cadModels]
  );

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

  // === 3D VIEWER (Optimized) ===
  useEffect(() => {
    if (!previewModel || !mountRef.current) return;

    setLoadingModel(true);

    // Scene + Renderer Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111827);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false,
    });
    renderer.setPixelRatio(window.devicePixelRatio * 0.8);
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.outputEncoding = THREE.sRGBEncoding;
    rendererRef.current = renderer;

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
    controlsRef.current = controls;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const loader = new STLLoader();
    const path = previewModel.modelPath;

    // Load with Cache
    const loadModel = (url) =>
      new Promise((resolve, reject) => {
        if (stlCache.has(url)) {
          resolve(stlCache.get(url));
          return;
        }
        loader.load(
          url,
          (geometry) => {
            stlCache.set(url, geometry);
            resolve(geometry);
          },
          undefined,
          reject
        );
      });

    loadModel(path)
      .then((geometry) => {
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
          color: 0x7dd3fc,
          metalness: 0.6,
          roughness: 0.3,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);
        meshesRef.current.push(mesh);

        const cameraZ =
          (maxDim / 2 / Math.tan((camera.fov * Math.PI) / 360)) * 2;
        camera.position.set(0, 0, cameraZ);
        camera.lookAt(0, 0, 0);

        setLoadingModel(false);
      })
      .catch(() => setLoadingModel(false));

    // Animation loop
    let frameId;
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // Optimized Resize Handler (Debounced)
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      meshesRef.current.forEach((m) => {
        m.geometry.dispose();
        m.material.dispose();
      });
      scene.clear();
    };
  }, [previewModel, stlCache]);

  const zoomIn = useCallback(() => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  }, []);

  const zoomOut = useCallback(() => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  }, []);

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Header */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-center text-white"
      >
        CAD Model{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Showcase
        </span>
      </motion.h2>

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

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {filteredModels.map((model, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -4 }}
            className="bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={model.image}
                alt={model.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${getComplexityColor(
                    model.complexity
                  )}`}
                >
                  {model.complexity}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">
                {model.title}
              </h3>
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
      {previewModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 relative"
          >
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">
              {previewModel.title}
            </h3>
            <div className="relative w-full h-96 bg-gray-800 rounded-lg">
              {loadingModel && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <span className="text-white text-lg">Loading 3D Model...</span>
                </div>
              )}
              <div ref={mountRef} className="w-full h-full rounded-lg" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={zoomIn}
                className="px-4 py-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 border border-green-500/30"
              >
                <ZoomIn className="inline w-4 h-4 mr-1" /> Zoom In
              </button>
              <button
                onClick={zoomOut}
                className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 border border-red-500/30"
              >
                <ZoomOut className="inline w-4 h-4 mr-1" /> Zoom Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
