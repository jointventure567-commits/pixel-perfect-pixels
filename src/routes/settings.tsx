import { createFileRoute } from "@tanstack/react-router";
import { Building2, Cpu, ShieldCheck, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | OrthoSense" },
      {
        name: "description",
        content:
          "Configure clinic details, device pairing defaults and AI-assisted review preferences in OrthoSense.",
      },
      { property: "og:title", content: "Settings | OrthoSense" },
      {
        property: "og:description",
        content: "Clinic profile, device and AI decision-support preferences for OrthoSense.",
      },
    ],
  }),
  component: Settings,
});

function Row({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border p-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch disabled />
    </div>
  );
}

function Settings() {
  return (
    <>
      <PageHeader
        eyebrow="Configuration"
        title="Settings"
        description="Preferences are stored once the OrthoSense backend is connected."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard icon={Building2} title="Clinic profile" description="Shown on screening summaries and referrals.">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="clinic">Clinic name</Label>
              <Input id="clinic" placeholder="Not set" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clinician">Lead clinician</Label>
              <Input id="clinician" placeholder="Not set" disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loc">Location</Label>
              <Input id="loc" placeholder="Not set" disabled />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          icon={Cpu}
          title="Movement device"
          description="ESP32 + MPU6050 capture defaults."
          actions={<Badge variant="secondary">Hardware pending</Badge>}
        >
          <div className="space-y-3">
            <Row title="Auto-reconnect last device" description="Reconnect on opening an assessment." />
            <Row title="Default duration 60s" description="Applied to new movement assessments." />
            <Row title="Store raw samples" description="Keep full accelerometer and gyroscope traces." />
          </div>
        </SectionCard>

        <SectionCard icon={Sparkles} title="AI-assisted review" description="Decision-support behaviour.">
          <div className="space-y-3">
            <Row title="Show confidence" description="Display model confidence alongside risk markers." />
            <Row title="Include preventive guidance" description="Append guidance to each summary." />
          </div>
        </SectionCard>

        <SectionCard icon={ShieldCheck} title="Clinical governance" description="Non-negotiable safeguards.">
          <ul className="space-y-3 text-xs leading-relaxed text-muted-foreground">
            <li className="rounded-lg bg-muted/60 p-3">
              OrthoSense outputs are screening support, never a diagnosis.
            </li>
            <li className="rounded-lg bg-muted/60 p-3">
              Every summary requires clinician confirmation before referral.
            </li>
            <li className="rounded-lg bg-muted/60 p-3">
              Patient data handling is defined when the secure backend is enabled.
            </li>
          </ul>
        </SectionCard>
      </div>
    </>
  );
}
