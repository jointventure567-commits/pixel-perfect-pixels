import type { Severity, SymptomResponses, SymptomScore } from "@/types";

const severityWeight: Record<Severity, number> = { none: 0, mild: 1, moderate: 2, severe: 3 };

const frequencyWeight = { never: 0, occasional: 1, frequent: 2, constant: 3 } as const;
const stiffnessWeight = { none: 0, under30: 1, over30: 2 } as const;

/**
 * Pure, deterministic symptom burden calculation (0-100).
 * This is a descriptive summary of what the clinician entered — not a
 * diagnosis and not an AI output.
 */
export function scoreSymptoms(r: SymptomResponses): SymptomScore {
  const parts: { value: number; max: number; answered: boolean }[] = [
    { value: r.painLevel ?? 0, max: 10, answered: r.painLevel !== null },
    {
      value: r.painFrequency ? frequencyWeight[r.painFrequency] : 0,
      max: 3,
      answered: r.painFrequency !== null,
    },
    {
      value: r.morningStiffness ? stiffnessWeight[r.morningStiffness] : 0,
      max: 2,
      answered: r.morningStiffness !== null,
    },
    severityPart(r.mobilityLimitation),
    severityPart(r.walkingDifficulty),
    severityPart(r.stairDifficulty),
    { value: r.previousInjury ? 1 : 0, max: 1, answered: r.previousInjury !== null },
  ];

  const maxTotal = parts.reduce((sum, p) => sum + p.max, 0);
  const rawTotal = parts.reduce((sum, p) => sum + p.value, 0);
  const answered = parts.filter((p) => p.answered).length;

  return {
    burden: maxTotal === 0 ? 0 : Math.round((rawTotal / maxTotal) * 100),
    answered,
    total: parts.length,
    complete: answered === parts.length,
  };
}

function severityPart(value: Severity | null) {
  return { value: value ? severityWeight[value] : 0, max: 3, answered: value !== null };
}

export function isSymptomAssessmentComplete(r: SymptomResponses): boolean {
  return scoreSymptoms(r).complete;
}

export function describeSymptoms(r: SymptomResponses): string {
  const pain = r.painLevel === null ? "Pain not recorded" : `Pain ${r.painLevel}/10`;
  const joints = r.affectedJoints.length ? r.affectedJoints.join(", ") : "no joints selected";
  return `${pain} · ${joints}`;
}
