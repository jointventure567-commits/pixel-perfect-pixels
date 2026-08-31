/**
 * Compatibility barrel. The domain model now lives in `src/types/*` —
 * prefer importing from `@/types`.
 */

export * from "./index";

export type { SensorSample as MovementSample } from "./sensor";
export { emptySymptomResponses as emptySymptoms } from "./symptom-assessment";
