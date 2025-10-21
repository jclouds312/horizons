import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PageWrapper from '@/components/PageWrapper';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
  return (
    <PageWrapper>
      <Helmet>
        <title>Página no encontrada - SimpleMarket360</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="py-16">
            <h1 className="text-6xl font-extrabold text-primary tracking-tight sm:text-8xl">404</h1>
            <h2 className="text-3xl font-bold text-foreground mt-4">Página no encontrada</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                Lo sentimos, la página que buscas no existe o ha sido movida.
            </p>
            <Button asChild className="mt-8">
                <Link to="/">Volver a la página de inicio</Link>
            </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFoundPage;
