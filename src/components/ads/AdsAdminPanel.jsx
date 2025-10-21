import React, { useEffect, useState } from "react";

const LS_KEY = "ads_overrides";

export default function AdsAdminPanel({ config, onChange }) {
  const [open, setOpen] = useState(false);
  const [over, setOver] = useState({});

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setOver(parsed);
      } catch (e) {
        console.error("Failed to parse ads overrides from localStorage", e);
      }
    }
  }, []);

  const toggle = (slot) => {
    const currentOverriddenState = over.hasOwnProperty(slot) ? over[slot] : (config?.[slot]?.enabled ?? true);
    const nextValue = !currentOverriddenState; // Toggle the effective state
    
    const next = { ...over, [slot]: nextValue };
    setOver(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    onChange?.(next);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setOpen(!open)} className="rounded-lg border px-3 py-1.5 bg-white shadow-lg hover:bg-gray-50 transition-colors">Ads</button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 w-72 rounded-lg border bg-white p-3 shadow-xl">
          <div className="text-sm font-semibold mb-2">Control de Anuncios</div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {Object.keys(config || {}).map(slot => {
              const isEnabled = over.hasOwnProperty(slot) ? over[slot] : (config[slot]?.enabled ?? true);
              return (
                <label key={slot} className="flex items-center justify-between text-sm cursor-pointer p-1 rounded hover:bg-gray-100">
                  <span className="truncate pr-2">{slot}</span>
                  <input type="checkbox" checked={isEnabled} onChange={() => toggle(slot)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                </label>
              );
            })}
          </div>
          <div className="mt-3 text-xs text-gray-500 border-t pt-2">Los cambios solo afectan este navegador (localStorage).</div>
        </div>
      )}
    </div>
  );
}