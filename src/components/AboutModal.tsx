import { useEffect, useState } from 'react';

type AboutTab = 'about' | 'privacy' | 'developer';

interface AboutModalProps {
  onClose: () => void;
}

const TABS: Array<{ id: AboutTab; label: string }> = [
  { id: 'about', label: 'About' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'developer', label: 'Developer' },
];

function TabPanel({ tab }: { tab: AboutTab }) {
  if (tab === 'about') {
    return (
      <div className="about-panel">
        <h3>About JSON</h3>
        <p>
          JSON (JavaScript Object Notation) is a lightweight, text-based format for objects,
          arrays, strings, numbers, booleans, and null. It is widely used for APIs, configuration
          files, and data exchange between systems.
        </p>
        <p>
          This viewer helps you paste, validate, format, and explore JSON in a clear tree structure
          — all directly in your browser.
        </p>
        <p>
          Read more at{' '}
          <a href="https://json.org" target="_blank" rel="noreferrer">
            json.org
          </a>
          .
        </p>
      </div>
    );
  }

  if (tab === 'privacy') {
    return (
      <div className="about-panel">
        <h3>Privacy &amp; ads</h3>
        <p>
          Your JSON data is processed entirely in your browser. We do not store or transmit your
          input to a server.
        </p>
        <p>
          This site uses Google Analytics to understand how visitors use the app, and Google AdSense
          to display non-intrusive advertisements. Google may use cookies to collect usage data and
          serve ads based on your visits to this and other websites.
        </p>
        <p>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Google Privacy Policy
          </a>
          {' · '}
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noreferrer"
          >
            How Google uses data for ads
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="about-panel">
      <h3>Developer</h3>
      <p>
        JSON Viewer is a client-side web application built with React and TypeScript. It is designed
        to be fast, simple, and privacy-friendly.
      </p>
      <ul>
        <li>Paste, format, and minify JSON</li>
        <li>Explore nested objects in a tree view</li>
        <li>Load JSON files from your device</li>
        <li>No account or sign-in required</li>
      </ul>
      <p>
        Built with React, TypeScript, and Vite. Feedback and contributions are welcome.
      </p>
    </div>
  );
}

export function AboutModal({ onClose }: AboutModalProps) {
  const [activeTab, setActiveTab] = useState<AboutTab>('about');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="about-overlay" onClick={onClose} role="presentation">
      <div
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="about-modal__header">
          <h2 id="about-modal-title">About</h2>
          <button type="button" className="about-modal__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="about-tabs" role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`about-tab ${activeTab === tab.id ? 'about-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="about-modal__body" role="tabpanel">
          <TabPanel tab={activeTab} />
        </div>
      </div>
    </div>
  );
}
