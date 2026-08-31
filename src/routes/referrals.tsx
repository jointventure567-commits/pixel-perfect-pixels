import { createFileRoute, Link } from "@tanstack/react-router";
import { Send, Inbox, CheckCircle2, Clock } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";
import type { Referral } from "@/types/orthosense";

export const Route = createFileRoute("/referrals")({
  head: () => ({
    meta: [
      { title: "Referrals | OrthoSense" },
      {
        name: "description",
        content:
          "Track orthopaedic and physiotherapy referrals generated from OrthoSense screening summaries.",
      },
      { property: "og:title", content: "Referrals | OrthoSense" },
      {
        property: "og:description",
        content: "Draft, sent and closed referrals from OrthoSense screening recommendations.",
      },
    ],
  }),
  component: Referrals,
});

const buckets = [
  { label: "Drafts", icon: Clock },
  { label: "Sent", icon: Send },
  { label: "Closed", icon: CheckCircle2 },
];

function Referrals() {
  const referrals: Referral[] = [];

  return (
    <>
      <PageHeader
        eyebrow="Care pathway"
        title="Referrals"
        description="Referral recommendations produced by a screening summary are managed here."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {buckets.map((b) => (
          <div key={b.label} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{b.label}</span>
              <b.icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-muted-foreground/50">—</p>
          </div>
        ))}
      </div>

      <SectionCard icon={Send} title="Referral queue" description="Ordered by urgency and date.">
        {referrals.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No referrals yet"
            description="Complete a screening to generate a referral recommendation for review."
            action={
              <Button asChild size="sm" variant="outline">
                <Link to="/new-screening">Start screening</Link>
              </Button>
            }
          />
        ) : null}
      </SectionCard>
    </>
  );
}
