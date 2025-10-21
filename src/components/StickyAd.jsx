import React, { useState, useEffect } from 'react';
    import AdBanner from './AdBanner';
    import { X } from 'lucide-react';

    const StickyAd = ({ slotKey, slotData }) => {
        const [isVisible, setIsVisible] = useState(false);

        useEffect(() => {
            const hasBeenShown = sessionStorage.getItem('stickyAdShown');
            if (!hasBeenShown) {
                setIsVisible(true);
            }
        }, []);

        const handleClose = () => {
            setIsVisible(false);
            sessionStorage.setItem('stickyAdShown', 'true');
        };

        if (!isVisible || !slotData) return null;

        return (
            <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/80 backdrop-blur-sm p-2 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
                <div className="relative">
                    <AdBanner slotKey={slotKey} slotData={slotData} />
                    <button
                        onClick={handleClose}
                        className="absolute top-0 right-0 -mt-1 -mr-1 bg-gray-800 text-white rounded-full p-0.5"
                        aria-label="Cerrar anuncio"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    };

    export default StickyAd;