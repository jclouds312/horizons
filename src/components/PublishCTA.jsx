import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Megaphone } from 'lucide-react';

const PublishCTA = () => {
  return (
    <div className="bg-card border-t border-b">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          <span className="block">¿Listo para vender?</span>
          <span className="block text-primary">Publica tu producto en minutos.</span>
        </h2>
        <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
          <div className="inline-flex rounded-md shadow">
            <Link to="/user?action=publish">
              <Button size="lg" className="btn-primary">
                <Megaphone className="mr-2 h-6 w-6" />
                Publica tu producto
              </Button>
            </Link>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <Link to="/sellers">
              <Button size="lg" variant="outline">
                Conoce a nuestros vendedores
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishCTA;
