import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
const Header = ({
  cartCount
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Updated styling to use primary and accent colors
  const navLinkClass = ({
    isActive
  }) => `text-sm font-medium ${isActive ? 'text-accent' : 'text-gray-600 hover:text-primary'}`;
  const mobileNavLinkClass = ({
    isActive
  }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-gray-100 text-accent' : 'text-gray-600 hover:bg-gray-50 hover:text-primary'}`;
  return <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
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
              <input type="text" placeholder="Buscar productos, categorías, vendedores..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-200" aria-label="Buscar productos, categorías, vendedores..." />
            </div>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex space-x-6 items-center">
            <NavLink to="/" className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/categories" className={navLinkClass}>
              Categorías
            </NavLink>
            <NavLink to="/offers" className={navLinkClass}>
              Ofertas
            </NavLink>
            <NavLink to="/sellers" className={navLinkClass}>
              Vendedores
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contacto
            </NavLink>
            <Link to="/user" aria-label="Mi cuenta" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <User className="h-5 w-5 text-gray-600" />
            </Link>
            <Link to="/cart" aria-label="Carrito de compras" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link to="/cart" aria-label="Carrito de compras" className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen ? 'true' : 'false'} aria-label="Abrir menú móvil">
              {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden py-2 border-t border-gray-200">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar productos, categorías, vendedores..." className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all duration-200" aria-label="Buscar productos, categorías, vendedores..." />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <div className="lg:hidden bg-white shadow-md pb-4" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Inicio
            </NavLink>
            <NavLink to="/categories" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Categorías
            </NavLink>
            <NavLink to="/offers" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Ofertas
            </NavLink>
            <NavLink to="/sellers" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Vendedores
            </NavLink>
            <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsMobileMenuOpen(false)}>
              Contacto
            </NavLink>
            <Link to="/user" className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
              Mi cuenta
            </Link>
          </div>
        </div>}
    </header>;
};
export default Header;