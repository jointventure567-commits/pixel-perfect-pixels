import { BluetoothSearching, Cpu, Gauge, LineChart, Play, RotateCw, Timer } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { SectionCard } from "@/components/common/SectionCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DeviceStatus, MovementSample } from "@/types/orthosense";

const statusLabel: Record<DeviceStatus, string> = {
  disconnected: "Disconnected",
  connecting: "Connecting",
  connected: "Connected",
  streaming: "Streaming",
  error: "Error",
};

/**
 * Hardware-ready shell. A future ESP32 + MPU6050 bridge supplies `status`
 * and `samples`; until then everything renders as an empty state.
 */
export function MovementAssessmentPanel({
  status = "disconnected",
  samples = [] as MovementSample[],
}: {
  status?: DeviceStatus;
  samples?: MovementSample[];
}) {
  const connected = status === "connected" || status === "streaming";

  return (
    <div className="space-y-6">
      <div className="surface-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Cpu className="size-5" />
          </span>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold">OrthoSense Sensor Unit</p>
              <Badge variant={connected ? "default" : "secondary"}>{statusLabel[status]}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              ESP32 · MPU6050 · firmware — · battery —
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" disabled>
            <BluetoothSearching className="size-4" />
            Connect device
          </Button>
          <Button disabled={!connected}>
            <Play className="size-4" />
            Start assessment
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <SectionCard icon={Gauge} title="Accelerometer" description="ax · ay · az (g)">
          <div className="grid grid-cols-3 gap-2">
            {["ax", "ay", "az"].map((axis) => (
              <div key={axis} className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <p className="text-[11px] font-medium uppercase text-muted-foreground">{axis}</p>
                <p className="mt-1 text-lg font-semibold text-muted-foreground/50">—</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={RotateCw} title="Gyroscope" description="gx · gy · gz (°/s)">
          <div className="grid grid-cols-3 gap-2">
            {["gx", "gy", "gz"].map((axis) => (
              <div key={axis} className="rounded-lg border border-border bg-muted/50 p-3 text-center">
                <p className="text-[11px] font-medium uppercase text-muted-foreground">{axis}</p>
                <p className="mt-1 text-lg font-semibold text-muted-foreground/50">—</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard icon={Timer} title="Duration" description="Recording window for this capture.">
          <div className="space-y-3">
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="60 seconds" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 seconds</SelectItem>
                <SelectItem value="60">60 seconds</SelectItem>
                <SelectItem value="120">120 seconds</SelectItem>
              </SelectContent>
            </Select>
            <div className="rounded-lg border border-border bg-muted/50 p-4 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-muted-foreground/50">
                00:00
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">Elapsed</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard
        icon={LineChart}
        title="Live movement chart"
        description="Motion traces render here while the sensor streams."
      >
        {samples.length === 0 ? (
          <EmptyState
            icon={LineChart}
            title="No movement data"
            description="Connect the ESP32 + MPU6050 unit and start an assessment to plot accelerometer and gyroscope traces."
            className="min-h-64"
          />
        ) : null}
      </SectionCard>
    </div>
  );
}
