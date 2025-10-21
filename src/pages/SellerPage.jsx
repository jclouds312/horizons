import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageWrapper from '@/components/PageWrapper';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const SellerPage = ({ products, sellers, onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const seller = sellers.find(s => s.id === parseInt(id));
  const sellerProducts = products.filter(p => p.seller.id === parseInt(id));

  if (!seller) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Vendedor no encontrado</h1>
          <Button onClick={() => navigate('/')} className="mt-4">Volver al inicio</Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{seller.name} - Perfil de Vendedor - SimpleMarket360</title>
        <meta name="description" content={`Explora el perfil de ${seller.name} y descubre sus productos.`} />
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
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left mb-12">
          <img 
            src={seller.avatar}
            alt={seller.name}
            className="w-32 h-32 rounded-full object-cover mb-6 md:mb-0 md:mr-8 border-4 border-muted"
          />
          <div>
            <h1 className="text-4xl font-bold text-foreground">{seller.name}</h1>
            <p className="text-xl text-muted-foreground">{seller.handle}</p>
            <div className="mt-4 flex justify-center md:justify-start space-x-2">
              <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full font-medium">{seller.category}</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-foreground mb-6">Productos de {seller.name}</h2>
        {sellerProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {sellerProducts.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                ))}
            </div>
        ) : (
            <div className="text-center py-16 border rounded-lg">
                <p className="text-muted-foreground">Este vendedor aún no tiene productos publicados.</p>
            </div>
        )}
      </div>
    </PageWrapper>
  )
}

export default SellerPage;
