// CADModels.jsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Download, Eye, Layers, Award, X, ZoomIn, ZoomOut } from "lucide-react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * Optimized CADModels component
 * - Reuses scene / renderer across opens
 * - Loading indicator + progress
 * - GLTF/STL support
 * - Caching of loaded assets
 * - Hemisphere light for performance
 * - Proper cleanup
 */

const CADModels = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [previewModel, setPreviewModel] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0); // 0-100

  const mountRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const rafRef = useRef(null);

  // Caches to avoid re-parsing models
  const geometryCache = useRef(new Map()); // path -> BufferGeometry or mesh clone
  const gltfCache = useRef(new Map()); // path -> gltf scene

  // --- Full CAD Models Array ---
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
      modelPath: "/Models/Spur Gears.stl",
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
      modelPath: "/Models/Exhaust Manifold.stl",
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
      modelPath: "/Models/Universal Coupling.stl",
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
      modelPath: "/Models/Muff Coupling.stl",
      views: 189,
      downloads: 15,
    },
    {
      title: "Door Lock Mechanism",
      description:
        "Compact and reliable door lock mechanism featuring latch, spring, and handle components...",
      software: "SolidWorks",
      category: "Assembly",
      complexity: "Basic",
      features: ["Assembly Modeling", "Motion Simulation", "Tolerance Analysis"],
      image: "/3d Pictures/DOOR LOCK.png",
      downloadUrl:
        "https://drive.google.com/file/d/1xTRDlldKi1214mGtlxoh-5audLo4tGdR/view?usp=sharing",
      modelPath: "/Models/Door lock.STL",
      views: 312,
      downloads: 22,
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
      modelPath: "/Models/Refrigeration Valves.STL",
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

  // ---- Initialize renderer/scene/camera once ----
  useEffect(() => {
    if (!mountRef.current) return;

    // If already initialized, just return
    if (sceneRef.current && rendererRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1724); // dark background
    sceneRef.current = scene;

    // Camera
    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
    camera.position.set(0, 0, 100);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // append DOM
    mountRef.current.innerHTML = ""; // clear
    mountRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2; // reduced speed for smoother perception + perf
    controlsRef.current = controls;

    // Lights - hemisphere for performance
    const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    scene.add(hemi);

    // subtle directional fill (cheap)
    const dir = new THREE.DirectionalLight(0xffffff, 0.4);
    dir.position.set(50, 50, 50);
    scene.add(dir);

    // Animation loop
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
      controls.dispose();
      renderer.dispose();
      // dispose geometries in cache
      geometryCache.current.forEach((geo) => {
        if (geo && geo.dispose) geo.dispose();
      });
      geometryCache.current.clear();
      gltfCache.current.clear();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, []);

  // Helper: center geometry utility (works for BufferGeometry)
  const centerGeometry = (geometry) => {
    try {
      geometry.computeBoundingBox();
      const box = geometry.boundingBox;
      const offset = new THREE.Vector3();
      if (box) {
        box.getCenter(offset).negate();
        geometry.translate(offset.x, offset.y, offset.z);
      }
    } catch (e) {
      // ignore
    }
  };

  // ---- Load model when previewModel changes ----
  useEffect(() => {
    if (!previewModel || !sceneRef.current || !rendererRef.current) return;

    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Remove previously added model objects while preserving lights (we keep first two children as lights)
    // A safer approach: remove everything except lights (Hemisphere + Directional)
    const lights = scene.children.filter((c) => c.type.includes("Light"));
    // Remove all non-light children
    scene.children.slice().forEach((child) => {
      if (!child.type.includes("Light")) {
        scene.remove(child);
        if (child.geometry) child.geometry.dispose && child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose && m.dispose());
          } else child.material.dispose && child.material.dispose();
        }
      }
    });

    // Setup loaders
    const stlLoader = new STLLoader();
    const gltfLoader = new GLTFLoader();

    // Optional: DRACO loader for compressed glTFs (uncomment & configure path to draco decoder if available)
    // const dracoLoader = new DRACOLoader();
    // dracoLoader.setDecoderPath('/draco/'); // <-- place Draco decoder files under public/draco/
    // gltfLoader.setDRACOLoader(dracoLoader);

    const modelPaths = previewModel.modelPaths || [previewModel.modelPath];
    const createdObjects = []; // to compute bounding box
    let loadedCount = 0;
    setLoading(true);
    setLoadProgress(0);

    const handleLoaded = () => {
      loadedCount++;
      const progress = Math.round((loadedCount / modelPaths.length) * 100);
      setLoadProgress(progress);

      if (loadedCount >= modelPaths.length) {
        // compute group bounding box and position camera
        const groupBox = new THREE.Box3();
        createdObjects.forEach((o) => groupBox.expandByObject(o));
        const size = groupBox.getSize(new THREE.Vector3());
        const center = groupBox.getCenter(new THREE.Vector3());

        // Avoid degenerate sizes
        const maxDim = Math.max(size.x || 1, size.y || 1, size.z || 1);
        const fov = camera.fov * (Math.PI / 180);
        const cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        camera.position.set(center.x, center.y, cameraZ * 1.5 + 10);
        camera.lookAt(center);
        controls.target.copy(center);
        controls.update();

        setTimeout(() => {
          setLoading(false);
          setLoadProgress(100);
        }, 150); // small delay to allow final render
      }
    };

    modelPaths.forEach((path, idx) => {
      if (!path) {
        // skip invalid path
        handleLoaded();
        return;
      }

      const ext = (path.split(".").pop() || "").toLowerCase();

      // If GLTF/GLB
      if (ext === "glb" || ext === "gltf") {
        // Use cache if present
        if (gltfCache.current.has(path)) {
          const cached = gltfCache.current.get(path);
          // clone cached scene
          const clone = cached.scene.clone(true);
          scene.add(clone);
          createdObjects.push(clone);
          handleLoaded();
          return;
        }

        gltfLoader.load(
          path,
          (gltf) => {
            // cache (store original gltf for future clone)
            gltfCache.current.set(path, gltf);
            const modelScene = gltf.scene || gltf.scenes[0];
            // center model
            const box = new THREE.Box3().setFromObject(modelScene);
            const c = box.getCenter(new THREE.Vector3()).negate();
            modelScene.position.add(c);
            scene.add(modelScene);
            createdObjects.push(modelScene);
            handleLoaded();
          },
          (xhr) => {
            if (xhr && xhr.total) {
              const perc = Math.round((xhr.loaded / xhr.total) * 100);
              // combine with existing progress across files (approx)
              const approxOverall = Math.round(((idx + perc / 100) / modelPaths.length) * 100);
              setLoadProgress(approxOverall);
            }
          },
          (err) => {
            console.error("GLTF load error:", err);
            handleLoaded();
          }
        );
        return;
      }

      // Default to STL
      // Use cached geometry if available
      if (geometryCache.current.has(path)) {
        const cachedGeo = geometryCache.current.get(path).clone
          ? geometryCache.current.get(path).clone()
          : geometryCache.current.get(path);
        // create material and mesh
        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(`hsl(${(idx * 60) % 360}, 80%, 60%)`),
          metalness: 0.5,
          roughness: 0.25,
        });
        const mesh = new THREE.Mesh(cachedGeo, material);
        scene.add(mesh);
        createdObjects.push(mesh);
        handleLoaded();
        return;
      }

      // load via STLLoader
      stlLoader.load(
        path,
        (geometry) => {
          // geometry returned is BufferGeometry
          centerGeometry(geometry);
          // cache geometry for future reuse
          geometryCache.current.set(path, geometry.clone ? geometry.clone() : geometry);
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(`hsl(${(idx * 60) % 360}, 80%, 60%)`),
            metalness: 0.5,
            roughness: 0.25,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          scene.add(mesh);
          createdObjects.push(mesh);
          handleLoaded();
        },
        (xhr) => {
          if (xhr && xhr.total) {
            const perc = Math.round((xhr.loaded / xhr.total) * 100);
            const approxOverall = Math.round(((idx + perc / 100) / modelPaths.length) * 100);
            setLoadProgress(approxOverall);
          }
        },
        (err) => {
          console.error("STL load error:", err);
          handleLoaded();
        }
      );
    });

    // cleanup function: if previewModel changes before load finishes, we don't leak resources.
    return () => {
      // no-op: next effect iteration clears scene and re-adds lights
    };
  }, [previewModel]);

  const zoomIn = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z *= 0.8;
    }
  }, []);

  const zoomOut = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z *= 1.2;
    }
  }, []);

  // JSX UI (keeps your design)
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
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            <X
              className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer"
              onClick={() => setPreviewModel(null)}
            />

            {/* Loading overlay */}
            {loading && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 text-white">
                <div className="mb-4 text-lg">Loading 3D Model...</div>
                <div className="w-64 h-2 bg-gray-700 rounded overflow-hidden mb-2">
                  <div
                    style={{ width: `${loadProgress}%` }}
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-400"
                  />
                </div>
                <div className="text-xs text-gray-300">{loadProgress}%</div>
              </div>
            )}

            {/* 3D mount */}
            <div ref={mountRef} className="w-full h-full" />

            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={zoomIn}
                className="bg-gray-700/50 text-white p-2 rounded-full hover:bg-gray-600/50"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
              <button
                onClick={zoomOut}
                className="bg-gray-700/50 text-white p-2 rounded-full hover:bg-gray-600/50"
              >
                <ZoomOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Image Modal */}
      {previewImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <X
            className="absolute top-4 right-4 w-8 h-8 text-white cursor-pointer"
            onClick={() => setPreviewImage(null)}
          />
          <img src={previewImage} alt="Preview" className="max-h-[90vh] max-w-[90vw]" />
        </motion.div>
      )}
    </div>
  );
};

export default CADModels;
