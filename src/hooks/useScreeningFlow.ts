import { useCallback, useMemo, useState } from "react";
import { scoreSymptoms } from "@/lib/domain/symptoms";
import { getAnalysisProvider } from "@/services/analysis";
import {
  emptyPatientDraft,
  emptySymptomResponses,
  type PatientDraft,
  type ScreeningStep,
  type SymptomResponses,
} from "@/types";

export const screeningSteps: ScreeningStep[] = ["patient", "symptoms", "movement", "review"];

/**
 * Owns all state and rules of the guided screening flow so the route file
 * stays presentational. Persisting the draft becomes a matter of wiring the
 * data layer into `submit()`.
 */
export function useScreeningFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [patient, setPatient] = useState<PatientDraft>(emptyPatientDraft);
  const [symptoms, setSymptoms] = useState<SymptomResponses>(emptySymptomResponses);

  const updatePatient = useCallback(
    (patch: PatientDraft) => setPatient((prev) => ({ ...prev, ...patch })),
    [],
  );

  const setSymptom = useCallback(
    <K extends keyof SymptomResponses>(key: K, value: SymptomResponses[K]) =>
      setSymptoms((prev) => ({ ...prev, [key]: value })),
    [],
  );

  const toggleJoint = useCallback(
    (joint: string) =>
      setSymptoms((prev) => ({
        ...prev,
        affectedJoints: prev.affectedJoints.includes(joint)
          ? prev.affectedJoints.filter((j) => j !== joint)
          : [...prev.affectedJoints, joint],
      })),
    [],
  );

  const symptomScore = useMemo(() => scoreSymptoms(symptoms), [symptoms]);

  const goTo = useCallback((index: number) => {
    setStepIndex(Math.min(screeningSteps.length - 1, Math.max(0, index)));
  }, []);
  const next = useCallback(() => goTo(stepIndex + 1), [goTo, stepIndex]);
  const back = useCallback(() => goTo(stepIndex - 1), [goTo, stepIndex]);

  const reset = useCallback(() => {
    setStepIndex(0);
    setPatient(emptyPatientDraft);
    setSymptoms(emptySymptomResponses);
  }, []);

  /** Enabled only once a backend + analysis provider are connected. */
  const canSubmit = getAnalysisProvider().available && Boolean(patient.fullName);

  return {
    stepIndex,
    step: screeningSteps[stepIndex]!,
    goTo,
    next,
    back,
    patient,
    updatePatient,
    symptoms,
    setSymptom,
    toggleJoint,
    symptomScore,
    canSubmit,
    reset,
  };
}
