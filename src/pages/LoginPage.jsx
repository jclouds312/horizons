
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import users from '@/data/users.json';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      onLogin(user);
      toast({ title: "Inicio de sesión exitoso", description: `¡Bienvenido, ${user.name}!` });
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast({ title: "Error de inicio de sesión", description: "Credenciales incorrectas. Por favor, inténtalo de nuevo.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">¿No tienes una cuenta? <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Regístrate</a></p>
        </div>
         <div className="mt-4 p-4 bg-gray-100 rounded-md text-sm">
          <h4 className="font-bold mb-2">Cuentas de prueba:</h4>
          <p><b>Admin:</b> admin@simplemarket360.com / admin</p>
          <p><b>Vendedor:</b> juan.vendedor@example.com / password123</p>
          <p><b>Comprador:</b> ana.compradora@example.com / password456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
