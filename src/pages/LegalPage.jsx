
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';
import LegalSection from '@/components/LegalSection';
import ContactCTA from '@/components/ContactCTA';
import legalSections from '@/data/legal';

const LegalPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Helmet>
        <title>Información Legal - SimpleMarket360</title>
        <meta name="description" content="Términos y condiciones, política de privacidad y políticas de devolución de SimpleMarket360" />
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

          <h1 className="text-3xl font-bold text-primary mb-8">Información Legal</h1>

          <div className="space-y-8">
            {legalSections.map(section => (
              <LegalSection
                key={section.id}
                title={section.data.title}
                content={section.data.content}
              />
            ))}
          </div>

          <div className="mt-12">
            <ContactCTA />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;
