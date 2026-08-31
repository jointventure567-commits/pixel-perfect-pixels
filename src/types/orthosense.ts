/**
 * Domain types for OrthoSense.
 * These are the contracts a future Supabase backend, AI analysis service and
 * ESP32 + MPU6050 device bridge should satisfy. No data is produced here.
 */

export type UUID = string;

export interface Patient {
  id: UUID;
  fullName: string;
  age: number | null;
  sex: "female" | "male" | "other" | "undisclosed" | null;
  heightCm: number | null;
  weightKg: number | null;
  contact?: string | null;
  notes?: string | null;
  createdAt: string;
}

export type SymptomKey =
  | "painLevel"
  | "painFrequency"
  | "morningStiffness"
  | "mobilityLimitation"
  | "walkingDifficulty"
  | "stairDifficulty"
  | "previousInjury"
  | "affectedJoints";

export interface SymptomResponses {
  painLevel: number | null; // 0-10
  painFrequency: "never" | "occasional" | "frequent" | "constant" | null;
  morningStiffness: "none" | "under30" | "over30" | null;
  mobilityLimitation: "none" | "mild" | "moderate" | "severe" | null;
  walkingDifficulty: "none" | "mild" | "moderate" | "severe" | null;
  stairDifficulty: "none" | "mild" | "moderate" | "severe" | null;
  previousInjury: boolean | null;
  previousInjuryDetail?: string | null;
  affectedJoints: string[];
}

export type DeviceStatus = "disconnected" | "connecting" | "connected" | "streaming" | "error";

export interface DeviceInfo {
  id: string;
  label: string; // e.g. "ESP32 / MPU6050"
  firmware?: string | null;
  batteryPercent?: number | null;
  status: DeviceStatus;
}

/** One MPU6050 sample. Populated only by real hardware. */
export interface MovementSample {
  t: number; // ms since assessment start
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
}

export interface MovementAssessment {
  id: UUID;
  patientId: UUID | null;
  startedAt: string | null;
  durationSeconds: number;
  samples: MovementSample[];
  status: "idle" | "recording" | "complete" | "aborted";
}

export type RiskBand = "low" | "moderate" | "elevated" | "unavailable";

export interface RiskMarkerReview {
  band: RiskBand;
  confidence: number | null;
  markers: { label: string; value: string | null; note?: string }[];
  generatedAt: string | null;
  modelVersion: string | null;
}

export interface ScreeningResult {
  id: UUID;
  patientId: UUID;
  symptoms: SymptomResponses | null;
  movement: MovementAssessment | null;
  review: RiskMarkerReview | null;
  guidance: string[];
  referral: Referral | null;
  createdAt: string;
}

export type ReferralStatus = "draft" | "sent" | "accepted" | "closed";

export interface Referral {
  id: UUID;
  patientId: UUID;
  screeningId: UUID;
  specialty: string;
  urgency: "routine" | "soon" | "urgent";
  status: ReferralStatus;
  notes?: string | null;
  createdAt: string;
}

export const emptySymptoms: SymptomResponses = {
  painLevel: null,
  painFrequency: null,
  morningStiffness: null,
  mobilityLimitation: null,
  walkingDifficulty: null,
  stairDifficulty: null,
  previousInjury: null,
  previousInjuryDetail: null,
  affectedJoints: [],
};
