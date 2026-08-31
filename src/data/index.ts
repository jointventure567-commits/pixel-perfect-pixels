/**
 * Single composition point for OrthoSense data access.
 *
 * To connect Lovable Cloud / Supabase later, implement a
 * `createSupabaseDataSource()` satisfying `DataSource` and return it here.
 */
import { createMemoryDataSource } from "./memory-data-source";
import type { DataSource } from "./repositories";

let dataSource: DataSource = createMemoryDataSource();

export function getDataSource(): DataSource {
  return dataSource;
}

/** Test/integration hook for swapping the backing implementation. */
export function setDataSource(next: DataSource) {
  dataSource = next;
}

export * from "./repositories";
