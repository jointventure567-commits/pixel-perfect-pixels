import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  HeartPulse,
  Info,
  Send,
  ShieldCheck,
  Sparkles,
  Waves,
} from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ScreeningResult } from "@/types/orthosense";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Screening Results | OrthoSense" },
      {
        name: "description",
        content:
          "Review symptom and movement summaries, AI-assisted risk markers, preventive guidance and referral recommendations.",
      },
      { property: "og:title", content: "Screening Results | OrthoSense" },
      {
        property: "og:description",
        content: "AI-assisted osteoarthritis screening summaries and referral guidance.",
      },
    ],
  }),
  component: Results,
});

function Results() {
  const result: ScreeningResult | null = null;

  return (
    <>
      <PageHeader
        eyebrow="Summary"
        title="Screening results"
        description="A consolidated view of symptoms, movement capture and AI-assisted risk markers."
        actions={
          <Button variant="outline" disabled>
            Export summary
          </Button>
        }
      />

      <div className="surface-card flex items-start gap-3 border-l-4 border-l-teal p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-teal" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          OrthoSense provides <span className="font-semibold text-foreground">AI-assisted
          screening and decision support</span>. It does not produce a diagnosis. All outputs
          require clinician interpretation.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={HeartPulse} title="Symptom summary" description="Reported pain, stiffness and function.">
          <EmptyState
            icon={HeartPulse}
            compact
            title="No symptom data"
            description="Complete the symptoms step of a screening."
          />
        </SectionCard>

        <SectionCard icon={Waves} title="Movement summary" description="Derived from MPU6050 capture.">
          <EmptyState
            icon={Waves}
            compact
            title="No movement data"
            description="Record an assessment with the sensor unit."
          />
        </SectionCard>

        <SectionCard
          className="lg:col-span-2"
          icon={Sparkles}
          title="AI-assisted risk marker review"
          description="Model-derived markers for clinician review."
          actions={<Badge variant="secondary">Not diagnostic</Badge>}
        >
          <div className="grid gap-3 sm:grid-cols-3">
            {["Symptom burden", "Movement variability", "Functional limitation"].map((m) => (
              <div key={m} className="rounded-xl border border-border bg-muted/50 p-4">
                <p className="text-xs font-medium text-muted-foreground">{m}</p>
                <p className="mt-2 text-xl font-semibold text-muted-foreground/50">—</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <EmptyState
              icon={Activity}
              compact
              title="Review not generated"
              description="Risk markers appear once symptom and movement data are analysed."
            />
          </div>
        </SectionCard>

        <SectionCard icon={ShieldCheck} title="Preventive guidance" description="Suggested self-management themes.">
          <EmptyState icon={ShieldCheck} compact title="No guidance yet" description="Generated alongside the risk review." />
        </SectionCard>

        <SectionCard icon={Send} title="Referral recommendation" description="Suggested next clinical step.">
          <EmptyState
            icon={Send}
            compact
            title="No recommendation"
            description="Complete a screening to see a suggested referral pathway."
            action={
              <Button asChild size="sm" variant="outline">
                <Link to="/referrals">Open referrals</Link>
              </Button>
            }
          />
        </SectionCard>
      </div>

      {result ? null : null}
    </>
  );
}
