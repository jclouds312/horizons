import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';

const SellersPage = ({ sellers }) => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Helmet>
        <title>Vendedores - SimpleMarket360</title>
        <meta name="description" content="Descubre a todos los vendedores de nuestra comunidad en SimpleMarket360." />
      </Helmet>
      <div className="min-h-screen bg-background py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Nuestros Vendedores</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {sellers.map((seller) => (
              <div
                key={seller.id}
                onClick={() => navigate(`/seller/${seller.id}`)}
                className="bg-card border-border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                <img
                  src={seller.avatar}
                  alt={`Avatar de ${seller.name}`}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{seller.name}</h2>
                <p className="text-sm text-muted-foreground">{seller.handle}</p>
                <span className="mt-2 text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">{seller.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SellersPage;