declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>> & {
      requestNonPersonalizedAds?: 0 | 1;
    };
  }
}

export {};
