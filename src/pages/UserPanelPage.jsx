import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ShoppingBag, Heart, Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const UserPanelPage = () => {
  const navigate = useNavigate();

  const handleClick = (section) => {
    toast({
      title: section,
      description: "🚧 Esta funcionalidad estará disponible próximamente. 🚀",
    });
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>Mi Cuenta - SimpleMarket360</title>
        <meta name="description" content="Gestiona tu cuenta, compras y favoritos en SimpleMarket360" />
      </Helmet>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>

          <h1 className="text-3xl font-bold text-primary mb-8">Mi Cuenta</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              onClick={() => handleClick('Mis Compras')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left"
            >
              <ShoppingBag className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">Mis Compras</h2>
              <p className="text-gray-600 text-sm">Historial de pedidos y seguimiento</p>
            </button>

            <button
              onClick={() => handleClick('Favoritos')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left"
            >
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">Favoritos</h2>
              <p className="text-gray-600 text-sm">Productos guardados</p>
            </button>

            <button
              onClick={() => handleClick('Configuración')}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow text-left"
            >
              <Settings className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-xl font-semibold text-primary mb-2">Configuración</h2>
              <p className="text-gray-600 text-sm">Datos personales y preferencias</p>
            </button>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default UserPanelPage;