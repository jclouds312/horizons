import React, { useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Hls from 'hls.js';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import PageWrapper from '@/components/PageWrapper';

const LivePlayerPage = ({ sellers, products, onAddToCart }) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const seller = sellers.find(s => s.id === parseInt(id));
  const product = products.find(p => p.name === seller?.featuredProduct.name);

  const embedType = searchParams.get('type');
  const embedSrc = searchParams.get('src');

  useEffect(() => {
    if (embedType === 'mux' && embedSrc && videoRef.current) {
      const video = videoRef.current;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(embedSrc);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(error => console.error("Playback failed", error));
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = embedSrc;
        video.addEventListener('loadedmetadata', () => {
          video.play().catch(error => console.error("Playback failed", error));
        });
      }
    }
  }, [embedType, embedSrc]);

  if (!seller || !product) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold">Live no encontrado</h1>
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

  const renderPlayer = () => {
    if (embedType === 'iframe') {
      return (
        <iframe
          className="w-full h-full"
          src={embedSrc}
          title={`Live de ${seller.name}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    return <video ref={videoRef} className="w-full h-full object-contain" controls playsInline />;
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>LIVE: {seller.name} - SimpleMarket360</title>
        <meta name="description" content={`Viendo el live de ${seller.name} en SimpleMarket360. Producto destacado: ${product.name}.`} />
      </Helmet>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-primary mb-6"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-primary sr-only">Live de {seller.name}</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-black rounded-lg overflow-hidden aspect-video">
              {renderPlayer()}
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  className="w-16 h-16 rounded-full object-cover"
                  src={seller.avatar}
                  alt={`Avatar de ${seller.name}`}
                />
                <div>
                  <h2 className="text-xl font-semibold text-primary">{seller.name}</h2>
                  <p className="text-sm text-gray-500">{seller.handle}</p>
                </div>
              </div>
              <div className="mb-6">
                <span className="inline-block bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                  {seller.category}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold mb-4">Producto destacado</h3>
                <div className="flex items-start gap-4">
                  <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold text-primary">{product.name}</p>
                    <p className="text-2xl font-bold text-primary mt-2">USD {product.price}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 mt-6">
                  <Button
                    size="lg"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={handleBuy}
                  >
                    Comprar ahora
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-gray-50"
                    onClick={handleAddToCart}
                  >
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LivePlayerPage;