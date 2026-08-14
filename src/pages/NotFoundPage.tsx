import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { SITE } from '../config/site';

export function NotFoundPage() {
  return (
    <article className="legal-page">
      <PageMeta
        title={`Page not found — ${SITE.name}`}
        description="The page you requested is not on this site."
        path="/404"
      />
      <h1>Page not found</h1>
      <p className="lede">That address is not a page on {SITE.name}. Try one of these:</p>
      <ul>
        <li>
          <Link href="/">JSON viewer</Link>
        </li>
        <li>
          <Link href="/guides">Guides</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </article>
  );
}
