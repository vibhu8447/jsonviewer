import { useEffect, useRef } from 'react';
import {
  getAdClientId,
  getAdUnit,
  isAdUnitConfigured,
  type AdPlacement,
} from '../config/ads';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

export function AdSlot({ placement, className = '' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);
  const configured = isAdUnitConfigured(placement);
  const unit = getAdUnit(placement);

  useEffect(() => {
    if (!configured || pushedRef.current || !containerRef.current) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushedRef.current = true;
    } catch {
      // AdSense script may not be loaded yet.
    }
  }, [configured, placement]);

  return (
    <div
      className={`ad-slot ad-slot--${placement} ${className}`.trim()}
      aria-label="Advertisement"
    >
      <span className="ad-label">Advertisement</span>
      <div
        ref={containerRef}
        className="ad-slot__frame"
        style={{ minHeight: unit.minHeight }}
      >
        {configured ? (
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={getAdClientId()}
            data-ad-slot={unit.slotId}
            data-ad-format={unit.format}
            data-full-width-responsive={unit.fullWidthResponsive ? 'true' : 'false'}
          />
        ) : (
          <div className="ad-placeholder" role="presentation">
            <p>Ad space</p>
            <span>Configure VITE_ADSENSE_* in .env to enable Google Ads</span>
          </div>
        )}
      </div>
    </div>
  );
}
