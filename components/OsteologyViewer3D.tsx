"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type {
  BoneLandmarkSpec,
  BoneSubanatomySpec,
  BoneSurfaceDirection,
} from "@/content/boneSubanatomy/domain";
import { cameraYawForSurface } from "@/content/boneSubanatomy/domain";

interface OsteologyViewer3DProps {
  spec: BoneSubanatomySpec;
  activeLandmarkId: string | null;
  onSelectLandmark: (landmarkId: string) => void;
  showAllZones: boolean;
  onToggleAllZones: () => void;
  showPins: boolean;
  onTogglePins: () => void;
  inspectorTab: "anatomy" | "muscles" | "landmarks";
  language: "tr" | "en";
}

interface ProjectedPin {
  landmark: BoneLandmarkSpec;
  x: number;
  y: number;
  visible: boolean;
  facing: boolean;
}

// Mobile-matched clinical studio tokens
const SCENE_BG_COLOR = 0xe9e9ea; // mobile tokens.colors.sceneBackground (#e9e9ea)
const ORIGO_COLOR = 0xc8463c; // = app tokens.origo (osteology GLB footprints)
const INSERTIO_COLOR = 0x3c6ec8; // = app tokens.insertio

/**
 * Mobile-identical bone shader injector:
 * - Preserves vertex colors (COLOR_0 linear: bone ivory + cartilage blue-gray)
 * - Highlights convex ridges (_curv) and darkens concavities
 * - Adds wet sheen to cartilage (lowers roughness on bluish vertices)
 * - Mixes landmark palette tint over the baked bone shading while preserving luminance
 */
function applyBoneShader(
  material: THREE.MeshStandardMaterial,
  tintColorHex?: string,
  tintStrength: number = 0,
  emissiveIntensity: number = 0,
) {
  const col = new THREE.Color(tintColorHex ?? "#ffffff");
  material.userData.uBoneTint = new THREE.Vector4(col.r, col.g, col.b, tintStrength);

  if (tintColorHex && emissiveIntensity > 0) {
    material.emissive.set(col);
    material.emissiveIntensity = emissiveIntensity;
  } else {
    material.emissive.set(0x000000);
    material.emissiveIntensity = 0;
  }

  material.customProgramCacheKey = () => "physio-bone-v2";

  material.onBeforeCompile = (shader) => {
    material.userData.shader = shader;
    shader.uniforms.uBoneTint = { value: material.userData.uBoneTint };

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
attribute float _curv;
varying float vBoneCurv;
varying vec3 vBoneP;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
vBoneCurv = _curv;
vBoneP = position;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
varying float vBoneCurv;
varying vec3 vBoneP;
uniform vec4 uBoneTint;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
  float bnC = clamp(vBoneCurv / 0.75, -1.0, 1.0);
  float bnRidge = smoothstep(0.1, 1.0, bnC);
  float bnCavity = smoothstep(0.1, 1.0, -bnC);
  diffuseColor.rgb *= 1.0 + 0.1 * bnRidge - 0.16 * bnCavity;
  float bnLum = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
  vec3 bnTinted = uBoneTint.rgb * clamp(bnLum * 1.5 + 0.08, 0.0, 1.0);
  diffuseColor.rgb = mix(diffuseColor.rgb, bnTinted, uBoneTint.a);`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
  float bnChroma = (vColor.b - vColor.r) / max(vColor.g, 0.05);
  float bnWet = smoothstep(-0.2, 0.3, bnChroma);
  roughnessFactor = mix(roughnessFactor, roughnessFactor * 0.55, bnWet);`,
      );
  };
}

function createBoneMaterial(
  tintColorHex?: string,
  tintStrength: number = 0,
  emissiveIntensity: number = 0,
): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.72,
    metalness: 0,
    vertexColors: true,
    side: THREE.DoubleSide,
  });
  applyBoneShader(mat, tintColorHex, tintStrength, emissiveIntensity);
  return mat;
}

export default function OsteologyViewer3D({
  spec,
  activeLandmarkId,
  onSelectLandmark,
  showAllZones,
  onToggleAllZones,
  showPins,
  onTogglePins,
  inspectorTab,
  language,
}: OsteologyViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [pins, setPins] = useState<ProjectedPin[]>([]);

  // Persistent Three.js references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  // User interaction & animation state
  const isUserInteractingRef = useRef(false);
  const camTargetRef = useRef<{ radius: number; yaw: number; pitch: number; animating: boolean } | null>(null);

  // Mesh registries
  const landmarkMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const landmarkPositionsRef = useRef<Map<string, THREE.Vector3>>(new Map());
  const landmarkNormalsRef = useRef<Map<string, THREE.Vector3>>(new Map());
  const footprintMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  // Dynamic prop refs for the animation loop
  const specRef = useRef(spec);
  useEffect(() => {
    specRef.current = spec;
  }, [spec]);

  const showPinsRef = useRef(showPins);
  useEffect(() => {
    showPinsRef.current = showPins;
    if (!showPins) setPins([]);
  }, [showPins]);

  // Raycaster for click selection
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  // 1. One-Time Scene, Camera, Renderer & OrbitControls Initialization
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(SCENE_BG_COLOR);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.2, 3.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.9;
    controls.panSpeed = 0.75;
    controls.minDistance = 0.8;
    controls.maxDistance = 5.5;
    controls.target.set(0, 0, 0);
    controls.saveState();
    controlsRef.current = controls;

    // Immediately cancel program camera lerp whenever user starts manual interaction
    const onControlsStart = () => {
      isUserInteractingRef.current = true;
      camTargetRef.current = null;
    };
    const onControlsEnd = () => {
      isUserInteractingRef.current = false;
    };
    controls.addEventListener("start", onControlsStart);
    controls.addEventListener("end", onControlsEnd);

    // Studio Lighting - Exactly matching mobile LIGHT rig (lighting.ts)
    // dome fill 1.15, key 2.0 at [2, 3, 3], fill 0.7 at [-3, 1, 1]
    const hemisphereDome = new THREE.HemisphereLight(0xffffff, 0x8a929a, 1.15);
    scene.add(hemisphereDome);

    const keyLight = new THREE.DirectionalLight(0xfffbf2, 2.0);
    keyLight.position.set(2, 3, 3);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-3, 1, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // Render & Animation Loop
    let running = true;
    let frameCount = 0;

    const animate = () => {
      if (!running) return;
      animFrameIdRef.current = requestAnimationFrame(animate);
      frameCount++;

      // Smooth camera yaw/pitch orbit when a preset view is requested
      if (
        camTargetRef.current &&
        camTargetRef.current.animating &&
        !isUserInteractingRef.current &&
        controlsRef.current &&
        cameraRef.current
      ) {
        const { radius, yaw, pitch } = camTargetRef.current;
        const target = controlsRef.current.target;
        const targetPos = new THREE.Vector3(
          target.x + radius * Math.cos(pitch) * Math.sin(yaw),
          target.y + radius * Math.sin(pitch),
          target.z + radius * Math.cos(pitch) * Math.cos(yaw),
        );

        cameraRef.current.position.lerp(targetPos, 0.1);
        controlsRef.current.update();

        if (cameraRef.current.position.distanceTo(targetPos) < 0.02) {
          camTargetRef.current.animating = false;
        }
      } else {
        controls.update();
      }

      renderer.render(scene, camera);

      // Project 3D pins to screen coordinates every 2 frames
      if (showPinsRef.current && frameCount % 2 === 0 && cameraRef.current && containerRef.current) {
        const cam = cameraRef.current;
        const contW = containerRef.current.clientWidth;
        const contH = containerRef.current.clientHeight;
        const currentSpec = specRef.current;
        const newPins: ProjectedPin[] = [];

        currentSpec.landmarks.forEach((lm) => {
          const worldPos = landmarkPositionsRef.current.get(lm.id);
          if (!worldPos) return;

          const screenVec = worldPos.clone().project(cam);
          const inFrustum = screenVec.z < 1.0;
          const x = (screenVec.x * 0.5 + 0.5) * contW;
          const y = (-screenVec.y * 0.5 + 0.5) * contH;

          // Check if landmark surface normal is facing towards the camera
          const normal = landmarkNormalsRef.current.get(lm.id);
          const toCam = cam.position.clone().sub(worldPos).normalize();
          const facing = normal ? normal.dot(toCam) > -0.2 : true;

          if (inFrustum && x >= 15 && x <= contW - 15 && y >= 15 && y <= contH - 15) {
            newPins.push({
              landmark: lm,
              x,
              y,
              visible: true,
              facing,
            });
          }
        });

        setPins(newPins);
      }
    };
    animate();

    // Window Resize Handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      if (nw === 0 || nh === 0) return;
      cameraRef.current.aspect = nw / nh;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      controls.removeEventListener("start", onControlsStart);
      controls.removeEventListener("end", onControlsEnd);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }
    };
  }, []);

  // 2. Load and Normalize Bone GLB Model when spec.boneId changes
  useEffect(() => {
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!scene || !camera || !controls) return;

    setLoading(true);
    setLoadError(null);
    setPins([]);
    camTargetRef.current = null;

    // Remove previous model cleanly
    if (modelGroupRef.current) {
      scene.remove(modelGroupRef.current);
      modelGroupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
          else child.material.dispose();
        }
      });
      modelGroupRef.current = null;
    }
    landmarkMeshesRef.current.clear();
    landmarkPositionsRef.current.clear();
    landmarkNormalsRef.current.clear();
    footprintMeshesRef.current.clear();

    const loader = new GLTFLoader();
    const url = `/models/osteology/${spec.boneId}.glb`;

    loader.load(
      url,
      (gltf) => {
        const root = gltf.scene;
        modelGroupRef.current = root;

        // Bounding box & Center normalization
        const box = new THREE.Box3().setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.0 / maxDim;

        root.scale.setScalar(scale);
        root.position.copy(center).multiplyScalar(-scale);
        scene.add(root);
        root.updateMatrixWorld(true);

        // Reset camera and controls to standard framed distance
        camera.position.set(0, 0.2, 3.2);
        camera.near = 0.1;
        camera.far = 50.0;
        camera.updateProjectionMatrix();

        controls.target.set(0, 0, 0);
        controls.minDistance = 0.8;
        controls.maxDistance = 5.5;
        controls.saveState();
        controls.update();

        // Ensure geometry has curvature attribute fallback if missing
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const geo = child.geometry;
            if (!geo.getAttribute("_curv")) {
              const posCount = geo.getAttribute("position")?.count ?? 0;
              geo.setAttribute("_curv", new THREE.BufferAttribute(new Float32Array(posCount), 1));
            }
          }
        });

        // Index meshes by node name and assign mobile bone shader materials
        root.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const name = child.name || "";

            // Check if it's a landmark subregion mesh
            let matchedLandmark: BoneLandmarkSpec | undefined;
            spec.landmarks.forEach((lm) => {
              const slug = lm.id.replace(`${spec.boneId}-`, "");
              if (name === `${spec.boneId}__${slug}` || name.includes(slug) || name === lm.id) {
                matchedLandmark = lm;
                landmarkMeshesRef.current.set(lm.id, child);

                // Compute bounding box centroid for landmark in world space
                child.geometry.computeBoundingBox();
                const lmBox = new THREE.Box3().setFromObject(child);
                const lmCenter = lmBox.getCenter(new THREE.Vector3());
                landmarkPositionsRef.current.set(lm.id, lmCenter);

                // Normal estimation: vector from bone center (0,0,0) to landmark center
                landmarkNormalsRef.current.set(lm.id, lmCenter.clone().normalize());
              }
            });

            // Check if it's a muscle footprint mesh (origo__... or insertio__...)
            if (name.startsWith("origo__") || name.startsWith("insertio__")) {
              footprintMeshesRef.current.set(name, child);
              child.renderOrder = 2;
              const isOrigo = name.startsWith("origo__");
              const fpColor = isOrigo ? ORIGO_COLOR : INSERTIO_COLOR;
              child.material = new THREE.MeshStandardMaterial({
                color: fpColor,
                emissive: fpColor,
                emissiveIntensity: 0.2,
                roughness: 0.55,
                metalness: 0,
                side: THREE.DoubleSide,
                polygonOffset: true,
                polygonOffsetFactor: -2,
                polygonOffsetUnits: -2,
                transparent: true,
                opacity: 0.9,
              });
              child.visible = false;
              return;
            }

            // Assign mobile bone shader material to all bone parts
            if (matchedLandmark) {
              child.material = createBoneMaterial(matchedLandmark.color, showAllZones ? 0.64 : 0, 0);
            } else {
              // Primary base bone node (e.g. FJ3176)
              child.material = createBoneMaterial(undefined, 0, 0);
            }
          }
        });

        // Fallback for landmarks without dedicated submeshes: compute from normalized zone
        spec.landmarks.forEach((lm) => {
          if (!landmarkPositionsRef.current.has(lm.id)) {
            const zx = (box.min.x + (1 - lm.zone.ml) * size.x - center.x) * scale;
            const zy = (box.max.y - lm.zone.si * size.y - center.y) * scale;
            const zz = (box.min.z + lm.zone.ap * size.z - center.z) * scale;
            const fallbackPos = new THREE.Vector3(zx, zy, zz);
            landmarkPositionsRef.current.set(lm.id, fallbackPos);
            landmarkNormalsRef.current.set(lm.id, fallbackPos.clone().normalize());
          }
        });

        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Failed to load bone GLB:", err);
        setLoadError(language === "tr" ? "3D kemik modeli yüklenemedi." : "Failed to load 3D bone model.");
        setLoading(false);
      },
    );
  }, [spec.boneId, language]);

  // 3. Update Landmark Highlighting & Surface Colors (Instant uniform update)
  useEffect(() => {
    spec.landmarks.forEach((lm) => {
      const mesh = landmarkMeshesRef.current.get(lm.id);
      if (!mesh || !(mesh.material instanceof THREE.MeshStandardMaterial)) return;

      const isSelected = lm.id === activeLandmarkId;
      const col = new THREE.Color(lm.color);
      const uBoneTint = mesh.material.userData.uBoneTint as THREE.Vector4 | undefined;

      if (isSelected) {
        // Selected: Strong tint (0.86) + faint emissive lift (0.14)
        if (uBoneTint) uBoneTint.set(col.r, col.g, col.b, 0.86);
        mesh.material.emissive.set(col);
        mesh.material.emissiveIntensity = 0.14;
      } else if (showAllZones) {
        // Palette plate: 0.64 tint strength
        if (uBoneTint) uBoneTint.set(col.r, col.g, col.b, 0.64);
        mesh.material.emissive.set(0x000000);
        mesh.material.emissiveIntensity = 0;
      } else {
        // Bare bone: tint strength 0
        if (uBoneTint) uBoneTint.set(col.r, col.g, col.b, 0.0);
        mesh.material.emissive.set(0x000000);
        mesh.material.emissiveIntensity = 0;
      }
      mesh.material.needsUpdate = true;
    });
  }, [spec.landmarks, activeLandmarkId, showAllZones]);

  // 4. Update Muscle Footprints (Origo & Insertio)
  useEffect(() => {
    const isMusclesTab = inspectorTab === "muscles";
    const activeLandmark = spec.landmarks.find((lm) => lm.id === activeLandmarkId);

    footprintMeshesRef.current.forEach((mesh, name) => {
      if (!isMusclesTab) {
        mesh.visible = false;
        return;
      }

      const matchesActiveLandmark = activeLandmark
        ? name.includes(activeLandmark.id.replace(`${spec.boneId}-`, "")) ||
          activeLandmark.attachments.some(
            (a) => name.includes(a.muscleLatin) || (a.musclePartId && name.includes(a.musclePartId)),
          )
        : true;

      mesh.visible = true;
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.opacity = matchesActiveLandmark ? 0.95 : 0.35;
        mesh.material.emissiveIntensity = matchesActiveLandmark ? 0.35 : 0.1;
      }
    });
  }, [inspectorTab, activeLandmarkId, spec]);

  // 5. Preset Camera Surface Focus (Anterior, Posterior, Lateral)
  const focusSurface = useCallback((surface: BoneSurfaceDirection) => {
    if (!controlsRef.current || !cameraRef.current) return;
    const angles = cameraYawForSurface(surface, "right");
    const radius = 3.2;

    camTargetRef.current = {
      radius,
      yaw: angles.yaw,
      pitch: angles.pitch,
      animating: true,
    };
  }, []);

  const resetCamera = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    camTargetRef.current = {
      radius: 3.2,
      yaw: 0,
      pitch: 0.1,
      animating: true,
    };
  }, []);

  // Raycaster click on 3D bone to select landmark
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    const camera = cameraRef.current;
    const root = modelGroupRef.current;
    if (!container || !camera || !root) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, camera);
    const hits = raycasterRef.current.intersectObjects(root.children, true);

    if (hits.length > 0) {
      const hit = hits[0];
      let foundId: string | null = null;

      // Check hit mesh against landmark meshes
      landmarkMeshesRef.current.forEach((mesh, lmId) => {
        if (hit.object === mesh) foundId = lmId;
      });

      if (foundId) {
        onSelectLandmark(foundId);
        return;
      }

      // Proximity search to closest landmark position
      let closestId: string | null = null;
      let closestDist = Infinity;
      landmarkPositionsRef.current.forEach((pos, lmId) => {
        const d = hit.point.distanceTo(pos);
        if (d < closestDist) {
          closestDist = d;
          closestId = lmId;
        }
      });

      if (closestId && closestDist < 0.6) {
        onSelectLandmark(closestId);
      }
    }
  };

  return (
    <div className="relative w-full h-full min-h-[460px] bg-[#e9e9ea] rounded-[14px] overflow-hidden select-none border border-[#d2d6dc]">
      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-grab active:cursor-grabbing outline-none touch-none"
      />

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 bg-[#e9e9ea]/80 flex flex-col items-center justify-center gap-3 z-30">
          <div className="w-9 h-9 rounded-full border-3 border-[#d4d4d7] border-t-[#5980a6] animate-spin" />
          <span className="text-[12px] font-semibold text-[#1d1f20]">
            {language === "tr" ? "3D Kemik Modeli Hazırlanıyor…" : "Loading 3D Bone Model…"}
          </span>
        </div>
      )}

      {/* Error Notice */}
      {loadError && (
        <div className="absolute inset-0 bg-[#e9e9ea]/95 flex flex-col items-center justify-center gap-2 p-6 text-center z-30">
          <span className="material-symbols-outlined text-[32px] text-[#b8494b]">warning</span>
          <p className="text-[13px] font-medium text-[#424244]">{loadError}</p>
        </div>
      )}

      {/* 3D Number Pins Overlay (Matching Mobile Pin Badges) */}
      {showPins && !loading && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {pins.map(({ landmark, x, y, visible, facing }) => {
            if (!visible) return null;
            const isSelected = landmark.id === activeLandmarkId;

            return (
              <button
                key={landmark.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLandmark(landmark.id);
                }}
                className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 flex items-center justify-center font-data font-bold text-white cursor-pointer group ${
                  isSelected
                    ? "w-7 h-7 text-[12px] scale-110 ring-3 ring-white ring-offset-2 ring-offset-[#416180] z-30 opacity-100"
                    : facing
                      ? "w-5.5 h-5.5 text-[10.5px] z-10 opacity-95"
                      : "w-4.5 h-4.5 text-[9.5px] opacity-30 hover:opacity-90 z-0"
                }`}
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  backgroundColor: landmark.color,
                }}
                title={`${landmark.number}. ${landmark.latinName} (${language === "tr" ? landmark.name.tr : landmark.name.en})`}
              >
                {landmark.number}

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:flex flex-col items-center whitespace-nowrap bg-[#416180] text-white px-2 py-0.5 rounded-lg text-[10.5px] pointer-events-none z-40">
                  <span className="font-bold font-archivo">{landmark.latinName}</span>
                  <span className="text-[9.5px] text-[#d6ebff]">
                    {language === "tr" ? landmark.name.tr : landmark.name.en}
                  </span>
                  <div className="w-1.5 h-1.5 bg-[#416180] rotate-45 -mb-0.5 transform translate-y-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Floating Top Controls Toolbar */}
      <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none z-20">
        {/* Left: Toggles */}
        <div className="flex items-center gap-1 p-1 rounded-[10px] bg-white/90 border border-[#d4d4d7]/80 pointer-events-auto">
          <button
            type="button"
            onClick={onTogglePins}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              showPins
                ? "bg-[#416180] text-white shadow-2xs"
                : "text-[#5d5d60] hover:bg-[#ececee] hover:text-[#1d1f20]"
            }`}
            title={language === "tr" ? "İğneleri Aç/Kapat" : "Toggle Pins"}
          >
            <span className="material-symbols-outlined text-[15px]">
              {showPins ? "pin_drop" : "location_off"}
            </span>
            <span className="hidden sm:inline">{language === "tr" ? "İğneler" : "Pins"}</span>
          </button>

          <button
            type="button"
            onClick={onToggleAllZones}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
              showAllZones
                ? "bg-[#416180] text-white shadow-2xs"
                : "text-[#5d5d60] hover:bg-[#ececee] hover:text-[#1d1f20]"
            }`}
            title={language === "tr" ? "Renkli Bölgeleri Aç/Kapat" : "Toggle Color Zones"}
          >
            <span className="material-symbols-outlined text-[15px]">palette</span>
            <span className="hidden sm:inline">{language === "tr" ? "Tüm Bölgeler" : "All Zones"}</span>
          </button>
        </div>

        {/* Right: Camera Presets */}
        <div className="flex items-center gap-1 p-1 rounded-[10px] bg-white/90 border border-[#d4d4d7]/80 pointer-events-auto">
          <button
            type="button"
            onClick={() => focusSurface("anterior")}
            className="px-2 py-1 rounded-lg text-[10.5px] font-bold text-[#424244] hover:bg-[#eef6ff] hover:text-[#416180] transition-colors cursor-pointer"
            title={language === "tr" ? "Ön Yüz (Anterior)" : "Anterior View"}
          >
            {language === "tr" ? "Ön" : "Ant"}
          </button>
          <button
            type="button"
            onClick={() => focusSurface("posterior")}
            className="px-2 py-1 rounded-lg text-[10.5px] font-bold text-[#424244] hover:bg-[#eef6ff] hover:text-[#416180] transition-colors cursor-pointer"
            title={language === "tr" ? "Arka Yüz (Posterior)" : "Posterior View"}
          >
            {language === "tr" ? "Arka" : "Post"}
          </button>
          <button
            type="button"
            onClick={() => focusSurface("lateral")}
            className="px-2 py-1 rounded-lg text-[10.5px] font-bold text-[#424244] hover:bg-[#eef6ff] hover:text-[#416180] transition-colors cursor-pointer"
            title={language === "tr" ? "Yan Yüz (Lateral)" : "Lateral View"}
          >
            {language === "tr" ? "Yan" : "Lat"}
          </button>
          <button
            type="button"
            onClick={resetCamera}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[#5d5d60] hover:bg-[#ececee] transition-colors cursor-pointer"
            title={language === "tr" ? "Kamerayı Merkeze Sıfırla" : "Reset Camera"}
          >
            <span className="material-symbols-outlined text-[16px]">restart_alt</span>
          </button>
        </div>
      </div>

      {/* Muscle Footprint Legend (Only in muscles tab) */}
      {inspectorTab === "muscles" && (
        <div className="absolute bottom-3 left-3 flex items-center gap-2.5 px-2.5 py-1.5 rounded-[10px] bg-white border border-[#d4d4d7]/80 pointer-events-auto text-[10.5px] font-semibold z-20">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b8494b] shadow-2xs" />
            <span className="text-[#2b2b2d]">
              {language === "tr" ? "Origo (Başlangıç)" : "Origin"}
            </span>
          </div>
          <div className="w-[1px] h-3 bg-[#d4d4d7]" />
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5980a6] shadow-2xs" />
            <span className="text-[#2b2b2d]">
              {language === "tr" ? "İnsersiyo (Tutunma)" : "Insertion"}
            </span>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation Hint */}
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-white/80 border border-[#d4d4d7]/60 text-[10.5px] text-[#5d5d60] pointer-events-none hidden md:flex items-center gap-1.5 z-10">
        <span className="material-symbols-outlined text-[14px]">3d_rotation</span>
        <span>{language === "tr" ? "Döndür: Sol tık • Yakınlaş: Tekerlek" : "Rotate: Drag • Zoom: Scroll"}</span>
      </div>
    </div>
  );
}
