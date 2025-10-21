import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

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
            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Términos y Condiciones</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Bienvenido a SimpleMarket360. Al utilizar nuestra plataforma, aceptas los siguientes términos y condiciones.
                </p>
                <p className="mb-4">
                  SimpleMarket360 es un marketplace que conecta compradores y vendedores. No somos responsables de las transacciones entre usuarios, pero proporcionamos herramientas de seguridad como verificación biométrica.
                </p>
                <p>
                  Los vendedores son responsables de la calidad y entrega de sus productos. Los compradores tienen derecho a solicitar devoluciones según nuestra política.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Política de Privacidad</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  En SimpleMarket360 protegemos tu información personal. Recopilamos datos necesarios para procesar transacciones y mejorar tu experiencia.
                </p>
                <p className="mb-4">
                  Utilizamos verificación biométrica opcional para mayor seguridad. Tus datos biométricos se procesan de forma segura y nunca se comparten con terceros.
                </p>
                <p>
                  Puedes solicitar la eliminación de tus datos en cualquier momento contactando a nuestro equipo de soporte.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-primary mb-4">Devoluciones y Disputas</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  Los compradores tienen 30 días para solicitar devoluciones de productos que no cumplan con la descripción o lleguen defectuosos.
                </p>
                <p className="mb-4">
                  Para iniciar una devolución, contacta al vendedor a través de nuestro sistema de mensajería. Si no hay respuesta en 48 horas, puedes abrir una disputa.
                </p>
                <p>
                  Nuestro equipo de mediación revisará cada caso y tomará una decisión justa basada en la evidencia proporcionada por ambas partes.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;