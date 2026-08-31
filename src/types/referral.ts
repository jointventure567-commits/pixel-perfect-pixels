import type { BaseRecord, ISODateString, UUID } from "./common";

export type ReferralStatus = "draft" | "sent" | "accepted" | "closed";
export type ReferralUrgency = "routine" | "soon" | "urgent";
export type ReferralSpecialty = "orthopaedics" | "physiotherapy" | "rheumatology" | "imaging" | "other";

export interface Referral extends BaseRecord {
  patientId: UUID;
  screeningId: UUID;
  resultId: UUID | null;
  specialty: ReferralSpecialty | string;
  urgency: ReferralUrgency;
  status: ReferralStatus;
  reason?: string | null;
  notes?: string | null;
  sentAt?: ISODateString | null;
}

export type ReferralInput = Omit<Referral, keyof BaseRecord>;
