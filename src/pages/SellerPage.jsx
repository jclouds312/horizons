import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const SellerPage = ({ products, sellers }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const seller = sellers.find(s => s.id === parseInt(id));
  
  // Mock: take first 6 products for this seller
  const sellerProducts = products.slice(0, 6);

  if (!seller) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Vendedor no encontrado</h1>
          <Button onClick={() => navigate('/')} className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">Volver al inicio</Button>
        </div>
      </PageWrapper>
    );
  }

  const handleChat = () => {
    toast({
      title: "Chat",
      description: "🚧 La funcionalidad de chat estará disponible próximamente. 🚀",
    });
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>{seller.name} - Perfil de Vendedor - SimpleMarket360</title>
        <meta name="description" content={`Perfil de ${seller.name} en SimpleMarket360. Descubre sus productos en la categoría ${seller.category}.`} />
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

          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                className="w-24 h-24 rounded-full object-cover"
                alt={`Avatar de ${seller.name}`}
                src={seller.avatar} />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-primary mb-2">{seller.name}</h1>
                <p className="text-gray-600 mb-4">{seller.handle}</p>
                <p className="text-gray-700">
                  Vendedor especializado en {seller.category}. Productos de calidad con envío rápido.
                </p>
              </div>
              <Button
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleChat}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat
              </Button>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-primary mb-6">Productos del vendedor</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sellerProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    alt={product.name}
                    src={product.image} />
                </div>
                <div className="p-3">
                  <p className="font-medium text-primary text-sm mb-2 line-clamp-2 h-10">{product.name}</p>
                  <p className="text-lg font-semibold text-primary">USD {product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SellerPage;