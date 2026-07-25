import { useEffect } from 'react';
import { getAdClientId, isAdsEnabled } from '../config/ads';

export function AdSenseScript() {
  useEffect(() => {
    if (!isAdsEnabled()) return;

    const clientId = getAdClientId();
    const existing = document.querySelector(`script[data-adsense-client="${clientId}"]`);
    if (existing) return;

    const meta = document.createElement('meta');
    meta.name = 'google-adsense-account';
    meta.content = clientId;
    document.head.appendChild(meta);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsense-client', clientId);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
