import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            {product.offer_price ? (
              <>
                <p className="text-gray-500 line-through">${product.price}</p>
                <p className="text-red-500 font-bold text-xl">${product.offer_price}</p>
              </>
            ) : (
              <p className="text-gray-900 font-bold text-xl">${product.price}</p>
            )}
          </div>
          <button onClick={() => onAddToCart(product)} className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
        <div className="text-sm text-gray-500">
          <p>Rating: {product.rating} ★</p>
          <p>{product.sold_count} vendidos</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
