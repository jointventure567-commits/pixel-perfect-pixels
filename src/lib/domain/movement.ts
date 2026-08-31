import type { SensorData, SensorMetrics, SensorSample } from "@/types";

const magnitude = (x: number, y: number, z: number) => Math.sqrt(x * x + y * y + z * z);

/** Pure metric derivation from an MPU6050 capture. Descriptive, not diagnostic. */
export function deriveSensorMetrics(data: SensorData | null): SensorMetrics {
  const samples: SensorSample[] = data?.samples ?? [];
  if (samples.length === 0) {
    return {
      sampleCount: 0,
      durationSeconds: 0,
      peakAcceleration: null,
      meanAngularVelocity: null,
      movementVariability: null,
    };
  }

  const accel = samples.map((s) => magnitude(s.ax, s.ay, s.az));
  const gyro = samples.map((s) => magnitude(s.gx, s.gy, s.gz));
  const meanAccel = mean(accel);

  return {
    sampleCount: samples.length,
    durationSeconds: (samples[samples.length - 1]!.t - samples[0]!.t) / 1000,
    peakAcceleration: Math.max(...accel),
    meanAngularVelocity: mean(gyro),
    movementVariability: standardDeviation(accel, meanAccel),
  };
}

function mean(values: number[]): number {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function standardDeviation(values: number[], avg: number): number {
  return Math.sqrt(mean(values.map((v) => (v - avg) ** 2)));
}
