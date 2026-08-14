export type ConsentStatus = 'unknown' | 'accepted' | 'essential';

const STORAGE_KEY = 'jsonviewer-cookie-consent';
export const CONSENT_CHANGE_EVENT = 'jsonviewer-consent-change';

export function getConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === 'accepted' || value === 'essential') return value;
  } catch {
    // private mode or blocked storage
  }
  return 'unknown';
}

export function setConsent(status: Exclude<ConsentStatus, 'unknown'>): void {
  localStorage.setItem(STORAGE_KEY, status);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

export function allowPersonalizedAds(): boolean {
  return getConsent() === 'accepted';
}

export function allowAnalytics(): boolean {
  return getConsent() === 'accepted';
}
