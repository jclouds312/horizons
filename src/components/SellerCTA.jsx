import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SellerCTA = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          <span className="block">¿Listo para vender?</span>
          <span className="block" style={{color: 'var(--sm-pink)'}}>Únete a nuestra comunidad de vendedores.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Button asChild variant="brand" size="lg">
              <Link to="/sellers">
                Publica tu producto
              </Link>
            </Button>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
             <Button asChild variant="outline" size="lg" className="bg-white">
              <Link to="/contact">
                Más información
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerCTA;