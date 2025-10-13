import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const OptimizedSTLViewer = ({ modelUrl }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountRef.current.appendChild(renderer.domElement);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(2, 2, 4);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enableZoom = true;

    // Lighting (efficient setup)
    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const directional = new THREE.DirectionalLight(0xffffff, 0.8);
    directional.position.set(5, 10, 7.5);
    scene.add(ambient, directional);

    // Cache for STL loader
    const loader = new STLLoader();
    THREE.Cache.enabled = true;

    let currentMesh = null;

    // Loading manager for progress tracking
    const manager = new THREE.LoadingManager();
    manager.onProgress = (url, loaded, total) => {
      setProgress(Math.round((loaded / total) * 100));
    };

    setLoading(true);
    loader.load(
      modelUrl,
      (geometry) => {
        geometry.center(); // Center model
        const material = new THREE.MeshStandardMaterial({
          color: 0x007bff,
          roughness: 0.4,
          metalness: 0.1,
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.01, 0.01, 0.01); // Auto scale down if needed
        scene.add(mesh);
        currentMesh = mesh;
        setLoading(false);
      },
      (xhr) => setProgress(Math.round((xhr.loaded / xhr.total) * 100)),
      (error) => console.error("Error loading STL:", error)
    );

    // Handle resizing
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (currentMesh) {
        currentMesh.geometry.dispose();
        currentMesh.material.dispose();
        scene.remove(currentMesh);
      }
      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return (
    <div className="relative w-full h-[500px]" ref={mountRef}>
      {loading && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-48 h-2 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>
          <p className="text-sm mt-2 text-gray-600">{progress}% Loading...</p>
        </motion.div>
      )}
    </div>
  );
};

export default OptimizedSTLViewer;
