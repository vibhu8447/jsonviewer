import { useEffect, useState } from 'react';
import { getConsent, setConsent, type ConsentStatus } from '../config/consent';
import { Link } from './Link';

export function CookieNotice() {
  const [status, setStatus] = useState<ConsentStatus>('unknown');

  useEffect(() => {
    setStatus(getConsent());
  }, []);

  const choose = (next: Exclude<ConsentStatus, 'unknown'>) => {
    setConsent(next);
    setStatus(next);
  };

  if (status !== 'unknown') return null;

  return (
    <div className="cookie-notice" role="dialog" aria-labelledby="cookie-notice-title" aria-live="polite">
      <div className="cookie-notice__copy">
        <h2 id="cookie-notice-title">Cookies and advertising</h2>
        <p>
          We use cookies and similar technologies for site analytics and to show Google AdSense
          advertisements. Google and other third parties may place and read cookies, use web beacons,
          or collect IP addresses as a result of ads served on this site. Read the{' '}
          <Link href="/privacy">Privacy Policy</Link> and{' '}
          <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">
            How Google uses data
          </a>
          .
        </p>
      </div>
      <div className="cookie-notice__actions">
        <button type="button" className="btn btn--sm" onClick={() => choose('essential')}>
          Non-personalized ads
        </button>
        <button type="button" className="btn btn--sm btn--primary" onClick={() => choose('accepted')}>
          Accept
        </button>
      </div>
    </div>
  );
}
