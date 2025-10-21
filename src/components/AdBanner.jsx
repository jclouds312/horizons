import React, { useRef, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { trackAdEvent } from '@/lib/adsTracking';

const AdBanner = ({ slotKey, slotData, className = '' }) => {
  const adRef = useRef(null);
  const [ad, setAd] = useState(null);
  const impressionTracked = useRef(false);

  useEffect(() => {
    if (slotData) {
      const items = slotData.rotation || slotData.items;
      if (items && items.length > 0) {
        setAd(items[0]); 
      }
    }
  }, [slotData]);

  useEffect(() => {
    if (!ad || !adRef.current || impressionTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackAdEvent('ad_impression', { slotKey, creativeId: ad.id });
            impressionTracked.current = true;
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(adRef.current);

    return () => {
      if (adRef.current) {
        observer.unobserve(adRef.current);
      }
    };
  }, [ad, slotKey]);
  
  const handleClick = () => {
    trackAdEvent('ad_click', { slotKey, creativeId: ad.id });
  };

  if (!ad) {
    const ratio = slotData?.rotation?.[0]?.ratio || slotData?.items?.[0]?.ratio || '16/9';
    return null;
  }

  return (
    <div
      ref={adRef}
      role="region"
      aria-label="Publicidad"
      className={`w-full bg-gray-100 overflow-hidden ${className}`}
      style={{ aspectRatio: ad.ratio.replace('/', ' / ') }}
    >
      <a
        href={ad.href}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-lg"
      >
        <LazyLoadImage
          src={ad.src}
          alt={ad.alt}
          effect="blur"
          decoding="async"
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
        />
      </a>
    </div>
  );
};

export default AdBanner;