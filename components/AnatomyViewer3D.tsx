"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface AnatomyModelOption {
  id: string;
  name: string;
  shortName: string;
  latinName: string;
  category: string;
  file: string;
  defaultZoom: number;
  fallbackColor?: number;
}

export interface DissectionLayersState {
  skeleton: boolean;
  muscle: boolean;
  vascular: boolean;
  nervous: boolean;
  organs: boolean;
}

export const ANATOMY_MODELS: AnatomyModelOption[] = [
  {
    id: "skeletal",
    name: "İskelet Sistemi",
    shortName: "İSKELET",
    latinName: "Systema Skeletale",
    category: "Osteoloji",
    file: "/models/skeletal.glb",
    defaultZoom: 3.4,
    fallbackColor: 0xe8dfd1,
  },
  {
    id: "muscular",
    name: "Kas Sistemi",
    shortName: "KAS",
    latinName: "Systema Musculare",
    category: "Miyoloji",
    file: "/models/muscular.glb",
    defaultZoom: 3.4,
    fallbackColor: 0xb84a39,
  },
  {
    id: "heart",
    name: "Kalp & Damarlar",
    shortName: "DAMAR",
    latinName: "Cor & Vasa Sanguinea",
    category: "Kardiyovasküler",
    file: "/models/arterial.glb",
    defaultZoom: 3.2,
    fallbackColor: 0xd32f2f,
  },
  {
    id: "brain",
    name: "Beyin & Sinirler",
    shortName: "SİNİR",
    latinName: "Systema Nervosum",
    category: "Nöroanatomi",
    file: "/models/nervous.glb",
    defaultZoom: 3.2,
    fallbackColor: 0xf59e0b,
  },
  {
    id: "abdomen",
    name: "Visseral Organlar",
    shortName: "ORGANLAR",
    latinName: "Organa Abdominalia",
    category: "Splanknoloji",
    file: "/models/organs.glb",
    defaultZoom: 3.2,
    fallbackColor: 0xa84236,
  },
];

const LAYER_CONFIGS: Record<
  keyof DissectionLayersState,
  { files: string[]; roughness: number; metalness: number; fallbackColor: number }
> = {
  skeleton: {
    files: ["/models/skeletal.glb"],
    roughness: 0.55,
    metalness: 0.05,
    fallbackColor: 0xe8dfd1,
  },
  muscle: {
    files: ["/models/muscular.glb"],
    roughness: 0.42,
    metalness: 0.08,
    fallbackColor: 0xb84a39,
  },
  vascular: {
    files: ["/models/arterial.glb", "/models/venous.glb"],
    roughness: 0.35,
    metalness: 0.12,
    fallbackColor: 0xd32f2f,
  },
  nervous: {
    files: ["/models/nervous.glb", "/models/peripheralNerves.glb"],
    roughness: 0.38,
    metalness: 0.1,
    fallbackColor: 0xf59e0b,
  },
  organs: {
    files: ["/models/organs.glb"],
    roughness: 0.45,
    metalness: 0.08,
    fallbackColor: 0xa84236,
  },
};

interface AnatomyViewer3DProps {
  className?: string;
  modelId?: string;
  onModelChange?: (modelId: string) => void;
  activeLayers?: DissectionLayersState;
  muscleOpacity?: number;
  showCard?: boolean;
  showHud?: boolean;
  showLayersWidget?: boolean;
  showLayerSwitcher?: boolean;
  showCameraControls?: boolean;
  showFooter?: boolean;
  height?: string;
}

export default function AnatomyViewer3D({
  className = "",
  modelId,
  onModelChange,
  activeLayers,
  muscleOpacity = 0.85,
  showCard = true,
  showHud = true,
  showLayersWidget = true,
  showLayerSwitcher = true,
  showCameraControls = true,
  showFooter = true,
  height = "h-[380px] sm:h-[480px] lg:h-[520px]",
}: AnatomyViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalModelId, setInternalModelId] = useState(modelId || "muscular");

  useEffect(() => {
    if (modelId) {
      setInternalModelId(modelId);
    }
  }, [modelId]);

  const activeModelId = onModelChange ? (modelId || internalModelId) : internalModelId;
  const activeModel =
    ANATOMY_MODELS.find((m) => m.id === activeModelId) || ANATOMY_MODELS[1];

  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [fps, setFps] = useState(60);
  const [trisCount, setTrisCount] = useState("101.4k tris");
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Multi-layer caching for full-body dissection
  const layerCacheRef = useRef<Map<keyof DissectionLayersState, THREE.Group>>(new Map());
  const activeLayersRef = useRef<DissectionLayersState | undefined>(activeLayers);
  activeLayersRef.current = activeLayers;
  const pendingLoadsRef = useRef(0);

  const handleSelectModel = (id: string) => {
    setInternalModelId(id);
    if (onModelChange) {
      onModelChange(id);
    }
  };

  // 1. Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#0a1926");

    const w = container.clientWidth || 550;
    const h = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    // If activeLayers is used, start at whole body view distance (4.0)
    camera.position.set(0, 0.1, activeLayers ? 4.0 : 3.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1.1;
    controls.maxDistance = 7.5;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;
    controlsRef.current = controls;

    // Rich Surgical Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xf0f9ff, 0x0f172a, 1.4);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe0f2fe, 1.3);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    const bottomFill = new THREE.DirectionalLight(0xdbeafe, 0.7);
    bottomFill.position.set(0, -3, 2);
    scene.add(bottomFill);

    // Anatomical orientation ring
    const ringGeo = new THREE.RingGeometry(1.8, 1.83, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x006591,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    ring.position.y = -1.25;
    scene.add(ring);

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);

      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
      layerCacheRef.current.clear();
      if (container) container.innerHTML = "";
    };
  }, []);

  // 2. Multi-layer Dissection Mode (when activeLayers is provided)
  useEffect(() => {
    if (!activeLayers) return;
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    const loader = new GLTFLoader();

    // Check each layer in activeLayers
    const layerKeys = Object.keys(LAYER_CONFIGS) as (keyof DissectionLayersState)[];

    layerKeys.forEach((key) => {
      const isLayerActive = Boolean(activeLayers[key]);
      const cached = layerCacheRef.current.get(key);

      if (cached) {
        if (!modelGroup.children.includes(cached)) {
          modelGroup.add(cached);
        }
        cached.visible = isLayerActive;
      } else if (isLayerActive) {
        // Create parent group for this layer (which may contain multiple co-registered files)
        const layerWrapper = new THREE.Group();
        layerCacheRef.current.set(key, layerWrapper);
        layerWrapper.visible = true;
        modelGroup.add(layerWrapper);

        // Load all files for this layer
        const config = LAYER_CONFIGS[key];
        config.files.forEach((file) => {
          pendingLoadsRef.current++;
          setLoading(true);

          loader.load(
            file,
            (gltf) => {
              const root = gltf.scene;

              // Invert -Y to +Y so head is UP
              root.rotation.x = Math.PI;
              root.updateMatrixWorld(true);

              const subWrapper = new THREE.Group();
              subWrapper.add(root);

              // Unified full-body registration transform
              root.position.set(0, -781, -105.5);
              subWrapper.scale.setScalar(2.4 / 1710);

              root.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  const hasVertexColors = Boolean(child.geometry?.attributes?.color);
                  let customColor = config.fallbackColor;
                  if (file.includes("venous")) customColor = 0x1565c0;
                  if (file.includes("arterial")) customColor = 0xd32f2f;

                  const mat = new THREE.MeshStandardMaterial({
                    side: THREE.DoubleSide,
                    roughness: config.roughness,
                    metalness: config.metalness,
                    vertexColors: hasVertexColors,
                    color: hasVertexColors ? 0xffffff : customColor,
                  });

                  if (key === "muscle") {
                    mat.transparent = muscleOpacity < 1;
                    mat.opacity = muscleOpacity;
                  }
                  child.material = mat;
                }
              });

              layerWrapper.add(subWrapper);
              layerWrapper.visible = Boolean(activeLayersRef.current?.[key]);

              pendingLoadsRef.current = Math.max(0, pendingLoadsRef.current - 1);
              if (pendingLoadsRef.current === 0) {
                setLoading(false);
              }

              // Re-calc tris
              let tris = 0;
              modelGroup.traverse((c) => {
                if (c instanceof THREE.Mesh && c.visible && c.parent?.visible) {
                  if (c.geometry) {
                    const geo = c.geometry;
                    if (geo.index) tris += geo.index.count / 3;
                    else if (geo.attributes.position) tris += geo.attributes.position.count / 3;
                  }
                }
              });
              if (tris > 0) setTrisCount(`${(tris / 1000).toFixed(1)}k tris`);
            },
            undefined,
            (err) => {
              console.error("Layer load error:", file, err);
              pendingLoadsRef.current = Math.max(0, pendingLoadsRef.current - 1);
              if (pendingLoadsRef.current === 0) {
                setLoading(false);
              }
            }
          );
        });
      }
    });

    if (pendingLoadsRef.current === 0) {
      setLoading(false);
    }

    // Update tris count of visible models
    let currentTris = 0;
    modelGroup.traverse((c) => {
      if (c instanceof THREE.Mesh && c.visible && c.parent?.visible) {
        if (c.geometry) {
          const geo = c.geometry;
          if (geo.index) currentTris += geo.index.count / 3;
          else if (geo.attributes.position) currentTris += geo.attributes.position.count / 3;
        }
      }
    });
    if (currentTris > 0) setTrisCount(`${(currentTris / 1000).toFixed(1)}k tris`);
  }, [activeLayers]);

  // 3. Update Muscle Opacity when changed
  useEffect(() => {
    if (!activeLayers) return;
    const muscleGroup = layerCacheRef.current.get("muscle");
    if (muscleGroup) {
      muscleGroup.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const mat = child.material as THREE.MeshStandardMaterial;
          mat.transparent = muscleOpacity < 1;
          mat.opacity = muscleOpacity;
          mat.needsUpdate = true;
        }
      });
    }
  }, [muscleOpacity, activeLayers]);

  // 4. Single-model Mode (when activeLayers is not provided)
  useEffect(() => {
    if (activeLayers) return; // handled by multi-layer effect above

    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    setLoading(true);
    setLoadProgress(15);

    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
      if ("geometry" in child && child.geometry instanceof THREE.BufferGeometry) {
        child.geometry.dispose();
      }
    }

    const loader = new GLTFLoader();
    loader.load(
      activeModel.file,
      (gltf) => {
        const root = gltf.scene;

        root.rotation.x = Math.PI;
        root.updateMatrixWorld(true);

        const modelWrapper = new THREE.Group();
        modelWrapper.add(root);

        // Compute bounding box of oriented model
        const bbox = new THREE.Box3().setFromObject(modelWrapper);
        const center = new THREE.Vector3();
        bbox.getCenter(center);
        const size = new THREE.Vector3();
        bbox.getSize(size);

        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.4 / (maxDim || 1);

        // Center root inside wrapper
        root.position.x = -center.x;
        root.position.y = -center.y;
        root.position.z = -center.z;

        modelWrapper.scale.setScalar(scale);

        let triangles = 0;
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const hasVertexColors = Boolean(child.geometry?.attributes?.color);
            const mat = new THREE.MeshStandardMaterial({
              side: THREE.DoubleSide,
              roughness: 0.42,
              metalness: 0.08,
              vertexColors: hasVertexColors,
              color: hasVertexColors ? 0xffffff : (activeModel.fallbackColor || 0xd1d5db),
            });
            child.material = mat;

            if (child.geometry) {
              const geo = child.geometry;
              if (geo.index) {
                triangles += geo.index.count / 3;
              } else if (geo.attributes.position) {
                triangles += geo.attributes.position.count / 3;
              }
            }
          }
        });

        if (triangles > 0) {
          setTrisCount(`${(triangles / 1000).toFixed(1)}k tris`);
        } else {
          setTrisCount("101.4k tris");
        }

        modelGroup.add(modelWrapper);
        setLoading(false);
        setLoadProgress(100);

        if (cameraRef.current && controlsRef.current) {
          cameraRef.current.position.set(0, 0.2, activeModel.defaultZoom);
          controlsRef.current.target.set(0, 0, 0);
          controlsRef.current.update();
        }
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.min(95, Math.round((xhr.loaded / xhr.total) * 100)));
        }
      },
      (err) => {
        console.error("3D model load error:", err);
        setLoading(false);
      }
    );
  }, [activeModel, activeLayers]);

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const nextVal = !controlsRef.current.autoRotate;
      controlsRef.current.autoRotate = nextVal;
      setIsAutoRotating(nextVal);
    }
  };

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 0.2, activeLayers ? 4.0 : activeModel.defaultZoom);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.autoRotate = true;
      setIsAutoRotating(true);
      controlsRef.current.update();
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.z = Math.max(
        1.4,
        Math.min(7.0, cameraRef.current.position.z + delta)
      );
      controlsRef.current.update();
    }
  };

  const viewportContent = (
    <div
      className={`relative w-full ${height} rounded-xl bg-[#0a1926] overflow-hidden flex items-center justify-center`}
    >
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0a1926]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
          <span className="text-xs font-mono text-sky-300 tracking-wider font-semibold">
            {activeLayers ? "KATMAN DİSEKSİYONU GÜNCELLENİYOR..." : `${activeModel.name.toUpperCase()} DİSEKSİYONU YÜKLENİYOR... ${loadProgress}%`}
          </span>
        </div>
      )}

      {/* 1. TOP LIVE HUD BAR */}
      {showHud && (
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/95 backdrop-blur-md shadow-sm border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[16px] text-[#006591] animate-pulse">
              touch_app
            </span>
            <span className="font-['Archivo_Narrow'] text-[11px] font-bold uppercase text-[#003752] tracking-wider whitespace-nowrap">
              Canlı 3D Model: Çevirin &amp; İnceleyin
            </span>
          </div>

          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#ffffff]/95 backdrop-blur-md text-[#0b1c30] font-mono text-[11px] font-semibold border border-[#e5eeff] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#006591] font-bold">{fps} FPS</span>
            <span className="text-[#c1c7ce]">/</span>
            <span className="text-[#41474d]">{trisCount}</span>
          </div>
        </div>
      )}

      {/* 2. LEFT LAYER NAVIGATION WIDGET */}
      {showLayersWidget && (
        <div className="absolute left-4 top-16 sm:top-20 flex flex-col gap-2 pointer-events-auto z-20">
          <Link
            href={`/atlas?region=${activeModel.id}`}
            className="px-3.5 py-2 rounded-xl bg-[#003752] text-white shadow-md flex items-center gap-2.5 border border-[#39b8fd]/30 hover:bg-[#1f4e6b] transition-all hover:scale-[1.03]"
            title="3D Atlasta Ayrıntılı İncele"
          >
            <span className="material-symbols-outlined text-[19px] text-[#39b8fd]">
              view_in_ar
            </span>
            <div className="flex flex-col text-left">
              <span className="font-mono text-[9px] text-[#a0ccee] tracking-wider font-semibold leading-tight">
                01 ATLAS
              </span>
              <span className="font-['Archivo_Narrow'] text-[12px] uppercase font-bold tracking-tight whitespace-nowrap leading-tight">
                {activeModel.name}
              </span>
            </div>
          </Link>

          <Link
            href="/ogrenme-yolu"
            className="hidden sm:flex px-3 py-1.5 rounded-lg bg-[#ffffff]/90 backdrop-blur-md text-[#0b1c30] shadow-sm items-center gap-2 hover:bg-[#ffffff] hover:scale-[1.02] transition-all border border-[#e5eeff]"
            title="Öğrenme Yolunu Aç"
          >
            <span className="material-symbols-outlined text-[16px] text-[#006591]">
              menu_book
            </span>
            <span className="font-['Archivo_Narrow'] text-[11px] font-bold whitespace-nowrap">
              02 ÖĞREN
            </span>
          </Link>

          <Link
            href="/zilli-sinav"
            className="hidden sm:flex px-3 py-1.5 rounded-lg bg-[#ffffff]/90 backdrop-blur-md text-[#0b1c30] shadow-sm items-center gap-2 hover:bg-[#ffffff] hover:scale-[1.02] transition-all border border-[#e5eeff]"
            title="Zilli Sınav Simülatörünü Aç"
          >
            <span className="material-symbols-outlined text-[16px] text-[#6d001c]">
              timer
            </span>
            <span className="font-['Archivo_Narrow'] text-[11px] font-bold whitespace-nowrap">
              03 ZİLLİ TEST
            </span>
          </Link>
        </div>
      )}

      {/* 3. BOTTOM LAYER SWITCHER & CAMERA CONTROLS HUD */}
      {(showLayerSwitcher || showCameraControls) && (
        <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 flex items-center justify-between pointer-events-none z-20 gap-2">
          {showLayerSwitcher && (
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#e5eeff] overflow-x-auto max-w-[calc(100%-120px)] sm:max-w-[calc(100%-140px)] scrollbar-none">
              {ANATOMY_MODELS.map((item) => {
                const isActive = activeModelId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectModel(item.id)}
                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg font-['Archivo_Narrow'] text-[10px] sm:text-[11px] font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-1 sm:gap-1.5 ${
                      isActive
                        ? "bg-[#003752] text-white shadow-sm scale-[1.02]"
                        : "bg-[#eff4ff]/80 text-[#003752] hover:bg-[#dce9ff]"
                    }`}
                  >
                    <span>{item.shortName}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39b8fd]" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {showCameraControls && (
            <div className="pointer-events-auto flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#e5eeff] shrink-0">
              <button
                type="button"
                onClick={toggleAutoRotate}
                title={isAutoRotating ? "Döndürmeyi Durdur" : "Otomatik Döndürmeyi Başlat"}
                className={`p-1 sm:p-1.5 rounded-lg transition-all cursor-pointer ${
                  isAutoRotating
                    ? "bg-[#003752] text-[#39b8fd] shadow-xs"
                    : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
                }`}
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">rotate_right</span>
              </button>
              <button
                type="button"
                onClick={() => handleZoom(-0.5)}
                title="Yakınlaştır (+)"
                className="p-1 sm:p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">zoom_in</span>
              </button>
              <button
                type="button"
                onClick={() => handleZoom(+0.5)}
                title="Uzaklaştır (-)"
                className="p-1 sm:p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">zoom_out</span>
              </button>
              <button
                type="button"
                onClick={handleResetCamera}
                title="Kamerayı Sıfırla"
                className="p-1 sm:p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px] sm:text-[18px]">restart_alt</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (!showCard) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        {viewportContent}
      </div>
    );
  }

  return (
    <div
      id="hero-3d-viewer"
      className={`relative w-full rounded-2xl bg-[#ffffff] shadow-xl overflow-hidden p-3 border border-[#e5eeff] scroll-mt-28 ${className}`}
    >
      {viewportContent}

      {/* 4. ANATOMY META FOOTER */}
      {showFooter && (
        <div className="mt-3 px-2 flex flex-wrap items-center justify-between text-[#41474d] text-[11px] font-medium gap-2">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[14px] text-[#006591]">
              verified
            </span>
            Terminologia Anatomica (TA2) Uyumlu 3D Veri Seti
          </span>
          <span className="font-mono text-[10px] text-[#72787e]">
            Model: BodyParts3D Reference / Dik Anatomik Pozisyon
          </span>
        </div>
      )}
    </div>
  );
}
