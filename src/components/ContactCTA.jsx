
import React from 'react';
import { Link } from 'react-router-dom';
import LegalLink from './LegalLink';

const ContactCTA = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg text-center">
      <h3 className="text-2xl font-bold text-primary mb-4">¿Tienes alguna pregunta?</h3>
      <p className="text-gray-600 mb-6">
        Consulta nuestras <LegalLink sectionId="returns">políticas de devolución y disputas</LegalLink> o <Link to="/contact" className="text-primary hover:underline">contacta con nuestro equipo de soporte</Link>.
      </p>
    </div>
  );
};

export default ContactCTA;
