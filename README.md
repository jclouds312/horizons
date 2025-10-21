# SimpleMarket360 PWA Backend

## Descripción General

Este es el backend para la PWA de SimpleMarket360, un mercado en línea completo con perfiles de usuario, catálogos de productos, vendedores, un sistema de anuncios, compras en vivo, y más. Este backend proporcionará los servicios y APIs necesarios para soportar todas las funcionalidades del frontend.

## Stack Tecnológico

*   **Entorno de ejecución:** Node.js
*   **Framework:** Express.js
*   **Base de datos:** MongoDB con Mongoose
*   **Autenticación:** JSON Web Tokens (JWT) y verificación biométrica.
*   **Comunicación en tiempo real:** Socket.io (para chat y notificaciones)
*   **Despliegue:** Firebase

## Funcionalidades a Implementar

*   **Autenticación de Usuarios:**
    *   Registro e inicio de sesión con email/contraseña.
    *   Verificación biométrica opcional.
    *   Gestión de perfiles de usuario.
*   **Gestión de Productos:**
    *   CRUD (Crear, Leer, Actualizar, Eliminar) para productos.
    *   Búsqueda y filtrado de productos.
    *   Gestión de categorías.
*   **Gestión de Vendedores:**
    *   Registro y perfiles de vendedores.
    *   Paneles de control para vendedores.
*   **Carrito de Compras y Pedidos:**
    *   Añadir/eliminar productos del carrito.
    *   Procesamiento de pedidos.
    *   Historial de pedidos.
*   **Sistema de Anuncios:**
    *   Creación y gestión de anuncios.
    *   Seguimiento de la eficacia de los anuncios.
*   **Compras en Vivo:**
    *   API para gestionar sesiones de streaming en vivo.
    *   Integración de chat en tiempo real para las sesiones en vivo.
*   **Blog y Contenido:**
    *   CRUD para artículos del blog.
*   **Sistema de Mensajería y Disputas:**
    *   Mensajería entre compradores y vendedores.
    *   Sistema de mediación para disputas.

## Primeros Pasos

### Prerrequisitos

*   Node.js (v14 o superior)
*   npm
*   MongoDB (local o en la nube)

### Instalación

1.  **Clonar el repositorio (si aplica):**
    ```bash
    git clone <URL-del-repositorio>
    cd <nombre-del-repositorio>
    ```

2.  **Inicializar el proyecto de Node.js:**
    ```bash
    npm init -y
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install express mongoose cors dotenv jsonwebtoken bcrypt socket.io
    ```
4.  **Instalar dependencias de desarrollo:**
    ```bash
    npm install -D nodemon
    ```

### Configuración

1.  Crear un archivo `.env` en la raíz del proyecto para las variables de entorno:
    ```
    PORT=3001
    MONGODB_URI=<tu-string-de-conexion-a-mongodb>
    JWT_SECRET=<tu-secreto-para-jwt>
    ```

### Ejecutar la Aplicación

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo con `nodemon`, que se reiniciará automáticamente al detectar cambios en los archivos.

## Estructura del Proyecto

```
/
|-- controllers/
|   |-- authController.js
|   |-- productController.js
|   |-- userController.js
|   |-- ...
|-- models/
|   |-- User.js
|   |-- Product.js
|   |-- Seller.js
|   |-- ...
|-- routes/
|   |-- auth.js
|   |-- products.js
|   |-- users.js
|   |-- ...
|-- .env
|-- .gitignore
|-- index.js
|-- package.json
|-- README.md
```
