
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const Header = ({ cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-foreground/60 hover:text-foreground/80'}`;
  
  const mobileNavLinkClass = ({ isActive }) => 
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-muted text-primary' : 'hover:bg-muted hover:text-foreground'}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-primary">
              <img src="https://horizons-cdn.hostinger.com/fcc80be5-d307-4647-b2f4-869061a50bf6/1000144452-oAdSC.png" alt="SimpleMarket360 Logo" className="h-8 w-auto mr-2" />
              <span className="sr-only">SimpleMarket360</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-grow justify-center mx-4">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input type="text" placeholder="Buscar productos, vendedores..." className="w-full pl-10 pr-4 py-2 rounded-md border bg-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/categories" className={navLinkClass}>Categorías</NavLink>
            <NavLink to="/sellers" className={navLinkClass}>Vendedores</NavLink>
            <NavLink to="/offers" className={navLinkClass}>Ofertas</NavLink>
            <Button variant="outline" size="sm">Login</Button>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full hover:bg-muted">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink>
              <NavLink to="/categories" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Categorías</NavLink>
              <NavLink to="/sellers" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Vendedores</NavLink>
              <NavLink to="/offers" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Ofertas</NavLink>
              <Button variant="outline" className="w-full mt-2">Login</Button>
            </div>
             <div className="p-4 border-t">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-md border bg-muted"/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
