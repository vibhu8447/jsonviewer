export function normalizePath(pathname: string): string {
  const path = pathname.replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

export function getPath(): string {
  return normalizePath(window.location.pathname);
}

export function navigate(path: string): void {
  const next = normalizePath(path);
  if (next === getPath()) return;
  window.history.pushState({}, '', next);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function restoreSpaRedirect(): void {
  const redirect = sessionStorage.getItem('spa-redirect');
  if (!redirect) return;
  sessionStorage.removeItem('spa-redirect');
  window.history.replaceState(null, '', redirect);
}
