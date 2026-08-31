import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ChevronLeft, ChevronRight, ClipboardCheck, HeartPulse, User, Waves } from "lucide-react";
import { MovementAssessmentContainer } from "@/components/movement/MovementAssessmentContainer";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useScreeningFlow } from "@/hooks/useScreeningFlow";
import type { Patient, SymptomResponses } from "@/types";

export const Route = createFileRoute("/new-screening")({
  head: () => ({
    meta: [
      { title: "New Screening | OrthoSense" },
      {
        name: "description",
        content:
          "Guided osteoarthritis screening: patient information, symptom questionnaire, sensor movement capture and clinician review.",
      },
      { property: "og:title", content: "New Screening | OrthoSense" },
      {
        property: "og:description",
        content: "Step-by-step OA screening flow from patient details to referral review.",
      },
    ],
  }),
  component: NewScreening,
});

const steps = [
  { key: "patient", label: "Patient Information", icon: User },
  { key: "symptoms", label: "Symptoms", icon: HeartPulse },
  { key: "movement", label: "Movement", icon: Waves },
  { key: "review", label: "Review", icon: ClipboardCheck },
] as const;

const severity = [
  { value: "none", label: "None" },
  { value: "mild", label: "Mild" },
  { value: "moderate", label: "Moderate" },
  { value: "severe", label: "Severe" },
];

function SeverityQuestion({
  id,
  question,
  hint,
  value,
  onChange,
}: {
  id: string;
  question: string;
  hint?: string;
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset className="rounded-xl border border-border p-4">
      <legend className="px-1 text-sm font-medium">{question}</legend>
      {hint && <p className="mb-3 text-xs text-muted-foreground">{hint}</p>}
      <RadioGroup
        value={value ?? ""}
        onValueChange={onChange}
        className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4"
      >
        {severity.map((opt) => (
          <Label
            key={opt.value}
            htmlFor={`${id}-${opt.value}`}
            className={cn(
              "flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-accent/60",
              value === opt.value && "border-primary bg-accent",
            )}
          >
            <RadioGroupItem id={`${id}-${opt.value}`} value={opt.value} />
            {opt.label}
          </Label>
        ))}
      </RadioGroup>
    </fieldset>
  );
}

function NewScreening() {
  const {
    stepIndex: step,
    goTo: setStep,
    next,
    back,
    patient,
    updatePatient,
    symptoms,
    setSymptom: set,
    toggleJoint,
  } = useScreeningFlow();

  return (
    <>
      <PageHeader
        eyebrow="Screening"
        title="New screening"
        description="Capture patient information, symptoms and movement, then review before referral."
        actions={<Badge variant="secondary">Decision support · not diagnosis</Badge>}
      />

      <ol className="surface-card grid gap-2 p-3 sm:grid-cols-4">
        {steps.map((s, i) => {
          const state = i === step ? "current" : i < step ? "done" : "todo";
          return (
            <li key={s.key}>
              <button
                type="button"
                onClick={() => setStep(i)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200",
                  state === "current" && "bg-accent shadow-soft",
                  state !== "current" && "hover:bg-muted",
                )}
              >
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    state === "done" && "bg-teal text-teal-foreground",
                    state === "current" && "gradient-brand text-primary-foreground",
                    state === "todo" && "bg-muted text-muted-foreground",
                  )}
                >
                  {state === "done" ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">{s.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {step === 0 && (
        <SectionCard icon={User} title="Patient information" description="Basic demographics for this screening record.">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                placeholder="Patient name"
                value={patient.fullName ?? ""}
                onChange={(e) => updatePatient({ fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                placeholder="Years"
                value={patient.age ?? ""}
                onChange={(e) => updatePatient({ age: Number(e.target.value) || null })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                value={patient.sex ?? ""}
                onValueChange={(v) => updatePatient({ sex: v as Patient["sex"] })}
              >
                <SelectTrigger id="sex">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="undisclosed">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="cm"
                value={patient.heightCm ?? ""}
                onChange={(e) => updatePatient({ heightCm: Number(e.target.value) || null })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="kg"
                value={patient.weightKg ?? ""}
                onChange={(e) => updatePatient({ weightKg: Number(e.target.value) || null })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                placeholder="Phone or email"
                value={patient.contact ?? ""}
                onChange={(e) => updatePatient({ contact: e.target.value })}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="notes">Clinical notes</Label>
              <Textarea
                id="notes"
                rows={3}
                placeholder="Relevant history, comorbidities, occupation"
                value={patient.notes ?? ""}
                onChange={(e) => updatePatient({ notes: e.target.value })}
              />
            </div>
          </div>
        </SectionCard>
      )}

      {step === 1 && (
        <SectionCard
          icon={HeartPulse}
          title="Symptom questionnaire"
          description="Osteoarthritis screening questions covering pain, stiffness, mobility and injury history."
        >
          <div className="space-y-4">
            <fieldset className="rounded-xl border border-border p-4">
              <legend className="px-1 text-sm font-medium">Current pain level</legend>
              <p className="mb-4 text-xs text-muted-foreground">0 = no pain · 10 = worst imaginable</p>
              <Slider
                value={[symptoms.painLevel ?? 0]}
                onValueChange={([v]) => set("painLevel", v ?? 0)}
                max={10}
                step={1}
              />
              <p className="mt-3 text-sm font-semibold">
                {symptoms.painLevel === null ? "Not set" : `${symptoms.painLevel} / 10`}
              </p>
            </fieldset>

            <fieldset className="rounded-xl border border-border p-4">
              <legend className="px-1 text-sm font-medium">How often does pain occur?</legend>
              <RadioGroup
                value={symptoms.painFrequency ?? ""}
                onValueChange={(v) => set("painFrequency", v as SymptomResponses["painFrequency"])}
                className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
              >
                {[
                  { value: "never", label: "Never" },
                  { value: "occasional", label: "Occasional" },
                  { value: "frequent", label: "Frequent" },
                  { value: "constant", label: "Constant" },
                ].map((o) => (
                  <Label
                    key={o.value}
                    htmlFor={`freq-${o.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-accent/60",
                      symptoms.painFrequency === o.value && "border-primary bg-accent",
                    )}
                  >
                    <RadioGroupItem id={`freq-${o.value}`} value={o.value} />
                    {o.label}
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>

            <fieldset className="rounded-xl border border-border p-4">
              <legend className="px-1 text-sm font-medium">Morning stiffness duration</legend>
              <RadioGroup
                value={symptoms.morningStiffness ?? ""}
                onValueChange={(v) => set("morningStiffness", v as SymptomResponses["morningStiffness"])}
                className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3"
              >
                {[
                  { value: "none", label: "No stiffness" },
                  { value: "under30", label: "Under 30 minutes" },
                  { value: "over30", label: "Over 30 minutes" },
                ].map((o) => (
                  <Label
                    key={o.value}
                    htmlFor={`stiff-${o.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-accent/60",
                      symptoms.morningStiffness === o.value && "border-primary bg-accent",
                    )}
                  >
                    <RadioGroupItem id={`stiff-${o.value}`} value={o.value} />
                    {o.label}
                  </Label>
                ))}
              </RadioGroup>
            </fieldset>

            <SeverityQuestion
              id="mobility"
              question="Limitation in joint mobility"
              hint="Range of motion during everyday tasks"
              value={symptoms.mobilityLimitation}
              onChange={(v) => set("mobilityLimitation", v as SymptomResponses["mobilityLimitation"])}
            />
            <SeverityQuestion
              id="walk"
              question="Difficulty walking on level ground"
              value={symptoms.walkingDifficulty}
              onChange={(v) => set("walkingDifficulty", v as SymptomResponses["walkingDifficulty"])}
            />
            <SeverityQuestion
              id="stairs"
              question="Difficulty climbing or descending stairs"
              value={symptoms.stairDifficulty}
              onChange={(v) => set("stairDifficulty", v as SymptomResponses["stairDifficulty"])}
            />

            <fieldset className="rounded-xl border border-border p-4">
              <legend className="px-1 text-sm font-medium">Previous joint injury or surgery</legend>
              <RadioGroup
                value={symptoms.previousInjury === null ? "" : symptoms.previousInjury ? "yes" : "no"}
                onValueChange={(v) => set("previousInjury", v === "yes")}
                className="mt-3 grid grid-cols-2 gap-2 sm:max-w-xs"
              >
                {[
                  { value: "no", label: "No" },
                  { value: "yes", label: "Yes" },
                ].map((o) => (
                  <Label
                    key={o.value}
                    htmlFor={`inj-${o.value}`}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-lg border border-border px-3 py-2.5 text-sm transition-colors duration-200 hover:bg-accent/60",
                      (symptoms.previousInjury ? "yes" : "no") === o.value &&
                        symptoms.previousInjury !== null &&
                        "border-primary bg-accent",
                    )}
                  >
                    <RadioGroupItem id={`inj-${o.value}`} value={o.value} />
                    {o.label}
                  </Label>
                ))}
              </RadioGroup>
              {symptoms.previousInjury && (
                <Textarea
                  className="mt-3"
                  rows={2}
                  placeholder="Describe the injury, joint and approximate date"
                  value={symptoms.previousInjuryDetail ?? ""}
                  onChange={(e) => set("previousInjuryDetail", e.target.value)}
                />
              )}
            </fieldset>

            <fieldset className="rounded-xl border border-border p-4">
              <legend className="px-1 text-sm font-medium">Affected joints</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Left knee", "Right knee", "Left hip", "Right hip", "Hands", "Spine"].map((j) => {
                  const active = symptoms.affectedJoints.includes(j);
                  return (
                    <button
                      key={j}
                      type="button"
                      onClick={() => toggleJoint(j)}
                      className={cn(
                        "rounded-full border border-border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 hover:bg-accent/60",
                        active && "border-primary bg-accent text-accent-foreground",
                      )}
                    >
                      {j}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        </SectionCard>
      )}

      {step === 2 && <MovementAssessmentContainer />}

      {step === 3 && (
        <SectionCard
          icon={ClipboardCheck}
          title="Review"
          description="Confirm the captured information before generating a screening summary."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Patient</p>
              <p className="mt-2 text-sm font-medium">{patient.fullName || "Not provided"}</p>
              <p className="text-xs text-muted-foreground">
                {patient.age ? `${patient.age} yrs` : "Age —"} · {patient.sex ?? "Sex —"}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Symptoms</p>
              <p className="mt-2 text-sm font-medium">
                {symptoms.painLevel === null ? "Not completed" : `Pain ${symptoms.painLevel}/10`}
              </p>
              <p className="text-xs text-muted-foreground">
                {symptoms.affectedJoints.length
                  ? symptoms.affectedJoints.join(", ")
                  : "No joints selected"}
              </p>
            </div>
            <div className="rounded-xl border border-border p-4 sm:col-span-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Movement</p>
              <p className="mt-2 text-sm font-medium">No sensor capture recorded</p>
              <p className="text-xs text-muted-foreground">
                Pair the ESP32 + MPU6050 unit to include movement data in the summary.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button disabled>Generate screening summary</Button>
            <Button asChild variant="outline">
              <Link to="/results">View results layout</Link>
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Summary generation becomes available once the analysis backend is connected. OrthoSense
            provides decision support, never a diagnosis.
          </p>
        </SectionCard>
      )}

      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={back} disabled={step === 0}>
          <ChevronLeft className="size-4" />
          Back
        </Button>
        <Button
          onClick={next}
          disabled={step === steps.length - 1}
        >
          Continue
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </>
  );
}
