import { AdSlot } from '../components/AdSlot';
import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { SITE } from '../config/site';
import { GUIDES, type Guide } from '../content/guides';

interface GuidePageProps {
  guide: Guide;
}

export function GuidePage({ guide }: GuidePageProps) {
  const related = GUIDES.filter((item) => item.slug !== guide.slug).slice(0, 3);

  return (
    <article className="legal-page">
      <PageMeta
        title={`${guide.title} — ${SITE.name}`}
        description={guide.description}
        path={`/guides/${guide.slug}`}
      />

      <p className="eyebrow">
        <Link href="/guides">Guides</Link>
      </p>
      <h1>{guide.title}</h1>
      <p className="lede">{guide.description}</p>

      {guide.sections.map((section, index) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.list && (
            <ul>
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {section.code && (
            <pre className="guide-code">
              <code>{section.code}</code>
            </pre>
          )}
          {index === 0 && <AdSlot placement="header" />}
        </section>
      ))}

      <h2>Continue</h2>
      <p>
        Open the <Link href="/">viewer</Link> to paste a document, or read another guide:
      </p>
      <ul>
        {related.map((item) => (
          <li key={item.slug}>
            <Link href={`/guides/${item.slug}`}>{item.title}</Link>
          </li>
        ))}
      </ul>

      <AdSlot placement="footer" />
    </article>
  );
}
