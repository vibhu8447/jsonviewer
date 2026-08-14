import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { SITE } from '../config/site';

export function AboutPage() {
  return (
    <article className="legal-page">
      <PageMeta
        title={`About — ${SITE.name}`}
        description={`Who runs ${SITE.name}, why the tool exists, and how JSON is handled in the browser.`}
        path="/about"
      />

      <p className="eyebrow">About</p>
      <h1>About {SITE.name}</h1>
      <p className="lede">
        {SITE.name} is a small, independent web tool for reading and cleaning JSON. It is built for
        developers, testers, and anyone who needs to look at an API payload without installing
        extra software.
      </p>

      <h2>What we publish</h2>
      <p>
        The homepage is the viewer: paste JSON, validate it, format or minify it, and expand the
        tree. Alongside the tool we publish short guides that explain the format, common parse
        errors, and when to use JSON instead of XML. Those pages exist so visitors can learn the
        format, not only click through an empty editor.
      </p>
      <p>
        {SITE.name} is not affiliated with, endorsed by, or part of Google. We use Google AdSense
        and Google Analytics as third-party services. We do not use Google&apos;s name or logos to
        imply that this is an official Google product.
      </p>

      <h2>How the product is designed</h2>
      <ul>
        <li>No account and no paywall for the core viewer</li>
        <li>JSON stays in the browser; we do not operate a pastebin</li>
        <li>Clear labels on advertisements so they are not mistaken for navigation</li>
        <li>Guides and legal pages that a person or a crawler can open by URL</li>
      </ul>

      <h2>Who runs the site</h2>
      <p>
        {SITE.name} is operated as an independent project on {SITE.domain}. For questions about the
        tool, privacy, or a problem on a page, write to{' '}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or use the{' '}
        <Link href="/contact">contact form</Link>.
      </p>

      <h2>Advertising</h2>
      <p>
        The site is free because some content pages show advertisements. We do not place ads in
        pop-ups, we do not ask visitors to click ads, and we keep ads out of the header navigation.
        Details are in the <Link href="/privacy">Privacy Policy</Link> and{' '}
        <Link href="/terms">Terms of Use</Link>.
      </p>
    </article>
  );
}
