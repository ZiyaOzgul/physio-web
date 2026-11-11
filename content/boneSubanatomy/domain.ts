export type LocalizedText = { tr: string; en: string };
export type L10n = LocalizedText;

/** Whether a muscle originates from ('origo') or inserts onto ('insertio') a bone landmark. */
export type AttachmentKind = 'origo' | 'insertio';

/** Anatomical surface direction of a landmark on the bone, used for pin normal biasing & camera auto-orbit. */
export type BoneSurfaceDirection =
  | 'anterior'
  | 'posterior'
  | 'medial'
  | 'lateral'
  | 'superior'
  | 'inferior';

/** Sub-region grouping along a bone (e.g. Proximal Epiphysis, Diaphysis/Shaft, Distal Epiphysis). */
export type BoneLandmarkRegionGroup = 'proximal' | 'shaft' | 'distal';

/**
 * Muscle attachment entry linked to a specific osteological landmark.
 * Displays Origo / Insertio, Function (Fonksiyon) and Innervation (İnnervasyon) when the landmark is selected.
 */
export interface MuscleAttachmentSpec {
  id: string;
  kind: AttachmentKind;
  muscleLatin: string;
  muscleName: LocalizedText;
  /** Optional partId in `muscular.glb` so the user can toggle the 3D muscle directly over the isolated bone. */
  musclePartId?: string;
  /** Primary biomechanical action / function of the muscle. */
  function: LocalizedText;
  /** Peripheral nerve and spinal root levels supplying the muscle. */
  innervation: {
    nerve: string;
    roots?: string;
  };
}

/**
 * Normalized 3D zone on a bone's geometry:
 * - `si`: Superior/Proximal (0) -> Inferior/Distal (1)
 * - `ml`: Medial/Midline (0) -> Lateral (1)
 * - `ap`: Anterior/Ventral (0) -> Posterior/Dorsal (1)
 */
export interface BoneLandmarkZone {
  si: number;
  ml: number;
  ap: number;
  /** Normalized ellipsoid radii `[rSi, rMl, rAp]` around `(si, ml, ap)` for surface painting & pin anchoring. */
  radius: readonly [number, number, number];
  normalHint: BoneSurfaceDirection;
}

/** One anatomical landmark / sub-region on a bone (e.g. Tuberculum majus, Sulcus nervi radialis, Trochlea humeri). */
export interface BoneLandmarkSpec {
  id: string;
  /** 1-based badge number displayed on the 3D pin when this bone is inspected. */
  number: number;
  latinName: string;
  name: LocalizedText;
  /** Additional accepted synonyms for the Bone Spot Exam (Kemik Zilli Sınavı). */
  synonyms?: readonly string[];
  regionGroup: BoneLandmarkRegionGroup;
  /** Distinct hex color used when painting anatomical sub-regions on the 3D bone surface. */
  color: string;
  /**
   * The part of the spec's group this landmark lives on (must be one of `BoneSubanatomySpec.partIds`).
   * Default = `primaryPartId`. `zone` is then interpreted in THAT part's own bounding-box frame
   * (e.g. the middle-phalanx landmark of the foot sits on a middle phalanx, not on the primary proximal one).
   */
  partId?: string;
  zone: BoneLandmarkZone;
  description: LocalizedText;
  clinicalNote?: LocalizedText;
  /** Key nerve or vessel directly contacting this bony landmark (e.g. N. radialis in Sulcus nervi radialis). */
  neurovascularRelation?: {
    structureLatin: string;
    note: LocalizedText;
  };
  /** Muscles originating from (`origo`) or inserting onto (`insertio`) this landmark. */
  attachments: readonly MuscleAttachmentSpec[];
}

/** Complete sub-anatomy specification for an osteological bone (or functional bone unit). */
export interface BoneSubanatomySpec {
  boneId: string;
  /** All skeletal `partId`s (right, left, or composite parts) that map to this bone sub-anatomy spec. */
  partIds: readonly string[];
  /** Default right/midline `partId` used when launching standalone bone inspection or bone spot exam. */
  primaryPartId: string;
  /** Region pack id containing this bone (e.g. 'arm-right', 'leg-right', 'thorax', 'pelvis', 'head-neck', 'back'). */
  packId: string;
  category: 'upper-limb' | 'lower-limb' | 'axial';
  latinName: string;
  title: LocalizedText;
  summary: LocalizedText;
  regionGroupLabels: Readonly<Record<BoneLandmarkRegionGroup, LocalizedText>>;
  landmarks: readonly BoneLandmarkSpec[];
}

/** The part a landmark lives on: its own `partId` when it is one of the spec's parts, else the primary part. */
export function landmarkPartId(
  spec: Pick<BoneSubanatomySpec, 'partIds' | 'primaryPartId'>,
  landmark: Pick<BoneLandmarkSpec, 'partId'>,
): string {
  const p = landmark.partId;
  return p !== undefined && spec.partIds.includes(p) ? p : spec.primaryPartId;
}

/** Parts that carry landmark regions: the primary part first, then the other landmark parts in landmark order. */
export function landmarkPartIds(spec: Pick<BoneSubanatomySpec, 'partIds' | 'primaryPartId' | 'landmarks'>): string[] {
  const out: string[] = [spec.primaryPartId];
  for (const lm of spec.landmarks) {
    const p = landmarkPartId(spec, lm);
    if (!out.includes(p)) out.push(p);
  }
  return out;
}

/** Distinct, high-contrast anatomical zone palette for 3D bone surface region painting. */
export const BONE_ZONE_PALETTE = [
  '#38bdf8', // Sky Cyan
  '#f59e0b', // Amber Gold
  '#34d399', // Emerald Mint
  '#f472b6', // Rose Pink
  '#a78bfa', // Violet Purple
  '#fb7185', // Coral Red
  '#2dd4bf', // Teal
  '#facc15', // Warm Yellow
  '#60a5fa', // Royal Blue
  '#fb923c', // Orange
  '#4ade80', // Spring Green
  '#c084fc', // Lavender
] as const;

/**
 * Camera yaw angle (radians) that faces a given anatomical surface direction on the bone.
 * In SceneRig: yaw = 0 faces Anterior (+Z scene / -Z raw); yaw = PI faces Posterior (-Z scene / +Z raw);
 * for a right-sided bone (-X scene), Lateral is yaw = -PI/2 and Medial is yaw = +PI/2.
 */
export function cameraYawForSurface(
  direction: BoneSurfaceDirection,
  side: 'right' | 'left' | 'midline' = 'right',
): { yaw: number; pitch: number } {
  const sign = side === 'left' ? -1 : 1;
  switch (direction) {
    case 'anterior':
      return { yaw: 0, pitch: 0.08 };
    case 'posterior':
      return { yaw: Math.PI, pitch: 0.08 };
    case 'lateral':
      return { yaw: -sign * (Math.PI / 2), pitch: 0.08 };
    case 'medial':
      return { yaw: sign * (Math.PI / 2), pitch: 0.08 };
    case 'superior':
      return { yaw: 0, pitch: 0.65 };
    case 'inferior':
      return { yaw: 0, pitch: -0.65 };
  }
}

/**
 * Raw-space unit normal vector (`-Y` up, `-Z` anterior, `-X` right lateral) matching a surface direction hint.
 */
export function rawNormalForSurface(
  direction: BoneSurfaceDirection,
  side: 'right' | 'left' | 'midline' = 'right',
): readonly [number, number, number] {
  const latX = side === 'left' ? 1 : -1;
  switch (direction) {
    case 'anterior':
      return [0, 0, -1];
    case 'posterior':
      return [0, 0, 1];
    case 'lateral':
      return [latX, 0, 0];
    case 'medial':
      return [-latX, 0, 0];
    case 'superior':
      return [0, -1, 0];
    case 'inferior':
      return [0, 1, 0];
  }
}
