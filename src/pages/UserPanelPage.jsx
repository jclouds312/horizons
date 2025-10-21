import React from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import PageWrapper from '@/components/PageWrapper';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const UserPanelPage = () => {
  const [searchParams] = useSearchParams();
  const action = searchParams.get('action') || 'profile';

  return (
    <PageWrapper>
      <Helmet>
        <title>Panel de Usuario - SimpleMarket360</title>
      </Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Panel de Usuario</h1>
        <Tabs defaultValue={action} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="publish">Publicar Producto</TabsTrigger>
            <TabsTrigger value="products">Mis Productos</TabsTrigger>
            <TabsTrigger value="settings">Ajustes</TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil de Usuario</CardTitle>
                <CardDescription>Información sobre tu cuenta.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Aquí irá la información del perfil del usuario.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="publish">
            <Card>
              <CardHeader>
                <CardTitle>Publicar Nuevo Producto</CardTitle>
                <CardDescription>Rellena el formulario para añadir un nuevo producto a tu tienda.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="product-name">Nombre del Producto</label>
                  <Input id="product-name" placeholder="Ej: Camiseta de algodón" />
                </div>
                <div>
                  <label htmlFor="product-description">Descripción</label>
                  <Textarea id="product-description" placeholder="Describe tu producto en detalle..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="product-price">Precio</label>
                    <Input id="product-price" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <label htmlFor="product-category">Categoría</label>
                    <Select>
                      <SelectTrigger id="product-category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electrónica</SelectItem>
                        <SelectItem value="clothing">Ropa</SelectItem>
                        <SelectItem value="home">Hogar</SelectItem>
                        <SelectItem value="sports">Deportes</SelectItem>
                        <SelectItem value="books">Libros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full btn-primary mt-4">Publicar Producto</Button>
              </CardContent>
            </Card>
          </TabsContent>
           <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Mis Productos</CardTitle>
                <CardDescription>Gestiona los productos de tu tienda.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Aquí aparecerá la lista de productos del usuario.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Ajustes</CardTitle>
                <CardDescription>Configura las opciones de tu cuenta.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Aquí irán los ajustes de la cuenta del usuario.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageWrapper>
  );
};

export default UserPanelPage;
