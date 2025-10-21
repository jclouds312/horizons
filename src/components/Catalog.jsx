import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import AdBanner from '@/components/AdBanner';
    import { toast } from '@/components/ui/use-toast';
    import { LazyLoadImage } from 'react-lazy-load-image-component';
    import 'react-lazy-load-image-component/src/effects/blur.css';
    import { useAds } from '@/hooks/useAds';

    const Catalog = ({ products, onAddToCart }) => {
      const navigate = useNavigate();
      const { getSlot } = useAds();
      const infeedAdData = getSlot('ad-infeed-catalog');
      const leftRailAd = getSlot('ad-slot-left');
      const rightRailAd = getSlot('ad-slot-right');

      const [filters, setFilters] = useState({
        category: 'all',
        minPrice: '',
        maxPrice: '',
        sortBy: 'relevance',
      });

      const categories = [...new Set(products.map(p => p.category))];

      const filteredProducts = products.filter(product => {
        if (filters.category !== 'all' && product.category !== filters.category) return false;
        if (filters.minPrice && product.price < Number(filters.minPrice)) return false;
        if (filters.maxPrice && product.price > Number(filters.maxPrice)) return false;
        return true;
      }).sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
      
      const itemsWithAds = [];
      if (infeedAdData && infeedAdData.every > 0) {
        filteredProducts.forEach((product, index) => {
          itemsWithAds.push({ type: 'product', data: product });
          if ((index + 1) % infeedAdData.every === 0) {
            itemsWithAds.push({ type: 'ad', data: infeedAdData, key: `ad-${index}` });
          }
        });
      } else {
        filteredProducts.forEach(product => itemsWithAds.push({ type: 'product', data: product }));
      }

      const handleAddToCart = (product) => {
        onAddToCart(product);
        toast({
          title: "Producto agregado",
          description: `${product.name} se agregó al carrito`,
        });
      };

      return (
        <section id="catalog-grid" className="py-12 bg-white" aria-label="Catálogo de productos">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">Catálogo</h2>

            <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría
                </label>
                <select
                  id="category-filter"
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="all">Todas</option>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="min-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio mínimo
                </label>
                <input
                  id="min-price"
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="max-price" className="block text-sm font-medium text-gray-700 mb-2">
                  Precio máximo
                </label>
                <input
                  id="max-price"
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  id="sort-by"
                  value={filters.sortBy}
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="relevance">Relevancia</option>
                  <option value="price-asc">Precio: menor a mayor</option>
                  <option value="price-desc">Precio: mayor a menor</option>
                  <option value="name">Nombre</option>
                </select>
              </div>
            </div>

            <div className="flex gap-8">
              {leftRailAd && (
                <aside id="ad-slot-left" className="hidden lg:block flex-shrink-0 w-48 sticky top-32 h-fit">
                  <AdBanner slotKey="ad-slot-left" slotData={leftRailAd} />
                </aside>
              )}

              <div className="flex-1">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {itemsWithAds.map((item, index) => {
                    if (item.type === 'ad') {
                      return <AdBanner key={item.key} slotKey="ad-infeed-catalog" slotData={item.data} className="rounded-lg"/>;
                    }

                    const product = item.data;
                    return (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <div className="aspect-square overflow-hidden">
                          <LazyLoadImage
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            alt={product.name}
                            src={product.image}
                            effect="blur"
                            wrapperClassName="w-full h-full"
                          />
                        </div>
                        <div className="p-4">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
                            {product.category}
                          </span>
                          <p className="font-medium text-gray-900 mb-2 line-clamp-2 h-10">{product.name}</p>
                          <p className="text-lg font-semibold text-gray-900 mb-3">USD {product.price}</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-gray-900 text-gray-900 hover:bg-gray-50 group-hover:bg-gray-900 group-hover:text-white transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product);
                            }}
                            aria-label={`Agregar ${product.name} al carrito`}
                          >
                            Agregar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {rightRailAd && (
                <aside id="ad-slot-right" className="hidden lg:block flex-shrink-0 w-48 sticky top-32 h-fit">
                    <AdBanner slotKey="ad-slot-right" slotData={rightRailAd} />
                </aside>
              )}
            </div>
          </div>
        </section>
      );
    };

    export default Catalog;