import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ClipboardPlus,
  Inbox,
  Send,
  ShieldCheck,
  Stethoscope,
  Users,
  Waves,
} from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OrthoSense Dashboard | AI-Assisted OA Screening" },
      {
        name: "description",
        content:
          "OrthoSense by Joint Ventures: clinician dashboard for osteoarthritis screening, movement assessment and referral decision support.",
      },
      { property: "og:title", content: "OrthoSense Dashboard | AI-Assisted OA Screening" },
      {
        property: "og:description",
        content:
          "Track screenings, movement assessments and referrals in one premium clinical workspace.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Screenings this week", icon: ClipboardPlus },
  { label: "Active patients", icon: Users },
  { label: "Assessments recorded", icon: Waves },
  { label: "Open referrals", icon: Send },
];

function Dashboard() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Clinical dashboard"
        description="OrthoSense supports earlier osteoarthritis screening decisions. All values populate once patients, assessments and analysis are connected."
        actions={
          <Button asChild>
            <Link to="/new-screening">
              <ClipboardPlus className="size-4" />
              Start screening
            </Link>
          </Button>
        }
      />

      <div className="surface-card gradient-surface relative overflow-hidden p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          Smarter screening. Earlier action.
        </p>
        <h2 className="mt-3 max-w-xl text-xl font-semibold sm:text-2xl">
          A guided pathway from symptoms to referral
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {["Patient", "Symptoms", "Movement", "AI review", "Referral"].map((step, i) => (
            <div
              key={step}
              className="rounded-xl border border-border bg-card/80 px-4 py-3 transition-shadow duration-200 hover:shadow-lift"
            >
              <span className="text-[11px] font-semibold text-muted-foreground">
                Step {i + 1}
              </span>
              <p className="text-sm font-semibold">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="surface-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
              <s.icon className="size-4 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight text-muted-foreground/50">—</p>
            <p className="mt-1 text-[11px] text-muted-foreground">No data yet</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard
          className="lg:col-span-2"
          icon={Stethoscope}
          title="Recent screenings"
          description="Completed screening summaries appear here."
        >
          <EmptyState
            icon={Inbox}
            title="No screenings yet"
            description="Start a new screening to capture patient details, symptoms and a movement assessment."
            action={
              <Button asChild variant="outline" size="sm">
                <Link to="/new-screening">New screening</Link>
              </Button>
            }
          />
        </SectionCard>

        <SectionCard
          icon={ShieldCheck}
          title="Clinical safety"
          description="How OrthoSense should be used"
        >
          <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
            <li className="rounded-lg bg-muted/60 p-3">
              Outputs are <span className="font-semibold text-foreground">AI-assisted risk
              markers</span> and decision support only.
            </li>
            <li className="rounded-lg bg-muted/60 p-3">
              OrthoSense never issues a diagnosis; clinical judgement remains with the clinician.
            </li>
            <li className="rounded-lg bg-muted/60 p-3">
              Movement data is captured from a paired ESP32 + MPU6050 device when available.
            </li>
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
