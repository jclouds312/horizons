
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import HomePage from '@/pages/HomePage';
import ProductPage from '@/pages/ProductPage';
import SellerPage from '@/pages/SellerPage';
import CartPage from '@/pages/CartPage';
import UserPanelPage from '@/pages/UserPanelPage';
import BlogPage from '@/pages/BlogPage';
import LegalPage from '@/pages/LegalPage';
import LivePlayerPage from '@/pages/LivePlayerPage';
import CategoriesPage from '@/pages/CategoriesPage';
import OffersPage from '@/pages/OffersPage';
import SellersPage from '@/pages/SellersPage';
import ContactPage from '@/pages/ContactPage';
import AdBanner from '@/components/AdBanner';
import StickyAd from '@/components/StickyAd';
import { useAds } from '@/hooks/useAds';
import categorizeProducts from '@/lib/categorizer';

function AppContent() {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { config: adsConfig, getSlot, setOverrides } = useAds();

  const categorizedProducts = useMemo(() => {
    if (products.length > 0) {
      return categorizeProducts(products);
    }
    return { categories: [], uncategorized: [], totals: { all: 0, byCategory: {} } };
  }, [products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/livehopp_products_24.json');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    const fetchSellers = async () => {
      try {
        const response = await fetch('/livehopp_sellers_30_enhanced.json');
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Failed to fetch sellers:", error);
      }
    };
    fetchProducts();
    fetchSellers();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };
  
  const handleCheckoutSuccess = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const prefooterSlot = getSlot('ad-prefooter');
  const stickyFooterSlot = getSlot('ad-sticky-footer');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header cartCount={cartCount} />
      <main className="pt-32 flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage categorizedData={categorizedProducts} sellers={sellers} onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/seller/:id" element={<SellerPage products={products} sellers={sellers} />} />
            <Route path="/cart" element={<CartPage items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} onCheckoutSuccess={handleCheckoutSuccess} />} />
            <Route path="/user" element={<UserPanelPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/live/:id" element={<LivePlayerPage sellers={sellers} products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/categories" element={<CategoriesPage categorizedData={categorizedProducts} onAddToCart={handleAddToCart} />} />
            <Route path="/offers" element={<OffersPage products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/sellers" element={<SellersPage sellers={sellers} />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {prefooterSlot && (
        <div className="max-w-7xl mx-auto px-4 w-full my-8">
          <AdBanner slotKey="ad-prefooter" slotData={prefooterSlot} />
        </div>
      )}
      <Footer />
      {stickyFooterSlot && <StickyAd slotKey="ad-sticky-footer" slotData={stickyFooterSlot} />}
      <Toaster />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
