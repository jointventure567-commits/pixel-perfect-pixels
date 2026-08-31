import type { BaseRecord, ISODateString, UUID } from "./common";

export type PatientSex = "female" | "male" | "other" | "undisclosed";

export interface Patient extends BaseRecord {
  fullName: string;
  age: number | null;
  sex: PatientSex | null;
  heightCm: number | null;
  weightKg: number | null;
  contact?: string | null;
  notes?: string | null;
  /** Optional clinic/organisation scope for a future multi-tenant backend. */
  clinicId?: UUID | null;
  lastScreenedAt?: ISODateString | null;
}

/** Fields captured by the UI before a patient record exists. */
export type PatientDraft = Partial<
  Pick<Patient, "fullName" | "age" | "sex" | "heightCm" | "weightKg" | "contact" | "notes">
>;

/** Payload accepted by the patient repository on create. */
export type PatientInput = Omit<Patient, keyof BaseRecord>;

export const emptyPatientDraft: PatientDraft = {};
