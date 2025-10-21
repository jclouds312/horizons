import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    toast({
      title: 'Producto Agregado',
      description: `${product.title} fue agregado a tu carrito.`,
    });
  };

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer group flex flex-col"
      onClick={handleCardClick}
      aria-label={`Ver detalles de ${product.title}`}
    >
      <div className="aspect-square overflow-hidden relative">
        <LazyLoadImage
          alt={product.title}
          src={product.image}
          effect="blur"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          wrapperClassName="w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 mb-2 h-12 line-clamp-2">{product.title}</h3>
        <div className="flex items-center mt-auto mb-3">
          <p className="text-lg font-bold text-gray-900">
            ${product.price?.toFixed(2) ?? 'N/A'}
          </p>
          {product.rating && (
            <div className="flex items-center ml-auto" aria-label={`Calificación: ${product.rating.toFixed(1)} de 5 estrellas`}>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>
        <Button
          variant="brand"
          size="sm"
          className="w-full mt-auto"
          onClick={handleAddToCartClick}
          aria-label={`Agregar ${product.title} al carrito`}
        >
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;