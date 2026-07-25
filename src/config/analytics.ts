const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim() ?? '';

export function isAnalyticsEnabled(): boolean {
  return /^G-[A-Z0-9]+$/i.test(measurementId);
}

export function getGaMeasurementId(): string {
  return measurementId;
}
