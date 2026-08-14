import { useEffect, useState } from 'react';
import { allowAnalytics, CONSENT_CHANGE_EVENT, getConsent } from '../config/consent';
import { getGaMeasurementId, isAnalyticsEnabled } from '../config/analytics';

function loadAnalytics(): void {
  if (!isAnalyticsEnabled() || !allowAnalytics()) return;

  const measurementId = getGaMeasurementId();
  const scriptId = `ga-gtag-${measurementId}`;
  if (document.getElementById(scriptId)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());

  const script = document.createElement('script');
  script.id = scriptId;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.onload = () => {
    window.gtag?.('config', measurementId, {
      anonymize_ip: true,
    });
  };
  document.head.appendChild(script);
}

export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(() => allowAnalytics());

  useEffect(() => {
    const sync = () => setAllowed(allowAnalytics());
    sync();
    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
  }, []);

  useEffect(() => {
    if (allowed || getConsent() === 'accepted') {
      loadAnalytics();
    }
  }, [allowed]);

  return null;
}
