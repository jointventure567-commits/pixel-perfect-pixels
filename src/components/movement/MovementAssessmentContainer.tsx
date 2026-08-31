import { MovementAssessmentPanel } from "./MovementAssessmentPanel";
import { useMovementDevice } from "@/hooks/useMovementDevice";

/**
 * Connects the presentational movement panel to the device layer.
 * With no ESP32 + MPU6050 bridge registered the panel renders its empty state
 * exactly as before.
 */
export function MovementAssessmentContainer() {
  const { status, samples } = useMovementDevice();
  return <MovementAssessmentPanel status={status} samples={samples} />;
}
