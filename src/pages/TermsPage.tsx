import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { LEGAL_UPDATED, SITE } from '../config/site';

export function TermsPage() {
  return (
    <article className="legal-page">
      <PageMeta
        title={`Terms of Use — ${SITE.name}`}
        description={`Terms of use for the free ${SITE.name} tool at ${SITE.domain}.`}
        path="/terms"
      />

      <p className="eyebrow">Legal</p>
      <h1>Terms of Use</h1>
      <p className="legal-updated">Last updated: {LEGAL_UPDATED}</p>

      <p>
        These terms govern your use of {SITE.name} at {SITE.url}. The site is provided as a free
        browser tool supported by advertising. If you do not agree, do not use the site.
      </p>

      <h2>The service</h2>
      <p>
        {SITE.name} lets you paste or load JSON and inspect, format, or minify it in your browser.
        We do not promise uninterrupted availability, and we may change or discontinue features.
        The tool is offered “as is” for general use. It is not a substitute for professional advice
        or for validation in your own production systems.
      </p>

      <h2>Your content</h2>
      <p>
        You are responsible for the text you paste or upload into the editor. Do not use the tool to
        process material you are not allowed to handle. Because processing is local, we do not
        review or store your JSON. That also means we cannot recover a document after you close the
        tab.
      </p>

      <h2>Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Attempt to disrupt, overload, or break the site or its advertising systems</li>
        <li>Use automated means to generate fake visits, impressions, or ad clicks</li>
        <li>Click Google ads except as a genuine visitor interested in the advertiser</li>
        <li>Misrepresent the site as a Google product or as affiliated with another brand</li>
        <li>Use the site to commit fraud or other unlawful activity</li>
      </ul>

      <h2>Advertising</h2>
      <p>
        Pages that contain publisher content may show Google AdSense advertisements. Ads are labeled
        “Advertisement.” We do not ask you to click ads, and you should not click them to “support
        the site.” Advertising practices are described in the <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The site design, text, and original guides belong to {SITE.name} unless otherwise noted.
        JSON is an open data format. Trademarks mentioned in guides, including Google, belong to
        their owners. We do not claim those marks.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        The site is provided without warranties of any kind, including fitness for a particular
        purpose or freedom from errors. To the fullest extent permitted by law, {SITE.name} is not
        liable for lost data, inaccurate formatting, or any damages that arise from using or being
        unable to use the tool.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India, without regard to conflict-of-law rules.
        Courts in India have jurisdiction over disputes that cannot be resolved informally.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> · <Link href="/contact">Contact page</Link>
      </p>
    </article>
  );
}
