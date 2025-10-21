import { useState, useEffect } from 'react';

let adConfigCache = null;

const imageReplacements = {
  "sandbox:/mnt/data/ads_with_logo/ad_hero_publicite.png": "/assets/ad_hero_publicite.png",
  "sandbox:/mnt/data/ads_with_logo/ad_rail_300x600_publicite.png": "/assets/ad_rail_300x600.png",
  "sandbox:/mnt/data/ads_with_logo/ad_rail_300x250_publicite.png": "/assets/ad_rail_300x250.png",
  "sandbox:/mnt/data/ads_with_logo/ad_infeed_live_publicite.png": "/assets/ad_infeed_live_publicite.png",
  "sandbox:/mnt/data/ads_with_logo/ad_infeed_catalog_publicite.png": "/assets/ad_infeed_catalog_publicite.png",
  "sandbox:/mnt/data/ads_with_logo/ad_prefooter_publicite.png": "/assets/ad_prefooter_publicite.png",
  "sandbox:/mnt/data/ads_with_logo/ad_sticky_footer_publicite.png": "/assets/ad_sticky_footer_publicite.png"
};

export const useAds = () => {
  const [config, setConfig] = useState(adConfigCache);
  const [overrides, setOverrides] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      if (adConfigCache) {
        setConfig(adConfigCache);
      } else {
        try {
          const response = await fetch('/ads_config.json');
          const data = await response.json();
          
          let configString = JSON.stringify(data);
          for(const placeholder in imageReplacements) {
              configString = configString.replace(new RegExp(placeholder.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), imageReplacements[placeholder]);
          }

          const finalConfig = JSON.parse(configString);
          adConfigCache = finalConfig;
          setConfig(finalConfig);

        } catch (error) {
          console.error("Failed to fetch or parse ad config:", error);
        }
      }
      
      const rawOverrides = localStorage.getItem("ads_overrides");
      if (rawOverrides) {
        try {
          setOverrides(JSON.parse(rawOverrides));
        } catch (e) {
          console.error("Failed to parse ads overrides from localStorage", e);
        }
      }
    };

    fetchConfig();
  }, []);

  const getSlot = (slotId) => {
    if (!config || !config.slots || !config.slots[slotId]) return null;
    
    const slotConfig = config.slots[slotId];
    
    // Check for override from AdsAdminPanel first
    if (overrides.hasOwnProperty(slotId)) {
      return overrides[slotId] ? slotConfig : null;
    }
    
    // Fallback to config's enabled property
    return slotConfig.enabled !== false ? slotConfig : null;
  };

  return { config: config?.slots, getSlot, setOverrides };
};