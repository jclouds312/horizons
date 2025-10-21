import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Twitch } from 'lucide-react';
import { Button } from './ui/button';

const Footer = () => {
  const legalLinks = [
    { name: 'Términos y Condiciones', path: '/legal?section=terms' },
    { name: 'Política de Privacidad', path: '/legal?section=privacy' },
    { name: 'Política de Devoluciones', path: '/legal?section=returns' },
  ];
  
  const aboutLinks = [
      { name: 'Sobre Nosotros', path: '/about' },
      { name: 'Contacto', path: '/contact' },
      { name: 'Blog', path: '/blog' },
      { name: 'Vende en SimpleMarket360', path: '/user' },
  ];
  
  const categoryLinks = [
    { name: 'Electrónica', path: '/categories#electronics' },
    { name: 'Moda', path: '/categories#fashion' },
    { name: 'Hogar', path: '/categories#home' },
    { name: 'Deportes', path: '/categories#sports' },
  ];

  const socialLinks = [
    { name: 'Facebook', url: '#', icon: <Facebook size={20} /> },
    { name: 'Instagram', url: '#', icon: <Instagram size={20} /> },
    { name: 'Twitter', url: '#', icon: <Twitter size={20} /> },
    { name: 'Youtube', url: '#', icon: <Youtube size={20} /> },
    { name: 'Twitch', url: '#', icon: <Twitch size={20} /> },
  ];

  return (
    <footer className="bg-background/80 border-t backdrop-blur-sm mt-24">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="col-span-2 lg:col-span-1 space-y-8">
             <img src="https://horizons-cdn.hostinger.com/fcc80be5-d307-4647-b2f4-869061a50bf6/1000144452-oAdSC.png" alt="SimpleMarket360 Logo" className="h-10" />
            <p className="text-muted-foreground text-base">
              Tu marketplace para comprar y vender de todo, de forma fácil y segura.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a key={item.name} href={item.url} className="text-muted-foreground transition-colors hover:text-primary">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Categorías</h3>
            <ul className="mt-4 space-y-3">
              {categoryLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-base text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Nosotros</h3>
            <ul className="mt-4 space-y-3">
              {aboutLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-base text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-base text-muted-foreground transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Newsletter</h3>
             <p className="text-muted-foreground mt-4 text-base">Recibe las mejores ofertas y novedades directamente en tu email.</p>
             <form className="mt-4 sm:flex sm:max-w-md">
               <label htmlFor="email-address" className="sr-only">Email</label>
               <input type="email" name="email-address" id="email-address" autoComplete="email" required className="appearance-none min-w-0 w-full bg-background border border-border rounded-md py-2 px-4 text-base text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary" placeholder="Tu email" />
               <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                 <Button type="submit" className="w-full transition-transform transform hover:scale-105">Suscribirme</Button>
               </div>
             </form>
          </div>

        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-base text-muted-foreground xl:text-center">&copy; {new Date().getFullYear()} SimpleMarket360. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
