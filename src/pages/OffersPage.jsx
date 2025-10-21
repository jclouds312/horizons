import React from 'react';
import ProductCard from '../components/ProductCard';

const OffersPage = ({ products, onAddToCart }) => {
  const offerProducts = products.filter(product => product.offer_price);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Ofertas Especiales</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {offerProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
};

export default OffersPage;
