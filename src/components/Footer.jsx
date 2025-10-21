import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    { name: 'Términos', path: '/legal?section=terms' },
    { name: 'Privacidad', path: '/legal?section=privacy' },
    { name: 'Devoluciones', path: '/legal?section=returns' },
    { name: 'Contacto', path: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Twitter', url: '#' },
  ];

  return (
    <footer className="bg-background border-t border-border" style={{'--sm-bg': 'var(--sm-bg)', '--sm-border': 'var(--sm-border)', color: 'var(--sm-text)'}}>
      <div className="h-1.5" style={{ background: 'var(--sm-grad)' }}></div>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <img src="/icon-192.png" alt="SimpleMarket360 Logo" className="h-8 w-8" />
            <div>
              <p className="text-base font-semibold">SimpleMarket360</p>
              <p className="text-sm text-muted-foreground">&copy; 2025. Todos los derechos reservados.</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {footerLinks.map((link) => (
              <Link key={link.name} to={link.path} className="text-sm text-foreground opacity-80 hover:opacity-100 transition-opacity">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;