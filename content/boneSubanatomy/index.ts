import type { BoneSubanatomySpec } from './domain';
import { AXIAL_BONE_SPECS } from './axial';
import { CRANIAL_FACIAL_BONE_SPECS } from './cranium';
import { LOWER_LIMB_BONE_SPECS } from './lowerLimb';
import { UPPER_LIMB_BONE_SPECS } from './upperLimb';

export const BONE_SUBANATOMY_SPECS: readonly BoneSubanatomySpec[] = [
  ...UPPER_LIMB_BONE_SPECS,
  ...LOWER_LIMB_BONE_SPECS,
  ...AXIAL_BONE_SPECS,
  ...CRANIAL_FACIAL_BONE_SPECS,
];

const byBoneId = new Map<string, BoneSubanatomySpec>();
const byPartId = new Map<string, BoneSubanatomySpec>();

for (const spec of BONE_SUBANATOMY_SPECS) {
  byBoneId.set(spec.boneId, spec);
  for (const pid of spec.partIds) {
    byPartId.set(pid, spec);
  }
}

export function findBoneSubanatomyById(boneId: string | null | undefined): BoneSubanatomySpec | undefined {
  if (!boneId) return undefined;
  return byBoneId.get(boneId);
}

export function findBoneSubanatomyByPartId(partId: string | null | undefined): BoneSubanatomySpec | undefined {
  if (!partId) return undefined;
  return byPartId.get(partId);
}
