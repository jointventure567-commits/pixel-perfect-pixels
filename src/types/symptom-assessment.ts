import type { BaseRecord, ISODateString, Severity, UUID } from "./common";

export type PainFrequency = "never" | "occasional" | "frequent" | "constant";
export type MorningStiffness = "none" | "under30" | "over30";

export type SymptomKey = keyof SymptomResponses;

/** Raw questionnaire answers exactly as the UI collects them. */
export interface SymptomResponses {
  /** 0-10 numeric rating scale. */
  painLevel: number | null;
  painFrequency: PainFrequency | null;
  morningStiffness: MorningStiffness | null;
  mobilityLimitation: Severity | null;
  walkingDifficulty: Severity | null;
  stairDifficulty: Severity | null;
  previousInjury: boolean | null;
  previousInjuryDetail?: string | null;
  affectedJoints: string[];
}

/** Derived, non-diagnostic summary of the questionnaire. */
export interface SymptomScore {
  /** 0-100 normalised symptom burden. */
  burden: number;
  /** Number of questions answered out of the total. */
  answered: number;
  total: number;
  complete: boolean;
}

/** Persisted questionnaire record attached to a screening. */
export interface SymptomAssessment extends BaseRecord {
  screeningId: UUID;
  patientId: UUID;
  responses: SymptomResponses;
  score: SymptomScore | null;
  completedAt: ISODateString | null;
}

export type SymptomAssessmentInput = Omit<SymptomAssessment, keyof BaseRecord>;

export const emptySymptomResponses: SymptomResponses = {
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
