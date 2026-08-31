import type { ISODateString, UUID } from "@/types";

/** Client-side id generator. Replaced by database-generated ids once a backend exists. */
export function createId(): UUID {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}

export function nowIso(): ISODateString {
  return new Date().toISOString();
}
