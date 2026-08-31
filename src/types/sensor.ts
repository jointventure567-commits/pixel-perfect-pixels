import type { ISODateString, UUID } from "./common";

export type DeviceStatus = "disconnected" | "connecting" | "connected" | "streaming" | "error";

export type DeviceTransport = "ble" | "websocket" | "serial" | "http";

/** An ESP32 + MPU6050 capture unit. */
export interface DeviceInfo {
  id: string;
  label: string;
  transport?: DeviceTransport;
  firmware?: string | null;
  batteryPercent?: number | null;
  status: DeviceStatus;
}

/** One MPU6050 reading: 3-axis accelerometer (g) + 3-axis gyroscope (deg/s). */
export interface SensorSample {
  /** Milliseconds since the start of the capture. */
  t: number;
  ax: number;
  ay: number;
  az: number;
  gx: number;
  gy: number;
  gz: number;
}

/** A complete sensor capture window with its acquisition metadata. */
export interface SensorData {
  id: UUID;
  deviceId: string | null;
  samplingRateHz: number | null;
  startedAt: ISODateString | null;
  endedAt: ISODateString | null;
  samples: SensorSample[];
}

/** Metrics derived from a capture. Non-diagnostic. */
export interface SensorMetrics {
  sampleCount: number;
  durationSeconds: number;
  peakAcceleration: number | null;
  meanAngularVelocity: number | null;
  movementVariability: number | null;
}

export const emptySensorData: SensorData = {
  id: "",
  deviceId: null,
  samplingRateHz: null,
  startedAt: null,
  endedAt: null,
  samples: [],
};
