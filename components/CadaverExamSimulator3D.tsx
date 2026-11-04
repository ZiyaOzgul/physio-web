"use client";

import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export interface PinData {
  number: number;
  label: string;
  latin: string;
  ta2: string;
  color: string;
  emissive: string;
  position: [number, number, number];
  needleDir: [number, number, number];
}

export interface StationConfig {
  id: number;
  name: string;
  latinName: string;
  subtext: string;
  files: string[];
  cameraPos: [number, number, number];
  targetPos: [number, number, number];
  pins: PinData[];
}

export const EXAM_STATIONS: Record<number, StationConfig> = {
  1: {
    id: 1,
    name: "Masa 1: Toraks & Visseral Diseksiyon Masası",
    latinName: "Thorax, Cor et Organa Abdominalia",
    subtext: "Kadavra gövdesi: Kalp, akciğerler ve tüm visseral organlar",
    files: [
      "/models/skeletal.glb",
      "/models/organs.glb",
      "/models/arterial.glb",
      "/models/heart.glb",
    ],
    cameraPos: [-0.42, 1.15, 1.85],
    targetPos: [-0.42, 0.2, 0],
    pins: [
      {
        number: 1,
        label: "Pin #1: Apex Cordis",
        latin: "Apex cordis (Ventriculus sinister)",
        ta2: "TA2: 3951",
        color: "#dc2626",
        emissive: "#ef4444",
        position: [-0.462, 0.259, -0.063],
        needleDir: [0.15, 1, -0.1],
      },
      {
        number: 2,
        label: "Pin #2: Truncus Coeliacus",
        latin: "Truncus coeliacus (Aorta T12)",
        ta2: "TA2: 4120",
        color: "#2563eb",
        emissive: "#3b82f6",
        position: [-0.349, 0.195, 0.0],
        needleDir: [-0.1, 1, 0.0],
      },
      {
        number: 3,
        label: "Pin #3: Hepar (Lobus Dexter)",
        latin: "Hepar - Facies visceralis",
        ta2: "TA2: 4235",
        color: "#d97706",
        emissive: "#f59e0b",
        position: [-0.378, 0.216, 0.14],
        needleDir: [0.12, 1, 0.2],
      },
      {
        number: 4,
        label: "Pin #4: Pulmo Sinister",
        latin: "Pulmo sinister - Incisura cardiaca",
        ta2: "TA2: 3601",
        color: "#059669",
        emissive: "#10b981",
        position: [-0.56, 0.23, -0.105],
        needleDir: [-0.1, 1, -0.15],
      },
    ],
  },
  2: {
    id: 2,
    name: "Masa 2: Lokomotor & Ekstremite Kas Masası",
    latinName: "Systema Musculare & Osteologia",
    subtext: "Kadavra gövdesi: Yüzeysel ve derin plan kas ve kemik masası",
    files: [
      "/models/skeletal.glb",
      "/models/muscular.glb",
    ],
    cameraPos: [-0.15, 1.25, 2.05],
    targetPos: [-0.15, 0.18, 0.1],
    pins: [
      {
        number: 1,
        label: "Pin #1: M. Deltoideus",
        latin: "M. deltoideus (N. axillaris inervasyonu)",
        ta2: "TA2: 2150",
        color: "#dc2626",
        emissive: "#ef4444",
        position: [-0.756, 0.181, 0.295],
        needleDir: [0.18, 1, 0.25],
      },
      {
        number: 2,
        label: "Pin #2: Trigonum Femorale",
        latin: "Trigonum femorale (Scarpa üçgeni & A. femoralis)",
        ta2: "TA2: 2610",
        color: "#2563eb",
        emissive: "#3b82f6",
        position: [-0.055, 0.216, 0.112],
        needleDir: [-0.12, 1, 0.18],
      },
      {
        number: 3,
        label: "Pin #3: M. Rectus Femoris",
        latin: "M. rectus femoris (N. femoralis)",
        ta2: "TA2: 2625",
        color: "#d97706",
        emissive: "#f59e0b",
        position: [0.226, 0.209, 0.14],
        needleDir: [0.1, 1, 0.12],
      },
    ],
  },
  3: {
    id: 3,
    name: "Masa 3: Nöroanatomi & Kranial Masası",
    latinName: "Systema Nervosum & Encephalon",
    subtext: "Kadavra baş & boyun: Kranial çiftler ve periferik sinir uçları",
    files: [
      "/models/skeletal.glb",
      "/models/nervous.glb",
      "/models/peripheralNerves.glb",
    ],
    cameraPos: [-0.95, 1.05, 1.55],
    targetPos: [-0.95, 0.2, 0],
    pins: [
      {
        number: 1,
        label: "Pin #1: Lobus Frontalis",
        latin: "Encephalon - Lobus frontalis cerebri",
        ta2: "TA2: 5410",
        color: "#dc2626",
        emissive: "#ef4444",
        position: [-1.164, 0.259, 0.0],
        needleDir: [-0.18, 1, 0.0],
      },
      {
        number: 2,
        label: "Pin #2: N. Vagus (CN X)",
        latin: "Nervus vagus (Kranial sinir X)",
        ta2: "TA2: 5540",
        color: "#2563eb",
        emissive: "#3b82f6",
        position: [-0.939, 0.167, -0.049],
        needleDir: [0.12, 1, -0.18],
      },
      {
        number: 3,
        label: "Pin #3: Plexus Brachialis",
        latin: "Plexus brachialis - Truncus superior",
        ta2: "TA2: 5600",
        color: "#059669",
        emissive: "#10b981",
        position: [-0.827, 0.139, -0.112],
        needleDir: [-0.15, 1, -0.18],
      },
    ],
  },
};

/** Generates a billboard sprite canvas texture displaying a high-contrast pin number badge */
function createPinBadgeTexture(num: number, color: string): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, 128, 128);

    // Glowing outer ring
    ctx.beginPath();
    ctx.arc(64, 64, 56, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fill();

    // Circle background with theme color
    ctx.beginPath();
    ctx.arc(64, 64, 48, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Crisp white border
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#ffffff";
    ctx.stroke();

    // White bold text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 52px Archivo, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(`${num}`, 64, 66);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

interface CadaverExamSimulator3DProps {
  station?: number;
  onStationChange?: (station: number) => void;
  activePin?: number;
  onSelectPin?: (pinNumber: number) => void;
  showTopBadges?: boolean;
}

export default function CadaverExamSimulator3D({
  station = 1,
  onStationChange,
  activePin = 1,
  onSelectPin,
  showTopBadges = false,
}: CadaverExamSimulator3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const specimenGroupRef = useRef<THREE.Group | null>(null);
  const pinsGroupRef = useRef<THREE.Group | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [loadText, setLoadText] = useState("Kadavra masası hazırlanıyor...");
  const [isAutoRotating, setIsAutoRotating] = useState(false);

  const currentStation = EXAM_STATIONS[station] || EXAM_STATIONS[1];

  // 1. Initialize Three.js Scene, Stainless Dissection Table, Surgical Lighting & Camera Controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#0a1926");

    const w = container.clientWidth || 600;
    const h = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(currentStation.cameraPos[0], currentStation.cameraPos[1], currentStation.cameraPos[2]);
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
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.6;
    controls.target.set(currentStation.targetPos[0], currentStation.targetPos[1], currentStation.targetPos[2]);
    controls.minDistance = 0.9;
    controls.maxDistance = 4.8;

    // CRITICAL USER CONSTRAINT:
    // The camera MUST NOT orbit below the dissection table!
    // Set maxPolarAngle right at/above the horizontal plane (y = 0).
    controls.maxPolarAngle = Math.PI / 2 - 0.06; // ~86.5 degrees
    controls.minPolarAngle = 0.12;

    controlsRef.current = controls;

    // Professional Surgical Theater Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xf8fafc, 0x0f172a, 1.4);
    scene.add(hemiLight);

    const surgicalKey = new THREE.DirectionalLight(0xffffff, 2.4);
    surgicalKey.position.set(2, 5, 3);
    scene.add(surgicalKey);

    const surgicalFill = new THREE.DirectionalLight(0xe0f2fe, 1.2);
    surgicalFill.position.set(-3, 3, 2);
    scene.add(surgicalFill);

    const surgicalRim = new THREE.DirectionalLight(0x38bdf8, 0.9);
    surgicalRim.position.set(0, 4, -3);
    scene.add(surgicalRim);

    const surgicalSpot = new THREE.SpotLight(0xffffff, 2.0, 10, Math.PI / 3.5, 0.4);
    surgicalSpot.position.set(0, 4.2, 0.5);
    surgicalSpot.target.position.set(0, 0.2, 0);
    scene.add(surgicalSpot);
    scene.add(surgicalSpot.target);

    // ================= DISSECTION TABLE (Paslanmaz Çelik Kadavra Masası) =================
    const tableGroup = new THREE.Group();
    scene.add(tableGroup);

    // Surgical stainless steel material tokens
    const tableSteelMat = new THREE.MeshStandardMaterial({
      color: 0xc8d1d9,
      metalness: 0.75,
      roughness: 0.32,
    });

    const tableEdgeMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.68,
      roughness: 0.4,
    });

    // 1. Top Plate (2.7m length along X, 1.15m width along Z, thickness 0.04m)
    const plateLength = 2.7;
    const plateWidth = 1.15;
    const plateThickness = 0.04;
    const plateGeo = new THREE.BoxGeometry(plateLength, plateThickness, plateWidth);
    const plate = new THREE.Mesh(plateGeo, tableSteelMat);
    plate.position.y = -plateThickness / 2;
    tableGroup.add(plate);

    // 2. Raised Stainless Rim along the 4 edges
    const rimH = 0.025;
    const rimW = 0.035;

    // Long sides
    const rimLongGeo = new THREE.BoxGeometry(plateLength, rimH, rimW);
    const rimFront = new THREE.Mesh(rimLongGeo, tableEdgeMat);
    rimFront.position.set(0, rimH / 2, plateWidth / 2 - rimW / 2);
    tableGroup.add(rimFront);

    const rimBack = new THREE.Mesh(rimLongGeo, tableEdgeMat);
    rimBack.position.set(0, rimH / 2, -plateWidth / 2 + rimW / 2);
    tableGroup.add(rimBack);

    // Short sides
    const rimShortGeo = new THREE.BoxGeometry(rimW, rimH, plateWidth - 2 * rimW);
    const rimLeft = new THREE.Mesh(rimShortGeo, tableEdgeMat);
    rimLeft.position.set(-plateLength / 2 + rimW / 2, rimH / 2, 0);
    tableGroup.add(rimLeft);

    const rimRight = new THREE.Mesh(rimShortGeo, tableEdgeMat);
    rimRight.position.set(plateLength / 2 - rimW / 2, rimH / 2, 0);
    tableGroup.add(rimRight);

    // 3. Underside Apron
    const apronDepth = 0.07;
    const apronGeo = new THREE.BoxGeometry(plateLength - 0.1, apronDepth, plateWidth - 0.1);
    const apron = new THREE.Mesh(apronGeo, tableEdgeMat);
    apron.position.y = -plateThickness - apronDepth / 2;
    tableGroup.add(apron);

    // 4. Sturdy Stainless Steel Legs
    const legRadius = 0.038;
    const legLen = 1.6;
    const legGeo = new THREE.CylinderGeometry(legRadius, legRadius, legLen, 24);
    const legX = plateLength / 2 - 0.14;
    const legZ = plateWidth / 2 - 0.12;

    const legPositions: [number, number, number][] = [
      [legX, -plateThickness - legLen / 2, legZ],
      [-legX, -plateThickness - legLen / 2, legZ],
      [legX, -plateThickness - legLen / 2, -legZ],
      [-legX, -plateThickness - legLen / 2, -legZ],
    ];

    legPositions.forEach((pos) => {
      const leg = new THREE.Mesh(legGeo, tableEdgeMat);
      leg.position.set(pos[0], pos[1], pos[2]);
      tableGroup.add(leg);
    });

    // 5. Soft Contact Shadow Plane on the Table Top (y = 0.001)
    const shadowGeo = new THREE.PlaneGeometry(plateLength * 0.85, plateWidth * 0.75);
    shadowGeo.rotateX(-Math.PI / 2);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x1d1f20,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.set(0, 0.001, 0);
    tableGroup.add(shadow);

    // Groups for Specimen & Pins
    const specimenGroup = new THREE.Group();
    scene.add(specimenGroup);
    specimenGroupRef.current = specimenGroup;

    const pinsGroup = new THREE.Group();
    scene.add(pinsGroup);
    pinsGroupRef.current = pinsGroup;

    // Render loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (controlsRef.current) controlsRef.current.update();
      renderer.render(scene, camera);
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
      if (container) container.innerHTML = "";
    };
  }, []);

  // 2. Load Supine Cadaver Specimen & Accurately Placed Dissection Pins
  useEffect(() => {
    const specimenGroup = specimenGroupRef.current;
    const pinsGroup = pinsGroupRef.current;
    if (!specimenGroup || !pinsGroup) return;

    // Clear previous models and pins
    while (specimenGroup.children.length > 0) {
      const child = specimenGroup.children[0];
      specimenGroup.remove(child);
    }
    while (pinsGroup.children.length > 0) {
      const child = pinsGroup.children[0];
      pinsGroup.remove(child);
    }

    setLoading(true);
    setLoadText(`${currentStation.name} yükleniyor...`);

    // Reset camera target smoothly towards this station's specimen
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(
        currentStation.cameraPos[0],
        currentStation.cameraPos[1],
        currentStation.cameraPos[2]
      );
      controlsRef.current.target.set(
        currentStation.targetPos[0],
        currentStation.targetPos[1],
        currentStation.targetPos[2]
      );
      controlsRef.current.update();
    }

    const loader = new GLTFLoader();
    const supineWrapper = new THREE.Group();

    // Supine Posture: Rx(-90°), Ry(90°) (matrix = Ry * Rx) -> body lies back-down on table, head to left
    const supineEuler = new THREE.Euler(
      (-90 * Math.PI) / 180,
      (90 * Math.PI) / 180,
      0,
      "YXZ"
    );
    supineWrapper.setRotationFromEuler(supineEuler);
    // Shift supine body so the back rests directly on top plate (y = 0)
    supineWrapper.position.set(0, 0.175, 0);
    specimenGroup.add(supineWrapper);

    let pendingFiles = currentStation.files.length;

    currentStation.files.forEach((file) => {
      loader.load(
        file,
        (gltf) => {
          const root = gltf.scene;

          // Invert -Y to +Y so head is UP
          root.rotation.x = Math.PI;
          root.updateMatrixWorld(true);

          const modelWrapper = new THREE.Group();
          modelWrapper.add(root);

          // BodyParts3D global registration transform
          root.position.set(0, -781, -105.5);
          modelWrapper.scale.setScalar(2.4 / 1710);

          root.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              const mat = (child.material
                ? child.material.clone()
                : new THREE.MeshStandardMaterial()) as THREE.MeshStandardMaterial;
              mat.side = THREE.DoubleSide;
              mat.roughness = 0.42;
              mat.metalness = 0.08;
              child.material = mat;
            }
          });

          supineWrapper.add(modelWrapper);

          pendingFiles--;
          if (pendingFiles <= 0) {
            setLoading(false);
          }
        },
        undefined,
        (err) => {
          console.error("Error loading exam model file:", file, err);
          pendingFiles--;
          if (pendingFiles <= 0) {
            setLoading(false);
          }
        }
      );
    });

    // ================= BUILD NUMBERED DISSECTION NEEDLES & BADGES =================
    currentStation.pins.forEach((pin) => {
      const pinAnchor = new THREE.Group();
      pinAnchor.position.set(pin.position[0], pin.position[1], pin.position[2]);

      // Calculate needle angle
      const dir = new THREE.Vector3(
        pin.needleDir[0],
        pin.needleDir[1],
        pin.needleDir[2]
      ).normalize();

      // Stainless steel needle shaft
      const needleLength = 0.16;
      const needleGeo = new THREE.CylinderGeometry(0.006, 0.002, needleLength, 16);
      const needleMat = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        metalness: 0.95,
        roughness: 0.1,
      });
      const needle = new THREE.Mesh(needleGeo, needleMat);
      needle.position.set(0, needleLength / 2, 0);

      // Spherical pin head
      const isSelected = activePin === pin.number;
      const headRadius = isSelected ? 0.034 : 0.028;
      const headGeo = new THREE.SphereGeometry(headRadius, 20, 20);
      const headMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(pin.color),
        emissive: new THREE.Color(pin.emissive),
        emissiveIntensity: isSelected ? 1.0 : 0.55,
        roughness: 0.2,
        metalness: 0.1,
      });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(0, needleLength, 0);

      const needleSubGroup = new THREE.Group();
      needleSubGroup.add(needle);
      needleSubGroup.add(head);

      // Orient needle along direction
      const up = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, dir);
      needleSubGroup.setRotationFromQuaternion(quat);

      pinAnchor.add(needleSubGroup);

      // Billboard number badge sprite floating directly above the pin head
      const badgeTex = createPinBadgeTexture(pin.number, pin.color);
      const spriteMat = new THREE.SpriteMaterial({
        map: badgeTex,
        transparent: true,
        depthTest: false,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(0.09, 0.09, 1);
      // Position badge right above head
      sprite.position.copy(dir.clone().multiplyScalar(needleLength + 0.045));
      pinAnchor.add(sprite);

      pinsGroup.add(pinAnchor);
    });
  }, [currentStation, activePin]);

  const toggleAutoRotate = () => {
    if (controlsRef.current) {
      const nextVal = !controlsRef.current.autoRotate;
      controlsRef.current.autoRotate = nextVal;
      setIsAutoRotating(nextVal);
    }
  };

  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(
        currentStation.cameraPos[0],
        currentStation.cameraPos[1],
        currentStation.cameraPos[2]
      );
      controlsRef.current.target.set(
        currentStation.targetPos[0],
        currentStation.targetPos[1],
        currentStation.targetPos[2]
      );
      controlsRef.current.autoRotate = false;
      setIsAutoRotating(false);
      controlsRef.current.update();
    }
  };

  const handleZoom = (delta: number) => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.z = Math.max(
        0.9,
        Math.min(4.5, cameraRef.current.position.z + delta)
      );
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[500px] rounded-2xl bg-[#0a1926] overflow-hidden flex items-center justify-center">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Loading Overlay */}
      {loading && (
        <div className="absolute inset-0 bg-[#0a1926]/90 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
          <div className="w-10 h-10 rounded-full border-2 border-rose-500/30 border-t-rose-500 animate-spin" />
          <span className="text-xs font-mono text-rose-300 tracking-wider font-semibold">
            {loadText}
          </span>
        </div>
      )}

      {/* Optional Top Station Badge Overlay (hidden by default to avoid covering page HUD cards) */}
      {showTopBadges && (
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/95 backdrop-blur-md shadow-sm border border-[#e5eeff]">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="font-['Archivo_Narrow'] text-[12px] font-bold uppercase text-[#003752] tracking-wider whitespace-nowrap">
              {currentStation.name}
            </span>
          </div>

          {/* Telemetry Badge */}
          <div className="pointer-events-auto flex items-center gap-2 bg-[#ffffff]/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-sm border border-[#e5eeff] font-mono text-[11px] text-[#41474d]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#003752]">Paslanmaz Kadavra Masası</span>
            <span className="text-[#c1c7ce]">•</span>
            <span className="text-[#006591] font-semibold">{currentStation.pins.length} İğne</span>
          </div>
        </div>
      )}

      {/* Bottom Floating Pin Badges with Explicit cursor-pointer */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 pointer-events-auto flex-wrap max-w-[calc(100%-140px)]">
        {currentStation.pins.map((pin) => {
          const isSelected = activePin === pin.number;
          return (
            <button
              key={pin.number}
              type="button"
              onClick={() => onSelectPin?.(pin.number)}
              className={`px-3 py-1.5 rounded-xl font-['Archivo_Narrow'] text-[11px] font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer backdrop-blur-md hover:scale-[1.05] ${
                isSelected
                  ? "bg-[#003752] text-white scale-[1.05] border border-sky-400 ring-2 ring-sky-400/40"
                  : "bg-[#ffffff]/90 text-[#003752] hover:bg-[#ffffff] border border-[#e5eeff]"
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: pin.color }}
              />
              <span>Pin #{pin.number}</span>
            </button>
          );
        })}
      </div>

      {/* Camera Controls on Bottom Right with Explicit cursor-pointer */}
      <div className="absolute bottom-4 right-4 z-20 pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-[#ffffff]/95 backdrop-blur-md shadow-md border border-[#e5eeff]">
        <button
          type="button"
          onClick={toggleAutoRotate}
          title={isAutoRotating ? "Döndürmeyi Durdur" : "Otomatik Döndürmeyi Başlat"}
          className={`p-1.5 rounded-lg transition-all cursor-pointer ${
            isAutoRotating
              ? "bg-[#003752] text-[#39b8fd]"
              : "text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752]"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {isAutoRotating ? "pause" : "360"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleZoom(-0.35)}
          title="Yakınlaştır"
          className="p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">zoom_in</span>
        </button>
        <button
          type="button"
          onClick={() => handleZoom(0.35)}
          title="Uzaklaştır"
          className="p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">zoom_out</span>
        </button>
        <button
          type="button"
          onClick={handleResetCamera}
          title="Kamera Açısını Sıfırla"
          className="p-1.5 rounded-lg text-[#41474d] hover:bg-[#eff4ff] hover:text-[#003752] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
        </button>
      </div>

      {/* Interactive Guidance Bar at Bottom Center */}
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex">
        <div className="bg-[#003752]/80 backdrop-blur-md px-3.5 py-1 rounded-full text-white text-[10px] flex items-center gap-2 border border-sky-400/20">
          <span className="material-symbols-outlined text-[14px] text-[#39b8fd]">
            pan_tool
          </span>
          <span>Masa üstünde serbestçe döndürün • Kamera masanın altına inmez</span>
        </div>
      </div>
    </div>
  );
}
