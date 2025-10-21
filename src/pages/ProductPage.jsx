import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const reviews = [
  { id: 1, author: 'Juan P.', rating: 5, comment: 'Excelente producto, superó mis expectativas.' },
  { id: 2, author: 'María G.', rating: 4, comment: 'Muy buena calidad, llegó rápido.' },
  { id: 3, author: 'Carlos R.', rating: 5, comment: 'Totalmente recomendado, vale cada centavo.' },
];

const ProductPage = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  
  const [view360, setView360] = useState(false);

  if (!product) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Button onClick={() => navigate('/')} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Volver al inicio</Button>
        </div>
      </PageWrapper>
    );
  }

  const handleBuy = () => {
    toast({
      title: "Compra iniciada",
      description: "🚧 El proceso de compra estará disponible próximamente. 🚀",
    });
  };

  const handleAddToCart = () => {
    onAddToCart(product);
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    });
  };

  const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <PageWrapper>
      <Helmet>
        <title>{product.name} - SimpleMarket360</title>
        <meta name="description" content={`Compra ${product.name} por USD ${product.price}. ${product.category} de alta calidad en SimpleMarket360.`} />
      </Helmet>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {view360 ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-500">Vista 360° (placeholder)</p>
                  </div>
                ) : (
                  <img
                    className="w-full h-full object-cover"
                    alt={product.name}
                    src={product.image} />
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => setView360(!view360)}
                className="w-full border-primary text-primary hover:bg-gray-50"
              >
                {view360 ? 'Ver imagen normal' : 'Ver en 360°'}
              </Button>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-primary mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-accent text-accent' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({reviews.length} reseñas)</span>
              </div>
              <p className="text-4xl font-bold text-primary mb-6">USD {product.price}</p>
              <p className="text-gray-600 mb-8">
                {product.name} de categoría {product.category}. Producto de alta calidad con garantía incluida.
              </p>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={handleBuy}
                >
                  Comprar ahora
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-gray-50"
                  onClick={handleAddToCart}
                >
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-primary mb-6">Reseñas</h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-primary">{review.author}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-accent text-accent' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductPage;