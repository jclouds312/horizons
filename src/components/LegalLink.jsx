
import React from 'react';
import { Link } from 'react-router-dom';

const LegalLink = ({ sectionId, children }) => {
  return (
    <Link to={`/legal#${sectionId}`} className="text-primary hover:underline">
      {children}
    </Link>
  );
};

export default LegalLink;
