import { useMemo, useRef, useState } from 'react';
import { AboutModal } from './components/AboutModal';
import { AdSenseScript } from './components/AdSenseScript';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { AdSlot } from './components/AdSlot';
import { JsonInput } from './components/JsonInput';
import { JsonTree } from './components/JsonTree';
import { Toolbar } from './components/Toolbar';
import {
  computeStats,
  formatBytes,
  formatJson,
  minifyJson,
  parseJson,
} from './utils/json';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [showAbout, setShowAbout] = useState(false);
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

  const handleFormat = () => {
    if (!parsed.ok) return;
    setInput(formatJson(parsed.value));
  };

  const handleRemoveWhitespace = () => {
    if (!parsed.ok) return;
    setInput(minifyJson(parsed.value));
  };

  return (
    <>
      <GoogleAnalytics />
      <AdSenseScript />
      <div className="page-shell">
        <div className="app">
          <header className="hero">
            <div className="hero-ads">
              <AdSlot placement="header" />
            </div>
          </header>

          <main className="workspace">
            <Toolbar
              onPaste={handlePaste}
              onCopy={handleCopy}
              onFormat={handleFormat}
              onRemoveWhitespace={handleRemoveWhitespace}
              onClear={() => setInput('')}
              onFileLoad={setInput}
              onAbout={() => setShowAbout(true)}
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

          <div className="footer-ads">
            <AdSlot placement="footer" />
          </div>
        </div>

        <aside className="ad-rail">
          <AdSlot placement="sidebar" />
        </aside>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </>
  );
}

export default App;
