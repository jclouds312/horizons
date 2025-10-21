import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import NotFoundPage from '@/pages/NotFoundPage';
import AdBanner from '@/components/AdBanner';
import StickyAd from '@/components/StickyAd';
import { useAds } from '@/hooks/useAds';
import { useTheme } from '@/hooks/useTheme';
import categorizeProducts from '@/lib/categorizer';

// --- Protected Route Component ---
const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/user" replace />;
  }
  return children;
};

function AppContent() {
  const location = useLocation();
  
  // --- State Management ---
  const [products, setProducts] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [users, setUsers] = useState(() => {
      const savedUsers = localStorage.getItem('users');
      return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [user, setUser] = useState(() => {
      const savedUser = localStorage.getItem('currentUser');
      return savedUser ? JSON.parse(savedUser) : null;
  });
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const { theme, toggleTheme } = useTheme();
  const { getSlot } = useAds();

  // --- Data Fetching ---
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await fetch('/livehopp_sellers_30_enhanced.json');
        const data = await response.json();
        setSellers(data);
      } catch (error) {
        console.error("Failed to fetch sellers:", error);
      }
    };
    
    const localProducts = localStorage.getItem('products');
    if (localProducts) {
        setProducts(JSON.parse(localProducts));
    } else {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/livehopp_products_24.json');
                const data = await response.json();
                setProducts(data);
                localStorage.setItem('products', JSON.stringify(data));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }

    fetchSellers();
  }, []);

  // --- LocalStorage Persistence ---
  useEffect(() => { localStorage.setItem('cartItems', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(() => { localStorage.setItem('users', JSON.stringify(users)); }, [users]);
  useEffect(() => { 
      if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
      } else {
          localStorage.removeItem('currentUser');
      }
  }, [user]);

  // --- Handlers ---
  const handleRegister = (newUser) => {
      const userExists = users.some(u => u.email === newUser.email);
      if (userExists) {
          return { success: false, message: 'El email ya está registrado.' };
      }
      const userWithId = { ...newUser, id: Date.now() };
      setUsers(prev => [...prev, userWithId]);
      setUser(userWithId);
      return { success: true, message: '¡Registro exitoso!' };
  };

  const handleLogin = (credentials) => {
      const foundUser = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (foundUser) {
          setUser(foundUser);
          return { success: true, message: '¡Inicio de sesión exitoso!' };
      } 
      return { success: false, message: 'Credenciales incorrectas.' };
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddNewProduct = (newProduct) => {
    const productData = { 
        ...newProduct, 
        id: products.length + 1, // Simple ID generation
        seller: { id: user.id, name: user.name },
    };
    const updatedProducts = [productData, ...products];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
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
    } else {
      setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
    }
  };
  
  const handleCheckoutSuccess = () => {
    setCartItems([]);
  };
  
  // --- Memoized Values ---
  const categorizedProducts = useMemo(() => categorizeProducts(products), [products]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const prefooterSlot = getSlot('ad-prefooter');
  const stickyFooterSlot = getSlot('ad-sticky-footer');

  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header cartCount={cartCount} toggleTheme={toggleTheme} theme={theme} user={user} onLogout={handleLogout} />
      <main className="pt-20 flex-grow">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage categorizedData={categorizedProducts} sellers={sellers} onAddToCart={handleAddToCart} />} />
            <Route path="/product/:id" element={<ProductPage products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/seller/:id" element={<SellerPage products={products} sellers={sellers} onAddToCart={handleAddToCart} />} />
            <Route path="/cart" element={<ProtectedRoute user={user}><CartPage items={cartItems} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemoveFromCart} onCheckoutSuccess={handleCheckoutSuccess} /></ProtectedRoute>} />
            <Route path="/user" element={<UserPanelPage user={user} onLogin={handleLogin} onRegister={handleRegister} onAddNewProduct={handleAddNewProduct} userProducts={products.filter(p => p.seller.id === (user ? user.id : null))} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="/live/:id" element={<LivePlayerPage sellers={sellers} products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/categories" element={<CategoriesPage categorizedData={categorizedProducts} onAddToCart={handleAddToCart} />} />
            <Route path="/offers" element={<OffersPage products={products} onAddToCart={handleAddToCart} />} />
            <Route path="/sellers" element={<SellersPage sellers={sellers} />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      {prefooterSlot && <div className="max-w-7xl mx-auto px-4 w-full my-8"><AdBanner slotKey="ad-prefooter" slotData={prefooterSlot} /></div>}
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
