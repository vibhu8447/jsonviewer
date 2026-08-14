import { useEffect } from 'react';
import { SITE } from '../config/site';

interface PageMetaProps {
  title: string;
  description: string;
  path: string;
}

export function PageMeta({ title, description, path }: PageMetaProps) {
  useEffect(() => {
    document.title = title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    descriptionTag?.setAttribute('content', description);

    const canonicalHref = `${SITE.url}${path === '/' ? '/' : path}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalHref);
  }, [title, description, path]);

  return null;
}
