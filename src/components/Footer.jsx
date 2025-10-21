
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    { name: 'Términos y Condiciones', path: '/legal?section=terms' },
    { name: 'Política de Privacidad', path: '/legal?section=privacy' },
    { name: 'Política de Devoluciones', path: '/legal?section=returns' },
    { name: 'Contacto', path: '/contact' },
    { name: 'Blog', path: '/blog' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook size={20} /> },
    { name: 'Instagram', url: '#', icon: <Instagram size={20} /> },
    { name: 'Twitter', url: '#', icon: <Twitter size={20} /> },
  ];

  return (
    <footer className="bg-background border-t mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
             <img src="https://horizons-cdn.hostinger.com/fcc80be5-d307-4647-b2f4-869061a50bf6/1000144452-oAdSC.png" alt="SimpleMarket360 Logo" className="h-10" />
            <p className="text-muted-foreground text-base">
              Tu marketplace para comprar y vender de todo, de forma fácil y segura.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.url} className="text-muted-foreground hover:text-foreground">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-base text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Soporte</h3>
                <ul className="mt-4 space-y-4">
                  {footerLinks.slice(3).map((item) => (
                    <li key={item.name}>
                      <Link to={item.path} className="text-base text-muted-foreground hover:text-foreground">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
               <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Newsletter</h3>
                <p className="text-muted-foreground mt-4">Suscríbete para recibir las últimas ofertas y novedades.</p>
                <form className="mt-4 sm:flex sm:max-w-md">
                  <label htmlFor="email-address" className="sr-only">Email</label>
                  <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-background border border-border rounded-md py-2 px-4 text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" placeholder="Tu email" />
                  <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                    <Button type="submit" className="w-full">Suscribirme</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-base text-muted-foreground xl:text-center">&copy; 2025 SimpleMarket360. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
