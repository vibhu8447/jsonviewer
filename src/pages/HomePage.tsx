import { useMemo, useRef, useState } from 'react';
import { AdSlot } from '../components/AdSlot';
import { JsonInput } from '../components/JsonInput';
import { JsonTree } from '../components/JsonTree';
import { Link } from '../components/Link';
import { PageMeta } from '../components/PageMeta';
import { Toolbar } from '../components/Toolbar';
import { isAdUnitConfigured } from '../config/ads';
import { SITE } from '../config/site';
import { GUIDES } from '../content/guides';
import {
  computeStats,
  formatBytes,
  formatJson,
  minifyJson,
  parseJson,
} from '../utils/json';

export function HomePage() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const parsed = useMemo(() => parseJson(input), [input]);
  const stats = parsed.ok ? computeStats(parsed.value, new Blob([input]).size) : null;

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      textareaRef.current?.focus();
    } catch {
      textareaRef.current?.focus();
    }
  };

  const handleCopy = async () => {
    if (!input.trim()) return;
    try {
      await navigator.clipboard.writeText(input);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <>
      <PageMeta
        title={`${SITE.name} — Free Online JSON Formatter & Validator`}
        description={SITE.description}
        path="/"
      />

      <section className="page-intro">
        <p className="eyebrow">Free browser tool</p>
        <h1>Online JSON viewer and formatter</h1>
        <p className="lede">
          Paste JSON, load a file, and inspect it as a collapsible tree. Format or minify valid
          documents, read parse errors in place, and keep the data on your device. Nothing you paste
          is sent to our servers.
        </p>
        <ul className="intro-points">
          <li>Validate JSON and see the first parse error</li>
          <li>Beautify or remove whitespace without changing values</li>
          <li>Explore objects and arrays with type labels</li>
          <li>Works in the browser — no account and no upload</li>
        </ul>
      </section>

      <div className={`page-shell ${isAdUnitConfigured('sidebar') ? '' : 'page-shell--solo'}`.trim()}>
        <div className="app">
          <main className="workspace">
            <Toolbar
              onPaste={handlePaste}
              onCopy={handleCopy}
              onFormat={() => {
                if (parsed.ok) setInput(formatJson(parsed.value));
              }}
              onRemoveWhitespace={() => {
                if (parsed.ok) setInput(minifyJson(parsed.value));
              }}
              onClear={() => setInput('')}
              onFileLoad={setInput}
              canFormat={parsed.ok}
              canCopy={Boolean(input.trim())}
            />

            <div className="split-layout">
              <JsonInput
                ref={textareaRef}
                value={input}
                onChange={setInput}
                error={parsed.ok ? undefined : parsed.message}
              />

              <section className="panel panel--output">
                <div className="panel-header panel-header--row">
                  <h2>Viewer</h2>
                  {stats && (
                    <div className="stats">
                      <span className="stat-pill">{formatBytes(stats.bytes)}</span>
                      <span className="stat-pill">{stats.keys} keys</span>
                      <span className="stat-pill">{stats.arrays} arrays</span>
                      <span className="stat-pill">depth {stats.depth}</span>
                    </div>
                  )}
                </div>

                <div className="viewer">
                  {!input.trim() && (
                    <div className="viewer-placeholder">
                      <p>Paste or load JSON to view the tree.</p>
                    </div>
                  )}

                  {input.trim() && !parsed.ok && (
                    <div className="viewer-error">
                      <strong>Unable to parse JSON</strong>
                      <p>{parsed.message}</p>
                    </div>
                  )}

                  {parsed.ok && <JsonTree value={parsed.value} />}
                </div>
              </section>
            </div>
          </main>
        </div>

        {isAdUnitConfigured('sidebar') && (
          <aside className="ad-rail" aria-label="Advertisements">
            <AdSlot placement="sidebar" />
          </aside>
        )}
      </div>

      <section className="prose-section">
        <h2>How this JSON viewer works</h2>
        <p>
          The editor and tree run entirely in your browser. When you paste text, the app parses it
          with the standard JSON parser, then walks the result to build the tree. File import uses
          the browser file picker. Copy and paste use the clipboard APIs when the browser allows
          them.
        </p>
        <p>
          Because parsing happens locally, you can inspect private API responses, environment
          exports, or fixtures without sending that text to {SITE.domain}. If you close the tab, the
          document is gone. We do not create an account, session, or server-side copy of your input.
        </p>

        <AdSlot placement="header" />

        <h2>When to use a formatter, a minifier, or the tree</h2>
        <p>
          Use <strong>Format</strong> when you need to read a minified payload or compare two
          documents visually. Use <strong>Remove white space</strong> when you need a compact copy
          for a request body or a smaller file. Use the <strong>tree</strong> when you care about
          shape and types: which keys exist, which values are arrays, and how deep the document
          goes.
        </p>
        <p>
          If you are new to the format, start with the{' '}
          <Link href="/guides/what-is-json">What is JSON?</Link> guide, then read{' '}
          <Link href="/guides/validate-json">how to fix common parse errors</Link>.
        </p>

        <h2>Frequently asked questions</h2>
        <div className="faq-list">
          <article>
            <h3>Is my JSON uploaded?</h3>
            <p>
              No. Input is processed in the page you already have open. We do not operate a backend
              that stores or logs the document you paste.
            </p>
          </article>
          <article>
            <h3>Why will my file not parse?</h3>
            <p>
              The usual causes are trailing commas, single quotes, comments, or unquoted keys. Those
              are valid in some JavaScript objects but not in JSON. The error banner points at the
              first problem the parser found.
            </p>
          </article>
          <article>
            <h3>Does formatting change my data?</h3>
            <p>
              Formatting only changes whitespace. Values, key names, and types stay the same. If the
              text is invalid, the formatter does nothing.
            </p>
          </article>
          <article>
            <h3>Can I use this without creating an account?</h3>
            <p>
              Yes. There is no sign-in. Open the site, paste JSON, and use the toolbar. The tool is
              free and supported by advertisements on content pages.
            </p>
          </article>
        </div>

        <h2>JSON guides</h2>
        <p>Short, practical notes if you want more than the toolbar:</p>
        <ul className="guide-index">
          {GUIDES.map((guide) => (
            <li key={guide.slug}>
              <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
              <span>{guide.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {isAdUnitConfigured('footer') && (
        <div className="footer-ads">
          <AdSlot placement="footer" />
        </div>
      )}
    </>
  );
}
