export type AdPlacement = 'header' | 'sidebar' | 'footer';

interface AdUnitConfig {
  slotId: string;
  format: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  fullWidthResponsive: boolean;
  minHeight: number;
}

const clientId = import.meta.env.VITE_ADSENSE_CLIENT_ID?.trim() ?? '';

const adUnits: Record<AdPlacement, AdUnitConfig> = {
  header: {
    slotId: import.meta.env.VITE_ADSENSE_SLOT_HEADER?.trim() ?? '',
    format: 'horizontal',
    fullWidthResponsive: true,
    minHeight: 90,
  },
  sidebar: {
    slotId: import.meta.env.VITE_ADSENSE_SLOT_SIDEBAR?.trim() ?? '',
    format: 'vertical',
    fullWidthResponsive: false,
    minHeight: 600,
  },
  footer: {
    slotId: import.meta.env.VITE_ADSENSE_SLOT_FOOTER?.trim() ?? '',
    format: 'horizontal',
    fullWidthResponsive: true,
    minHeight: 90,
  },
};

export function isAdsEnabled(): boolean {
  return Boolean(clientId && Object.values(adUnits).some((unit) => unit.slotId));
}

export function getAdClientId(): string {
  return clientId;
}

export function getAdUnit(placement: AdPlacement): AdUnitConfig {
  return adUnits[placement];
}

export function isAdUnitConfigured(placement: AdPlacement): boolean {
  return Boolean(clientId && adUnits[placement].slotId);
}
