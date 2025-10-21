import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const OffersPage = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Helmet>
        <title>Ofertas - SimpleMarket360</title>
        <meta name="description" content="Encuentra las mejores ofertas y descuentos en SimpleMarket360." />
      </Helmet>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Ofertas Especiales</h1>
          <p className="text-gray-600 mb-8">
            Esta sección está en construcción. ¡Vuelve pronto para descubrir descuentos increíbles!
          </p>
          <img class="mx-auto mb-8 rounded-lg shadow-md" alt="Coming soon illustration" src="https://images.unsplash.com/photo-1508693484929-012827ef8c81" />
          <Button onClick={() => navigate('/')} className="bg-primary text-primary-foreground hover:bg-primary/90">Volver al Inicio</Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default OffersPage;