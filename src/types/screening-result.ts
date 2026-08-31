import type { BaseRecord, ISODateString, RiskBand, UUID } from "./common";

/** A single model-derived marker shown for clinician review. */
export interface RiskMarker {
  key: string;
  label: string;
  value: string | null;
  band?: RiskBand;
  note?: string;
}

/** AI-assisted review output. Decision support only — never a diagnosis. */
export interface RiskMarkerReview {
  band: RiskBand;
  /** 0-1 model confidence, when the provider reports one. */
  confidence: number | null;
  markers: RiskMarker[];
  generatedAt: ISODateString | null;
  modelVersion: string | null;
}

export interface GuidanceItem {
  key: string;
  title: string;
  detail?: string;
}

/** Consolidated summary produced once a screening's data is analysed. */
export interface ScreeningResult extends BaseRecord {
  screeningId: UUID;
  patientId: UUID;
  symptomSummary: string | null;
  movementSummary: string | null;
  review: RiskMarkerReview | null;
  guidance: GuidanceItem[];
  referralId: UUID | null;
}

export type ScreeningResultInput = Omit<ScreeningResult, keyof BaseRecord>;
