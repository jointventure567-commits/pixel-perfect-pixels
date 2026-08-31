/** Shared primitives used across the OrthoSense domain model. */

export type UUID = string;

/** ISO-8601 timestamp string (UTC). */
export type ISODateString = string;

export type Severity = "none" | "mild" | "moderate" | "severe";

export type RiskBand = "low" | "moderate" | "elevated" | "unavailable";

/** Base fields every persisted record carries (mirrors a Supabase row). */
export interface BaseRecord {
  id: UUID;
  createdAt: ISODateString;
  updatedAt?: ISODateString | null;
}

/** Result wrapper used by every repository/service call. */
export type AsyncResult<T> = Promise<T>;

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
