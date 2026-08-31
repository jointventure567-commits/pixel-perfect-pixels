import { useCallback, useEffect, useMemo, useState } from "react";
import { deriveSensorMetrics } from "@/lib/domain/movement";
import { getDeviceBridge } from "@/services/device-bridge";
import type { DeviceStatus, SensorSample } from "@/types";

/**
 * UI-facing wrapper over the ESP32 + MPU6050 bridge. With no hardware
 * connected the bridge stays "disconnected" and no samples arrive.
 */
export function useMovementDevice() {
  const bridge = getDeviceBridge();
  const [status, setStatus] = useState<DeviceStatus>(bridge.getStatus());
  const [samples, setSamples] = useState<SensorSample[]>([]);

  useEffect(
    () =>
      bridge.subscribe({
        onStatus: setStatus,
        onSample: (sample) => setSamples((prev) => [...prev, sample]),
      }),
    [bridge],
  );

  const connect = useCallback(() => bridge.connect(), [bridge]);
  const disconnect = useCallback(() => bridge.disconnect(), [bridge]);
  const startCapture = useCallback(async () => {
    setSamples([]);
    await bridge.startCapture();
  }, [bridge]);
  const stopCapture = useCallback(() => bridge.stopCapture(), [bridge]);

  const metrics = useMemo(
    () =>
      deriveSensorMetrics(
        samples.length
          ? { id: "live", deviceId: null, samplingRateHz: null, startedAt: null, endedAt: null, samples }
          : null,
      ),
    [samples],
  );

  return {
    available: bridge.available,
    device: bridge.getDevice(),
    status,
    samples,
    metrics,
    connect,
    disconnect,
    startCapture,
    stopCapture,
  };
}
