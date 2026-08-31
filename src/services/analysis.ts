/**
 * AI-assisted risk review contract.
 *
 * OrthoSense is decision support, never a diagnosis. The current provider is a
 * no-op that reports "unavailable"; a future implementation calls a server
 * function which in turn calls the model provider.
 */
import type { RiskMarkerReview, SymptomAssessment, MovementAssessment, GuidanceItem } from "@/types";

export interface AnalysisRequest {
  symptoms: SymptomAssessment | null;
  movement: MovementAssessment | null;
}

export interface AnalysisOutput {
  review: RiskMarkerReview;
  guidance: GuidanceItem[];
}

export interface AnalysisProvider {
  readonly available: boolean;
  analyse(request: AnalysisRequest): Promise<AnalysisOutput>;
}

export const unavailableReview: RiskMarkerReview = {
  band: "unavailable",
  confidence: null,
  markers: [
    { key: "symptomBurden", label: "Symptom burden", value: null },
    { key: "movementVariability", label: "Movement variability", value: null },
    { key: "functionalLimitation", label: "Functional limitation", value: null },
  ],
  generatedAt: null,
  modelVersion: null,
};

const notConnectedProvider: AnalysisProvider = {
  available: false,
  async analyse() {
    return { review: unavailableReview, guidance: [] };
  },
};

let provider: AnalysisProvider = notConnectedProvider;

export function getAnalysisProvider(): AnalysisProvider {
  return provider;
}

export function setAnalysisProvider(next: AnalysisProvider) {
  provider = next;
}
