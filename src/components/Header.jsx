import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, Sun, Moon, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/hooks/useTheme';

const Header = ({ cartCount, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navLinkClass = ({ isActive }) => 
    `relative text-sm font-medium transition-colors px-3 py-2 rounded-md ${isActive ? 'text-primary' : 'text-foreground/70 hover:text-foreground'}`;
  
  const mobileNavLinkClass = ({ isActive }) => 
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-muted text-primary' : 'hover:bg-muted hover:text-foreground'}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center text-xl font-bold text-primary">
              <img src="https://horizons-cdn.hostinger.com/fcc80be5-d307-4647-b2f4-869061a50bf6/1000144452-oAdSC.png" alt="SimpleMarket360 Logo" className="h-10 w-auto mr-2" />
              <span className="sr-only">SimpleMarket360</span>
            </Link>
          </div>

          {/* Search Bar (Desktop) */}
          <div className="hidden lg:flex flex-grow justify-center mx-4">
            <div className="relative w-full max-w-lg">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input type="text" placeholder="Buscar productos, vendedores..." className="w-full pl-12 pr-4 py-2.5 rounded-full border bg-muted/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all" />
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex space-x-2 items-center">
            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/categories" className={navLinkClass}>Categorías</NavLink>
            <NavLink to="/sellers" className={navLinkClass}>Vendedores</NavLink>
            <NavLink to="/offers" className={navLinkClass}>Ofertas</NavLink>
            
            <div className="flex items-center space-x-2">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={theme}
                        initial={{ opacity: 0, rotate: -30 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 30 }}
                        transition={{ duration: 0.2 }}
                    >
                      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </motion.div>
                  </AnimatePresence>
                </button>
                <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full hover:bg-muted transition-colors">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
                </Link>

                {user ? (
                    <div className="relative group">
                        <Link to="/user">
                            <Button variant="ghost" size="sm" className="flex items-center gap-2">
                                <img src={user.avatar} alt="Avatar" className="w-6 h-6 rounded-full"/>
                                {user.name}
                            </Button>
                        </Link>
                        <div className="absolute top-full right-0 mt-2 w-48 bg-card rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <Link to="/user" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted">Mi Panel</Link>
                            <button onClick={onLogout} className="w-full text-left block px-4 py-2 text-sm text-red-500 hover:bg-muted">Cerrar Sesión</button>
                        </div>
                    </div>
                ) : (
                    <Link to="/user">
                      <Button size="sm" className="flex items-center gap-2">
                        <User size={16} />
                        Login
                      </Button>
                    </Link>
                )}

            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full hover:bg-muted">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
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
               <div className="border-t mt-4 pt-4">
                  {user ? (
                      <div>
                          <Link to="/user" className="w-full flex items-center gap-3 px-3 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                              <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full"/>
                              <span className="font-medium">{user.name}</span>
                          </Link>
                          <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-muted">Cerrar Sesión</button>
                      </div>
                  ) : (
                      <Link to="/user" className="w-full block" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full mt-2 flex items-center gap-2">
                           <User size={16} />
                           Login / Registro
                        </Button>
                      </Link>
                  )}
               </div>
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
