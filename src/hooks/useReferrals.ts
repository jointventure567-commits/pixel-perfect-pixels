import { useCallback, useEffect, useMemo, useState } from "react";
import { getDataSource } from "@/data";
import type { Referral, ReferralStatus } from "@/types";

/** Referral queue plus the per-status counts the referrals screen displays. */
export function useReferrals(status?: ReferralStatus) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setReferrals(await getDataSource().referrals.list(status ? { status } : undefined));
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const counts = useMemo(
    () => ({
      draft: referrals.filter((r) => r.status === "draft").length,
      sent: referrals.filter((r) => r.status === "sent").length,
      accepted: referrals.filter((r) => r.status === "accepted").length,
      closed: referrals.filter((r) => r.status === "closed").length,
    }),
    [referrals],
  );

  return { referrals, counts, loading, refresh };
}
