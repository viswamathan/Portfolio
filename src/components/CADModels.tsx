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
} from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// CAD Models List
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
    viewCount: 310,
    downloadCount: 120,
    downloadUrl: "#",
  },
  {
    title: "Servo-Driven Robotic Gripper",
    description:
      "Compact servo-actuated robotic gripper designed for precise part handling with adaptive gripping force and lightweight linkage geometry.",
    software: "SolidWorks",
    category: "Automation",
    complexity: "Advanced",
    features: ["Kinematic Simulation", "Linkage Design", "Servo Integration"],
    image: "/3d Pictures/robotic gripper.png",
    viewCount: 290,
    downloadCount: 98,
    downloadUrl: "#",
  },
  {
    title: "Stuffing Box Assembly",
    description:
      "A sealing assembly designed to prevent fluid leakage around rotating shafts in pumps and valves. Modeled with precise dimensional accuracy and material differentiation.",
    software: "SolidWorks",
    category: "Mechanical Parts",
    complexity: "Intermediate",
    features: [
      "3D Assembly Modeling",
      "Material Visualization",
      "Sectional & Isometric Views",
    ],
    image: "/3d Pictures/stuffing box.png",
    viewCount: 250,
    downloadCount: 75,
    downloadUrl: "#",
  },
];

// Unique categories
const categories = ["All", ...new Set(cadModels.map((m) => m.category))];

// Stats Data
const stats = [
  { label: "Total Models", value: cadModels.length, icon: Box, color: "purple" },
  { label: "Downloads", value: "2.5K+", icon: Download, color: "blue" },
  { label: "Categories", value: categories.length - 1, icon: Layers, color: "green" },
  { label: "Design Hours", value: "1000+", icon: Award, color: "orange" },
];

const CADModels = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [filter, setFilter] = useState("All");
  const viewerRef = useRef();
  const cameraRef = useRef();
  const controlsRef = useRef();

  const filteredModels =
    filter === "All"
      ? cadModels
      : cadModels.filter((m) => m.category === filter);

  // Viewer setup
  useEffect(() => {
    if (!selectedModel) return;

    while (viewerRef.current.firstChild) {
      viewerRef.current.removeChild(viewerRef.current.firstChild);
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9fafb);

    const camera = new THREE.PerspectiveCamera(
      60,
      viewerRef.current.clientWidth / viewerRef.current.clientHeight,
      0.1,
      2000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
    viewerRef.current.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(100, 100, 100);
    scene.add(ambientLight, dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controlsRef.current = controls;

    // Load and fit STL
    const loader = new STLLoader();
    loader.load("/models/sample.stl", (geometry) => {
      geometry.center();
      geometry.computeBoundingBox();

      const boundingBox = geometry.boundingBox;
      const size = new THREE.Vector3();
      boundingBox.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      const scaleFactor = 50 / maxDim;

      const material = new THREE.MeshStandardMaterial({
        color: 0x0077ff,
        metalness: 0.3,
        roughness: 0.7,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.scale.setScalar(scaleFactor);
      scene.add(mesh);

      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      controls.target.copy(center);
      camera.position.copy(center.clone().add(new THREE.Vector3(0, 0, maxDim * 1.5)));
      camera.lookAt(center);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
    });

    const handleResize = () => {
      camera.aspect =
        viewerRef.current.clientWidth / viewerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(viewerRef.current.clientWidth, viewerRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      while (viewerRef.current.firstChild) {
        viewerRef.current.removeChild(viewerRef.current.firstChild);
      }
    };
  }, [selectedModel]);

  // Zoom Controls
  const handleZoom = (zoomIn) => {
    const camera = cameraRef.current;
    if (zoomIn) camera.position.multiplyScalar(0.8);
    else camera.position.multiplyScalar(1.2);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        🧩 CAD Models Gallery
      </h1>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`p-4 bg-white rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center border-t-4 border-${stat.color}-500`}
            >
              <Icon className={`w-8 h-8 text-${stat.color}-500 mb-2`} />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full border text-sm ${
              filter === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* CAD Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModels.map((model, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition relative"
            whileHover={{ scale: 1.03 }}
          >
            <div className="relative">
              <img
                src={model.image}
                alt={model.title}
                className="w-full h-56 object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Eye className="w-4 h-4" /> {model.viewCount}
              </div>
              <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                <Download className="w-4 h-4" /> {model.downloadCount}
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                {model.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{model.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {model.features.map((f, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={() => setSelectedModel(model)}
                  className="flex items-center gap-1 text-blue-600 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" /> View
                </button>
                <a
                  href={model.downloadUrl}
                  className="flex items-center gap-1 text-green-600 text-sm font-medium"
                  download
                >
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3D Viewer Modal */}
      {selectedModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] h-[80%] p-4 relative flex flex-col">
            <button
              onClick={() => setSelectedModel(null)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold mb-2 text-gray-800">
              {selectedModel.title}
            </h2>
            <div
              ref={viewerRef}
              className="flex-1 rounded-lg border bg-gray-100"
            />
            {/* Zoom Controls */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => handleZoom(true)}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                <ZoomIn className="w-4 h-4" /> Zoom In
              </button>
              <button
                onClick={() => handleZoom(false)}
                className="flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm"
              >
                <ZoomOut className="w-4 h-4" /> Zoom Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
