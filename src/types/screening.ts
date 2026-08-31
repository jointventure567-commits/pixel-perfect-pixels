import type { BaseRecord, ISODateString, UUID } from "./common";
import type { MovementAssessment } from "./movement-assessment";
import type { Patient } from "./patient";
import type { Referral } from "./referral";
import type { ScreeningResult } from "./screening-result";
import type { SymptomAssessment } from "./symptom-assessment";

export type ScreeningStep = "patient" | "symptoms" | "movement" | "review";

export type ScreeningStatus = "draft" | "in_progress" | "awaiting_analysis" | "complete" | "cancelled";

/** The aggregate record tying one screening episode together. */
export interface Screening extends BaseRecord {
  patientId: UUID;
  clinicianId?: UUID | null;
  status: ScreeningStatus;
  currentStep: ScreeningStep;
  symptomAssessmentId: UUID | null;
  movementAssessmentId: UUID | null;
  resultId: UUID | null;
  referralId: UUID | null;
  completedAt: ISODateString | null;
}

export type ScreeningInput = Omit<Screening, keyof BaseRecord>;

/** Fully hydrated screening as a details screen would consume it. */
export interface ScreeningBundle {
  screening: Screening;
  patient: Patient | null;
  symptoms: SymptomAssessment | null;
  movement: MovementAssessment | null;
  result: ScreeningResult | null;
  referral: Referral | null;
}
