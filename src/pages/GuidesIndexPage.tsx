import { AdSlot } from '../components/AdSlot';
import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { SITE } from '../config/site';
import { GUIDES } from '../content/guides';

export function GuidesIndexPage() {
  return (
    <article className="legal-page">
      <PageMeta
        title={`JSON Guides — ${SITE.name}`}
        description="Practical guides on JSON syntax, formatting, validation, minifying, and JSON vs XML."
        path="/guides"
      />

      <p className="eyebrow">Learn</p>
      <h1>JSON guides</h1>
      <p className="lede">
        These notes explain the format the viewer is built for. They are written for people who
        paste API responses and want to know why a document failed, or how formatting differs from
        changing data.
      </p>

      <ul className="guide-cards">
        {GUIDES.map((guide) => (
          <li key={guide.slug}>
            <Link href={`/guides/${guide.slug}`}>
              <strong>{guide.title}</strong>
              <span>{guide.description}</span>
            </Link>
          </li>
        ))}
      </ul>

      <p>
        When you are ready to inspect a document, open the <Link href="/">JSON viewer</Link>.
      </p>

      <AdSlot placement="footer" />
    </article>
  );
}
