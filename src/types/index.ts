/**
 * OrthoSense domain model.
 *
 * These types are the single contract shared by the UI, the data layer
 * (`src/data`) and the service layer (`src/services`). A future Supabase
 * backend, AI analysis provider or ESP32 + MPU6050 bridge only has to satisfy
 * these shapes — no screen needs to change.
 */

export * from "./common";
export * from "./patient";
export * from "./symptom-assessment";
export * from "./sensor";
export * from "./movement-assessment";
export * from "./screening";
export * from "./screening-result";
export * from "./referral";
