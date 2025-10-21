
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Wifi } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductCard = ({ product, onAddToCart }) => {
  const hasLive = product.live_shopping_enabled;

  return (
    <div className="card bg-card text-card-foreground rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300" />
      </Link>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <div>
            {product.offer_price ? (
              <>
                <p className="text-muted-foreground line-through text-sm">${product.price}</p>
                <p className="text-destructive font-bold text-xl">${product.offer_price}</p>
              </>
            ) : (
              <p className="font-bold text-xl">${product.price}</p>
            )}
          </div>
          <Button onClick={() => onAddToCart(product)} size="icon" variant="secondary">
            <ShoppingCart size={20} />
          </Button>
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          <p>Rating: {product.rating} ★</p>
          <p>{product.sold_count} vendidos</p>
        </div>
        <div className="flex justify-between gap-2">
          <Link to={`/product/${product.id}`} className="flex-1">
            <Button variant="outline" className="w-full">
              <Eye size={16} className="mr-2"/>
              Ver Producto
            </Button>
          </Link>
          {hasLive && (
            <Link to={`/live/${product.seller_id}`} className="flex-1">
                <Button variant="destructive" className="w-full">
                    <Wifi size={16} className="mr-2"/>
                    Ver Live
                </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
