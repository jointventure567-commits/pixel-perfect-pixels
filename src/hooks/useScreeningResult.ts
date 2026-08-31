import { useEffect, useState } from "react";
import { getDataSource } from "@/data";
import type { ScreeningBundle, ScreeningResult, UUID } from "@/types";

/** Loads a screening summary. Returns null while no screening is selected. */
export function useScreeningResult(screeningId?: UUID | null) {
  const [result, setResult] = useState<ScreeningResult | null>(null);
  const [bundle, setBundle] = useState<ScreeningBundle | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!screeningId) {
      setResult(null);
      setBundle(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const source = getDataSource();
    void Promise.all([
      source.results.getByScreening(screeningId),
      source.screenings.getBundle(screeningId),
    ])
      .then(([nextResult, nextBundle]) => {
        if (cancelled) return;
        setResult(nextResult);
        setBundle(nextBundle);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [screeningId]);

  return { result, bundle, loading };
}
