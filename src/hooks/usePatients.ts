import { useCallback, useEffect, useState } from "react";
import { getDataSource } from "@/data";
import type { Patient } from "@/types";

/** Reads the patient roster through the data layer; UI never touches storage. */
export function usePatients(search?: string) {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setPatients(await getDataSource().patients.list(search ? { search } : undefined));
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { patients, loading, error, refresh };
}
