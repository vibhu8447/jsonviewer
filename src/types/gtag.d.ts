export type GtagCommand = 'config' | 'event' | 'js' | 'set';

export type Gtag = (
  command: GtagCommand | Date,
  targetOrAction?: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export {};
