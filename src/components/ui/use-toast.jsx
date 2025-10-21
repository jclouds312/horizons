
import React, { useState, useCallback } from 'react';

const Toaster = ({ toasts }) => {
  return (
    <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 9999 }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{ background: 'black', color: 'white', padding: '1rem', margin: '1rem' }}>
          <h5>{toast.title}</h5>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
};

let toasts = [];
const listeners = [];

const toast = (options) => {
  const newToast = { ...options, id: Date.now() };
  toasts = [...toasts, newToast];
  listeners.forEach(listener => listener(toasts));
  setTimeout(() => {
    toasts = toasts.filter(t => t.id !== newToast.id);
    listeners.forEach(listener => listener(toasts));
  }, 3000);
};

const useToast = () => {
  const [toastsState, setToastsState] = useState(toasts);
  
  const listener = useCallback(newToasts => {
    setToastsState(newToasts);
  }, []);

  React.useEffect(() => {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [listener]);

  return { toast, toasts: toastsState };
};

export { useToast, Toaster, toast };
