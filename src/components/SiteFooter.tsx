import { SITE } from '../config/site';
import { Link } from './Link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>{SITE.name}</strong>
          <p>
            A free, browser-based JSON formatter and explorer. JSON is processed on your device and
            is not uploaded to our servers.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <div>
            <h2>Product</h2>
            <Link href="/">JSON Viewer</Link>
            <Link href="/guides">Guides</Link>
            <Link href="/about">About</Link>
          </div>
          <div>
            <h2>Legal</h2>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </nav>
      </div>

      <p className="site-footer__note">
        This site uses Google AdSense and Google Analytics. Third parties, including Google, may use
        cookies, web beacons, and IP addresses. See the{' '}
        <Link href="/privacy">Privacy Policy</Link> and{' '}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">
          How Google uses data
        </a>
        .
      </p>

      <p className="site-footer__copy">
        © {new Date().getFullYear()} {SITE.name} · {SITE.domain}
      </p>
    </footer>
  );
}
