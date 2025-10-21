import React, { useRef } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { LazyLoadImage } from 'react-lazy-load-image-component';
    import 'react-lazy-load-image-component/src/effects/blur.css';
    import AdBanner from '@/components/AdBanner';
    import { useAds } from '@/hooks/useAds';

    const LiveCarousel = ({ sellers }) => {
      const scrollRef = useRef(null);
      const navigate = useNavigate();
      const { getSlot } = useAds();
      const infeedAdData = getSlot('ad-infeed-live');

      const scroll = (direction) => {
        if (scrollRef.current) {
          const scrollAmount = direction === 'left' ? -300 : 300;
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      };
      
      const handleWatchLive = (seller) => {
        const { id, player } = seller;
        const { embed_type, embed_src } = player;
        navigate(`/live/${id}?type=${encodeURIComponent(embed_type)}&src=${encodeURIComponent(embed_src)}`);
      };
      
      const itemsWithAds = [];
      if (infeedAdData && infeedAdData.every > 0) {
        sellers.forEach((seller, index) => {
          itemsWithAds.push({ type: 'seller', data: seller });
          if ((index + 1) % infeedAdData.every === 0) {
            itemsWithAds.push({ type: 'ad', data: infeedAdData, key: `ad-${index}` });
          }
        });
      } else {
        sellers.forEach(seller => itemsWithAds.push({ type: 'seller', data: seller }));
      }

      return (
        <section id="live-carousel" className="py-12 bg-white" aria-label="Vendedores en vivo (LiveHopp)">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">LiveHopp</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Desplazar a la izquierda"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  aria-label="Desplazar a la derecha"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-snap-x no-scrollbar pb-4"
            >
              {itemsWithAds.map((item, index) => {
                if(item.type === 'ad') {
                  return (
                     <div key={item.key} className="flex-shrink-0 w-72 scroll-snap-center">
                        <AdBanner slotKey="ad-infeed-live" slotData={item.data} className="rounded-lg"/>
                     </div>
                  )
                }
                const seller = item.data;
                return (
                  <div
                    key={seller.id}
                    className="flex-shrink-0 w-72 bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow scroll-snap-center group"
                  >
                    <div className="relative aspect-video">
                      <LazyLoadImage
                        className="w-full h-full object-cover"
                        alt={`Live de ${seller.name}`}
                        src={seller.thumbnail}
                        effect="blur"
                        wrapperClassName="w-full h-full"
                      />
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        LIVE
                      </div>
                      <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {seller.viewers.toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <LazyLoadImage
                          className="w-10 h-10 rounded-full object-cover"
                          alt={`Avatar de ${seller.name}`}
                          src={seller.avatar}
                          effect="blur"
                          wrapperClassName="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{seller.name}</p>
                          <p className="text-sm text-gray-500 truncate">{seller.handle}</p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {seller.category}
                        </span>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-700 font-medium">{seller.featuredProduct.name}</p>
                        <p className="text-lg font-semibold text-gray-900">USD {seller.featuredProduct.price}</p>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-gray-900 text-gray-900 hover:bg-gray-50 group-hover:bg-gray-900 group-hover:text-white transition-colors"
                        onClick={() => handleWatchLive(seller)}
                        aria-label={`Ver live de ${seller.name}`}
                      >
                        Ver live
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      );
    };

    export default LiveCarousel;