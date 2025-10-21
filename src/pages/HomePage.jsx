
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import HeroSlider from '@/components/HeroSlider';
import LiveCarousel from '@/components/LiveCarousel';
import PremiumAds from '@/components/PremiumAds';
import PublishCTA from '@/components/PublishCTA';
import PageWrapper from '@/components/PageWrapper';
import ProductCard from '@/components/ProductCard';
import FAQ from '@/components/FAQ';

const HomePage = ({ categorizedData, sellers, onAddToCart }) => {
  const { categories } = categorizedData;

  return (
    <PageWrapper>
      <Helmet>
        <title>SimpleMarket360 - LiveHopp - Marketplace Minimalista y Rápido</title>
        <meta name="description" content="Compra y vende en vivo con LiveHopp. Marketplace con verificación biométrica, IA para publicaciones y centro de integraciones. Rápido, seguro y mobile-first." />
      </Helmet>
      
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 focus:z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md">
        Saltar a contenido principal
      </a>

      <HeroSlider />

      <div className="my-8">
        <PremiumAds />
      </div>
      
      <LiveCarousel sellers={sellers} />
      
      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            category.items.length > 0 && (
              <section key={category.slug} id={category.slug} className="py-12">
                <div className="flex justify-between items-baseline mb-6">
                  <h2 className="text-3xl font-bold text-foreground">{category.name}</h2>
                  <Link to={`/categories#${category.slug}`} className="text-sm font-medium text-primary hover:text-primary/90">
                    Ver todos ({category.count})
                  </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {category.items.slice(0, 5).map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ))}
                </div>
              </section>
            )
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        )}
      </main>

      <PublishCTA />
      <FAQ />
    </PageWrapper>
  );
};

export default HomePage;
