/**
 * ESP32 + MPU6050 bridge contract.
 *
 * The UI only ever talks to this interface, so BLE, WebSocket or serial
 * transports can be added later without touching any screen.
 */
import type { DeviceInfo, DeviceStatus, SensorData, SensorSample } from "@/types";

export interface DeviceBridgeEvents {
  onStatus?: (status: DeviceStatus) => void;
  onSample?: (sample: SensorSample) => void;
  onError?: (error: Error) => void;
}

export interface DeviceBridge {
  readonly available: boolean;
  getStatus(): DeviceStatus;
  getDevice(): DeviceInfo | null;
  connect(): Promise<DeviceInfo | null>;
  disconnect(): Promise<void>;
  startCapture(): Promise<void>;
  stopCapture(): Promise<SensorData | null>;
  subscribe(events: DeviceBridgeEvents): () => void;
}

/** Placeholder bridge: no hardware connected yet. */
const disconnectedBridge: DeviceBridge = {
  available: false,
  getStatus: () => "disconnected",
  getDevice: () => null,
  async connect() {
    return null;
  },
  async disconnect() {},
  async startCapture() {},
  async stopCapture() {
    return null;
  },
  subscribe() {
    return () => {};
  },
};

let bridge: DeviceBridge = disconnectedBridge;

export function getDeviceBridge(): DeviceBridge {
  return bridge;
}

export function setDeviceBridge(next: DeviceBridge) {
  bridge = next;
}
