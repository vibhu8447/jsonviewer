import { useEffect } from 'react';
import { allowPersonalizedAds, CONSENT_CHANGE_EVENT, getConsent } from '../config/consent';
import { getAdClientId, isAdsEnabled } from '../config/ads';

function applyPersonalization(): void {
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.requestNonPersonalizedAds = allowPersonalizedAds() ? 0 : 1;
}

export function AdSenseScript() {
  useEffect(() => {
    if (!isAdsEnabled()) return;

    applyPersonalization();
    const onConsent = () => applyPersonalization();
    window.addEventListener(CONSENT_CHANGE_EVENT, onConsent);

    const clientId = getAdClientId();
    if (!document.querySelector('meta[name="google-adsense-account"]')) {
      const meta = document.createElement('meta');
      meta.name = 'google-adsense-account';
      meta.content = clientId;
      document.head.appendChild(meta);
    }

    const existing = document.querySelector(`script[data-adsense-client="${clientId}"]`);
    if (existing) {
      return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
    script.crossOrigin = 'anonymous';
    script.setAttribute('data-adsense-client', clientId);
    document.head.appendChild(script);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, onConsent);
    };
  }, []);

  useEffect(() => {
    if (getConsent() === 'unknown') applyPersonalization();
  }, []);

  return null;
}
