import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import ProductCard from '@/components/ProductCard';

const CategoriesPage = ({ categorizedData, onAddToCart }) => {
  const { categories } = categorizedData;

  return (
    <PageWrapper>
      <Helmet>
        <title>Categorías de Productos - SimpleMarket360</title>
        <meta name="description" content="Explora todos nuestros productos organizados por categorías." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Categorías de Productos
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            Encuentra exactamente lo que buscas en nuestras {categories.length} categorías.
          </p>
          <hr className="mt-6 w-48 mx-auto" />
        </header>

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
                  {category.items.map((product) => (
                    <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
                  ))}
                </div>
              </section>
            )
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Cargando categorías y productos...</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default CategoriesPage;