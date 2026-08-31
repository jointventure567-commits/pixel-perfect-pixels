import { createFileRoute } from "@tanstack/react-router";
import { MovementAssessmentPanel } from "@/components/movement/MovementAssessmentPanel";
import { PageHeader } from "@/components/common/PageHeader";


export const Route = createFileRoute("/movement-assessment")({
  head: () => ({
    meta: [
      { title: "Movement Assessment | OrthoSense" },
      {
        name: "description",
        content:
          "Capture joint movement with a paired ESP32 + MPU6050 sensor: device status, accelerometer and gyroscope streams, and live movement charting.",
      },
      { property: "og:title", content: "Movement Assessment | OrthoSense" },
      {
        property: "og:description",
        content: "ESP32 + MPU6050 movement capture workspace for OrthoSense screenings.",
      },
    ],
  }),
  component: MovementPage,
});

function MovementPage() {
  return (
    <>
      <PageHeader
        eyebrow="Capture"
        title="Movement assessment"
        description="Pair the OrthoSense sensor unit to record accelerometer and gyroscope motion during guided joint movements."
      />
      <MovementAssessmentPanel />
    </>
  );
}
