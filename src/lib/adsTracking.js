export function trackAdEvent(type, { slotKey, creativeId }) {
  if (window.gtag) {
    window.gtag('event', type, {
      event_category: 'ads',
      event_label: `${slotKey}:${creativeId}`,
      slot: slotKey,
      creative_id: creativeId,
    });
  }
  console.debug('[ad-event]', type, slotKey, creativeId);
}