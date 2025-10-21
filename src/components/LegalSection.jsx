
import React from 'react';

const LegalSection = ({ title, content }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold text-primary mb-4">{title}</h2>
      <div className="prose max-w-none text-gray-600">
        {content.map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
};

export default LegalSection;
