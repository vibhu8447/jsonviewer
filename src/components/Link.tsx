import type { MouseEvent, ReactNode } from 'react';
import { navigate } from '../lib/router';

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ href, children, className, onClick }: LinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    event.preventDefault();
    onClick?.();
    navigate(href);
  };

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
