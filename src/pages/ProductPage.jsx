import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';

const ProductPage = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Button onClick={() => navigate('/')} className="mt-4">Volver al inicio</Button>
        </div>
      </PageWrapper>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito.`,
    });
  };

  // Fake rating for display
  const rating = (product.id % 5) + 1; 
  const reviewsCount = Math.floor(Math.random() * 100) + 1;

  return (
    <PageWrapper>
      <Helmet>
        <title>{product.name} - SimpleMarket360</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          aria-label="Volver"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <img src={product.image} alt={product.name} className="w-full rounded-lg shadow-lg border" />
          </div>

          {/* Product Info */}
          <div>
            <Link to={`/categories#${product.category.slug}`} className="text-sm font-medium text-primary hover:text-primary/90">
              {product.category.name}
            </Link>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mt-2">{product.name}</h1>
            
            <div className="mt-3 flex items-center space-x-4">
              <p className="text-3xl text-foreground font-bold">${product.price}</p>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-muted-foreground/30'}`} fill="currentColor" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">({reviewsCount} reseñas)</span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Descripción</h3>
              <p className="text-base text-muted-foreground space-y-6">{product.description}</p>
            </div>

            <div className="mt-8">
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
            </div>
            
            <div className="mt-6 text-center">
                <Link to={`/seller/${product.seller.id}`} className="text-sm font-medium text-primary hover:underline">
                    Vendido por <span className="font-bold">{product.seller.name}</span>
                </Link>
            </div>

          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductPage;
