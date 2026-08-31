/**
 * Repository contracts — the only surface the UI uses to read or write data.
 *
 * Swapping the in-memory implementation for a Supabase-backed one means
 * providing new objects that satisfy these interfaces in `src/data/index.ts`.
 * No screen or hook needs to change.
 */
import type {
  MovementAssessment,
  MovementAssessmentInput,
  Patient,
  PatientInput,
  Referral,
  ReferralInput,
  Screening,
  ScreeningBundle,
  ScreeningInput,
  ScreeningResult,
  ScreeningResultInput,
  SymptomAssessment,
  SymptomAssessmentInput,
  UUID,
} from "@/types";

export interface PatientRepository {
  list(query?: { search?: string }): Promise<Patient[]>;
  get(id: UUID): Promise<Patient | null>;
  create(input: PatientInput): Promise<Patient>;
  update(id: UUID, patch: Partial<PatientInput>): Promise<Patient>;
  remove(id: UUID): Promise<void>;
}

export interface ScreeningRepository {
  list(query?: { patientId?: UUID }): Promise<Screening[]>;
  get(id: UUID): Promise<Screening | null>;
  getBundle(id: UUID): Promise<ScreeningBundle | null>;
  create(input: ScreeningInput): Promise<Screening>;
  update(id: UUID, patch: Partial<ScreeningInput>): Promise<Screening>;
}

export interface SymptomAssessmentRepository {
  getByScreening(screeningId: UUID): Promise<SymptomAssessment | null>;
  save(input: SymptomAssessmentInput): Promise<SymptomAssessment>;
}

export interface MovementAssessmentRepository {
  getByScreening(screeningId: UUID): Promise<MovementAssessment | null>;
  save(input: MovementAssessmentInput): Promise<MovementAssessment>;
}

export interface ScreeningResultRepository {
  getByScreening(screeningId: UUID): Promise<ScreeningResult | null>;
  save(input: ScreeningResultInput): Promise<ScreeningResult>;
}

export interface ReferralRepository {
  list(query?: { status?: Referral["status"] }): Promise<Referral[]>;
  get(id: UUID): Promise<Referral | null>;
  create(input: ReferralInput): Promise<Referral>;
  update(id: UUID, patch: Partial<ReferralInput>): Promise<Referral>;
}

export interface DataSource {
  patients: PatientRepository;
  screenings: ScreeningRepository;
  symptoms: SymptomAssessmentRepository;
  movements: MovementAssessmentRepository;
  results: ScreeningResultRepository;
  referrals: ReferralRepository;
}
