import { getGaMeasurementId, isAnalyticsEnabled } from '../config/analytics';

export function trackPageView(path = window.location.pathname + window.location.search) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag('config', getGaMeasurementId(), {
    page_path: path,
  });
}

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>,
) {
  if (!isAnalyticsEnabled() || !window.gtag) return;

  window.gtag('event', eventName, params);
}
