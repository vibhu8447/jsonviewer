import { useEffect } from 'react';
import { getGaMeasurementId, isAnalyticsEnabled } from '../config/analytics';

export function GoogleAnalytics() {
  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

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

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
