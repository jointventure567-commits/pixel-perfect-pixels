/**
 * In-memory data source used while OrthoSense is frontend-only.
 * It holds no seed data: every screen renders its empty state until a real
 * backend (or a screening flow) supplies records.
 */
import { createId, nowIso } from "@/lib/domain/ids";
import type { BaseRecord, UUID } from "@/types";
import type { DataSource } from "./repositories";

function table<T extends BaseRecord>() {
  const rows = new Map<UUID, T>();
  return {
    rows,
    all: () => [...rows.values()],
    insert: (input: Omit<T, keyof BaseRecord>): T => {
      const record = { ...(input as object), id: createId(), createdAt: nowIso(), updatedAt: null } as T;
      rows.set(record.id, record);
      return record;
    },
    patch: (id: UUID, changes: object): T => {
      const current = rows.get(id);
      if (!current) throw new Error(`Record ${id} not found`);
      const next = { ...current, ...changes, updatedAt: nowIso() } as T;
      rows.set(id, next);
      return next;
    },
  };
}

export function createMemoryDataSource(): DataSource {
  const patients = table<import("@/types").Patient>();
  const screenings = table<import("@/types").Screening>();
  const symptoms = table<import("@/types").SymptomAssessment>();
  const movements = table<import("@/types").MovementAssessment>();
  const results = table<import("@/types").ScreeningResult>();
  const referrals = table<import("@/types").Referral>();

  return {
    patients: {
      async list(query) {
        const search = query?.search?.trim().toLowerCase();
        const all = patients.all();
        return search ? all.filter((p) => p.fullName.toLowerCase().includes(search)) : all;
      },
      async get(id) {
        return patients.rows.get(id) ?? null;
      },
      async create(input) {
        return patients.insert(input);
      },
      async update(id, patch) {
        return patients.patch(id, patch);
      },
      async remove(id) {
        patients.rows.delete(id);
      },
    },
    screenings: {
      async list(query) {
        const all = screenings.all();
        return query?.patientId ? all.filter((s) => s.patientId === query.patientId) : all;
      },
      async get(id) {
        return screenings.rows.get(id) ?? null;
      },
      async getBundle(id) {
        const screening = screenings.rows.get(id);
        if (!screening) return null;
        return {
          screening,
          patient: patients.rows.get(screening.patientId) ?? null,
          symptoms: symptoms.all().find((s) => s.screeningId === id) ?? null,
          movement: movements.all().find((m) => m.screeningId === id) ?? null,
          result: results.all().find((r) => r.screeningId === id) ?? null,
          referral: referrals.all().find((r) => r.screeningId === id) ?? null,
        };
      },
      async create(input) {
        return screenings.insert(input);
      },
      async update(id, patch) {
        return screenings.patch(id, patch);
      },
    },
    symptoms: {
      async getByScreening(screeningId) {
        return symptoms.all().find((s) => s.screeningId === screeningId) ?? null;
      },
      async save(input) {
        const existing = symptoms.all().find((s) => s.screeningId === input.screeningId);
        return existing ? symptoms.patch(existing.id, input) : symptoms.insert(input);
      },
    },
    movements: {
      async getByScreening(screeningId) {
        return movements.all().find((m) => m.screeningId === screeningId) ?? null;
      },
      async save(input) {
        const existing = movements.all().find((m) => m.screeningId === input.screeningId);
        return existing ? movements.patch(existing.id, input) : movements.insert(input);
      },
    },
    results: {
      async getByScreening(screeningId) {
        return results.all().find((r) => r.screeningId === screeningId) ?? null;
      },
      async save(input) {
        const existing = results.all().find((r) => r.screeningId === input.screeningId);
        return existing ? results.patch(existing.id, input) : results.insert(input);
      },
    },
    referrals: {
      async list(query) {
        const all = referrals.all();
        return query?.status ? all.filter((r) => r.status === query.status) : all;
      },
      async get(id) {
        return referrals.rows.get(id) ?? null;
      },
      async create(input) {
        return referrals.insert(input);
      },
      async update(id, patch) {
        return referrals.patch(id, patch);
      },
    },
  };
}
