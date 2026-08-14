import { useState } from 'react';
import { SITE } from '../config/site';
import { Link } from './Link';

const NAV = [
  { href: '/', label: 'Viewer' },
  { href: '/guides', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

interface SiteHeaderProps {
  path: string;
}

export function SiteHeader({ path }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="site-logo" onClick={() => setOpen(false)}>
          <span className="site-logo__mark">{'{ }'}</span>
          <span className="site-logo__text">{SITE.name}</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          Menu
        </button>

        <nav id="site-nav" className={`site-nav ${open ? 'site-nav--open' : ''}`} aria-label="Primary">
          {NAV.map((item) => {
            const active = item.href === '/' ? path === '/' : path.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`site-nav__link ${active ? 'site-nav__link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
