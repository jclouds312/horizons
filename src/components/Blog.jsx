import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';

const posts = [
  {
    id: 1,
    title: 'Cómo vender más en live streaming',
    excerpt: 'Descubre las mejores prácticas para aumentar tus ventas durante transmisiones en vivo.',
    date: '15 Ene 2025',
    image: 'Live streaming sales tips blog post',
  },
  {
    id: 2,
    title: 'Optimiza tus publicaciones con IA',
    excerpt: 'Aprende a usar inteligencia artificial para crear títulos y descripciones que venden.',
    date: '10 Ene 2025',
    image: 'AI optimization for product listings',
  },
  {
    id: 3,
    title: 'Seguridad en marketplace: verificación biométrica',
    excerpt: 'Todo lo que necesitas saber sobre la verificación biométrica y cómo protege tus transacciones.',
    date: '5 Ene 2025',
    image: 'Biometric security in e-commerce',
  },
];

const Blog = ({ onBack }) => {
  return (
    <>
      <Helmet>
        <title>Blog - SimpleMarket360</title>
        <meta name="description" content="Noticias, consejos y guías para vendedores y compradores en SimpleMarket360" />
      </Helmet>
      <div className="min-h-screen bg-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
            aria-label="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver
          </button>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Blog y Noticias</h1>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img 
                      className="w-full h-48 md:h-full object-cover"
                      alt={post.title}
                     src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Leer más →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;