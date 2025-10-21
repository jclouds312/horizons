
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogIn, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ cartCount, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    setIsMobileMenuOpen(false);
    navigate('/'); // Redirect to home after logout
  };

  const navLinkClass = ({ isActive }) => 
    `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`;
  
  const mobileNavLinkClass = ({ isActive }) => 
    `block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-gray-100 text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder="Buscar productos, vendedores..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all" />
            </div>
          </div>

          {/* Nav Links & Auth (Desktop) */}
          <nav className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className={navLinkClass}>Inicio</NavLink>
            <NavLink to="/categories" className={navLinkClass}>Categorías</NavLink>
            <NavLink to="/sellers" className={navLinkClass}>Vendedores</NavLink>
            {user && user.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass}><Shield size={16} className="inline mr-1"/>Admin</NavLink>
            )}
            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Hola, {user.name.split(' ')[0]}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-1.5">
                    <LogOut size={16}/>
                    Salir
                  </Button>
                </div>
              ) : (
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login" className="flex items-center gap-1.5">
                    <LogIn size={16}/>
                    Entrar
                  </Link>
                </Button>
              )}
              <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <Link to="/cart" aria-label="Carrito" className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-600" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden overflow-hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Inicio</NavLink>
              <NavLink to="/categories" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Categorías</NavLink>
              <NavLink to="/sellers" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Vendedores</NavLink>
              {user && user.role === 'admin' && (
                <NavLink to="/admin" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>Panel Admin</NavLink>
              )}
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              {user ? (
                <div className="px-5 flex flex-col space-y-3">
                   <p className="font-medium text-gray-800">Hola, {user.name}</p>
                  <Button variant="outline" onClick={handleLogout}>Cerrar Sesión</Button>
                </div>
              ) : (
                <div className="px-5">
                  <Button asChild className="w-full">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Iniciar Sesión</Link>
                  </Button>
                </div>
              )}
            </div>
             <div className="lg:hidden p-4 border-t border-gray-200">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Buscar..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300"/>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
