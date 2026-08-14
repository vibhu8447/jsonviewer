import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { LEGAL_UPDATED, SITE } from '../config/site';

export function PrivacyPage() {
  return (
    <article className="legal-page">
      <PageMeta
        title={`Privacy Policy — ${SITE.name}`}
        description={`How ${SITE.name} handles JSON input, cookies, Google Analytics, and Google AdSense.`}
        path="/privacy"
      />

      <p className="eyebrow">Legal</p>
      <h1>Privacy Policy</h1>
      <p className="legal-updated">Last updated: {LEGAL_UPDATED}</p>

      <p>
        This Privacy Policy explains how {SITE.name} ({SITE.url}) collects, uses, and shares
        information when you use the website. {SITE.name} is an independent site. It is not a Google
        product and is not affiliated with Google LLC except as a publisher that uses Google
        services described below.
      </p>

      <h2>JSON and other content you type</h2>
      <p>
        The viewer runs in your browser. Text you paste, type, or load from a file is processed on
        your device so we can format, minify, validate, or display it. We do not upload that text to
        our servers, and we do not keep a copy after you close the page. Do not paste secrets into
        any website you do not trust; this policy describes our design, not a guarantee about your
        browser extensions or device.
      </p>

      <h2>Information we collect</h2>
      <p>
        We do not ask you to create an account. We do not ask for your name, payment details, or
        login credentials. If you email us, we receive the address and message you send so we can
        reply.
      </p>
      <p>
        Like most websites, our hosting provider and security logs may record technical data such as
        IP address, browser type, date and time, and the pages requested. We use that information to
        operate and protect the site, not to build a profile of your JSON documents.
      </p>

      <h2>Cookies, identifiers, and third parties</h2>
      <p>
        Third parties, including Google, may place and read cookies on your browser, or use web
        beacons, pixels, or IP addresses to collect information as a result of advertising and
        analytics on this website. Those technologies can recognize your browser over time and
        across sites.
      </p>

      <h2>Google AdSense</h2>
      <p>
        We use Google AdSense to display advertisements. Google, as a third-party vendor, uses
        cookies to serve ads based on your prior visits to this site and other sites. Google&apos;s
        use of advertising cookies enables it and its partners to serve ads based on your visit to
        this and/or other sites on the Internet.
      </p>
      <p>You can opt out of personalized advertising by visiting:</p>
      <ul>
        <li>
          <a href="https://adssettings.google.com" rel="noreferrer" target="_blank">
            Google Ads Settings
          </a>
        </li>
        <li>
          <a href="https://www.aboutads.info" rel="noreferrer" target="_blank">
            aboutads.info
          </a>
        </li>
      </ul>
      <p>
        Learn how Google uses data when you use our partners&apos; sites or apps:{' '}
        <a href="https://policies.google.com/technologies/partner-sites" rel="noreferrer" target="_blank">
          How Google uses data
        </a>
        . See also{' '}
        <a href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">
          Google&apos;s Privacy Policy
        </a>{' '}
        and{' '}
        <a href="https://policies.google.com/technologies/ads" rel="noreferrer" target="_blank">
          Google&apos;s advertising technologies
        </a>
        .
      </p>
      <p>
        We do not use AdSense to target ads based on sensitive categories such as health, religion,
        or information about children. This site is a general-audience developer tool and is not
        directed at children under 13.
      </p>

      <h2>Google Analytics</h2>
      <p>
        We use Google Analytics 4 to understand how the site is used (for example, which pages are
        opened). Analytics may collect online identifiers, approximate location derived from IP
        address, browser and device information, and page views. We enable IP anonymization where
        the product allows it. We do not send the contents of the JSON editor to Google Analytics.
      </p>
      <p>
        You can learn more in{' '}
        <a href="https://policies.google.com/privacy" rel="noreferrer" target="_blank">
          Google&apos;s Privacy Policy
        </a>
        . Browser add-ons and cookie controls can limit Analytics cookies.
      </p>

      <h2>Consent</h2>
      <p>
        When you first visit, we show a notice about cookies and advertising. If you accept, we
        allow personalized ads and analytics cookies. If you choose non-personalized ads, we still
        show advertisements that support the site, but we ask Google not to use personalized
        advertising. You can also use the opt-out links above.
      </p>
      <p>
        Visitors in the European Economic Area, the United Kingdom, and Switzerland are covered by
        Google&apos;s{' '}
        <a href="https://www.google.com/about/company/user-consent-policy/" rel="noreferrer" target="_blank">
          EU User Consent Policy
        </a>
        . We do not merge personally identifiable information with non-personally identifiable
        information collected through Google advertising products without robust notice and opt-in
        consent.
      </p>

      <h2>Children</h2>
      <p>
        This site is not directed at children under 13, and we do not knowingly collect personal
        information from children. If you believe a child has sent us personal information by email,
        contact us and we will delete it.
      </p>

      <h2>India Digital Personal Data Protection Act</h2>
      <p>
        If you are in India, we process limited personal data (such as an email you send us, or
        technical logs) to provide the site, reply to you, and keep the service secure. We do not
        sell your personal data. You may contact us to ask questions about the information you have
        sent us directly.
      </p>

      <h2>How long we keep information</h2>
      <p>
        JSON you paste is not stored by us. Emails are kept long enough to respond and then as
        needed for a normal correspondence record. Analytics and advertising data are retained by
        Google according to their policies and your account or cookie settings.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy when the site or the law changes. The date at the top will change
        when we do. Continued use of the site after an update means you should read the new version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about privacy: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. You can also use
        the <Link href="/contact">contact page</Link>.
      </p>
    </article>
  );
}
