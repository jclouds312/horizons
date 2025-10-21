import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.jsx"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useToast } from "@/components/ui/use-toast.jsx"
import ProductCard from '@/components/ProductCard';

// --- Componente para usuarios no autenticados (Login/Registro) ---
const AuthComponent = ({ onLogin, onRegister }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = onLogin({ email: loginEmail, password: loginPassword });
    toast({ title: result.success ? '¡Bienvenido!' : 'Error', description: result.message });
    if (result.success) navigate('/');
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const result = onRegister({ name: registerName, email: registerEmail, password: registerPassword, avatar: `https://avatar.vercel.sh/${registerEmail}.png` });
    toast({ title: result.success ? '¡Registro completado!' : 'Error', description: result.message });
    if (result.success) navigate('/');
  };

  return (
    <div className="max-w-md mx-auto">
        <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
                <TabsTrigger value="register">Registro</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card>
                    <CardHeader>
                        <CardTitle>Iniciar Sesión</CardTitle>
                        <CardDescription>Accede a tu cuenta para continuar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <Input type="email" placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                            <Input type="password" placeholder="Contraseña" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                            <Button type="submit" className="w-full">Acceder</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="register">
                <Card>
                    <CardHeader>
                        <CardTitle>Crear Cuenta</CardTitle>
                        <CardDescription>Crea una cuenta para vender y comprar.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                            <Input placeholder="Nombre completo" value={registerName} onChange={(e) => setRegisterName(e.target.value)} required />
                            <Input type="email" placeholder="Email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                            <Input type="password" placeholder="Contraseña" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                            <Button type="submit" className="w-full">Registrarse</Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  );
};

// --- Componente para el Panel de Usuario Autenticado ---
const UserDashboard = ({ user, onAddNewProduct, userProducts }) => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const defaultTab = searchParams.get('action') || 'profile';

  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productImage, setProductImage] = useState('');

  const handlePublishSubmit = (e) => {
      e.preventDefault();
      onAddNewProduct({
          name: productName,
          description: productDesc,
          price: parseFloat(productPrice),
          category: productCategory,
          image: productImage || 'https://via.placeholder.com/300x300.png?text=Sin+Imagen',
          rating: { rate: 0, count: 0 },
      });
      toast({ title: '¡Producto Publicado!', description: 'Tu producto ya está disponible en el marketplace.' });
      // Limpiar formulario
      setProductName('');
      setProductDesc('');
      setProductPrice('');
      setProductCategory('');
      setProductImage('');
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center space-x-4 mb-8">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-full border-4 border-muted"/>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hola, {user.name}</h1>
            <p className="text-muted-foreground">Bienvenido a tu panel de control.</p>
          </div>
      </div>
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="publish">Publicar</TabsTrigger>
          <TabsTrigger value="products">Mis Productos</TabsTrigger>
          <TabsTrigger value="settings">Ajustes</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader><CardTitle>Tu Perfil</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <p><strong>Nombre:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>Publicar Nuevo Producto</CardTitle>
              <CardDescription>Rellena el formulario para añadir un nuevo producto.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handlePublishSubmit} className="space-y-4">
                    <Input placeholder="Nombre del Producto" value={productName} onChange={e => setProductName(e.target.value)} required />
                    <Textarea placeholder="Descripción detallada del producto..." value={productDesc} onChange={e => setProductDesc(e.target.value)} required />
                    <Input placeholder="URL de la Imagen" value={productImage} onChange={e => setProductImage(e.target.value)} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input type="number" placeholder="Precio (Ej: 25.99)" value={productPrice} onChange={e => setProductPrice(e.target.value)} required min="0.01" step="0.01" />
                        <Select onValueChange={setProductCategory} value={productCategory} required>
                            <SelectTrigger><SelectValue placeholder="Selecciona una categoría" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="electronics">Electrónica</SelectItem>
                                <SelectItem value="fashion">Moda</SelectItem>
                                <SelectItem value="home">Hogar</SelectItem>
                                <SelectItem value="sports">Deportes</SelectItem>
                                <SelectItem value="books">Libros</SelectItem>
                                <SelectItem value="other">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full">Publicar Producto</Button>
                </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="products">
          <Card>
            <CardHeader><CardTitle>Mis Productos Publicados</CardTitle></CardHeader>
            <CardContent>
              {userProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={() => {}} />)}
                </div>
              ) : (
                <p>Aún no has publicado ningún producto.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings">
            <Card>
                <CardHeader><CardTitle>Ajustes</CardTitle></CardHeader>
                <CardContent><p>Próximamente...</p></CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// --- Componente Principal de la Página ---
const UserPanelPage = ({ user, onLogin, onRegister, onAddNewProduct, userProducts }) => {
  const title = user ? 'Panel de Usuario' : 'Acceso de Usuario';

  return (
    <PageWrapper>
      <Helmet>
        <title>{title} - SimpleMarket360</title>
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {user ? 
            <UserDashboard user={user} onAddNewProduct={onAddNewProduct} userProducts={userProducts} /> : 
            <AuthComponent onLogin={onLogin} onRegister={onRegister} />
        }
      </div>
    </PageWrapper>
  );
};

export default UserPanelPage;
