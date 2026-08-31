import type { BaseRecord, ISODateString, UUID } from "./common";
import type { SensorData, SensorMetrics } from "./sensor";

export type MovementTestType = "gait" | "sitToStand" | "kneeFlexion" | "stairStep" | "custom";

export type MovementStatus = "idle" | "recording" | "complete" | "aborted";

/** A recorded movement test backed by one sensor capture. */
export interface MovementAssessment extends BaseRecord {
  screeningId: UUID | null;
  patientId: UUID | null;
  testType: MovementTestType;
  status: MovementStatus;
  startedAt: ISODateString | null;
  durationSeconds: number;
  sensorData: SensorData | null;
  metrics: SensorMetrics | null;
}

export type MovementAssessmentInput = Omit<MovementAssessment, keyof BaseRecord>;
