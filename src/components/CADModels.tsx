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
  const [viewImage, setViewImage] = useState(null);
  const [loadingModel, setLoadingModel] = useState(false);
  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);

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
      downloadUrl:
        "https://drive.google.com/file/d/13oG8TdKusFUKPVeh9SLd1cu0uHhuE8F5/view?usp=sharing",
      modelPath: "/Models/Spur Gear profile.STL",
      views: 1247,
      downloads: 89,
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

  // 3D Viewer Effect
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
          color: 0x66ccff,
          metalness: 0.5,
          roughness: 0.2,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.setScalar(scaleFactor);
        scene.add(mesh);

        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(0, 0, cameraZ * 2);
        camera.lookAt(0, 0, 0);
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
  }, [previewModel]);

  const zoomIn = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 0.8;
  };
  const zoomOut = () => {
    if (cameraRef.current) cameraRef.current.position.z *= 1.2;
  };

  return (
    <div className="container mx-auto px-6 py-20">
      {/* Title */}
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
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2">{model.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{model.description}</p>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setPreviewModel(model)}
                  className="flex-1 flex items-center justify-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-3 rounded-lg text-sm border border-purple-500/30"
                >
                  <Eye className="w-4 h-4" /> 3D View
                </motion.button>
                <motion.button
                  onClick={() => setViewImage(model)}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-4 py-3 rounded-lg text-sm border border-green-500/30"
                >
                  <ImageIcon className="w-4 h-4" /> View Photo
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

      {/* 3D Viewer Modal */}
      {previewModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewModel(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-4">
              {previewModel.title}
            </h3>
            <p className="text-gray-300 mb-4">{previewModel.description}</p>

            <div className="relative w-full h-96 bg-gray-800 rounded-lg">
              {loadingModel && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-lg">Loading 3D Model...</span>
                </div>
              )}
              <div ref={mountRef} className="w-full h-full rounded-lg" />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={zoomIn}
                className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 border border-green-500/30"
                title="Zoom In"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 border border-red-500/30"
                title="Zoom Out"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Photo Viewer Modal */}
      {viewImage && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-900 rounded-2xl max-w-4xl w-full p-6 relative"
          >
            <button
              onClick={() => setViewImage(null)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-2xl font-bold text-white mb-4">
              {viewImage.title}
            </h3>
            <p className="text-gray-300 mb-4">{viewImage.description}</p>

            <div className="flex items-center justify-center">
              <img
                src={viewImage.image}
                alt={viewImage.title}
                className="rounded-lg max-h-[70vh] object-contain"
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CADModels;
