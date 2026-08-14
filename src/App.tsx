import { useEffect, useState } from 'react';
import { AdSenseScript } from './components/AdSenseScript';
import { CookieNotice } from './components/CookieNotice';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { getGuide } from './content/guides';
import { getPath, restoreSpaRedirect } from './lib/router';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { GuidePage } from './pages/GuidePage';
import { GuidesIndexPage } from './pages/GuidesIndexPage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { trackPageView } from './utils/analytics';
import './App.css';

function renderPage(path: string) {
  if (path === '/') return <HomePage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/privacy') return <PrivacyPage />;
  if (path === '/terms') return <TermsPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/guides') return <GuidesIndexPage />;

  if (path.startsWith('/guides/')) {
    const guide = getGuide(path.slice('/guides/'.length));
    if (guide) return <GuidePage guide={guide} />;
  }

  return <NotFoundPage />;
}

function App() {
  const [path, setPath] = useState(() => {
    restoreSpaRedirect();
    return getPath();
  });

  useEffect(() => {
    const onPopState = () => setPath(getPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(path);
  }, [path]);

  return (
    <>
      <GoogleAnalytics />
      <AdSenseScript />
      <div className="site">
        <SiteHeader path={path} />
        <div className="site-main">{renderPage(path)}</div>
        <SiteFooter />
      </div>
      <CookieNotice />
    </>
  );
}

export default App;
