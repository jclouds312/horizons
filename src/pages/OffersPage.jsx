import React from 'react';
import { Helmet } from 'react-helmet';
import PageWrapper from '@/components/PageWrapper';

const OffersPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Ofertas Especiales - SimpleMarket360</title>
        <meta name="description" content="Encuentra las mejores ofertas y descuentos en una amplia variedad de productos." />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Ofertas Especiales
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            ¡Grandes descuentos en tus productos favoritos por tiempo limitado!
          </p>
          <hr className="mt-6 w-48 mx-auto" />
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">No hay ofertas especiales en este momento. ¡Vuelve pronto!</p>
          {/* Aca se mostraran las ofertas cuando esten disponibles */}
        </div>
      </div>
    </PageWrapper>
  );
};

export default OffersPage;
